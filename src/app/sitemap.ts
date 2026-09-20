import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://cbamtools.com';
  const pages = [
    '',
    '/cbam-guide',
    '/cbam-for-importers',
    '/cbam-calculator-guide',
    '/cbam-regulation',
    '/cbam-hs-code-list',
    '/cbam-steel-products',
    '/cbam-aluminium-products',
    '/cbam-cement-products',
    '/cbam-fertilizer-products',
    '/cbam-assessment-report',
    '/cbam-consulting',
    '/contact'
  ];

  return pages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date('2026-09-20'),
  }));
}
