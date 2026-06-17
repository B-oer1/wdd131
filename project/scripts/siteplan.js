const today = new Date();

const dateElement = document.getElementById("lastModified");
if (dateElement) {
    dateElement.innerHTML = document.lastModified;
}

const yearElement = document.getElementById("currentyear");
if (yearElement) {
    yearElement.innerHTML = today.getFullYear();
}

const hambutton = document.querySelector('#hambutton');
const navmenu = document.querySelector('#navmenu');


hambutton.addEventListener('click', () => {
    toggleActive(navmenu);
});

function toggleActive(element) {
    element.classList.toggle('active');
    hambutton.classList.toggle('active');
}