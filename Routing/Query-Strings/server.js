const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    if (parsedUrl.pathname === '/search' && req.method === 'GET') {
        const searchQuery = parsedUrl.query.q;
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(`You searched for: ${searchQuery}`);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});
