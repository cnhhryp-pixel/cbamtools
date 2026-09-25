import type {Metadata} from "next";

export const metadata:Metadata={
  title:"CBAM Default Values Lookup | CBAMTools",
  description:"Use the CBAMTools default-values workflow to organise sector, product code, origin and production-route lookup inputs.",
  alternates:{canonical:"/cbam-default-values"}
};

export default function Layout({children}:{children:React.ReactNode}){
  return children;
}
