const toggle = document.querySelector('.toggle');
toggle.addEventListener('click', () => {
    const element = document.body;
    element.classList.toggle("dark-mode");
});