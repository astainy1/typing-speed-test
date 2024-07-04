//Testing connection
// alert("Connected successfully!");


//Algorith

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

//asynchronize function to get data from JSON file
async function fetchData(){
    fetch("data.json")
    .then((response) => {

        if(!response.ok){
            throw new Error(`HTTP Response! Status: ${response.status}`)
        }

        return response.json();
    } 
    )
    .then((data) => {

        let arrayElement = data;
        let randomJsonData = Math.floor(Math.random() * arrayElement.length);
        let displayElement = data[randomJsonData];

        paragraph.textContent = displayElement;
        console.log(displayElement)

    })

    .catch((error) =>{
        console.log("Trouble fetching data from Json file!", error);
    })
}

fetchData();




