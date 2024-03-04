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

    passwordInput.addEventListener("input", app.testPassword);
    passwordInput.addEventListener("input", app.disableSpaceKey);

    passwordConfirm.addEventListener("input", app.testPasswordConfirm);
    passwordConfirm.addEventListener("input", app.disableSpaceKey);

    form.addEventListener("submit", app.finalValidation);
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
        .querySelector(".fa-circle-xmark")
        .classList.add("hidden");

      e.target.parentElement
        .querySelector(".fa-circle-check")
        .classList.remove("hidden");
    } else {
      e.target.parentElement
        .querySelector(".fa-circle-check")
        .classList.add("hidden");

      e.target.parentElement
        .querySelector(".fa-circle-xmark")
        .classList.remove("hidden");
    }
  },

  containsSpecialCharacters(str) {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return specialChars.test(str);
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
        .querySelector(".fa-circle-xmark")
        .classList.add("hidden");

      e.target.parentElement
        .querySelector(".fa-circle-check")
        .classList.remove("hidden");
    } else {
      e.target.parentElement
        .querySelector(".fa-circle-check")
        .classList.add("hidden");

      e.target.parentElement
        .querySelector(".fa-circle-xmark")
        .classList.remove("hidden");
    }
  },

  testPostcode(e) {
    const postcode = e.target;
    postcode.setCustomValidity("");

    const country = document.getElementById("country");
    let current;

    switch (country.value) {
      case "united kingdom":
        const ukRegex = new RegExp(
          /[A-Z]{1,2}[0-9]{1,2}[A-Z]?\s?[0-9][A-Z]{2}$/i
        );
        app.postcodeError(6, ukRegex, "UK");
        current = ukRegex.test(postcode.value);
        break;
      case "netherlands":
        const nlRegex = new RegExp(/^[1-9][0-9]{3} ?(?!sa|sd|ss)[a-z]{2}$/i);
        app.postcodeError(6, nlRegex, "NL");
        current = nlRegex.test(postcode.value);
        break;
      case "germany":
        const deRegex = new RegExp(
          /^0[1-9]\d\d(?<!0100)0|0[1-9]\d\d[1-9]|[1-9]\d{3}[0-8]|[1-9]\d{3}(?<!9999)9$/i
        );
        app.postcodeError(6, deRegex, "DE");
        current = check();
        function check() {
          if (
            deRegex.test(postcode.value) === true &&
            postcode.value.length === 5
          ) {
            return true;
          } else {
            return false;
          }
        }
        console.log(current);
        break;
      case "spain":
        const esRegex = new RegExp(/^(?:0[1-9]|[1-4]\d|5[0-2])\d{3}$/);
        app.postcodeError(6, esRegex, "ES");
        current = esRegex.test(postcode.value);
        break;
      case "italy":
        const itRegex = new RegExp(
          /^(?:[A-Z][AEIOU][AEIOUX]|[AEIOU]X{2}|[B-DF-HJ-NP-TV-Z]{2}[A-Z]){2}(?:[\dLMNP-V]{2}(?:[A-EHLMPR-T](?:[04LQ][1-9MNP-V]|[15MR][\dLMNP-V]|[26NS][0-8LMNP-U])|[DHPS][37PT][0L]|[ACELMRT][37PT][01LM]|[AC-EHLMPR-T][26NS][9V])|(?:[02468LNQSU][048LQU]|[13579MPRTV][26NS])B[26NS][9V])(?:[A-MZ][1-9MNP-V][\dLMNP-V]{2}|[A-M][0L](?:[1-9MNP-V][\dLMNP-V]|[0L][1-9MNP-V]))[A-Z]$/i
        );
        app.postcodeError(6, itRegex, "IT");
        current = itRegex.test(postcode.value);
        break;
      default:
        console.log("something went wrong: default switch");
    }

    if (current === true && postcode.checkValidity()) {
      app.errorMessage(e, "");
      e.target.parentElement
        .querySelector(".fa-circle-xmark")
        .classList.add("hidden");

      e.target.parentElement
        .querySelector(".fa-circle-check")
        .classList.remove("hidden");
    } else {
      e.target.parentElement
        .querySelector(".fa-circle-check")
        .classList.add("hidden");

      e.target.parentElement
        .querySelector(".fa-circle-xmark")
        .classList.remove("hidden");
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

  testPassword(e) {
    const password = e.target;
    password.setCustomValidity("");

    let current;

    const passRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );

    if (passRegex.test(password.value) === false) {
      password.setCustomValidity("Enter a valid password");
      app.errorMessage(
        e,
        "Password must be at least 8 characters, 1 lowercase, 1 uppercase, 1 number, and 1 special character"
      );
      current = false;
    } else if (passRegex.test(password.value) === true) {
      password.setCustomValidity("");
      app.errorMessage(e, "");
      current = true;
    }

    if (current === true && email.checkValidity()) {
      e.target.parentElement
        .querySelector(".fa-circle-xmark")
        .classList.add("hidden");

      e.target.parentElement
        .querySelector(".fa-circle-check")
        .classList.remove("hidden");
    } else {
      e.target.parentElement
        .querySelector(".fa-circle-check")
        .classList.add("hidden");

      e.target.parentElement
        .querySelector(".fa-circle-xmark")
        .classList.remove("hidden");
    }
  },

  testPasswordConfirm(e) {
    const password = e.target;
    password.setCustomValidity("");

    let current;

    const passwordInput = document.getElementById("password");
    const passwordConfirm = document.getElementById("password-confirm");

    if (passwordConfirm.value !== passwordInput.value) {
      password.setCustomValidity("Password does not match");
      password.reportValidity();
      current = false;
    } else if (passwordConfirm.value === passwordInput.value) {
      password.setCustomValidity("");
      current = true;
    }

    if (current === true && email.checkValidity()) {
      app.errorMessage(e, "");
      e.target.parentElement
        .querySelector(".fa-circle-xmark")
        .classList.add("hidden");

      e.target.parentElement
        .querySelector(".fa-circle-check")
        .classList.remove("hidden");
    } else {
      e.target.parentElement
        .querySelector(".fa-circle-check")
        .classList.add("hidden");

      e.target.parentElement
        .querySelector(".fa-circle-xmark")
        .classList.remove("hidden");
    }
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
      case "postcode":
        errorField.textContent = message;
        break;
      case "password":
        errorField.textContent = message;
        break;
      case "password-confirm":
        errorField.textContent = message;
        break;
      default:
        console.log("something went wrong: default switch");
    }
  },

  checkEmpty(item) {
    if (item.value === "") {
      item.parentElement
        .querySelector(".fa-circle-xmark")
        .classList.remove("hidden");
    } else {
      item.parentElement
        .querySelector(".fa-circle-xmark")
        .classList.add("hidden");
    }
  },

  finalValidation(e) {
    e.preventDefault();
    const form = e.target;

    const userNameInput = document.getElementById("username");
    const emailInput = document.getElementById("email");
    const postcodeInput = document.getElementById("postcode");
    const passwordInput = document.getElementById("password");
    const passwordConfirm = document.getElementById("password-confirm");

    [
      userNameInput,
      emailInput,
      postcodeInput,
      passwordInput,
      passwordConfirm,
    ].forEach((item) => {
      if (item.value === "") {
        app.checkEmpty(item);
        item.setCustomValidity("Field is required");
        item.parentElement.querySelector(".error-span").textContent =
          "Field is required";
      }
    });

    if (form.checkValidity() === true) {
      const formArea = document.querySelector(".main__form");

      const submittedH2 = document.createElement("h2");
      submittedH2.textContent = "Thank You";

      formArea.innerHTML = "";
      formArea.appendChild(submittedH2);

      setTimeout(() => {
        location.reload();
      }, 5000);
    }
  },
};

document.addEventListener("DOMContentLoaded", app.init);
