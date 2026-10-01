import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import contactHandler from './api/contact.ts';

function contactApiPlugin(): Plugin {
  const middleware = (req: any, res: any, next: any) => {
    const url = req.url ? req.url.split('?')[0] : '';
    if (url === '/api/contact') {
      let bodyData = '';
      req.on('data', (chunk: any) => {
        bodyData += chunk;
      });
      req.on('end', async () => {
        try {
          req.body = bodyData ? JSON.parse(bodyData) : {};
        } catch {
          req.body = bodyData;
        }

        const customRes = {
          setHeader(name: string, value: string) {
            res.setHeader(name, value);
            return this;
          },
          status(statusCode: number) {
            res.statusCode = statusCode;
            return {
              json(payload: any) {
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(payload));
              },
            };
          },
        };

        try {
          await contactHandler(req, customRes);
        } catch {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Internal Server Error' }));
        }
      });
      return;
    }
    next();
  };

  return {
    name: 'vite-plugin-contact-api',
    configureServer(server) {
      server.middlewares.use(middleware);
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware);
    },
  };
}

function routeTrailingSlashPlugin(): Plugin {
  return {
    name: 'vite-plugin-trailing-slash-rewrite',
    configureServer(server) {
      server.middlewares.use((req: any, res: any, next: any) => {
        const url = req.url ? req.url.split('?')[0] : '';
        const baseRoutes = [
          '/narmada-parikrama',
          '/narmada-parikrama/route',
          '/narmada-parikrama/places',
          '/narmada-parikrama/by-car',
          '/narmada-parikrama/travel-guide',
          '/narmada-parikrama/faq',
          '/trips',
        ];
        const prefixes = ['', '/hi', '/mr', '/gu'];
        const knownRoutes = [
          '/hi',
          '/mr',
          '/gu',
          ...prefixes.flatMap((pre) => baseRoutes.map((b) => `${pre}${b}`)),
        ];
        if (knownRoutes.includes(url)) {
          const query = req.url.includes('?') ? req.url.slice(req.url.indexOf('?')) : '';
          res.statusCode = 301;
          res.setHeader('Location', url + '/' + query);
          res.end();
          return;
        }
        next();
      });
    },
  };
}

function seoBetaPlugin(): Plugin {
  const isBetaBuild =
    process.env.SITE_ENV === 'beta' ||
    process.env.IS_BETA === 'true' ||
    process.env.VITE_IS_BETA === 'true' ||
    (Boolean(process.env.VERCEL_URL) && process.env.VERCEL_URL.includes('narmada-parikrama-beta'));

  return {
    name: 'vite-plugin-seo-beta',
    transformIndexHtml(html) {
      if (isBetaBuild) {
        return html
          .replace(
            /<meta\s+name="robots"\s+content="[^"]*"\s*\/?>/gi,
            '<meta name="robots" content="noindex, nofollow" />'
          )
          .replace(
            /<meta\s+name="googlebot"\s+content="[^"]*"\s*\/?>/gi,
            '<meta name="googlebot" content="noindex, nofollow" />'
          );
      }
      return html;
    },
  };
}

const basePages = [
  { name: 'main', path: 'index.html' },
  { name: 'narmadaParikrama', path: 'narmada-parikrama/index.html' },
  { name: 'route', path: 'narmada-parikrama/route/index.html' },
  { name: 'places', path: 'narmada-parikrama/places/index.html' },
  { name: 'byCar', path: 'narmada-parikrama/by-car/index.html' },
  { name: 'travelGuide', path: 'narmada-parikrama/travel-guide/index.html' },
  { name: 'faq', path: 'narmada-parikrama/faq/index.html' },
  { name: 'trips', path: 'trips/index.html' },
];

const rollupInputs: Record<string, string> = {};
for (const p of basePages) {
  rollupInputs[p.name] = resolve(import.meta.dirname, p.path);
  rollupInputs[`hi_${p.name}`] = resolve(import.meta.dirname, 'hi', p.path);
  rollupInputs[`mr_${p.name}`] = resolve(import.meta.dirname, 'mr', p.path);
  rollupInputs[`gu_${p.name}`] = resolve(import.meta.dirname, 'gu', p.path);
}

export default defineConfig({
  plugins: [react(), contactApiPlugin(), routeTrailingSlashPlugin(), seoBetaPlugin()],
  build: {
    rollupOptions: {
      input: rollupInputs,
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'vendor';
          }
          if (id.includes('src/translations/en.ts') || id.includes('src/translations/en')) {
            return 'translations-en';
          }
          if (id.includes('src/translations/hi.ts') || id.includes('src/translations/hi')) {
            return 'translations-hi';
          }
          if (id.includes('src/translations/mr.ts') || id.includes('src/translations/mr')) {
            return 'translations-mr';
          }
          if (id.includes('src/translations/gu.ts') || id.includes('src/translations/gu')) {
            return 'translations-gu';
          }
        },
      },
    },
  },
});
