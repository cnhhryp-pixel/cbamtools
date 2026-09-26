import type {Metadata} from "next";
export const metadata:Metadata={
  title:"CBAM CN / HS Code List | CBAMTools",
  description:"Browse the CBAMTools product-code screening dataset and continue into the code checker or calculator workflow.",
  alternates:{canonical:"/cbam-hs-code-list"}
};
export default function Layout({children}:{children:React.ReactNode}){return children;}
