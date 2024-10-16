const typingText = document.querySelector(".typing-text p"),
  inpField = document.querySelector(".wrapper .input-field"),
  resetBtn = document.querySelector("#resetBtn"),
  timeTag = document.querySelector(".time span b"),
  mistakeTag = document.querySelector(".mistake span"),
  wpmTag = document.querySelector(".wpm span"),
  mistakeCount = document.getElementById("count"),
  progressMessage = document.querySelector(".popup_container h2"),
  accuracy = document.querySelector("#accuracy"),
  overLay = document.getElementById("overLay_container"),
  cpmTag = document.querySelector(".cpm span");

// Main modal element
let mainModal = document.getElementById("popupContainer");

// Try again button
let tryAgainBtn = document.getElementById("closePopup");

// Load key press sound
const keyPressSound = new Audio('./js/keypress.mp3');
const wrongKeyPressSound = new Audio('./js/wrongkeypress.mp3');

let timer,
  maxTime = 60,
  timeLeft = maxTime,
  charIndex = (mistakes = isTyping = 0);

// Function to get paragraphs from JSON
async function paragraphs() {

  try {
    const response = await fetch("./js/data.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const JSONdata = await response.json();
    return JSONdata[Math.floor(Math.random() * JSONdata.length)];

  } catch (error) {
    console.error("Error fetching data:", error);
  }



}

// Function to load paragraphs
async function loadParagraph() {
  currentParagraph = await paragraphs();

  typingText.innerHTML = "";

  currentParagraph.split("").forEach((char) => {
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

  // Play key press sound
  keyPressSound.currentTime = 0; // Reset sound to play from the start
  wrongKeyPressSound.currentTime = 0;


  // keyPressSound.play();

  if (charIndex < characters.length - 1 && timeLeft > 0) {
    if (!isTyping) {
      timer = setInterval(initTimer, 1000);
      isTyping = true;
    }

    if (typedChar == null) {
      if (charIndex > 0) {


        charIndex--;
        if (characters[charIndex].classList.contains("incorrect")) {
          mistakes--;
        }
        characters[charIndex].classList.remove("correct", "incorrect");
      }
    } else {
      if (characters[charIndex].innerText == typedChar) {
        keyPressSound.play();
        characters[charIndex].classList.add("correct");
      } else {
        wrongKeyPressSound.play();
        mistakes++;
        characters[charIndex].classList.add("incorrect");
      }
      charIndex++;
    }

    characters.forEach((span) => span.classList.remove("active"));
    characters[charIndex].classList.add("active");

    let wpm = Math.round(
      ((charIndex - mistakes) / 5 / (maxTime - timeLeft)) * 60
    );
    wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;

    wpmTag.innerText = wpm;
    mistakeTag.innerText = mistakes;

    if (mistakes == 0) {
      mistakeCount.classList.remove("mistake-count");
    } else {
      mistakeCount.classList.add("mistake-count");
    }

    cpmTag.innerText = charIndex - mistakes;

    // Calculate accuracy
    let accuracyPercentage = Math.round(((charIndex - mistakes) / charIndex) * 100);
    accuracyPercentage = accuracyPercentage < 0 || isNaN(accuracyPercentage) ? 0 : accuracyPercentage;

    // Display accuracy
    accuracy.innerText = `${accuracyPercentage}%`;


  } else {
    openPopup();
    clearInterval(timer);
    inpField.value = "";
  }
}

function initTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    timeTag.innerText = timeLeft;
    let wpm = Math.round(
      ((charIndex - mistakes) / 5 / (maxTime - timeLeft)) * 60
    );
    wpmTag.innerText = wpm;
  } else {
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

// Function for opening modal
function openPopup() {
  mainModal.classList.add("show-modal");
  overLay.classList.add("overlay");
}

// EvenListener for closing popup 
closePopup.addEventListener('click', () => {

  mainModal.classList.remove("show-modal");
  overLay.classList.remove("overlay");
  resetGame();

})

// invoke paragraph function
loadParagraph();

//add evenListener for initailizing typing and resetting game
inpField.addEventListener("input", initTyping);
resetBtn.addEventListener("click", resetGame);
