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
        const apiUrl = 'https://api.api-ninjas.com/v1/quotes';

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

       

// Function to set darkmode or lightmode
function setupToggle() {
    const toggle = document.querySelector('.toggle');
    toggle.addEventListener('click', () => {
        const element = document.body;
        element.classList.toggle("dark-mode");
    });
}
