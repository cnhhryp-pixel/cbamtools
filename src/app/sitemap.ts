import type {MetadataRoute} from "next";
export const dynamic="force-static";

export default function sitemap():MetadataRoute.Sitemap{
  const baseUrl="https://cbamtools.com";
  const pages=[
    "",
    "/cbam-calculator",
    "/cbam-steel-calculator",
    "/cbam-aluminium-calculator",
    "/cbam-cement-calculator",
    "/cbam-fertilizer-calculator",
    "/hs-code-checker",
    "/cbam-hs-code-list",
    "/cbam-default-values",
    "/cbam-certificate-price",
    "/cbam-deadlines",
    "/pricing",
    "/enterprise",
    "/blog",
    "/cbam-guide",
    "/cbam-for-importers",
    "/cbam-calculator-guide",
    "/cbam-regulation",
    "/cbam-transition-period",
    "/cbam-emission-calculation",
    "/cbam-supplier-emission-data",
    "/cbam-compliance-checklist",
    "/cbam-consulting",
    "/cbam-report-template",
    "/cbam-assessment-report",
    "/cbam-faq",
    "/cbam-steel-products",
    "/cbam-aluminium-products",
    "/cbam-cement-products",
    "/cbam-fertilizer-products",
    "/cbam-hydrogen-products",
    "/cbam-electricity",
    "/cbam-import-from-china",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/refund-policy",
    "/disclaimer"
  ];
  return pages.map(page=>({url:`${baseUrl}${page}`,lastModified:new Date("2026-09-26")}));
}
