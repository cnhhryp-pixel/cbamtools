import type {Metadata} from "next";

export const metadata:Metadata={
  title:"CBAM HS / CN Code Checker | CBAMTools",
  description:"Screen a product code in the CBAMTools HS / CN code checker and continue into the calculator workflow.",
  alternates:{canonical:"/hs-code-checker"}
};

export default function Layout({children}:{children:React.ReactNode}){
  return children;
}
