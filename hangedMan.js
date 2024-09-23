var figlet = require("figlet");
const readline = require('readline-sync');

// print welcome message
figlet.text(
  "HANG MAN",
  {
    font: "Ghost",
    horizontalLayout: "default",
    verticalLayout: "default",
    whitespaceBreak: true,
  },
  function (err, data) {
    if (err) {
      console.log("Something went wrong...");
      console.dir(err);
      return;
    }
    console.log(data);
  }
);

// write a  phrase here and it will be extracted to words
const words = `The brown Fox
  jumped over the
  lorem ipsum lazy  Dog`.split(/\s+/);

// choose a random word from the phrase
let selectedWord = words[Math.floor(Math.random() * words.length)].toLowerCase();

// The letters the user has gussed
let guessedLetters = [];

// remaining attempts for the user
let remainingAttempts = 10;

/**
 * Display the radom word.
 *
 * if user had guessed tha letter then display it,
 * otherwise display '*' instead
 */
function displayWord() {
    return selectedWord.split('').map(letter => guessedLetters.includes(letter) ? letter : '*').join('');
}

/**
 * Read input from user and process it.
 *
 * @param {string} guess user input
 */
function makeGuess() {
    // display remaining attempts and the guessed word
    console.log(`You have ${remainingAttempts} guesses`);
    console.log(`The word is: \n${displayWord()}`);

    // read input from user
    let guess = readline.question("What is your guess?\n").toLowerCase();

    if (isInputValid(guess)) {
      if (selectedWord.includes(guess)) {
          // if guess is correct then add the letter to the guessed letters
          guessedLetters.push(guess);
      }
      else {
          // wrong guess. decrement remaining guesses
          remainingAttempts--;
      }
    }
}

/**
 * Validate user input.
 *
 * @param {string} guess user input
 * @return {boolean}
 */
const isInputValid = (guess) => {
  // input should be a single character
  if (guess.length > 1) {
      console.log("Please enter only one character");
      return false;
  }

  // only english alphabet allowed
  if (!/[a-z]/.test(guess)) {
    console.log("Invalid input");
    return false;
  }

  return true;
}

/**
 * Keep running the game untill finish
 */
function gameLoop() {
    // if user still has attempts then continue
    while (remainingAttempts > 0) {
        makeGuess();
        if (selectedWord.split('').every(letter => guessedLetters.includes(letter))) {
            // the guessedLetters array contains all the letters in the selected word
            // user has gussed the word and won. exit the game
            console.log("Wow You are good!!");
            return;
        }
    }

    // user has no remaining attempts and lost. exit the game
    console.log(`You are not lucky today. The word is ${selectedWord}.`);
}

// start the  game
setTimeout(function () {
  gameLoop();
}, 100);
