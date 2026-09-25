import type {Metadata} from "next";

export const metadata:Metadata={
  title:"CBAM Assessment Report Preview | CBAMTools",
  description:"Private assessment-report preview generated from calculator inputs.",
  robots:{index:false,follow:false}
};

export default function Layout({children}:{children:React.ReactNode}){
  return children;
}
