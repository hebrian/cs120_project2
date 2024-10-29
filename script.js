// Array of possible 5-letter words for the game
// TODO: Replace with an API call to a server that provides a list of words
const wordList = ["artsy", "books", "clamp", "darts"];

// Select a random word from the word list
let answer = wordList[Math.floor(Math.random() * wordList.length)];
console.log("Answer (debugging):", answer); // Logs the answer to the console for testing

// Set up variables to track the game state
let currentRow = 0; // Track the current guess attempt
let maxAttempts = 6; // Total attempts allowed

// Get references to the game elements
const gameBoard = document.getElementById("board");
let guessInput = document.getElementById("guess");
let submitButton = document.getElementById("submit-button");

// Generate 6 rows with 5 cells each
for (let row = 0; row < 6; row++) {
    const rowDiv = document.createElement("div");
    rowDiv.classList.add("row");

    // Create 5 cells for each row
    for (let col = 0; col < 5; col++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.id = `cell-${row}-${col}`; // Give each cell a unique id
        rowDiv.appendChild(cell);
    }

    // Append the row to the board
    gameBoard.appendChild(rowDiv);
}

// Set up event listeners
submitButton.addEventListener("click", interpretGuess);

// Function to interpret the user's guess
function interpretGuess() {
    // Get the user's guess from the input field
    const guess = guessInput.value.toLowerCase();

    // Check if the guess is the correct length
    if (guess.length !== answer.length) {
        alert("Please enter a 5-letter word.");
        return;
    }

    // Display the user's guess on the game board
    displayGuess(guess);

    // Check if the user's guess is correct
    checkGuess(guess);

    // Increment the current row
    currentRow++;

    // Clear the input field after each guess
    guessInput.value = "";

    // End game if the user has used all attempts
    if (currentRow === maxAttempts) {
        alert("You have used all your attempts. The correct word was " + answer + ".");
        endGame();
    }

}

function displayGuess(guess) {
    // print "todo: display guess"
    print("todo: display guess");
}

function checkGuess(guess) {
    // print "todo: check guess"
    print("todo: check guess");
}

