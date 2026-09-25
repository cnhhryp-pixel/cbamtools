import HomeHero from "../components/HomeHero";
import ToolCards from "../components/ToolCards";
import TrustSection from "../components/TrustSection";
import IndustriesSection from "../components/IndustriesSection";
import PopularResources from "../components/PopularResources";
import ProfessionalReportCTA from "../components/ProfessionalReportCTA";
import HomeFAQ from "../components/HomeFAQ";
import CBAMCTA from "../components/CBAMCTA";
import SiteFooter from "../components/SiteFooter";

export default function Home(){
  return <main>
    <HomeHero/>
    <ToolCards/>
    <IndustriesSection/>
    <PopularResources/>
    <ProfessionalReportCTA/>
    <TrustSection/>
    <HomeFAQ/>
    <CBAMCTA/>
    <SiteFooter/>
  </main>;
}
