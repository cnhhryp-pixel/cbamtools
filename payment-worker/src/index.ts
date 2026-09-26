import {PDFDocument,StandardFonts,rgb} from "pdf-lib";

interface Env{
  PAYPAL_CLIENT_ID:string;
  PAYPAL_CLIENT_SECRET:string;
  DOWNLOAD_SIGNING_SECRET:string;
  PAYPAL_MODE?:string;
  ALLOWED_ORIGIN?:string;
}

const PRICE="49.00";
const CURRENCY="EUR";

function cors(env:Env){
  return {
    "Access-Control-Allow-Origin":env.ALLOWED_ORIGIN||"https://cbamtools.com",
    "Access-Control-Allow-Headers":"Content-Type, Authorization",
    "Access-Control-Allow-Methods":"GET, POST, OPTIONS",
    "Vary":"Origin"
  };
}

function json(data:unknown,status:number,env:Env){
  return new Response(JSON.stringify(data),{
    status,
    headers:{"Content-Type":"application/json","Cache-Control":"no-store",...cors(env)}
  });
}

function apiBase(env:Env){
  return env.PAYPAL_MODE==="sandbox"?"https://api-m.sandbox.paypal.com":"https://api-m.paypal.com";
}

function clean(value:unknown,max=160){
  return String(value||"").replace(/[\r\n\t]+/g," ").trim().slice(0,max);
}

async function accessToken(env:Env){
  const auth=btoa(env.PAYPAL_CLIENT_ID+":"+env.PAYPAL_CLIENT_SECRET);
  const response=await fetch(apiBase(env)+"/v1/oauth2/token",{
    method:"POST",
    headers:{
      "Authorization":"Basic "+auth,
      "Content-Type":"application/x-www-form-urlencoded"
    },
    body:"grant_type=client_credentials"
  });
  if(!response.ok) throw new Error("PayPal authentication failed.");
  const data:any=await response.json();
  return data.access_token as string;
}

async function createOrder(request:Request,env:Env){
  const body:any=await request.json();
  const reportRef=clean(body.reportRef,80);
  const contact=clean(body.contact,160);
  if(!reportRef) return json({error:"Missing report reference."},400,env);
  if(!contact||!contact.includes("@")) return json({error:"A valid report delivery email is required."},400,env);

  const token=await accessToken(env);
  const returnUrl="https://cbamtools.com/payment/success?reportRef="+encodeURIComponent(reportRef);

  const response=await fetch(apiBase(env)+"/v2/checkout/orders",{
    method:"POST",
    headers:{
      "Authorization":"Bearer "+token,
      "Content-Type":"application/json",
      "PayPal-Request-Id":crypto.randomUUID()
    },
    body:JSON.stringify({
      intent:"CAPTURE",
      purchase_units:[{
        reference_id:"CBAM-PRO-REPORT",
        custom_id:reportRef,
        description:"CBAMTools Professional Report",
        amount:{currency_code:CURRENCY,value:PRICE}
      }],
      payment_source:{
        paypal:{
          experience_context:{
            brand_name:"CBAMTools",
            landing_page:"LOGIN",
            user_action:"PAY_NOW",
            shipping_preference:"NO_SHIPPING",
            return_url:returnUrl,
            cancel_url:"https://cbamtools.com/payment/cancel"
          }
        }
      }
    })
  });

  const data:any=await response.json();
  if(!response.ok) return json({error:"PayPal order creation failed.",details:data},502,env);

  const approveUrl=(data.links||[]).find((x:any)=>x.rel==="payer-action"||x.rel==="approve")?.href;
  if(!approveUrl) return json({error:"PayPal approval URL was not returned."},502,env);

  return json({orderId:data.id,approveUrl},200,env);
}

async function getOrder(orderId:string,token:string,env:Env){
  const response=await fetch(apiBase(env)+"/v2/checkout/orders/"+encodeURIComponent(orderId),{
    headers:{"Authorization":"Bearer "+token}
  });
  if(!response.ok) throw new Error("Unable to retrieve PayPal order.");
  return response.json() as Promise<any>;
}

