import {CBAMReportData} from '@/types/report';

export function generateCBAMReportPDF(data:CBAMReportData){
 return {
  filename:'CBAM-Professional-Report.pdf',
  data,
  status:'ready-for-pdf-generator'
 };
}
