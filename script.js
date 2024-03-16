import { bindToNode } from "./areaOverlay.js";
import { geoData } from "./loadData.js";
import { bindButtonEvents, buttonConstructor } from "./buttonConstructor.js";
import { centerData } from "./loadData.js";

const coordsDefault = [10.823433428097, 124.94409893341351];

let map = L.map("map").setView(coordsDefault, 9);


L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 25,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);
map.attributionControl.remove();

// For each dam site in geoData:
// create buttons
// bind the function initAreaOverlay() to the button
// bind the function initInfo() to the button
for (const data of Object.entries(geoData)) {
  const rawSysName = data[0];
  const sysName = addSpace(rawSysName);
  const geoData = data[1];

  const center = centerData[rawSysName];
  const center2 = geoData["center_coords"];
  const btnContainer = buttonConstructor(sysName);

  bindButtonEvents(btnContainer, center, map, geoData);
}

// Helper function
function addSpace(titleCasedString) {
  // Initialize an empty array to store words
  let words = [];

  // Start with the first word
  let currentWord = "";

  // Loop through each character in the title-cased string
  for (let i = 0; i < titleCasedString.length; i++) {
    const char = titleCasedString[i];

    // If the character is uppercase and it's not the first character
    if (char === char.toUpperCase() && i !== 0) {
      // Add the current word to the array
      words.push(currentWord);

      // Start a new word with the current character
      currentWord = char;
    } else {
      // If the character is not uppercase, add it to the current word
      currentWord += char;
    }
  }

  // Add the last word to the array
  words.push(currentWord);

  // Join the words with spaces and return the result
  let temp = words.join(" ");
  return temp.slice(0, 1).toUpperCase() + temp.slice(1);
}

// Helper functions.
// import { initTests } from "./helper.js";
// initTests(map, geoData);


