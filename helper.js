// Helper function. Useful for getting center of dam sites.
function attachCoordGetter(mapObject) {
  function onMapClick(e) {
    console.log(e.latlng);
  }

  mapObject.on("click", onMapClick);
}

// Create button
function createTestButton(geoData) {
  const testButton = document.createElement("button");
  testButton.textContent = "get geoData names";
  document.querySelector(".navbar").appendChild(testButton);

  testButton.addEventListener("click", () => {
    console.log("geoNames", Object.keys(geoData));
  });
}

function initTests(mapObject, geoData) {
  createTestButton(geoData);
  attachCoordGetter(mapObject);
}

export { initTests };
