//Testing connection
// alert("Connected successfully!");

//Get reference to HTML elements
const textarea = document.getElementById('text_area'),
        paragraph = document.querySelector('#paragraph'),
        cpm = document.getElementById('character_per_minute'),
        wpm = document.getElementById('word_per_minute'),
        mistakes = document.getElementById('errors'),
        timeLeft = document.getElementById('timer_left'),
        resetBtn = document.querySelector('button');

//Global variable
let isTyping = false;
let typeCPM = 0;
let typeWPM = 0;
let typeTimeLeft = 0;
let typeMistake = 0;

//get data from JSON file
fetch("data.json")
.then((response) => {

    if(!response.ok){
        throw new Error(`HTTP Response! Status: ${response.status}`)
    }
    return response.json()
} 
)
.then((data) => {
    console.log(data)
})
.catch((error) =>{
    console.log("Trouble fetching data from Json file!", error);
})



