/*----- Set up the game ----- */
const gameSettings = {
    maxAttempts: 6,
    theme: "classic",
};

// Set up variables to track the game state
let answer;
let currentRow = 0; 
let maxAttempts = gameSettings.maxAttempts; 
let theme = gameSettings.theme;

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

// Call getWordList to fetch the list of words from the API
getWordList(theme).then(wordList => {
    // Select a random word from the word list
    answer = wordList[Math.floor(Math.random() * wordList.length)];
    console.log("Answer (debugging):", answer); // Log the answer to the console
});

/*----- Set up game logic -----*/
async function getWordList(theme = "classic") {
    // Set the base API URL
    let apiUrl = "https://api.datamuse.com/words?sp=?????";

    // Modify the API URL if a specific theme is selected (not "classic")
    if (theme !== "classic") {
        apiUrl += `&ml=${theme}`;
    }

    try {
        // Fetch up to 30 words based on the specified theme or classic mode
        const response = await fetch(apiUrl + "&max=30");
        const words = await response.json();

        // Filter out multi-word phrases and ensure only single, five-letter words
        const wordList = words.map(wordObj => wordObj.word)
        .filter(word => word.length === 5 && !word.includes(" ")); // Ensures no spaces and exactly 5 letters

        console.log('API URL:', apiUrl); // Log the API URL to the console for testing
        console.log(wordList);  // Log the list of words to the console for testing
        return wordList;
    } catch (error) {
        console.error("Error fetching words:", error);
    }
}

// Check if user input is a valid 5-letter word
async function isRealWord(input) {
    // Check if the input is a 5-letter word
    if (input.length !== 5) {
        console.log("Input is not a 5-letter word");
        return false;
    }

    // Fetch from Datamuse to check if it’s a valid word
    const response = await fetch(`https://api.datamuse.com/words?sp=${input}&max=1`);
    const words = await response.json();

    // If the word is valid, return true; otherwise, return false
    if (words.length > 0 && words[0].word === input) {
        console.log("Input is a valid word");
        return true;
    } else {
        console.log("Input is not a real word");
        return false;
    }
}

// Function to interpret the user's guess
async function interpretGuess() {
    // Get the user's guess from the input field and convert it to lowercase
    const guess = guessInput.value.toLowerCase();

    // Check if the guess is the correct length
    if (guess.length !== 5) {
        alert("Please enter a 5-letter word");
        return;
    }

    // Check if the input is a real word
    const isValidWord = await isRealWord(guess);
    if (!isValidWord) {
        alert("Please enter a valid English word");
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
        setTimeout(() => {
            alert("You have used all your attempts. The correct word was " + answer + ".");
            resetGame();
        }, 500); // Delay to ensure board updates before alert
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
    // Check if the user's guess is correct
    const row = document.querySelectorAll(`.row:nth-child(${currentRow + 1}) .cell`);
    const answerArray = answer.split(""); // Convert the answer to an array of letters
    const guessArray = guess.split(""); // Convert the guess to an array of letters

    // Mark correct letters and positions with green
    guessArray.forEach((letter, index) => {
        if (letter === answerArray[index]) {
            row[index].classList.add("correct"); // Use green for correct letter in correct position
            answerArray[index] = null; // Set the letter to null to avoid duplicate marking
            guessArray[index] = null; 
        }
    });

    // Mark misplaced letters with yellow and incorrect letters with gray
    guessArray.forEach((letter, index) => {
        if (letter && answerArray.includes(letter)) {
            row[index].classList.add("misplaced"); // Use yellow for misplaced letter
            answerArray[answerArray.indexOf(letter)] = null; // Set the letter to null to avoid duplicate marking
        } else if (letter) {
            row[index].classList.add("incorrect"); // Use gray for incorrect letter
        }
    });

    // Check if the guess matches the answer
    if (guess === answer) {
        // Display the entire guess with styling, then show the alert
        setTimeout(() => {
            // Use currentRow (not + 1 due to the timeout) to get the correct attempt number
            alert(`Congratulations! You got the correct word in ${currentRow} attempts.`); 
            resetGame(theme);
        }, 500); // Delay to ensure board updates before alert
    }
}


function resetGame(theme = "classic") {
    // Reset the board cells to be blank
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
        cell.textContent = ""; // Clear the text content of the cell
        cell.classList.remove("correct", "misplaced", "incorrect");
    });

    // Reset game variables
    currentRow = 0;
    guessInput.value = "";

    // Get a new answer from the word list
    getWordList(theme).then(wordList => {
        answer = wordList[Math.floor(Math.random() * wordList.length)];
        console.log("New Answer (debugging):", answer); // Logs the new answer to the console for testing
    });
}

// Apply the selected theme and reset the game
function applyTheme(theme) {
    // Show alert with the selected theme
    alert(`Theme changed to ${theme}!`);

    // Log the change to the console
    console.log(`Theme changed to ${theme}`);

    // Reset the game with the new theme
    resetGame(theme);
}

/*-----Set up event listeners-----*/
// Listen for the submit button to be clicked
submitButton.addEventListener("click", interpretGuess);
// Listen for the enter key to be pressed when typing in the input field
guessInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        interpretGuess();
    }
});
// Listen for theme changes
document.getElementById("theme-selection").addEventListener("change", (event) => {
    if (event.target.name === "theme") {
        const selectedTheme = event.target.value;
        theme = selectedTheme; // Update the theme variable
        applyTheme(theme); // Apply theme change
    }
});