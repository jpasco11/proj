# NIA Dam Sites

Preview: [NIA Dam Sites](https://thandora.github.io/nia-dams/)

## Quick Start

To add a new site location:

1. Provide the .geojson file of the new location to `geos/` directory.
2. Add the directory to the `directories` array inside `loadData.js`.

    So this:

    ```js
    const directories = ["./geos/balire-north.geojson"];
    ```

    becomes this:

    ```js
    const directories =  ["./geos/balire-north.geojson", "./geos/new-location.geojson"];
    ```

3. Add a new button in your html with the template:

    ```html
    <div class="nav-btn-container">
        <button id="your-id" class="btn-nav">Button Text</button>
        <span class="btn-center material-symbols-outlined">explore_nearby</span>
    </div>
    ```

4. In `script.js`, add the button node (via selector). This button will toggle show/hide the site overlay on the map.

    **Existing example:**

    ```js
    const centerNorthBalire = { lat: 10.822768169803306, lng: 124.97609138488771 };
    const btnNorth = document.querySelector("#btn-balire-north");
    bindToNode(map, btnNorth, geoData["balireNorth"], centerNorthBalire);
    ```

    Adding new location:

    ```js
    const center = { lat: 42.38, lng: 42 };
    const btn = document.querySelector("button-selector");
    bindToNode(map, btn, geoData[locationName], center);
    ```

    > **_NOTE:_**  If you don't know the `locationName` of your newly added data, you can find the name by clicking the button `"get geoData names"` and checking your browser console. Helper functions (such as the `get geoData names` button) can be disabled by commenting out the `initTests(map, geoData);` line in `script.js`.
