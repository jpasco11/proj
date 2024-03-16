async function loadFile(dir) {
  const response = await fetch(dir);
  const json = await response.json();
  const features = json["features"];
  const locName = json["name"];
  return { locName, features };
}

// Directory of .geojson files
const directories = [
  "./geos/balire-north.geojson",
  "./geos/balire-south.geojson",
  "./geos/bao.geojson",
  "./geos/mainit.geojson",
  "./geos/binahaan-north.geojson",
  "./geos/binahaan-south.geojson",
  "./geos/ibawon.geojson",
];

async function loadData(dirs) {
  const data = {};
  for (const dir of dirs) {
    const d = await loadFile(dir);
    const nameCamelCase =
      d["locName"].slice(0, 1).toLowerCase() + d["locName"].slice(1);
    data[nameCamelCase] = d;
  }

  return data;
}

const centerData = {
  balireNorth: { lat: 10.814444, lng: 124.947778 },
  balireSouth: { lat: 10.8125, lng: 124.964167 },
  bao: { lat: 11.126764909429827, lng: 124.58609974848302 },
  mainit: { lat: 11.21846227086063, lng: 124.82465431127622 },
  binahaanNorth: { lat: 11.118889, lng: 124.826111 },
  binahaanSouth: { lat: 11.118889, lng: 124.826111 },
  ibawon: { lat: 10.85, lng: 124.949167 },
};

const geoData = await loadData(directories);
export { geoData, centerData };
