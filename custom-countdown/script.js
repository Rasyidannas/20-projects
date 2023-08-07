const inputContainer = document.getElementById("input-container");
const countdownFowm = document.getElementById("countdownForm");
const dateEl = document.getElementById("date-picker");

const countdownEl = document.getElementById("countdown");
const countdownElTitle = document.getElementById("countdown-title");
const countdownBtn = document.getElementById("countdown-button");
const timeElements = document.querySelectorAll("span");

const completeEl = document.getElementById("complete");
const completeElInfo = document.getElementById("complete-info");
const conpleteBtn = document.getElementById("complete-button");

let countdownTitle = "";
let countdownDate = "";
let countdownValue = new Date();
let countdownActive;
let savedCountdown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

//Set Date Input min with Toady's Date
const today = new Date().toISOString().split("T")[0];
dateEl.setAttribute("min", today);

//populate countdown / complete UI
function updateDOM() {
  countdownActive = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownValue - now;

    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);

    //Hide Input
    inputContainer.hidden = true;

    //if countdown has ended, show complete
    if(distance < 0) {
      countdownEl.hidden = true
      clearInterval(countdownActive);
      completeElInfo.textContent = `${countdownTitle} finish on ${countdownDate}`;
      completeEl.hidden = false
    }else{
      //else, show the countdown in progress
      countdownElTitle.textContent = `${countdownTitle}`;
      timeElements[0].textContent = `${days}`;
      timeElements[1].textContent = `${hours}`;
      timeElements[2].textContent = `${minutes}`;
      timeElements[3].textContent = `${seconds}`;
      completeEl.hidden = true;
      countdownEl.hidden = false
    }
  }, second);
}

//function for event listener
function updateCountDown(e) {
  e.preventDefault();
  countdownTitle = e.srcElement[0].value;
  countdownDate = e.srcElement[1].value;
  savedCountdown = {
    title: countdownTitle,
    date: countdownDate
  };
  localStorage.setItem('countdown', JSON.stringify(savedCountdown));

  //Check for valid date
  if (countdownDate === "") {
    alert("Please select a date for the countdown!");
  } else {
    //Get number version of current Date, updateDOM
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
  }
}

//reset all values
function reset() {
  //Hide countdowns, show input
  countdownEl.hidden = true;
  completeEl.hidden = true;
  inputContainer.hidden = false;
  //stop the countdown
  clearInterval(countdownActive);
  //reset values
  countdownTitle = "";
  countdownDate = "";
  //remove/reset localStorage
  localStorage.removeItem('countdown');
}

function restorePreviousCountdown() {
  //Get countdown from localStorage if avalaible
  if(localStorage.getItem('countdown')) {
    inputContainer.hidden = true;
    savedCountdown = JSON.parse(localStorage.getItem('countdown'));
    countdownTitle = savedCountdown.title;
    countdownDate = savedCountdown.date;
    //Get number version of current Date, updateDOM
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
  }
}

//Event Listener for form
countdownFowm.addEventListener("submit", updateCountDown);
countdownBtn.addEventListener("click", reset);
conpleteBtn.addEventListener("click", reset);

//On load, check localStorage
restorePreviousCountdown();
