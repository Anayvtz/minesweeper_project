
// globals
const timerDisplay = document.getElementById("timer");
let seconds = 0;
let minutes = 0;
let timer;

// main
startTimer();

function startTimer() {
    timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
    }
    const displaySec = seconds < 10 ? `0${seconds}` : seconds;
    const displayMin = minutes < 10 ? `0${minutes}` : minutes;

    timerDisplay.value = `${displayMin}:${displaySec}`;
    timerDisplay.innerHTML = `${displayMin}:${displaySec}`;
    console.log("timerDisplay:" + timerDisplay.value);
}

export function stopTimer() {
    clearInterval(timer);
}

export function restartTimer() {
    clearInterval(timer);
    seconds = 0;
    minutes = 0;
    timerDisplay.textContent = "00:00";
    startTimer();
}