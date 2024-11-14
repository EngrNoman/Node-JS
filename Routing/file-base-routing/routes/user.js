

module.exports = (req,res)=>{
  if(req.method === 'GET' && req.url === '/users'){
    res.writeHead(200 , {'Content-Type' : 'application/json'});
    res.end(JSON.stringify([{id:1 , name:'Alice'} , {id:2 , name:'Noman'}]));

  }else if(req.method === 'GET' && /^\/users\/\d+$/.test(req.url)){
    const userId = req.url.split('/')[2];
    res.writeHead(200,{'Content-Type' : 'text/plain'})
    res.end(`User Id ${userId}`)

  }  else{
    res.writeHead(404, {'Content-Type' : 'text/plain'});
    res.end('User not Found')
  }
}