const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Create an interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Directory to store notes
const notesDir = path.join(__dirname, 'notes');

// Ensure the notes directory exists
if (!fs.existsSync(notesDir)) {
  fs.mkdirSync(notesDir);
}

// Function to add a new note
function addNote(title, content) {
  const filePath = path.join(notesDir, `${title}.txt`);
  fs.writeFile(filePath, content, (err) => {
    if (err) {
      console.error(`Error creating note: ${err.message}`);
    } else {
      console.log(`Note "${title}" added successfully.`);
    }
    promptUser(); // Continue prompting after the command
  });
}

// Function to view a note
function viewNote(title) {
  const filePath = path.join(notesDir, `${title}.txt`);
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      console.error(`Error reading note: ${err.message}`);
    } else {
      console.log(`\nNote Title: ${title}`);
      console.log('Content:');
      console.log(data);
    }
    promptUser(); // Continue prompting after the command
  });
}

// Function to delete a note
function deleteNote(title) {
  const filePath = path.join(notesDir, `${title}.txt`);
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(`Error deleting note: ${err.message}`);
    } else {
      console.log(`Note "${title}" deleted successfully.`);
    }
    promptUser(); // Continue prompting after the command
  });
}

// Function to list all notes
function listNotes() {
  fs.readdir(notesDir, (err, files) => {
    if (err) {
      console.error(`Error listing notes: ${err.message}`);
    } else {
      if (files.length === 0) {
        console.log('No notes found.');
      } else {
        console.log('Your notes:');
        files.forEach((file) => {
          console.log(`- ${path.basename(file, '.txt')}`);
        });
      }
    }
    promptUser(); // Continue prompting after the command
  });
}

// Function to handle user commands
function handleCommand(input) {
  const [command, title, ...rest] = input.trim().split(' ');
  const content = rest.join(' ');

  switch (command) {
    case 'add':
      if (title && content) {
        addNote(title, content);
      } else {
        console.log('Usage: add "note title" "note content"');
        promptUser(); // Continue prompting after the command
      }
      break;

    case 'view':
      if (title) {
        viewNote(title);
      } else {
        console.log('Usage: view "note title"');
        promptUser(); // Continue prompting after the command
      }
      break;

    case 'delete':
      if (title) {
        deleteNote(title);
      } else {
        console.log('Usage: delete "note title"');
        promptUser(); // Continue prompting after the command
      }
      break;

    case 'list':
      listNotes();
      break;

    default:
      console.log('Unknown command. Available commands: add, view, delete, list');
      promptUser(); // Continue prompting after the command
  }
}

// Function to prompt the user for input
function promptUser() {
  rl.question('Enter command: ', handleCommand);
}

// Start the app by prompting the user for input
promptUser();
