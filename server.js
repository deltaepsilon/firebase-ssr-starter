const { createServer } = require('http');
const { parse } = require('url');
const { createReadStream } = require('fs');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname } = parsedUrl;

    if (pathname == '/sw.js') {
      res.setHeader('content-type', 'text/javascript');
      createReadStream('./root/sw.js').pipe(res);
    } else if (pathname == '/sw.dev.js') {
      res.setHeader('content-type', 'text/javascript');
      createReadStream('./root/sw.dev.js').pipe(res);
    } else if (pathname == '/environment.sw.js') {
      res.setHeader('content-type', 'text/javascript');
      createReadStream('./environments/environment.sw.js').pipe(res);
    } else if (pathname == '/robots.txt') {
      createReadStream('./root/robots.txt').pipe(res);
    } else if (pathname == '/sitemap.txt') {
      createReadStream('./root/sitemap.txt').pipe(res);
    } else {
      handle(req, res, parsedUrl);
    }
  }).listen(3000, err => {
    if (err) throw err;
    console.info('> Ready on http://localhost:3000');
  });
});
