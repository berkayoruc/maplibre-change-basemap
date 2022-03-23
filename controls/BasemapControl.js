// Control implemented as ES5 prototypical class
function BasemapControl(basemaps, options) {
  this.defaultBasemap = options.defaultBasemap;
  this.basemaps = basemaps;
}

BasemapControl.prototype.onAdd = function (map) {
  this._map = map;
  let defaultBasemap = this.defaultBasemap;
  let basemaps = this.basemaps;
  this._container = document.createElement("div");
  this._container.className = "maplibregl-ctrl maplibregl-ctrl-group";
  this._basemapButton = document.createElement("button");
  this._basemapButton.type = "button";
  this._basemapButton.title = "Change basemap";
  this._basemapButton.ariaLabel = "Change basemap";
  this._basemapButton.classList.add("maplibregl-ctrl-basemap");
  this._basemapButton.classList.add("maplibregl-ctrl-shrink");
  this._basemapButton.addEventListener("click", function (e) {
    // Update basemap source tiles
    if (defaultBasemap.name === "toner") {
      map.getSource("basemap").tiles = basemaps.terrain.tiles;
      defaultBasemap = basemaps.terrain;
    } else {
      map.getSource("basemap").tiles = basemaps.toner.tiles;
      defaultBasemap = basemaps.toner;
    }
    // Source re-rendering
    map.style.sourceCaches["basemap"].clearTiles();
    map.style.sourceCaches["basemap"].update(map.transform);
  });
  this._span = document.createElement("span");
  this._span.classList.add("maplibregl-ctrl-icon");
  this._span.ariaHidden = true;
  this._basemapButton.appendChild(this._span);
  this._container.appendChild(this._basemapButton);
  return this._container;
};

BasemapControl.prototype.onRemove = function () {
  this._container.parentNode.removeChild(this._container);
  this._map = undefined;
};
