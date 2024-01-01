let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0; 
let laps = [];

function startStop() {
    if (isRunning) {
        clearInterval(timer);
        document.getElementById("startStopBtn").innerText = "Start";
    } else {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateDisplay, 10);
        document.getElementById("startStopBtn").innerText = "Stop";
    }

    isRunning = !isRunning;
}

function lap() {
    if (isRunning) {
        const lapTime = Date.now() - startTime;
        laps.push(lapTime);
        displayLaps();
    }
}

function reset() {
    clearInterval(timer);
    document.getElementById("display").innerText = "00:00:00.000";
    document.getElementById("startStopBtn").innerText = "Start";
    laps = [];
    elapsedTime = 0; // Reset elapsed time to zero
    displayLaps();
}

function updateDisplay() {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    const formattedTime = formatTime(elapsedTime);
    document.getElementById("display").innerText = formattedTime;
}

function formatTime(time) {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = time % 1000;

    return (
        (hours < 10 ? "0" : "") + hours + ":" +
        (minutes < 10 ? "0" : "") + minutes + ":" +
        (seconds < 10 ? "0" : "") + seconds + "." +
        (milliseconds < 10 ? "00" : (milliseconds < 100 ? "0" : "")) + milliseconds
    );
}

function displayLaps() {
    const lapsContainer = document.getElementById("laps");
    lapsContainer.innerHTML = "";

    laps.forEach((lap, index) => {
        const lapItem = document.createElement("div");
        lapItem.innerText = `Lap ${index + 1}: ${formatTime(lap)}`;
        lapsContainer.appendChild(lapItem);
    });
}
