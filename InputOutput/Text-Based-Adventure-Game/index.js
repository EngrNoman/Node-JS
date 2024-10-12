// *****************Text-Based Adventure Game (Intermediate)******************
// Goal: Create a text-based adventure game where the user explores a world, makes choices, and navigates through different scenarios.

// Description: Using readline, prompt the user for actions like “move north” or “pick up item.” The program will respond with different outcomes based on their decisions, progressing through a simple narrative.
// Skills Used: User input handling, state management, switch-case logic for different scenarios.
// Key Tech: Node.js, readline module, basic file I/O for storing game progress.
const readline = require('readline');

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Game state
let player = {
  currentRoom: 'entrance',
  inventory: []
};

// Room descriptions and possible actions
const rooms = {
  entrance: {
    description: 'You are at the entrance of a dark cave. There is a path leading north.',
    options: {
      go: {
        north: 'hallway'
      }
    }
  },
  hallway: {
    description: 'You are in a long hallway. There is a shiny sword on the floor. Paths lead north and south.',
    options: {
      go: {
        north: 'treasureRoom',
        south: 'entrance'
      },
      pickUp: 'sword'
    }
  },
  treasureRoom: {
    description: 'You have entered the treasure room. A chest full of gold is here, but there’s also a dragon! Do you want to fight the dragon?',
    options: {
      go: {
        south: 'hallway'
      },
      fight: 'dragon'
    }
  }
};

// Function to display current room description
function describeRoom() {
  const room = rooms[player.currentRoom];
  console.log(`\n${room.description}`);
  if (room.options.pickUp) {
    console.log(`You see a ${room.options.pickUp}.`);
  }
  promptUser();
}

// Function to handle player commands
function handleCommand(command) {
  const input = command.trim().split(' ');
  const action = input[0];  
  const target = input[1];  

  const room = rooms[player.currentRoom];

  switch (action) {
    case 'go':
      if (!target) {
        console.log('Please specify a direction (e.g., "go north").');
        promptUser();
      } else if (room.options.go && room.options.go[target]) {
        player.currentRoom = room.options.go[target];
        describeRoom();
      } else {
        console.log('You can’t go that way.');
        promptUser();
      }
      break;

    case 'pick':
      if (target === 'up' && room.options && room.options.pickUp) {
        player.inventory.push(room.options.pickUp);
        console.log(`You picked up the ${room.options.pickUp}.`);
        delete room.options.pickUp;  // Remove item after it's picked up
        describeRoom();
      } else {
        console.log('There is nothing to pick up.');
        promptUser();
      }
      break;

    case 'inventory':
      console.log(`Your inventory: ${player.inventory.length > 0 ? player.inventory.join(', ') : 'empty'}`);
      promptUser();
      break;

    case 'fight':
      if (target === 'dragon' && player.inventory.includes('sword')) {
        console.log('You slay the dragon with your sword and claim the treasure! You win!');
        rl.close();
      } else if (target === 'dragon') {
        console.log('You try to fight the dragon with your bare hands and are defeated. Game Over.');
        rl.close();
      } else {
        console.log('There is nothing to fight here.');
        promptUser();
      }
      break;

    case 'exit':
      console.log('Thanks for playing!');
      rl.close();
      break;

    default:
      console.log('Invalid command. Try "go", "pick up", "inventory", or "fight".');
      promptUser();
      break;
  }
}


// Function to prompt the user for input
function promptUser() {
  rl.question('\nWhat would you like to do? ', handleCommand);
}

// Start the game
console.log('Welcome to the Adventure Game!');
describeRoom();
