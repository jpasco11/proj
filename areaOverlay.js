function blackStyle(feature) {
  return {
    color: "black",
    weight: 2,
  };
}

function hoverStyle(feature) {
  return {
    color: "#5e60e4",
    weight: 4,
  };
}

// TODO mapObject redundant?
function initAreaOverlay(geoData, mapObject, infoObject) {
  function hoverHandler(event) {
    let currentLayer = event.target;

    currentLayer.setStyle(hoverStyle());
    currentLayer.bringToFront();

    infoObject.update(currentLayer.feature.properties);
  }

  function mouseOutHandler(event) {
    layer.setStyle(blackStyle);
    infoObject.update();
  }

  function onEach(feature, layer) {
    layer.on({
      mouseover: hoverHandler,
      mouseout: mouseOutHandler,
    });
  }

  const layer = L.geoJSON(geoData, {
    onEachFeature: onEach,
    style: blackStyle,
  });

  return layer;
}

function initInfo(map) {
  // Info box
  let info = L.control();

  info.onAdd = function (map) {
    // Create a div with a class "info"
    this.divAreaInfo = L.DomUtil.create("div", "info");
    this.update();
    return this.divAreaInfo;
  };

  info.update = function (properties) {
    let innerHtml;

    if (properties) {
      innerHtml =
        `<b>Region ${properties["Region"]}, ${properties["pro_name"]}</b><br>` +
        `${properties["Sys_Name"]}<br>` +
        `Area: ${properties["area"]} hectares<br>` +
        `IA: ${properties["ia"]}<br>` +
        `FUSA: ${properties["fusa"]}<br>` +
        `DIVISION: ${properties["division"]}`;
    } else {
      innerHtml = "Hover on Parcel";
    }

    this.divAreaInfo.innerHTML = innerHtml;
  };

  return info;
}

const info = initInfo(map);

function bindToNode(map, nodeBtnContainer, geoData, center) {
  const overlayLayer = initAreaOverlay(geoData, map, info);

  // Create info box only ONCE.
  if (!map.hasLayer(info)) {
    info.addTo(map);
  }

  const btnOverlay = nodeBtnContainer.querySelector(".btn-nav-overlay");
  btnOverlay.addEventListener("click", () => {
    if (map.hasLayer(overlayLayer)) {
      map.removeLayer(overlayLayer);
    } else {
      overlayLayer.addTo(map);
      map.fitBounds(overlayLayer.getBounds());
      // const marker =  L.marker([center]).addTo(map);
    }
  });

  // btnOverlay.classList.add("btn-nav");
  //  btnCenter.classList.add("btn-center");

  const btnCenter = nodeBtnContainer.querySelector(`.btn-nav-center`);
  var marker = null;
  btnCenter.addEventListener("click", () => {
    // map.setView(center, 15);
    // var marker = L.marker(center).addTo(map);
    if (marker) {
      map.removeLayer(marker); // Remove existing marker if it exists
      marker = null; // Reset marker variable
    } else {
      map.setView(center, 15); // Set the view to the center location with zoom level 15
      marker = L.marker(center).addTo(map); // Add a marker at the center location
      console.log(geoData);
      // TEMP
      const temp = addSpace(geoData["locName"]);
      marker.bindPopup(temp + ` RIS`).openPopup();
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
  });
}

export { bindToNode, initInfo };
