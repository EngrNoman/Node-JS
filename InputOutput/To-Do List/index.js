// *******************Interactive To-Do List (Beginner-Intermediate)**************************

// Goal: Build a command-line to-do list where users can add, view, delete, and mark tasks as complete.

// Description: Use readline to allow the user to input commands such as add, list, delete, and complete. The to-do list will be stored in memory and updated based on the user’s input.
// Skills Used: Event-driven programming, arrays, basic command handling.
// Key Tech: Node.js, readline module.

const readline = require('readline');

 const rl = readline.createInterface({
  input : process.stdin,
  output : process.stdout

})

let todos = [];

function showMenu(){
  console.log(`
    === To-Do List Menu ===
    1. Add a new task
    2. View all tasks
    3. Mark a task as complete
    4. Delete a task
    5. Exit
  `);
  rl.question("Choose an option: ", handleUserInput);
}

function handleUserInput(choice){
  switch(choice){
    case '1':
      rl.question('Enter the Task description: ' , (task)=>{
        todos.push({
          description: task,
          complete : false
        });
        console.log(`Task "${task}" added!`)
        showMenu()
      });
      break;
    case '2':
      if(todos.length == 0){
        console.log('No tasks to show.');
      }else{
        console.log('\nYour To-Do List:');
        todos.forEach((task , index)=>{
          const status = task.complete ? '[✔]' : '[ ]';
          console.log(`${index + 1}. ${status} ${task.description}`);
        })
      }
      showMenu();
      break;
    
    
  }
}