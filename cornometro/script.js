// Elementi del DOM
const display = document.getElementById("display");
const startBtn = document.getElementById("start-btn");
const stopBtn = document.getElementById("stop-btn");
const resetBtn = document.getElementById("reset-btn");
const lapBtn = document.getElementById("lap-btn");
const lapsList = document.getElementById("laps-list");

// Variabili di stato
let milliseconds = 0;
let seconds = 0;
let minutes = 0;
let running = false;

// Funzione per aggiornare il display
function updateDisplay() {
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    const formattedMilliseconds = String(milliseconds).padStart(2, '0');
    display.textContent = `${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`;
}

// Funzione che esegue il conteggio del tempo usando setTimeout
function startTimer() {
    if (running) {
        setTimeout(() => {
            milliseconds += 1;
            if (milliseconds === 100) {
                milliseconds = 0;
                seconds += 1;
            }
            if (seconds === 60) {
                seconds = 0;
                minutes += 1;
            }
            updateDisplay();
            startTimer(); // Ricorsione per continuare il conteggio
        }, 10); // Ogni 10ms aggiorna il timer
    }
}

// Pulsante Start
startBtn.addEventListener("click", () => {
    if (!running) {
        running = true;
        startTimer();
    }
});

// Pulsante Stop
stopBtn.addEventListener("click", () => {
    running = false; // Fermiamo il ciclo ricorsivo
});

// Pulsante Reset
resetBtn.addEventListener("click", () => {
    running = false;
    milliseconds = 0;
    seconds = 0;
    minutes = 0;
    updateDisplay();
    lapsList.innerHTML = ""; // Svuota la lista dei giri
});

// Pulsante Giro
lapBtn.addEventListener("click", () => {
    if (running) {
        const lapTime = document.createElement("li");
        lapTime.textContent = display.textContent;
        lapsList.appendChild(lapTime);
    }
});
