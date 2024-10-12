const readline = require('readline');

const rl = readline.createInterface({
  input : process.stdin,
  output : process.stdout

});

rl.question("Please Enter your Name: " , (name)=>{
  console.log("Your name is :"+name)
  rl.close();
})

rl.on("close", ()=>{
  console.log("interface close");
  process.exit(0)
})