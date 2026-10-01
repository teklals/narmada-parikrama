import fs from 'fs';
import path from 'path';

const ROUTES = [
  '',
  'narmada-parikrama/',
  'narmada-parikrama/route/',
  'narmada-parikrama/places/',
  'narmada-parikrama/by-car/',
  'narmada-parikrama/travel-guide/',
  'narmada-parikrama/faq/',
  'trips/'
];

const LANGS = ['en', 'hi', 'mr', 'gu'];
const BASE_URL = 'https://narmadaparikrama.logicbase.co.in';

let totalChecked = 0;
const errors = [];
const summary = [];

for (const lang of LANGS) {
  for (const route of ROUTES) {
    totalChecked++;
    const prefix = lang === 'en' ? '' : lang + '/';
    const relPath = prefix + route;
    const filePath = path.resolve('dist', relPath, 'index.html');
    
    if (!fs.existsSync(filePath)) {
      errors.push(`Missing file: ${filePath}`);
      continue;
    }
    
    const html = fs.readFileSync(filePath, 'utf8');
    
    // Check lang attribute
    const langValid = lang === 'en' 
      ? (html.includes('lang="en"') || html.includes('lang="en-IN"'))
      : html.includes(`lang="${lang}"`);
    if (!langValid) {
      errors.push(`${filePath} incorrect lang attribute`);
    }
    
    // Expected canonical
    const expectedCanonical = (BASE_URL + '/' + relPath).replace(/([^:])\/+/g, '$1/');
    const canonicalMatch = html.match(/<link rel="canonical" href="([^"]+)"/);
    if (!canonicalMatch || canonicalMatch[1] !== expectedCanonical) {
      errors.push(`${filePath} canonical mismatch. Expected: ${expectedCanonical}, found: ${canonicalMatch ? canonicalMatch[1] : 'none'}`);
    }
    
    // Check hreflang tags: x-default, en-IN, hi-IN, mr-IN, gu-IN
    const hreflangs = ['x-default', 'en-IN', 'hi-IN', 'mr-IN', 'gu-IN'];
    for (const h of hreflangs) {
      if (!html.includes(`hreflang="${h}"`)) {
        errors.push(`${filePath} missing hreflang: ${h}`);
      }
    }
    
    // Check title, meta description, h1
    const titleMatch = html.match(/<title>([^<]+)<\/title>/);
    const descMatch = html.match(/<meta name="description" content="([^"]+)"/);
    const h1Match = html.match(/<h1[^>]*>([^<]+)<\/h1>/);
    
    if (!titleMatch) {
      errors.push(`${filePath} missing <title>`);
    }
    if (!descMatch) {
      errors.push(`${filePath} missing meta description`);
    }
    if (!h1Match) {
      errors.push(`${filePath} missing <h1>`);
    }
    if (!html.includes('application/ld+json')) {
      errors.push(`${filePath} missing JSON-LD`);
    }
    
    // Check old domain
    if (html.includes('narmadaparikrama.co.in')) {
      errors.push(`${filePath} contains old domain narmadaparikrama.co.in`);
    }

    summary.push({
      lang,
      url: expectedCanonical,
      title: titleMatch ? titleMatch[1] : 'MISSING',
      h1: h1Match ? h1Match[1] : 'MISSING',
      descLen: descMatch ? descMatch[1].length : 0
    });
  }
}

console.log(`Total files checked: ${totalChecked}`);
if (errors.length === 0) {
  console.log('ALL 32 FILES PASSED VALIDATION PERFECTLY!');
  console.log('\nSample verified items:');
  for (let i = 0; i < summary.length; i += 4) {
    console.log(`[${summary[i].lang.toUpperCase()}] ${summary[i].url} -> H1: "${summary[i].h1}"`);
  }
} else {
  console.error(`Errors found (${errors.length}):\n`, errors.join('\n'));
  process.exit(1);
}
