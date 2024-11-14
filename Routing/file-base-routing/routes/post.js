// routes/posts.js

module.exports = (req, res) => {
  if (req.method === 'GET' && req.url === '/posts') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify([{ id: 1, title: 'First Post' }, { id: 2, title: 'Second Post' }]));
  } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Post route not found');
  }
};
