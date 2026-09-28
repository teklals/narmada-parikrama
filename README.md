# Narmada Parikrama

SEO-ready React + Vite website for **Narmada Parikrama**, including the main pilgrimage guide and a dedicated `/trips/` page for 2026 trip batches.

## Included

- Narmada Parikrama home page
- Dedicated crawlable `/trips/` page
- 18-day itinerary
- 2026 trip batches
- Responsive navigation and mobile layout
- Contact links:
  - +91-9958503108
  - +91-9315852737
  - teklal.saw@gmail.com
- Page-specific SEO titles and meta descriptions
- Canonical URLs and robots directives
- Open Graph and Twitter metadata
- JSON-LD structured data for Organization, WebSite, WebPage, ItemList and Events
- `robots.txt` and `sitemap.xml`
- Vite multi-page build so `/` and `/trips/` have their own HTML metadata

## Run locally

```bash
npm install
npm run dev
```

Open:

- `http://localhost:5173/`
- `http://localhost:5173/trips/`

## Production build

```bash
npm run build
npm run preview
```

## IMPORTANT: domain

The project currently uses `https://narmadaparikrama.co.in` as the default SEO site URL in `robots.txt`, `sitemap.xml`, and JSON-LD.

For automated SEO-file generation:

```bash
SITE_URL=https://your-real-domain.com npm run seo
```

On Windows PowerShell:

```powershell
$env:SITE_URL="https://your-real-domain.com"
npm run seo
```

## Google Search setup

1. Deploy the website on the real HTTPS domain.
2. Open Google Search Console and add the domain/property.
3. Submit `/sitemap.xml`.
4. Use URL Inspection for `/` and `/trips/` and request indexing.
5. Keep the sitemap updated whenever important pages are added.
6. Add real business/location information only when it is accurate and publicly verifiable.

## SEO expectations

No website can honestly guarantee the #1 Google position. This project is structured to give Google clean crawlable pages, descriptive titles, useful content, canonical URLs, a sitemap and structured data. Ranking will also depend on the site's real content quality, authority, links, competition, technical performance and search intent.
