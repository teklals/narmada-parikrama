import fs from 'node:fs';
import path from 'node:path';

const siteUrl = (process.env.SITE_URL || 'https://narmadaparikrama.logicbase.co.in').replace(/\/$/, '');
const publicDir = path.resolve('public');

const pages = [
  { url: '/', priority: '1.0', changefreq: 'weekly' },
  { url: '/narmada-parikrama/', priority: '0.9', changefreq: 'weekly' },
  { url: '/narmada-parikrama/route/', priority: '0.9', changefreq: 'weekly' },
  { url: '/narmada-parikrama/places/', priority: '0.9', changefreq: 'weekly' },
  { url: '/narmada-parikrama/by-car/', priority: '0.8', changefreq: 'weekly' },
  { url: '/narmada-parikrama/travel-guide/', priority: '0.9', changefreq: 'weekly' },
  { url: '/narmada-parikrama/faq/', priority: '0.8', changefreq: 'weekly' },
  { url: '/trips/', priority: '0.9', changefreq: 'weekly' },
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (p) => `  <url>
    <loc>${siteUrl}${p.url}</loc>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
fs.writeFileSync(path.join(publicDir, 'robots.txt'), robots);
console.log(`SEO files generated for ${siteUrl}`);
