// let d = new Date();
// document.getElementById("current Year").innerHTML = '&copy;${d.getFullYear()}';
// document.querySelector('lastModified').textContent = 'Last Modification: ${document.lastModified}';

// OR

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

const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    {
        templeName: "Austin Texas",
        location: "Texas, United States",
        dedicated: "2024, August, 17",
        area: 30000,
        imageUrl:
            "https://churchofjesuschristtemples.org/assets/img/temples/austin-texas-temple/austin-texas-temple-40361-main.jpg"
    },
    {
        templeName: "Brigham City Utah",
        location: "Utah, United States",
        dedicated: "2010, July, 31",
        area: 36000,
        imageUrl:
            "https://churchofjesuschristtemples.org/assets/img/temples/brigham-city-utah-temple/brigham-city-utah-temple-39612-main.jpg"
    },
    {
        templeName: "Chicago Illinois",
        location: "Illinois United States",
        dedicated: "1983, August, 13",
        area: 37062,
        imageUrl:
            "https://churchofjesuschristtemples.org/assets/img/temples/chicago-illinois-temple/chicago-illinois-temple-58403-main.jpg"
    },
    {
        templeName: "Salt Lake",
        location: "Salt Lake City, Utah, United States",
        dedicated: "1893, April, 6",
        area: 253015,
        imageUrl:
            "https://churchofjesuschristtemples.org/assets/img/temples/salt-lake-temple/salt-lake-temple-671916-main.jpg"
    },
    {
        templeName: "Hong Kong China",
        location: "Hong Kong, China",
        dedicated: "1996, May, 26",
        area: 21744,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/hong-kong-china/400x250/hong-kong-china-temple-lds-520131-wallpaper.jpg"
    },
    {
        templeName: "Rome Italy",
        location: "Rome, Italy",
        dedicated: "2019, March, 10",
        area: 40000,
        imageUrl:
            "https://churchofjesuschristtemples.org/assets/img/temples/rome-italy-temple/rome-italy-temple-1075606-main.jpg"
    }
];

// createTempleCard(temples);

// const nonutahLink = document.querySelector("#nonutah");

// nonutahLink.addEventListener("click", () => {
//     createTempleCard(temples.filter(temple => !temple.location.includes("Utah")));
// })

function createTempleCard(filteredTemples) {
    const container = document.querySelector(".img-container");
    container.innerHTML = "";
    filteredTemples.forEach(temple => {
        let card = document.createElement("section");
        let name = document.createElement("h3");
        let location = document.createElement("p");
        let dedication = document.createElement("p");
        let area = document.createElement("p");
        let img = document.createElement("img");

        name.textContent = temple.templeName;
        location.innerHTML = `Location: ${temple.location}`;
        dedication.innerHTML = `Dedicated: ${temple.dedicated}`;
        area.innerHTML = `Size: ${temple.area} sq ft`;
        img.setAttribute("src", temple.imageUrl);
        img.setAttribute("alt", `${temple.templeName} Temple`);
        img.setAttribute("loading", "lazy");

        card.appendChild(name);
        card.appendChild(location);
        card.appendChild(dedication);
        card.appendChild(area);
        card.appendChild(img);

        container.appendChild(card);
    });
}


function getDedicatedYear(temple) {
    return parseInt(temple.dedicated.split(",")[0].trim());
}

const pageTitle = document.getElementById("page-title");

document.querySelector("#home").addEventListener("click", (e) => {
    e.preventDefault();
    pageTitle.textContent = "Home";
    createTempleCard(temples);
});

document.querySelector("#old").addEventListener("click", (e) => {
    e.preventDefault();
    // pageTitle.textContent = "Old (before 1900)";
    // createTempleCard(temples.filter(temple => { getDedicationYear(parseInt(temple.dedicated)) < 1900; console.log(temple) }));
    createTempleCard(temples.filter(temple => getDedicatedYear(temple) < 1900));
});

document.querySelector("#new").addEventListener("click", (e) => {
    e.preventDefault();
    // pageTitle.textContent = "New (after 2000)";
    createTempleCard(temples.filter(temple => getDedicatedYear(temple) > 2000));
});

document.querySelector("#large").addEventListener("click", (e) => {
    e.preventDefault();
    pageTitle.textContent = "Large (over 90000 sq ft)";
    createTempleCard(temples.filter(temple => temple.area > 90000));
});

document.querySelector("#small").addEventListener("click", (e) => {
    e.preventDefault();
    pageTitle.textContent = "Small (under 10 000 sq ft)";
    createTempleCard(temples.filter(temple => temple.area < 10000));
});

createTempleCard(temples);