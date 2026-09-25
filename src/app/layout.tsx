import type {Metadata} from "next";
import "./globals.css";

export const metadata:Metadata={
  metadataBase:new URL("https://cbamtools.com"),
  title:"CBAMTools | CBAM Calculator, HS Code Checker & Reports",
  description:"Practical CBAM tools for product screening, HS/CN code checks, calculation workflows and structured assessment reports.",
  applicationName:"CBAMTools",
  icons:{icon:"/icon.svg",shortcut:"/icon.svg"},
  robots:{index:true,follow:true},
  openGraph:{
    type:"website",
    url:"https://cbamtools.com/",
    siteName:"CBAMTools",
    title:"CBAMTools | CBAM Calculator, HS Code Checker & Reports",
    description:"Practical CBAM tools for product screening, calculation workflows and structured assessment reports."
  },
  twitter:{
    card:"summary",
    title:"CBAMTools",
    description:"CBAM calculator, HS/CN code checker and assessment workflow tools."
  }
};

export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){
  return <html lang="en"><body>{children}</body></html>;
}
