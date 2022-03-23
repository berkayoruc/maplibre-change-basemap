// Control implemented as ES5 prototypical class
function WebsiteControl(options) {
  this.url = options.url;
  this.iconClass = options.iconClass;
}

WebsiteControl.prototype.onAdd = function (map) {
  this._map = map;
  let url = this.url;
  this._container = document.createElement("div");
  this._container.className = "maplibregl-ctrl maplibregl-ctrl-group";
  this._urlButton = document.createElement("button");
  this._urlButton.type = "button";
  this._urlButton.title = "Open url";
  this._urlButton.ariaLabel = "Open url";
  this._urlButton.classList.add("maplibregl-ctrl-" + this.iconClass);
  this._urlButton.addEventListener("click", function (e) {
    window.open(url, "_blank");
  });
  this._span = document.createElement("span");
  this._span.classList.add("maplibregl-ctrl-icon");
  this._span.ariaHidden = true;
  this._urlButton.appendChild(this._span);
  this._container.appendChild(this._urlButton);
  return this._container;
};

WebsiteControl.prototype.onRemove = function () {
  this._container.parentNode.removeChild(this._container);
  this._map = undefined;
};
