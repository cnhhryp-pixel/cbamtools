import SectorProductLanding from "../../components/SectorProductLanding";
export const metadata={title:"CBAM Cement Products | CBAMTools",description:"Organise cement product classification, origin, emissions inputs and calculator steps in one CBAM assessment workflow."};
export default function Page(){return <SectorProductLanding sector="Cement" calculatorSector="Cement" calculatorPage="/cbam-cement-calculator" codeLabel="EU CN code" dataLabel="emissions data" intro="Use a consistent workflow to connect cement product classification, origin, emissions information and calculator inputs."/>}
