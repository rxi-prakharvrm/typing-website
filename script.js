var typingTextInnerCtr = document.querySelector(".typing-text-inner-ctr");
var typingTextCtr = document.querySelector(".typing-text-ctr");
var typingTextWord = document.querySelectorAll(".typing-text-word");
var lastWord = document.querySelectorAll(".last-word");
var input = document.querySelector("input");
var counterClockTimer = document.querySelector(".counter-clock-timer");
var testResultsCtr = document.querySelector(".test-results-ctr");
var testScore = document.querySelector(".test-score");

// Global Variables
var i = 0;
var j = 0;
var decreaseMarginTop = 4;
var rightWord = 0;
var wrongWord = 0;

// Input field on focus
input.focus();

// Assigning input value to a single space
input.value = " ";

// Highlight the currect world in the typing text paragraph
typingTextWord[i].classList.add("highlight");

// Couter clock timer
function counterClockTimerFunction() {
  var counterClockTimerArr = counterClockTimer.textContent.split(":");
  var minutes = parseInt(counterClockTimerArr[0]);
  var seconds = parseInt(counterClockTimerArr[1]);
  const myInterval = setInterval(() => {
    if (minutes === 0 && seconds === 0) {
      clearInterval(myInterval);
      input.disabled = true;
      testScore.textContent = `${rightWord} WPM`;
      testResultsCtr.style.display = "block";
      return;
    }
    if (seconds <= 0) {
      seconds = 59;
      minutes--;
    }
    if (seconds <= 59) {
      seconds--;
    }
    counterClockTimer.textContent = `${minutes}:${seconds}`;
  }, 1000);
}

// Event for on keydown
input.addEventListener("keydown", (e) => {
  counterClockTimerFunction();
  if (e.code === "Space") {
    // Chekcing if the currect highlighted world is equals to the last word of the line. if it is the last one hide the current line
    if (typingTextWord[i].textContent === lastWord[j].textContent) {
      typingTextInnerCtr.style.marginTop = `-${decreaseMarginTop}rem`;
      decreaseMarginTop += 3.52;
      j++;
    }

    // Highlight the currect typing word and removing the highlight from the previous word
    if (input.value.slice(1) === typingTextWord[i].textContent) {
      typingTextWord[i].classList.add("correct");
      typingTextWord[i].classList.remove("highlight");
      input.value = "";
      i++;
      typingTextWord[i].classList.add("highlight");
      rightWord++;
    } else if (input.value.slice(1) !== typingTextWord[i].textContent) {
      typingTextWord[i].classList.add("wrong");
      typingTextWord[i].classList.remove("highlight");
      input.value = "";
      i++;
      typingTextWord[i].classList.add("highlight");
      wrongWord++;
    }
  }
});
