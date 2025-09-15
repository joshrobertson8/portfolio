// Optimized map toggle functionality
(function () {
  "use strict";

  // Cache DOM elements
  const toggleMapMode = document.getElementById("toggle-map-mode");
  const googleMap = document.getElementById("googlemap");

  // Cache map URLs for better performance
  const MAP_URLS = {
    dark: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10746.844677925506!2d-79.05284622215449!3d35.90837345098078!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89acc2d2cb17aaeb%3A0xb33bf0976497e0e0!2sUniversity%20of%20North%20Carolina%20at%20Chapel%20Hill!5e0!3m2!1sen!2sus&style=feature:all%7Celement:geometry%7Ccolor:0x242f3e&style=feature:all%7Celement:labels.text.stroke%7Ccolor:0x242f3e&style=feature:all%7Celement:labels.text.fill%7Ccolor:0x746855&style=feature:administrative.locality%7Celement:labels.text.fill%7Ccolor:0xd59563&style=feature:poi%7Celement:labels.text.fill%7Ccolor:0xd59563&style=feature:poi.park%7Celement:geometry%7Ccolor:0x263c3f&style=feature:poi.park%7Celement:labels.text.fill%7Ccolor:0x6b9a76&style=feature:road%7Celement:geometry%7Ccolor:0x38414e&style=feature:road%7Celement:geometry.stroke%7Ccolor:0x212a37&style=feature:road%7Celement:labels.text.fill%7Ccolor:0x9ca5b3&style=feature:road.highway%7Celement:geometry%7Ccolor:0x746855&style=feature:road.highway%7Celement:geometry.stroke%7Ccolor:0x1f2835&style=feature:road.highway%7Celement:labels.text.fill%7Ccolor:0xf3d19c&style=feature:transit%7Celement:geometry%7Ccolor:0x2f3948&style=feature:transit.station%7Celement:labels.text.fill%7Ccolor:0xd59563&style=feature:water%7Celement:geometry%7Ccolor:0x17263c&style=feature:water%7Celement:labels.text.fill%7Ccolor:0x515c6d&style=feature:water%7Celement:labels.text.stroke%7Ccolor:0x17263c",
    light:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10746.844677925506!2d-79.05284622215449!3d35.90837345098078!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89acc2d2cb17aaeb%3A0xb33bf0976497e0e0!2sUniversity%20of%20North%20Carolina%20at%20Chapel%20Hill!5e0!3m2!1sen!2sus!4v1720039200959!5m2!1sen!2sus",
  };

  // Early return if elements don't exist
  if (!toggleMapMode || !googleMap) {
    console.warn("Map toggle elements not found");
    return;
  }

  // Optimized event handler with debouncing
  let toggleTimeout;
  toggleMapMode.addEventListener(
    "change",
    function () {
      // Clear any pending toggle to prevent rapid switching
      clearTimeout(toggleTimeout);

      toggleTimeout = setTimeout(() => {
        const targetUrl = this.checked ? MAP_URLS.dark : MAP_URLS.light;

        // Only update if URL actually changed
        if (googleMap.src !== targetUrl) {
          googleMap.src = targetUrl;
        }
      }, 150); // Small delay to prevent rapid switching
    },
    { passive: true }
  );
})();
