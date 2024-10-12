// 1. Basic Command-Line Quiz (Beginner)
// Goal: Create a simple quiz game where the user answers multiple-choice questions.

// Description: Use the readline module to prompt the user with a question and provide them with multiple choices. The    program will check if the user's input matches the correct answer and keep track of the score.
// Skills Used: Basic usage of readline, user input handling, conditional logic.
// Key Tech: Node.js, readline module.



const readline = require('readline');
const  rl = readline.createInterface({
  input : process.stdin,
  output : process.stdout
})

const questions= [
  {
    question: 'What is the capital of France?',
    options: ['1. Paris', '2. Madrid', '3. Rome', '4. Berlin'],
    answer: '1'
  },
  {
    question: 'Who wrote "To Kill a Mockingbird"?',
    options: ['1. Harper Lee', '2. J.K. Rowling', '3. George Orwell', '4. Ernest Hemingway'],
    answer: '1'
  },
  {
    question: 'What is the largest planet in our solar system?',
    options: ['1. Earth', '2. Jupiter', '3. Saturn', '4. Mars'],
    answer: '2'
  }

]

let score = 0 ;
let currentQuestion = 0;


function askQuestion(){
  if(currentQuestion < questions.length){
    const q = questions[currentQuestion];
    console.log(`\n ${q.question}`);
    q.options.forEach(Option => console.log(Option));

    rl.question("Your Answer 1-4: " , (answer)=>{
      if(answer === q.answer){
        console.log(" Correct! ");
        score++;
      }else{
        console.log(" Wrong! ");

      }
      currentQuestion++;
      askQuestion();
    })
  }else{
    console.log(`\nQuiz Over! Your final score is: ${score}/${questions.length}`);
    rl.close();
  }
}


console.log("Start the Quiz !");
askQuestion()