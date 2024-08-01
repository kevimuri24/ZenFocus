document.addEventListener('DOMContentLoaded', () => {
    displayDate();
    fetchQuotes();
    setupToggle();
});



function displayDate() {
    const dateElement = document.querySelector('#date');
    const currentDate = new Date();
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    dateElement.textContent = currentDate.toLocaleDateString('en-IN', options);
}

// Function to display quotes
const apiKey = 'YXCsFdl4ajH64cxQgYViTQ==wKCVOCZpLW5eNVeO';
        const apiUrl = 'https://api.api-ninjas.com/v1/quotes?category=computers';

        function fetchQuotes() {
            fetch(apiUrl, {
                headers: {
                    'X-Api-Key': apiKey
                }
            })
            .then(response => response.json())
            .then(data => {
                const quoteElement = document.getElementById('quote');
                quoteElement.textContent = `"${data[0].quote}" - ${data[0].author}`;
            })
            .catch(error => {
                console.error('Fetch error:', error);
                const quoteElement = document.getElementById('quote');
                quoteElement.textContent = 'Failed to fetch quote.';
            });
        }

// Function to create the timer
const timerDisplayMinutes = document.querySelector('#minutes');
const timerDisplaySeconds = document.querySelector('#seconds');
const modes = document.querySelectorAll('.mode');
const sound = document.querySelector('#alarm-sound');
let countdown;

modes.forEach(mode => mode.addEventListener('click', switchModes));

function switchModes(e) {
    const secondsForMode = parseInt(e.target.dataset.time, 10);
    modes.forEach(mode => mode.classList.remove('active')); // Remove active class from all modes
    e.target.classList.add('active'); // Add active class to the clicked mode
    timer(secondsForMode);
}

function timer(seconds) {
    clearInterval(countdown);
    const start = Date.now();
    const finish = start + seconds * 1000;
    displayTimeLeft(seconds);

    countdown = setInterval(() => {
        const secondsLeft = Math.round((finish - Date.now()) / 1000);
        if (secondsLeft <= 0) {
            clearInterval(countdown);
            document.title = 'Time Up!';
            sound.currentTime = 0; // Ensure sound plays at the end.
            sound.play();
        }
        displayTimeLeft(secondsLeft);
    }, 1000);
}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secondsRemaining = seconds % 60;
    const displayMinutes = `${minutes < 10 ? '0' : ''}${minutes}`;
    const displaySeconds = `${secondsRemaining < 10 ? '0' : ''}${secondsRemaining}`;
    timerDisplayMinutes.textContent = displayMinutes;
    timerDisplaySeconds.textContent = displaySeconds;
}

const startButton = document.querySelector('#start');
const stopButton = document.querySelector('#stop');
const resetButton = document.querySelector('#reset');

startButton.addEventListener('click', () => {
    const activeMode = document.querySelector('.mode.active');
    if (activeMode) {
        const secondsForMode = parseInt(activeMode.dataset.time, 10);
        timer(secondsForMode);
    }
});

stopButton.addEventListener('click', () => {
    clearInterval(countdown);
});

resetButton.addEventListener('click', () => {
    clearInterval(countdown);
    timerDisplayMinutes.textContent = '00';
    timerDisplaySeconds.textContent = '00';
    document.title = '00:00';
    modes.forEach(mode => mode.classList.remove('active'));
});


       

// Function to set darkmode or lightmode
function setupToggle() {
    const toggle = document.querySelector('.toggle');
    toggle.addEventListener('click', () => {
        const element = document.body;
        element.classList.toggle("dark-mode");
    });
}
