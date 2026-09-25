import type {Metadata} from "next";

export const metadata:Metadata={
  title:"CBAM Calculator | CBAMTools",
  description:"Estimate CBAM exposure from product, origin, quantity, emissions and price assumptions, then carry the result into a structured assessment report.",
  alternates:{canonical:"/cbam-calculator"}
};

export default function Layout({children}:{children:React.ReactNode}){
  return children;
}
