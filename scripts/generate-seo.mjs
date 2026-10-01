import fs from 'node:fs';
import path from 'node:path';

const PRODUCTION_SITE_URL = 'https://narmadaparikrama.logicbase.co.in';

// Detect whether build is explicitly configured for beta/development
const isBetaBuild =
  process.env.SITE_ENV === 'beta' ||
  process.env.IS_BETA === 'true' ||
  process.env.VITE_IS_BETA === 'true' ||
  (Boolean(process.env.VERCEL_URL) && process.env.VERCEL_URL.includes('narmada-parikrama-beta'));

// Production sitemap MUST always use the canonical production domain
const siteUrl = PRODUCTION_SITE_URL;
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

const robotsProduction = `User-agent: *
Allow: /

Sitemap: ${PRODUCTION_SITE_URL}/sitemap.xml
`;

const robotsBeta = `User-agent: *
Disallow: /
`;

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Write canonical production sitemap
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);

// Write dedicated beta robots.txt (used by Vercel rewrite on beta domain)
fs.writeFileSync(path.join(publicDir, 'robots-beta.txt'), robotsBeta);

// If beta build was explicitly requested, robots.txt disallows all; otherwise production robots allows crawling
fs.writeFileSync(path.join(publicDir, 'robots.txt'), isBetaBuild ? robotsBeta : robotsProduction);

console.log(`SEO files generated. Canonical URL: ${PRODUCTION_SITE_URL}. Beta build: ${isBetaBuild}`);
