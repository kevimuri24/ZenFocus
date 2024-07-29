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

function fetchQuotes() {
    const myHeaders = new Headers();
    myHeaders.append("x-apihub-key", "YXCsFdl4ajH64cxQgYViTQ==wKCVOCZpLW5eNVeO"); // Add your API key here
    myHeaders.append("x-apihub-host", "Breaking-Bad-Quotes.allthingsdev.co");
    myHeaders.append("x-apihub-endpoint", "76f32cc4-0cb2-4e7c-bc6f-f7845938c971");

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    fetch("https://api.api-ninjas.com/v1/quotes?category=happiness", requestOptions)
        .then(response => response.json())
        .then(result => {
            displayQuotes(result);
        })
        .catch(error => {
            console.error('Error fetching quotes:', error);
        });
}

function displayQuotes(quotes) {
    const quotesElement = document.querySelector('#quotes');
    quotesElement.innerHTML = ''; // Clear any existing content

    quotes.forEach(quote => {
        const quoteElement = document.createElement('p');
        quoteElement.textContent = `"${quote.quote}" - ${quote.author}`;
        quotesElement.appendChild(quoteElement);
    });
}

function setupToggle() {
    const toggle = document.querySelector('.toggle');
    toggle.addEventListener('click', () => {
        const element = document.body;
        element.classList.toggle("dark-mode");
    });
}