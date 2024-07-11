const typingText = document.querySelector(".typing-text p"),
inpField = document.querySelector(".wrapper .input-field"),
resetBtn = document.querySelector(".content button"),
timeTag = document.querySelector(".time span b"),
mistakeTag = document.querySelector(".mistake span"),
wpmTag = document.querySelector(".wpm span"),
mistakeCount = document.getElementById('count'),
progressMessage = document.querySelector('.popup_container h2'),
accuracy = document.getElementById('accuracy'),
overLay = document.getElementById('overLay_container'),
cpmTag = document.querySelector(".cpm span");

//main modal element
let mainModal = document.getElementById('popupContainer');

//try again button
let tryAgainBtn = document.getElementById("closePopup");

//Simple calculation
/*
Calculation Accuracy

To calculate this mathematically, 
take the number of correct characters typed 
divided by the total number, multiplied by 100%.

let totalCorrectedChar = cpm;
let totalChar = 100;
let accuracy = (totalCorrectedChar / totalChar) * 100
*/

let totalCorrectedChar = 70;
let totalChar = 83;
let TypiestAccuracy = totalCorrectedChar / totalChar * 100;
let totalAccuracy = Math.floor(TypiestAccuracy)
console.log(totalAccuracy + '%');

let timer,
maxTime = 60,
timeLeft = maxTime,
charIndex = mistakes = isTyping = 0;

//function to get paragraphs from json
async function paragraphs(){
    
   const response = await fetch('./js/data.json')
   const JSONdata = await response.json();
   return JSONdata[Math.floor(Math.random() * JSONdata.length)];

}

//function to load paragraphs
async function loadParagraph() {

    currentParagraph = await paragraphs();

    typingText.innerHTML = "";
    
    currentParagraph.split("").forEach(char => {
        let span = `<span>${char}</span>`;
        typingText.innerHTML += span;
    });

    typingText.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());
}

function initTyping() {

    let characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];

    if(charIndex < characters.length - 1 && timeLeft > 0) {
        if(!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }

        if(typedChar == null) {

            if(charIndex > 0) {
                charIndex--;
                if(characters[charIndex].classList.contains("incorrect")) {
                    mistakes--;
                }
                characters[charIndex].classList.remove("correct", "incorrect");
            }

        } else {
            if(characters[charIndex].innerText == typedChar) {
                characters[charIndex].classList.add("correct");
            } else {
                mistakes++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;
        }

        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");
        
        let totalChar = characters.length;
        let totalTypedChar = charIndex - mistakes;
        console.log(totalTypedChar)
        let totalAccuracy = Math.floor((totalTypedChar / totalChar) * 100);
        // console.log(totalAccuracy);
        accuracy.innerText = `${totalAccuracy}%`;

        //alert user progress
        if(totalAccuracy <= 20){
            progressMessage.innerText = `Keep up! You gonna make it`;
        }else if (totalAccuracy <= 40) {
            progressMessage.innerText = `Your progress is exceptional!`;
        } else if(totalAccuracy <= 60){
            progressMessage.innerText = `Your progress is Overwhelming!`;
        }else if(totalAccuracy <= 80){
            progressMessage.innerText = `Awesome! Your progress is super grate!`;
        }else {
            progressMessage.innerText = `Congratulation! Your speed is outstanding.`;
        }

        let wpm = Math.round(((charIndex - mistakes)  / 5) / (maxTime - timeLeft) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        
        wpmTag.innerText = wpm;
        mistakeTag.innerText = mistakes;

        if(mistakes == 0){
            mistakeCount.classList.remove('mistake-count');
        }else{
            mistakeCount.classList.add('mistake-count');
        }

        cpmTag.innerText = charIndex - mistakes;
    } else {
        openPopup()
        clearInterval(timer);
        inpField.value = "";
    }   
}

function initTimer() {

    if(timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft;
        let wpm = Math.round(((charIndex - mistakes)  / 5) / (maxTime - timeLeft) * 60);
        wpmTag.innerText = wpm;
        
    } 
        
    else{

        openPopup();
        clearInterval(timer);
       
    }
}

function resetGame() {
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = mistakes = isTyping = 0;
    inpField.value = "";
    timeTag.innerText = timeLeft;
    wpmTag.innerText = 0;
    mistakeTag.innerText = 0;
    cpmTag.innerText = 0;
}

//function for opening modal
function openPopup() {
    mainModal.classList.add('show-modal');
    overLay.classList.add('overlay')
    
}

//function for closing modal
function closePopup() {
    mainModal.classList.remove('show-modal');
    overLay.classList.remove('overlay');
    resetGame();

}

tryAgainBtn.addEventListener('click', closePopup);

loadParagraph();
inpField.addEventListener("input", initTyping);

resetBtn.addEventListener("click", resetGame);
