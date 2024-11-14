const http = require('http');

const server = http.createServer((req, res) => {
    const userIdMatch = req.url.match(/^\/users\/([0-9]+)$/);

    if (userIdMatch && req.method === 'GET') {
        const userId = userIdMatch[1]; // Extracted userId from URL
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(`User ID: ${userId}`);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

server.listen(3002, () => {
    console.log('Server running at http://localhost:3002/');
});
