const http = require('http');


const sever = http.createServer((req,res)=>{
    if(req.url === '/users'  && req.method ==='GET'){
      res.writeHead(200 , {'Content-Type' : 'application/json'});
      res.end(JSON.stringify([{id:1 , name:'Noman'}  , {id:2 , name:"Hammad"}]))
    } else if(req.url === '/users' && req.method === 'POST'){
      //Create new user
      let body = '';
      req.on('data' , chunk => (body += chunk));
      req.on('end' , ()=>{
        const newUser = JSON.parse(body);
        res.writeHead(201 , {'Content-Type' : 'application/json'});
        res.end(JSON.stringify(newUser))
      })
    }else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
  }
});

sever.listen(3001 , ()=>{
  console.log("Server Running")
})