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
        const knownRoutes = [
          '/narmada-parikrama',
          '/narmada-parikrama/route',
          '/narmada-parikrama/places',
          '/narmada-parikrama/by-car',
          '/narmada-parikrama/travel-guide',
          '/narmada-parikrama/faq',
          '/trips',
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

export default defineConfig({
  plugins: [react(), contactApiPlugin(), routeTrailingSlashPlugin(), seoBetaPlugin()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        narmadaParikrama: resolve(import.meta.dirname, 'narmada-parikrama/index.html'),
        route: resolve(import.meta.dirname, 'narmada-parikrama/route/index.html'),
        places: resolve(import.meta.dirname, 'narmada-parikrama/places/index.html'),
        byCar: resolve(import.meta.dirname, 'narmada-parikrama/by-car/index.html'),
        travelGuide: resolve(import.meta.dirname, 'narmada-parikrama/travel-guide/index.html'),
        faq: resolve(import.meta.dirname, 'narmada-parikrama/faq/index.html'),
        trips: resolve(import.meta.dirname, 'trips/index.html'),
      },
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
