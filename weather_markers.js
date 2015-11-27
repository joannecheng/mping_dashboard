const WeatherMarkers = {
  "rain/snow": L.divIcon({
    html: '<i class="wi wi-sleet"></i>',
    className: "weather-icon sleet"
  }),

  "rain/ice pellets": L.divIcon({
    html: '<i class="wi wi-rain-mix"></i>',
    className: "weather-icon sleet"
  }),

  snow: L.divIcon({
    html: '<i class="wi wi-snow"></i>',
    className: "weather-icon snow"
  }),

  rain: L.divIcon({
    html: '<i class="wi wi-rain"></i>',
    className: "weather-icon rain"
  }),

  none: L.divIcon({
    html: '<i class="wi wi-day-sunny"></i>',
    className: "weather-icon sunny"
  }),

  test: L.divIcon({
    html: '<i class="wi wi-na"></i>',
    className: "weather-icon default"
  }),

  drizzle: L.divIcon({
    html: '<i class="wi wi-sprinkle"></i>',
    className: "weather-icon drizzle"
  }),

  "wind-1": L.divIcon({
    html: '<i class="wi wi-wind"></i>',
    className: "weather-icon drizzle"
  }),

  "ice pellets": L.divIcon({
    html: '<i class="wi wi-hail"></i>',
    className: "weather-icon snow"
  }),

  "dense fog": L.divIcon({
    html: '<i class="wi wi-fog"></i>',
    className: "weather-icon fog"
  }),

  "flood-1": L.divIcon({
    html: '<i class="wi wi-flood"></i>',
    className: "weather-icon flood"
  }),

  "flood-2": L.divIcon({
    html: '<i class="wi wi-flood"></i>',
    className: "weather-icon flood"
  }),

  hail: L.divIcon({
    html: '<i class="wi wi-hail"></i>',
    className: "weather-icon snow"
  }),

  default: L.divIcon({
    html: '<i class="wi wi-moon-full"></i>',
    className: "weather-icon default"
  })
}
const weatherTypes = [
  "hail","test","none","rain","drizzle",
  "freezing rain","freezing drizzle","rain/snow","ice pellets/snow","rain/ice pellets",
  "snow","wet snow","ice pellets","graupel","wind-1",
  "wind-2","wind-3","wind-4","wind-5","flood-1",
  "flood-2","flood-3","flood-4","mudslide","dense fog",
  "blowing dust"
];
