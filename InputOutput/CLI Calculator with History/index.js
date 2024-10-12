// *CLI Calculator with History (Intermediate)
// Goal: Build a command-line calculator that can perform basic arithmetic operations and store the history of previous calculations.

// Description: The user can input expressions like 5 + 3 or 10 / 2. The program evaluates the expression and stores the result in a history that can be accessed via a "history" command.
// Skills Used: Regular expressions for parsing user input, basic arithmetic, history management.
// Key Tech: Node.js, readline module, file system (optional for saving history).

const readline = require('readline');
const fs = require('fs');
const path = require('path');


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// File to save history
const historyFile = path.join(__dirname , 'history.txt');

let history = [];

// load history from file is it exits
if(fs.existsSync(historyFile)){
  const savedHistory = fs.readFileSync(historyFile , 'utf-8').split('\n').filter(Boolean);
  history = savedHistory.map(entry => entry.trim());
}

// function to evaluate arithmetic expressions
function evaluateExpression(expression){
  try{
    const result = eval(expression);
    return result;
  }catch(error){
    return 'Invalid expression. Please try again.'
  }
}

// Function to handle user input 
function handleCommand(input){
  const command = input.trim();

  if(command.toLowerCase() === 'history'){
    if(history.length > 0){
      console.log('Calculation History');
      history.forEach((entry , index)=> console.log(`${index + 1}: ${entry}`));
    }else{
      console.log('No calculations yet.');
    }
    promptUser();
  }else if(command.toLowerCase === 'clear'){
    history = [];
    fs.writeFileSync(historyFile, '');
    console.log('History Cleared');
    promptUser();
  }else{
    const result = evaluateExpression(command);
    if(result !== 'Invalid expression. Please try again.'){
      const entry = `${command} = ${result}`;
      history.push(entry)
      fs.appendFileSync(historyFile, `${entry}\n`);
      console.log(entry);
    }else{
      console.log(result)
    }
    promptUser();
  }
}

function promptUser(){
  rl.question('Enter an expression (or type "history" to see past results, "clear" to clear history): ', handleCommand)
}

console.log('Welcome to the CLI Calculator!');
promptUser();