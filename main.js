// We have to define map style
// Here, we define blank map style
const mapStyle = {
  version: 8,
  sources: {},
  layers: [
    {
      id: "background",
      type: "background",
      paint: {
        // Any color
        "background-color": "transparent",
      },
    },
  ],
};

const basemaps = {
  terrain: {
    name: "terrain",
    tiles: ["https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg"],
  },
  toner: {
    name: "toner",
    tiles: ["https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png"],
  },
};

let defaultBasemap = basemaps.toner;

// Map init
const map = new maplibregl.Map({
  container: "map",
  center: [29, 41.2],
  zoom: 9,
  style: mapStyle,
});

// Adding basemap controller
map.addControl(
  new BasemapControl(basemaps, {
    defaultBasemap,
  }),
  "bottom-right"
);

map.on("load", mapLoad);

function mapLoad(event) {
  // Add Basemap Layer
  map.addSource("basemap", {
    type: "raster",
    tiles: defaultBasemap.tiles,
    tileSize: 256,
  });
  map.addLayer({
    id: "basemap-layer",
    type: "raster",
    source: "basemap",
  });
  // Add GeoJSON Layer
  map.addSource("point-source", {
    type: "geojson",
    data: pointData,
  });
  map.addLayer({
    id: "point-layer",
    type: "circle",
    source: "point-source",
    paint: {
      "circle-radius": 8,
      "circle-color": "orange",
    },
  });
}
