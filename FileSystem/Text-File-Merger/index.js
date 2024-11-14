const fs = require('fs');
const path = require('path');

if(process.argv.length < 4){
  console.error('Usage: node mergeFiles.js <file1> <file2> ...');
  process.exit(1);
};

const filePath = process.argv.slice(2);

let mergedContent = '';

filePath.forEach((filePath)=>{
  const absolutePath = path.resolve(filePath);

  if(! fs.existsSync(absolutePath)){
    console.error(`File not found: ${absolutePath}`);
    process.exit(1);
  }

  const fileContent = fs.readFileSync(absolutePath , 'utf-8');
  mergedContent += fileContent +'\n';

});

const outputFilePath = path.join(__dirname , './files/merged.txt');
fs.writeFileSync(outputFilePath , mergedContent , 'utf-8');

console.log(`Files merged successfully into ${outputFilePath}`);