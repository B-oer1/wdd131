const today = new Date();

const dateElement = document.getElementById("lastModified");
if (dateElement) {
    dateElement.innerHTML = today.toISOString();
}

const yearElement = document.getElementById("currentyear");
if (yearElement) {
    yearElement.innerHTML = today.getFullYear();
}

function calculateWindChill(tempC, windKmh) { return parseFloat((13.12 + 0.6215 * tempC - 11.37 * Math.pow(windKmh, 0.16) + 0.3965 * tempC * Math.pow(windKmh, 0.16)).toFixed(1)); }

const temperature = 32;
const windSpeed = 14;

const windChillSpan = document.getElementById("wind-chill");
if (windChillSpan) {
    if (temperature <= 10 && windSpeed > 4.8) { const windChill = calculateWindChill(temperature, windSpeed); windChillSpan.textContent = `${windChill} °C`; }
    else { windChillSpan.textContent = "N/A"; }
}