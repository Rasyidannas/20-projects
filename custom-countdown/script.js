const inputContainer = document.getElementById("input-container");
const countdownFowm = document.getElementById("countdownForm");
const dateEl = document.getElementById("date-picker");

let countdownTitle = '';
let countdownDate = '';

//Set Date Input min with Toady's Date
const today = new Date().toISOString().split("T")[0];
dateEl.setAttribute("min", today);

function updateCountDown (e) {
    e.preventDefault();
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;
    console.log(countdownTitle, countdownDate);
}

//Event Listener for form
countdownFowm.addEventListener('submit', updateCountDown);