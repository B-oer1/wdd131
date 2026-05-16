const full = document.querySelector("#full");
const worldfull = document.querySelector("#world-full");
const short = document.querySelector("#short");
const medium = document.querySelector("#medium");
const year = document.querySelector("#year");
const month = document.querySelector("#month");
const day = document.querySelector("#day");
const dayofweek = document.querySelector("#dayofweek");

const dateElement = document.getElementById("your-id");
if (dateElement) {
    dateElement.innerHTML = "Your Date Here";
}

// use the date object
const today = new Date("16/5/2026");

full.innerHTML = `Today is <span class="highlight">${new Intl.DateTimeFormat(
    "en-US",
    {
        dateStyle: "full"
    }
).format(today)}</span>`;
worldfull.innerHTML = `UK: <span class="highlight">${new Intl.DateTimeFormat(
    "en-UK",
    {
        dateStyle: "full"
    }
).format(today)}</span>`;
short.innerHTML = `Short: <span class="highlight">${new Intl.DateTimeFormat(
    "en-US",
    {
        dateStyle: "short"
    }
).format(today)}</span>`;
medium.innerHTML = `Medium: <span class="highlight">${new Intl.DateTimeFormat(
    "en-US",
    {
        dateStyle: "medium"
    }
).format(today)}</span>`;

year.innerHTML = `getFullYear(): <span class="highlight">${today.getFullYear()}</span>`;
month.innerHTML = `getMonth(): <span class="highlight">${today.getMonth()}</span>`;
day.innerHTML = `getDate(): <span class="highlight">${today.getDate()}</span>`;
dayofweek.innerHTML = `getDay(): <span class="highlight">${today.getDay()}</span>`;
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("your-id").innerHTML = "Your Date Here";
});
document.getElementById("lastModified").innerHTML = document.lastModified;