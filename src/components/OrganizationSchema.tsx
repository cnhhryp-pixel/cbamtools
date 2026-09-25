export default function OrganizationSchema(){
  const schema={
    "@context":"https://schema.org",
    "@type":"Organization",
    name:"CBAMTools",
    url:"https://cbamtools.com/",
    email:"cnhhryp@gmail.com",
    description:"Practical CBAM calculation, product-screening and assessment workflow tools."
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/>;
}
