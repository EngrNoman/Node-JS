const http = require('http');
const usersRoute = require('./routes/user');
const postsRoute = require('./routes/post');


const server = http.createServer((req,res)=>{

  if(req.url.startsWith('/users')){
    usersRoute(req,res);
  } else if (req.url.startsWith('/posts')){
    postsRoute(req,res)
  } else{
    res.writeHead(404, {'Content-Type' : 'text/plain'});
    res.end('Not Found')
  }

});

server.listen(3000, ()=>{
  console.log('Server Running at ')
})