async function captureOrder(request:Request,env:Env){
  const body:any=await request.json();
  const orderId=clean(body.orderId,80);
  const requestedRef=clean(body.reportRef,80);
  const reportData=body.reportData||{};
  if(!orderId) return json({error:"Missing PayPal order ID."},400,env);

  const token=await accessToken(env);
  const captureResponse=await fetch(apiBase(env)+"/v2/checkout/orders/"+encodeURIComponent(orderId)+"/capture",{
    method:"POST",
    headers:{
      "Authorization":"Bearer "+token,
      "Content-Type":"application/json",
      "PayPal-Request-Id":"capture-"+orderId
    },
    body:"{}"
  });

  const order:any=captureResponse.ok?await captureResponse.json():await getOrder(orderId,token,env);
  const unit=order.purchase_units?.[0];
  const capture=unit?.payments?.captures?.[0];
  const amount=capture?.amount||unit?.amount;
  const completed=order.status==="COMPLETED"||capture?.status==="COMPLETED";
  const reportRef=clean(unit?.custom_id,80);

  if(!completed) return json({error:"The PayPal order is not completed."},402,env);
  if(amount?.currency_code!==CURRENCY||amount?.value!==PRICE){
    return json({error:"Payment amount or currency does not match the €49 Professional Report price."},402,env);
  }
  if(requestedRef&&reportRef&&requestedRef!==reportRef){
    return json({error:"Payment reference does not match this report."},409,env);
  }

  const entitlement={
    v:1,
    exp:Date.now()+24*60*60*1000,
    orderId,
    reportRef:reportRef||requestedRef||"CBAM-PRO-REPORT",
    price:PRICE,
    currency:CURRENCY,
    reportData
  };

  return json({
    verified:true,
    downloadToken:await sign(entitlement,env.DOWNLOAD_SIGNING_SECRET),
    expiresIn:86400
  },200,env);
}

function b64url(bytes:Uint8Array){
  let raw="";
  for(const byte of bytes) raw+=String.fromCharCode(byte);
  return btoa(raw).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"");
}

function fromB64url(value:string){
  let base=value.replace(/-/g,"+").replace(/_/g,"/");
  while(base.length%4) base+="=";
  const raw=atob(base);
  return Uint8Array.from(raw,c=>c.charCodeAt(0));
}

async function hmacKey(secret:string,usage:KeyUsage[]){
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    {name:"HMAC",hash:"SHA-256"},
    false,
    usage
  );
}

async function sign(payload:unknown,secret:string){
  const body=b64url(new TextEncoder().encode(JSON.stringify(payload)));
  const key=await hmacKey(secret,["sign"]);
  const signature=new Uint8Array(await crypto.subtle.sign("HMAC",key,new TextEncoder().encode(body)));
  return body+"."+b64url(signature);
}

async function verifySigned(token:string,secret:string){
  const [body,signature]=token.split(".");
  if(!body||!signature) throw new Error("Invalid download token.");
  const key=await hmacKey(secret,["verify"]);
  const ok=await crypto.subtle.verify(
    "HMAC",
    key,
    fromB64url(signature),
    new TextEncoder().encode(body)
  );
  if(!ok) throw new Error("Invalid download token.");
  const payload:any=JSON.parse(new TextDecoder().decode(fromB64url(body)));
  if(!payload.exp||Date.now()>payload.exp) throw new Error("Download token has expired.");
  return payload;
}

function wrap(text:string,max=88){
  const words=text.split(/\s+/);
  const lines:string[]=[];
  let line="";
  for(const word of words){
    const next=line?line+" "+word:word;
    if(next.length>max){
      if(line) lines.push(line);
      line=word;
    }else{
      line=next;
    }
  }
  if(line) lines.push(line);
  return lines;
}

