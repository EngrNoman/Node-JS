const fs = require('fs');
const path = require('path');


const filePath = process.argv[2];

if(!filePath){
  console.log('Please provide a file path.');
  process.exit(1);
}

const resolvePath = path.resolve(filePath);

fs.stat(resolvePath, (err,stats)=>{
  if(err){
    console.log("Error reading File " , err);
    return
  }

  console.log(`File Size: ${stats.size} bytes`);
  console.log(`Created At: ${stats.birthtime}`);
  console.log(`Last Modified: ${stats.mtime}`);
})