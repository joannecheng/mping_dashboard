"use strict";

const DEFAULTS = {
  coordinates: {
    lat: 39.73350,
    lng: -98.2
  },
  zoom: 4
};
const geoProject = new Keen({
  projectId: "564ab35590e4bd7a9da83d9e",
  readKey: "f485892c0a1ba51fa505aed8f7b03ebadd19f36fd0b4fcf3a52ebf57a56768042164dfd564870cccce8c88dfc8176053c1e575027e1ec8c1588a795ba53f57d9ba2d06c4863f8003cab5d9ca9e46f8a3a0e1a6a6de4c79e7e3d61e6c22e6fd06a21676b0d5bbf6f83f6f8feb17ed3f67"
});

function drawHour(map, weatherEvents, hour) {
  const labelDate = new Date("2015-11-16T00:00:00.000Z");
  labelDate.setUTCHours(hour);
  $(".hour-selector-label").text(hour + "-" + (hour+1));
  const items = _.select(weatherEvents, function(weatherEvent) {
    const ts = new Date(weatherEvent.keen.timestamp);
    return ts.getUTCHours() == hour && weatherEvent.weather.type != "test";
  });
  drawOnMap(map, items);
  fillTable(items);
}

function fillTable(items) {
  const table = $("#mping_table .chart-stage table");
  table.html("<thead>" +
      "<th>Timestamp</th>" +
      "<th>Type</th>" +
      "<th>Coordinates</th>" +
      "<th></th>" +
      "</thead>");
  _.each(items, function(item) {
    const measurement = item.weather.measurement ? item.weather.measurement + "in" : "";
    const className = item.weather.type.replace(/\s+|\W+/g, '-');
    const formattedDate = moment(item.keen.timestamp).format("M/D/YYYY H:mm:ss");
    const svgCircle = `<svg class="weather-circle-icon">
      <circle class="weather-circle-icon ${className}" cx="4.5" cy="4.5" r="4" />
      </svg>`;

    table.append("<tr> " +
        "<td>"+formattedDate+"</td>" +
        "<td>"+svgCircle+item.weather.type+"</td>" +
        "<td>"+item.keen.location.coordinates+"</td>" +
        "<td>"+measurement+"</td>" +
        "</tr>");
  });
}

function drawOnMap(map, items) {
  _.each(items, function(item) {
    const coords = item.keen.location.coordinates;
    const type = item.weather.type;
    const className = item.weather.type.replace(/\s+|\W+/g, '-');
    L.circleMarker(new L.LatLng(coords[1], coords[0]), {
      radius: 5,
      weight: 1,
      fillOpacity: 0.5,
      color: "#444",
      className: className
    }).addTo(map);
  });
}

function setSlider(map, weatherEvents) {
  drawHour(map, weatherEvents, 0);
  $("#hour_selector").change(function(event) {
    map.clearLayers();
    drawHour(map, weatherEvents, parseInt(event.currentTarget.value));
  });
}

Keen.ready(function(){
  L.mapbox.accessToken = "pk.eyJ1Ijoia2Vlbi1pbyIsImEiOiIza0xnNXBZIn0.PgzKlxBmYkOq6jBGErpqOg";
  var map = L.mapbox.map("map", "mapbox.light", {
    attributionControl: true,
    center: [DEFAULTS.coordinates.lat, DEFAULTS.coordinates.lng],
    zoom: DEFAULTS.zoom
  });
  var activeMapData = L.layerGroup().addTo(map);

  map.attributionControl.addAttribution('<a href="https://keen.io/">Custom Analytics by Keen IO</a>');

  var mpingObs = new Keen.Query("extraction", {
    eventCollection: "mping_observations",
    timeframe: {
      start: "Tue, 16 Nov 2015 00:00:00 GMT",
      end: "Tue, 16 Nov 2015 23:59:59 GMT"
    },
    targetProperty: "keen.location.coordinates"
  });
  geoProject.run(mpingObs, function(err, res){
    $(".loader").toggle();
    setSlider(activeMapData, res.result);
  });

  var resize = function(){
    // activeMapData.clearLayers();
  };
});
