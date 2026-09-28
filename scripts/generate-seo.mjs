import fs from 'node:fs';
import path from 'node:path';

const siteUrl = (process.env.SITE_URL || 'https://narmadaparikrama.co.in').replace(/\/$/, '');
const publicDir = path.resolve('public');
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${siteUrl}/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>\n  <url><loc>${siteUrl}/trips/</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>\n</urlset>\n`;
const robots = `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`;
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
fs.writeFileSync(path.join(publicDir, 'robots.txt'), robots);
console.log(`SEO files generated for ${siteUrl}`);
