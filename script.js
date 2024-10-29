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
// Do this in javascript rather than hardcoding in HTML
for (let row = 0; row < 6; row++) {
    const rowDiv = document.createElement("div"); // create a new div for each row
    rowDiv.classList.add("row"); // Add the "row" class to the div

    // Create 5 cells for each row
    // Do this in a loop rather than hardcoding in HTML
    for (let col = 0; col < 5; col++) {
        const cell = document.createElement("div");
        cell.classList.add("cell"); // Add the "cell" class to the div
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
    if (guess.length !== 5) {
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
    // Get the current row and update the cells with the user's guess
    // add 1 to match the HTML/CSS :nth-child indexing, which starts from 1 and not 0
    const row = document.querySelector(`.row:nth-child(${currentRow + 1})`); 
    const cells = row.querySelectorAll(".cell"); // Select all the cells in the row
    for (let i = 0; i < guess.length; i++) {
        cells[i].textContent = guess[i];
    }
}

function checkGuess(guess) {
    // print "todo: check guess"
    console.log("todo: check guess");
}

function endGame() {
    // Disable the submit button
    submitButton.disabled = true;
}
