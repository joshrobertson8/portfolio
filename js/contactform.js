const form = document.querySelector("form");
const emailField = document.querySelector("input[type='email']");
const errorText = document.querySelector(".error-text");

form.addEventListener("submit", event => {
  if (!emailField.value.includes("@")) {
    event.preventDefault();
    errorText.style.display = "block";
  } else {
    errorText.style.display = "none";
  }
});