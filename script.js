// DOM Elements
const time = document.getElementById("time"),
  greeting = document.getElementById("greeting"),
  name = document.getElementById("name"),
  focus = document.getElementById("focus");
// Options
const showAmPm = true;
// Show Time
async function showTime() {
  const response = await fetch(
    "https://worldtimeapi.org/api/timezone/Asia/Dhaka"
  );
  const data = await response.json();
  const date = data.datetime.split("T")[1].split(".")[0].split(":");

  let hour = date[0];
  let min = date[1];
  let sec = date[2];
  setBgGreet(hour);

  // Set AM or PM
  const amPm = hour >= 12 ? "PM" : "AM";
  // 12hr Format
  hour = hour % 12 || 12;
  // Output Time
  time.innerHTML = `${hour}<span>:</span>${min}<span>:</span>${sec} ${
    showAmPm ? amPm : ""
  }`;

  setTimeout(showTime, 1000);
}

// Add Zeros
// function addZero(n) {
//   return (parseInt(n, 10) < 10 ? "0" : "") + n;
// }

// Set Background and Greeting
function setBgGreet(HOURS) {
  // let today = new Date(),
  //   hour = today.getHours();
  // console.log(HOURS);
  if (HOURS < 12) {
    // Morning
    document.body.style.backgroundImage = "url('./morning.jpg')";
    greeting.textContent = "Good Morning, ";
  } else if (HOURS < 18) {
    // Afternoon
    document.body.style.backgroundImage = "url('./afternoon.jpg')";
    greeting.textContent = "Good Afternoon, ";
  } else {
    // Evening
    document.body.style.backgroundImage = "url('./night.jpg')";
    greeting.textContent = "Good Evening, ";
    document.body.style.color = "white";
  }
}

// Get Name
function getName() {
  if (localStorage.getItem("name") === null) {
    name.textContent = "[Enter Name]";
  } else {
    name.textContent = localStorage.getItem("name");
  }
}

// Set Name
function setName(e) {
  if (e.type === "keypress") {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem("name", e.target.innerText);
      name.blur();
    }
  } else {
    localStorage.setItem("name", e.target.innerText);
  }
}

// Get Focus
function getFocus() {
  if (localStorage.getItem("focus") === null) {
    focus.textContent = "[Enter Focus]";
  } else {
    focus.textContent = localStorage.getItem("focus");
  }
}

// Set Focus
function setFocus(e) {
  if (e.type === "keypress") {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem("focus", e.target.innerText);
      focus.blur();
    }
  } else {
    localStorage.setItem("focus", e.target.innerText);
  }
}

name.addEventListener("keypress", setName);
name.addEventListener("blur", setName);
focus.addEventListener("keypress", setFocus);
focus.addEventListener("blur", setFocus);

// Run
showTime();
setBgGreet();
getName();
getFocus();
