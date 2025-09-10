const toggleMapMode = document.getElementById("toggle-map-mode");
const googleMap = document.getElementById("googlemap");

toggleMapMode.addEventListener("change", () => {
  if (toggleMapMode.checked) {
    // Dark mode map for 307 East Franklin Street
    googleMap.src =
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3223.0985999999996!2d-79.05013568468178!3d35.91332398014258!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89acc2ee5ed7ed87%3A0x5b2c5b4e7d8b9a0e!2s307%20E%20Franklin%20St%2C%20Chapel%20Hill%2C%20NC%2027514%2C%20USA!5e0!3m2!1sen!2sus&style=feature:all%7Celement:geometry%7Ccolor:0x242f3e&style=feature:all%7Celement:labels.text.stroke%7Ccolor:0x242f3e&style=feature:all%7Celement:labels.text.fill%7Ccolor:0x746855&style=feature:administrative.locality%7Celement:labels.text.fill%7Ccolor:0xd59563&style=feature:poi%7Celement:labels.text.fill%7Ccolor:0xd59563&style=feature:poi.park%7Celement:geometry%7Ccolor:0x263c3f&style=feature:poi.park%7Celement:labels.text.fill%7Ccolor:0x6b9a76&style=feature:road%7Celement:geometry%7Ccolor:0x38414e&style=feature:road%7Celement:geometry.stroke%7Ccolor:0x212a37&style=feature:road%7Celement:labels.text.fill%7Ccolor:0x9ca5b3&style=feature:road.highway%7Celement:geometry%7Ccolor:0x746855&style=feature:road.highway%7Celement:geometry.stroke%7Ccolor:0x1f2835&style=feature:road.highway%7Celement:labels.text.fill%7Ccolor:0xf3d19c&style=feature:transit%7Celement:geometry%7Ccolor:0x2f3948&style=feature:transit.station%7Celement:labels.text.fill%7Ccolor:0xd59563&style=feature:water%7Celement:geometry%7Ccolor:0x17263c&style=feature:water%7Celement:labels.text.fill%7Ccolor:0x515c6d&style=feature:water%7Celement:labels.text.stroke%7Ccolor:0x17263c";
  } else {
    // Light mode map for 307 East Franklin Street
    googleMap.src =
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3223.0985999999996!2d-79.05013568468178!3d35.91332398014258!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89acc2ee5ed7ed87%3A0x5b2c5b4e7d8b9a0e!2s307%20E%20Franklin%20St%2C%20Chapel%20Hill%2C%20NC%2027514%2C%20USA!5e0!3m2!1sen!2sus!4v1694360400000!5m2!1sen!2sus";
  }
});