async function createPdf(payload:any){
  const pdf=await PDFDocument.create();
  const regular=await pdf.embedFont(StandardFonts.Helvetica);
  const bold=await pdf.embedFont(StandardFonts.HelveticaBold);
  const size:[number,number]=[595.28,841.89];
  let page=pdf.addPage(size);
  let y=790;

  function ensure(space=50){
    if(y-space<55){
      page=pdf.addPage(size);
      y=790;
    }
  }
  function line(text:string,fontSize=10,strong=false,gap=16){
    ensure(gap+8);
    page.drawText(clean(text,600),{
      x:52,y,size:fontSize,font:strong?bold:regular,color:rgb(0.06,0.13,0.21)
    });
    y-=gap;
  }
  function paragraph(text:string){
    for(const part of wrap(clean(text,1400),90)) line(part,9,false,13);
    y-=5;
  }

  const data=payload.reportData||{};
  const a=data.assessment||{};

  line("CBAMTools",18,true,24);
  line("Professional CBAM Assessment Report",21,true,30);
  line("Payment verified · EUR 49.00",9,false,18);
  line("Report reference: "+clean(payload.reportRef,100),9,true,28);

  line("Prepared for",11,true,18);
  line(clean(data.company||"Business user"),12,true,17);
  if(data.contact) line(clean(data.contact),9,false,24);

  line("Assessment summary",13,true,22);
  line("Sector: "+clean(a.sector||"Not provided"));
  line("CN / HS code: "+clean(a.code||"Not provided"));
  line("Country of origin: "+clean(a.country||"Not provided"));
  line("Import quantity: "+clean(a.quantity||"Not provided")+" tonnes");
  line("Embedded emissions: "+clean(a.emissions||"Not provided")+" tCO2e / tonne");
  line("Certificate price: EUR "+clean(a.certificatePrice||"Not provided")+" / tCO2");
  line("Estimated CBAM cost: EUR "+clean(a.cost||"Not provided"),11,true,26);

  line("Important",11,true,18);
  paragraph("This report is a planning and assessment document generated from user-supplied inputs. It does not replace official classification, verified emissions data, an official CBAM declaration, or professional legal, customs or tax advice.");

  line("Payment record",11,true,18);
  line("PayPal order: "+clean(payload.orderId,100),8);
  line("Verified amount: EUR 49.00",8);

  return pdf.save();
}

async function downloadReport(request:Request,env:Env){
  const auth=request.headers.get("Authorization")||"";
  if(!auth.startsWith("Bearer ")) return new Response("Unauthorized",{status:401,headers:cors(env)});
  try{
    const payload=await verifySigned(auth.slice(7),env.DOWNLOAD_SIGNING_SECRET);
    const pdf=await createPdf(payload);
    return new Response(pdf,{
      headers:{
        ...cors(env),
        "Content-Type":"application/pdf",
        "Content-Disposition":'attachment; filename="CBAMTools-Professional-Report.pdf"',
        "Cache-Control":"no-store, private"
      }
    });
  }catch(error){
    return json({error:error instanceof Error?error.message:"Invalid download token."},401,env);
  }
}

export default{
  async fetch(request:Request,env:Env){
    if(request.method==="OPTIONS") return new Response(null,{status:204,headers:cors(env)});
    const url=new URL(request.url);
    try{
      if(request.method==="POST"&&url.pathname==="/v1/orders/create") return createOrder(request,env);
      if(request.method==="POST"&&url.pathname==="/v1/orders/capture") return captureOrder(request,env);
      if(request.method==="GET"&&url.pathname==="/v1/reports/download") return downloadReport(request,env);
      if(request.method==="GET"&&url.pathname==="/health") return json({ok:true,price:PRICE,currency:CURRENCY},200,env);
      return json({error:"Not found"},404,env);
    }catch(error){
      return json({error:error instanceof Error?error.message:"Unexpected payment service error."},500,env);
    }
  }
};
