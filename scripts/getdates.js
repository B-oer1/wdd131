const today = new Date();

const dateElement = document.getElementById("lastModified");
if (dateElement) {
    dateElement.innerHTML = today.toDateString();
}

const yearElement = document.getElementById("currentyear");
if (yearElement) {
    yearElement.innerHTML = today.getFullYear();
}