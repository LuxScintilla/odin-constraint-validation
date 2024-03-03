const app = {
  init() {
    app.addListeners();
  },

  addListeners() {
    const form = document.querySelector(".form");
    const userNameInput = document.getElementById("username");
    const emailInput = document.getElementById("email");
    const countryInput = document.getElementById("country");
    const postcodeInput = document.getElementById("postcode");
    const passwordInput = document.getElementById("password");
    const passwordConfirm = document.getElementById("password-confirm");

    userNameInput.addEventListener("input", app.testUserName);
    userNameInput.addEventListener("keypress", app.disableSpaceKey);

    emailInput.addEventListener("input", app.testEmail);
    emailInput.addEventListener("keypress", app.disableSpaceKey);

    postcodeInput.addEventListener("input", app.testPostcode);
  },

  testUserName(e) {
    const username = e.target;
    username.setCustomValidity("");

    if (app.containsSpecialCharacters(username.value) === true) {
      username.setCustomValidity(
        "Username my not contain any special characters"
      );
      username.reportValidity();
    } else if (username.value.length < 3 || username.value.length > 20) {
      username.setCustomValidity(
        "Username must be between 3 and 20 characters"
      );
      app.errorMessage(e, "Username must be between 3 and 20 characters");
    } else if (username.value.length >= 3 && username.value.length <= 20) {
      app.errorMessage(e, "");
    }

    if (username.checkValidity()) {
      e.target.parentElement
        .querySelector(".fa-circle-check")
        .classList.remove("hidden");
    } else {
      e.target.parentElement
        .querySelector(".fa-circle-check")
        .classList.add("hidden");
    }
  },

  testEmail(e) {
    const email = e.target;
    email.setCustomValidity("");

    const emailRegex = new RegExp(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    );
    if (emailRegex.test(email.value) === false) {
      email.setCustomValidity("Enter a valid email address");
      app.errorMessage(e, "Enter a valid email address");
    } else if (emailRegex.test(email.value) === true) {
      email.setCustomValidity("");
      app.errorMessage(e, "");
    }

    if (email.checkValidity()) {
      e.target.parentElement
        .querySelector(".fa-circle-check")
        .classList.remove("hidden");
    } else {
      e.target.parentElement
        .querySelector(".fa-circle-check")
        .classList.add("hidden");
    }
  },

  testPostcode(e) {
    const postcode = e.target;
    postcode.setCustomValidity("");

    const country = document.getElementById("country");

    switch (country.value) {
      case "united kingdom":
        const postcodeRegex = new RegExp(
          /[A-Z]{1,2}[0-9]{1,2}[A-Z]?\s?[0-9][A-Z]{2}/i
        );
        app.postcodeError(6, postcodeRegex, "UK");
        break;
    }

    if (postcode.checkValidity()) {
      e.target.parentElement
        .querySelector(".fa-circle-check")
        .classList.remove("hidden");
    } else {
      e.target.parentElement
        .querySelector(".fa-circle-check")
        .classList.add("hidden");
    }
  },

  postcodeError(length, regex, country) {
    if (
      postcode.value.length >= length &&
      regex.test(postcode.value) === false
    ) {
      postcode.setCustomValidity(`Enter a valid ${country} postcode`);
      postcode.reportValidity();
    }
  },

  containsSpecialCharacters(str) {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return specialChars.test(str);
  },

  disableSpaceKey(e) {
    const key = e.keyCode;
    if (key === 32) {
      e.preventDefault();
    }
  },

  errorMessage(e, message) {
    const field = e.target;
    const errorField = field.parentElement.querySelector(".error-span");

    switch (field.id) {
      case "username":
        errorField.textContent = message;
        break;
      case "email":
        errorField.textContent = message;
        break;
      default:
        console.log("something went wrong: default switch");
    }
  },
};

document.addEventListener("DOMContentLoaded", app.init);
