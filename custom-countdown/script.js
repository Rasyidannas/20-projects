const inputContainer = document.getElementById("input-container");
const countdownFowm = document.getElementById("countdownForm");
const dateEl = document.getElementById("date-picker");

//Set Date Input min with Toady's Date
const today = new Date().toISOString().split("T")[0];
dateEl.setAttribute("min", today);
