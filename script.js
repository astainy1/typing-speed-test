//Testing connection
// alert("Connected successfully!");


//Algorithm

/*

   Step-by-Step Logic Implementation

    1. Fetch Random Paragraph
    - Create a function to fetch data from a JSON file.
    - Convert the fetched data to a JSON object.
    - Select a random paragraph from the JSON data.
    - Return the selected paragraph.

    2. Initialize Game
    - Create a function to initialize the game.
    - Fetch a random paragraph and display it in the text container.
    - Reset the input area and timer.
    - Enable the input area for typing.
    - Start the countdown timer.

    3. Update Timer
    - Create a function to update the countdown timer every second.
    - Decrement the timer.
    - Update the timer display.
    - If the timer reaches zero, end the game.

     4. End Game
    - Create a function to end the game.
    - Stop the countdown timer.
    - Disable the input area.
    - Calculate and display the results.

  5. Calculate Results
    - Create a function to calculate the results.
    - Get the user input from the input area.
    - Split the user input and original text into words.
    - Compare the user input words with the original words to count correct words and errors.
    - Calculate Words Per Minute (WPM), Accuracy, and Characters Per Minute (CPM).
    - Display the results.

     6. Add Event Listener
    - Add an event listener to the start button.
    - Trigger the game initialization function when the button is clicked.

*/

//Get reference to HTML elements
const textarea = document.getElementById('text_area'),
        paragraph = document.querySelector('#paragraph'),
        cpmText = document.getElementById('character_per_minute'),
        wpmText = document.getElementById('word_per_minute'),
        mistakeText = document.getElementById('errors'),
        timeLeftText = document.getElementById('timer_left'),
        resetBtn = document.querySelector('button');

//Global variable
let words = [];
let isTyping = false;
let CPM = 0;
let WPM = 0;
let TimeLeft = 60;
let Mistake = 0;

//function to get data from JSON file
fetch("data.json")
.then((response) => {

    if(!response.ok){
        throw new Error(`HTTP Response! Status: ${response.status}`)
    }

    return response.json();
} 
)
.then((data) => {

    words = data;
    let randomJsonData = Math.floor(Math.random() * words.length);
    getRandomParagraph = words[randomJsonData];

    paragraph.textContent = getRandomParagraph;

})

.catch((error) =>{
    console.log("Trouble fetching data from Json file!", error);
})

let getRandomParagraph = words[Math.floor(Math.random() * words.length)];
paragraph.textContent = getRandomParagraph;

console.log(paragraph.value);

//function to calculate 
function countdown() {
        TimeLeft--;
        timeLeftText.innerText = `Time: ${TimeLeft}`
    if(TimeLeft < 1){
        TimeLeft = 59;
        TimeLeft--;
    }

}

document.addEventListener('DOMContentLoaded', () =>{
    setInterval(countdown, 1000);
})




