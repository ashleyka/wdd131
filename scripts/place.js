// Display the current year in the footer copyright line
document.getElementById("currentyear").textContent = new Date().getFullYear();

// Display the date the document was last modified
document.getElementById("lastModified").textContent = "Last Modified: " + document.lastModified;

// ===== Weather: wind chill =====
// Static values for now — a future course will swap these for live API data.
const currentTemp = 8; // degrees Celsius
const currentWind = 15; // km/h

// Returns the wind chill factor (metric formula, Environment Canada)
function calculateWindChill(tempC, windKmh) {
  return (13.12 + 0.6215 * tempC - 11.37 * Math.pow(windKmh, 0.16) + 0.3965 * tempC * Math.pow(windKmh, 0.16)).toFixed(1);
}

// Only a valid wind chill calculation when temp <= 10°C and wind speed > 4.8 km/h
const windChillValue =
  currentTemp <= 10 && currentWind > 4.8
    ? calculateWindChill(currentTemp, currentWind)
    : "N/A";

document.getElementById("windChill").textContent = windChillValue;
