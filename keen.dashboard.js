var geoProject = new Keen({
  projectId: "564ab35590e4bd7a9da83d9e",
  readKey: "f485892c0a1ba51fa505aed8f7b03ebadd19f36fd0b4fcf3a52ebf57a56768042164dfd564870cccce8c88dfc8176053c1e575027e1ec8c1588a795ba53f57d9ba2d06c4863f8003cab5d9ca9e46f8a3a0e1a6a6de4c79e7e3d61e6c22e6fd06a21676b0d5bbf6f83f6f8feb17ed3f67"
});

var weatherTypes = [
  "hail","test","none","rain","drizzle",
  "freezing rain","freezing drizzle","rain/snow","ice pellets/snow","rain/ice pellets",
  "snow","wet snow","ice pellets","graupel","wind-1",
  "wind-2","wind-3","wind-4","wind-5","flood-1",
  "flood-2","flood-3","flood-4","mudslide","dense fog",
  "blowing dust"
];

var cssIcon = L.divIcon({
  html: '<svg height=8 width=8><circle r="3" cx="4" cy="4"/></svg>',
  className: "weather-icon"
});

Keen.ready(function(){
  var DEFAULTS = {
    coordinates: {
      lat: 39.73350,
      lng: -104.9902
    },
    zoom: 5
  };

  var map,
      activeMapData;

    L.mapbox.accessToken = "pk.eyJ1Ijoia2Vlbi1pbyIsImEiOiIza0xnNXBZIn0.PgzKlxBmYkOq6jBGErpqOg";
    map = L.mapbox.map("map", "keen-io.kae20cg0", {
      attributionControl: true,
      center: [DEFAULTS.coordinates.lat, DEFAULTS.coordinates.lng],
      zoom: DEFAULTS.zoom
    });
    var center = map.getCenter();
    var zoom = map.getZoom();

    z = zoom-1;
    if (zoom = 0){
      radius = false;
    }
    else {
      radius = 10000/Math.pow(2,z);
    }

    activeMapData = L.layerGroup().addTo(map);

    map.attributionControl.addAttribution('<a href="https://keen.io/">Custom Analytics by Keen IO</a>');

    var scoped_events = new Keen.Query("extraction", {
      eventCollection: "mping_observations",
      timeframe: {
        start: "Tue, 16 Nov 2015 07:00:00 GMT",
        end: "Tue, 17 Nov 2015 07:00:00 GMT"
      },
      targetProperty: "keen.location.coordinates"
    });
    console.log(Keen.Dataviz.defaults.colors.length)
    geoProject.run(scoped_events, function(err, res){
      Keen.utils.each(res.result, function(item, index){
        var coords = item.keen.location.coordinates;
        var em = L.marker(new L.LatLng(coords[1], coords[0]), {
          icon: cssIcon,
          "marker-color": "red"
          //icon: L.mapbox.marker.icon({
          //  "marker-color": Keen.Dataviz.defaults.colors[weatherTypes.indexOf(item.weather.type)]
          //})
        }).addTo(activeMapData);
      });
    });

  var resize = function(){
    // activeMapData.clearLayers();
    center = map.getCenter(),
    zoom = map.getZoom();

    z = zoom-1;
    if (zoom = 0){
      radius = false;
    }
    else {
      radius = 10000/Math.pow(2,z);
    }
  };
});
