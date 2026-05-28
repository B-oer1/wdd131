const hamMenu = document.querySelector('.ham-menu');

const offScreenMenu = document.querySelector('.off-screen-menu');

hamMenu.addEventListener('click', () => {
    hamMenu.classList.toggle('active');
    offScreenMenu.classList.toggle('active');
})
const today = new Date();

const dateElement = document.getElementById("lastModified");
if (dateElement) {
    dateElement.innerHTML = today.toString();
}

const yearElement = document.getElementById("currentyear");
if (yearElement) {
    yearElement.innerHTML = today.getFullYear();
}