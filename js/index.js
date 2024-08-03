document.addEventListener('DOMContentLoaded', () => {
    // Initial function calls
    displayDate();
    fetchQuotes();
    setupToggle();

    // Music player functionality
    const hiddenPlayer = document.getElementById('hidden-player');
    const titleElement = document.querySelector('.title');
    const artistElement = document.querySelector('.artist');
    const coverElement = document.querySelector('.coverr');
    const playButton = document.querySelector('.play-button');
    const timeFinishElement = document.querySelector('.time-finish');
    const timeNowElement = document.querySelector('.time-now');
    const progressElement = document.querySelector('progress');
    const nextButton = document.querySelector('.next');
    const prevButton = document.querySelector('.prev');
    const musicPopup = document.getElementById('music-popup');
    const closeMusicPopupButton = document.getElementById('close-music-popup');

    let num = 0;
    let songs = [];

    const setSong = (index) => {
        const { src, title, artist, coverart } = songs[index];
        hiddenPlayer.src = src;
        titleElement.textContent = title;
        artistElement.textContent = artist;
        coverElement.src = coverart;
        hiddenPlayer.setAttribute('order', index);
    };

    const secondsTimeSpanToHMS = (s) => {
        const h = Math.floor(s / 3600);
        s -= h * 3600;
        const m = Math.floor(s / 60);
        s -= m * 60;
        return `${h}:${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`;
    };

    hiddenPlayer.addEventListener('loadedmetadata', () => {
        const duration = hiddenPlayer.duration;
        const songLength = secondsTimeSpanToHMS(duration).split(".")[0];
        timeFinishElement.textContent = songLength;
    });

    const updateSong = (direction) => {
        let order = parseInt(hiddenPlayer.getAttribute('order'), 10);
        if (direction === 'next') {
            order = (order + 1) % songs.length;
        } else if (direction === 'prev') {
            order = (order - 1 + songs.length) % songs.length;
        }
        setSong(order);
        hiddenPlayer.play();
    };

    nextButton.addEventListener('click', () => updateSong('next'));
    prevButton.addEventListener('click', () => updateSong('prev'));

    playButton.addEventListener('click', () => {
        playButton.classList.toggle('paused');
        if (playButton.classList.contains('paused')) {
            hiddenPlayer.pause();
        } else {
            hiddenPlayer.play();
        }
    });

    hiddenPlayer.addEventListener('timeupdate', () => {
        const duration = hiddenPlayer.duration;
        const currentTime = hiddenPlayer.currentTime;
        const songLength = secondsTimeSpanToHMS(duration).split(".")[0];
        const songCurrent = secondsTimeSpanToHMS(currentTime).split(".")[0];
        timeFinishElement.textContent = songLength;
        timeNowElement.textContent = songCurrent;
        progressElement.value = currentTime / duration;

        if (!hiddenPlayer.paused) {
            playButton.classList.remove('paused');
            progressElement.style.cursor = 'pointer';

            progressElement.addEventListener('click', (e) => {
                const parentOffset = progressElement.parentElement.getBoundingClientRect();
                const relX = e.pageX - parentOffset.left;
                const percPos = (relX * 100) / 355;
                const second = (hiddenPlayer.duration * parseInt(percPos, 10)) / 100;
                hiddenPlayer.currentTime = second;
            });
        }

        if (currentTime === duration) {
            updateSong('next');
        }
    });

    // Fetch songs from the JSON file
    fetch('songs.json')
        .then(response => response.json())
        .then(data => {
            songs = data;
            // Initialize first song
            setSong(0);
        })
        .catch(error => console.error('Error fetching songs:', error));

    // Handle music button click
    document.querySelector('.music-button').addEventListener('click', () => {
        musicPopup.classList.add('active');
    });

    // Handle close button click
    closeMusicPopupButton.addEventListener('click', () => {
        musicPopup.classList.remove('active');
    });
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
        let quote = data[0].quote;

        if (quote.length < 100 || quote.length > 150) {
            return fetchQuotes(); // Limits quotes to 100-150 characters excluding the author information.
        }

        quoteElement.textContent = `"${data[0].quote}" - ${data[0].author}`;
    })
    .catch(error => {
        console.error('Fetch error:', error);
        const quoteElement = document.getElementById('quote');
        quoteElement.textContent = 'Failed to fetch quote.';
    });
}

function setupToggle() {
    const toggle = document.querySelector('.toggle');
    toggle.addEventListener('click', () => {
        const element = document.body;
        element.classList.toggle("dark-mode");
    });
}

// Timer functionality
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
    selectedTime = secondsForMode;
    timer(secondsForMode);
}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secondsRemaining = seconds % 60;
    const displayMinutes = `${minutes < 10 ? '0' : ''}${minutes}`;
    const displaySeconds = `${secondsRemaining < 10 ? '0' : ''}${secondsRemaining}`;
    timerDisplayMinutes.textContent = displayMinutes;
    timerDisplaySeconds.textContent = displaySeconds;
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
            sound.currentTime = 0; // Ensure sound plays at the end
            sound.play();
        }
        displayTimeLeft(secondsLeft);
    }, 1000);
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
    modes.forEach(mode => mode.classList.remove('active'));
});
