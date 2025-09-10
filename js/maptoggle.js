const toggleMapMode = document.getElementById("toggle-map-mode");
const googleMap = document.getElementById("googlemap");

toggleMapMode.addEventListener("change", () => {
  if (toggleMapMode.checked) {
    googleMap.src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10746.844677925506!2d-79.05284622215449!3d35.90837345098078!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89acc2d2cb17aaeb%3A0xb33bf0976497e0e0!2sUniversity%20of%20North%20Carolina%20at%20Chapel%20Hill!5e0!3m2!1sen!2sus&theme=dark";
  } else {
    googleMap.src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10746.844677925506!2d-79.05284622215449!3d35.90837345098078!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89acc2d2cb17aaeb%3A0xb33bf0976497e0e0!2sUniversity%20of%20North%20Carolina%20at%20Chapel%20Hill!5e0!3m2!1sen!2sus!4v1720039200959!5m2!1sen!2sus";
  }
});