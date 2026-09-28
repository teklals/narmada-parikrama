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
        } catch (err: any) {
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

export default defineConfig({
  plugins: [react(), contactApiPlugin()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        trips: resolve(import.meta.dirname, 'trips/index.html'),
      },
    },
  },
});
