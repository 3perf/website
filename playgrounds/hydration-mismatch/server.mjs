import { readFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { App, FONT_DELAY_MS, HYDRATION_DELAY_MS } from './App.js';

const directory = dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT || 4173);

const [styles, clientBuild] = await Promise.all([
  readFile(join(directory, 'styles.css'), 'utf8'),
  build({
    entryPoints: [join(directory, 'client.js')],
    bundle: true,
    minify: false,
    platform: 'browser',
    write: false,
  }),
]);
const clientBundle = clientBuild.outputFiles[0].contents;

function renderPage() {
  const app = renderToString(React.createElement(App));

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Hydration mismatch LCP playground</title>
    <style>${styles}</style>
    <script>
      window.__lcpCandidates = [];
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          window.__lcpCandidates.push({
            startTime: Math.round(entry.startTime),
            size: entry.size,
            element: entry.element?.className || null,
          });
        }
      }).observe({ type: 'largest-contentful-paint', buffered: true });

      window.setTimeout(async () => {
        const font = new FontFace(
          'Hydration Mismatch Repro Serif',
          'local("Times New Roman")',
        );
        await font.load();
        document.fonts.add(font);
        document.documentElement.classList.add('repro-font-loaded');
        performance.mark('repro-font-applied');
      }, ${FONT_DELAY_MS});
    </script>
  </head>
  <body>
    <div id="root">${app}</div>
    <script type="module" src="/client.js"></script>
  </body>
</html>`;
}

const server = createServer((request, response) => {
  response.setHeader('Cache-Control', 'no-store');

  if (request.url === '/client.js') {
    setTimeout(() => {
      response.writeHead(200, { 'Content-Type': 'text/javascript' });
      response.end(clientBundle);
    }, HYDRATION_DELAY_MS);
    return;
  }

  if (request.url === '/favicon.ico') {
    response.writeHead(204);
    response.end();
    return;
  }

  response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  response.end(renderPage());
});

server.listen(port, () => {
  console.log(`Hydration mismatch playground: http://localhost:${port}`);
});
