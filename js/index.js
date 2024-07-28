
/**
 * This function is used to open the signup form.
 */
function openSignup() {
  let login = document.getElementById('start-page-login');
  let signup = document.getElementById('signup-startpage');
  login.style.display = 'none';
  signup.style.display = 'block';
}


/**
 * This function is used to go back, to the login page.
 */
function backToLogin() {
  let login = document.getElementById('start-page-login');
  let signup = document.getElementById('signup-startpage');
  login.style.display = 'flex';
  signup.style.display = 'none';
}


/**
 * Toggles the visibility of a password field by changing its type between 'password' and 'text'.
 * Also updates the background image of a related field to indicate the visibility state.
 * @param {string} id - The ID of the HTML element whose background image should be updated.
 * @param {string} container - The ID of the password field whose visibility is being toggled.
 */
function showPassword(id, container) {
  let password = document.getElementById(container)
  let field = document.getElementById(id);
  if (password.type == 'text') {
    field.style.backgroundImage = "url('./assets/img/visibility_off.svg')";
    password.type = 'password';
  } else {
    field.style.backgroundImage = "url('./assets/img/visibility.svg')";
    password.type = 'text';
  }
}


/**
 * Updates the background image of a specified HTML element to indicate focus.
 * @param {string} id - The ID of the HTML element whose background image should be updated.
 */
function handleFocus(id) {
  let field = document.getElementById(id);
  field.style.backgroundImage = "url('./assets/img/visibility_off.svg')";
}


// Add event listeners for focus events on specific elements


/**
 * Adds a focus event listener to the element with the ID 'passwordForm'.
 * When the element gains focus, it calls the handleFocus function with the ID 'passwordClick1'.
 */
document.getElementById('passwordForm').addEventListener('focus', function () {
  handleFocus('passwordClick1');
});


/**
 * Adds a focus event listener to the element with the ID 'confirmPassword'.
 * When the element gains focus, it calls the handleFocus function with the ID 'passwordClick2'.
 */
document.getElementById('confirmPassword').addEventListener('focus', function () {
  handleFocus('passwordClick2');
});


/**
 * Adds a focus event listener to the element with the ID 'password'.
 * When the element gains focus, it calls the handleFocus function with the ID 'passwordClick'.
 */
document.getElementById('password').addEventListener('focus', function () {
  handleFocus('passwordClick');
});


/**
 * Checks if the password and confirm password fields match.
 * If they do not match, displays an error message and adds a red border to the password field.
 * If they match, hides the error message.
 * @returns {boolean} Returns true if the passwords match, false otherwise.
 */
function checkPasswordMatch() {
  let password = document.getElementById('passwordForm').value;
  let confirmPassword = document.getElementById('confirmPassword').value;
  let showError = document.getElementById('pwError');
  let passwordWarning = document.getElementById('passwordWarning')
  if (password !== confirmPassword) {
    showError.classList.remove('d-none');
    passwordWarning.classList.add('border-red');
    return false;
  } else {
    showError.classList.add('d-none');
    return true;
  }
}


/**
 * This function is used to change the image depending on whether the privacy policy has been accepted or not.
 */
function handleCheckBoxPrivacyPolicy() {
  let image = document.getElementById('privacyCheckBox');
  if (image.src.includes('checkbox.svg')) {
    image.src = "./assets/img/checkbox-checked.svg";
  } else {
    image.src = "./assets/img/checkbox.svg";
  }
}


/**
 * Validates the form by checking if the passwords match and if the privacy checkbox is checked.
 * If validation passes, creates a new user and adds the user information.
 * If validation fails, prevents form submission and displays error messages.
 * @param {Event} event - The form submission event.
 * @returns {boolean} Returns false if the validation fails, true otherwise.
 */
function validateForm(event) {
  event.preventDefault();
  let privacyCheckBox = isPrivacyPolicyChecked();
  let isPasswordMatch = validatePassword();
  let isNameValid = checkEnteredName();
  let isEmailValid = checkEnteredEmail();
  if (isPasswordMatch && privacyCheckBox && isNameValid && isEmailValid) {
    createNewUser();
  } else {
    showValidationErrors(privacyCheckBox);
    return false;
  }
}


/**
 * Checks if the privacy policy checkbox is checked.
 *
 * @returns {boolean} - True if the checkbox is checked, false otherwise.
 */
function isPrivacyPolicyChecked() {
  return document.getElementById('privacyCheckBox').src.includes('checkbox-checked.svg');
}

/**
* Displays validation errors based on the state of the privacy policy checkbox.
*
* @param {boolean} privacyCheckBox - The state of the privacy policy checkbox.
*/
function showValidationErrors(privacyCheckBox) {
  if (!privacyCheckBox) {
      document.getElementById('privacyError').classList.remove('d-none');
  }
}


/**
 * This function is used to show a message, when the signup was successfull.
 */
function showSuccessMessage() {
  const successMessage = document.getElementById('successfullSignup');
  successMessage.classList.add('show');
}


/**
 * This function is used to toggle the checkbox image
 */
function handleCheckBoxRememberMe() {
  let checkbox = document.getElementById('rememberMe');
  if (checkbox.src.includes('checkbox.svg')) {
    checkbox.src = "./assets/img/checkbox-checked.svg";
  } else {
    checkbox.src = "./assets/img/checkbox.svg";
  }
}


/**
 * This function is used to check whether the remember me checkbox was clicked or not. If so, loginwithpersistence will be executed if not the standard login.
 */
function validateLogin() {
  let inputValues = [document.getElementById('email').value, document.getElementById('password').value]
  let checkBox = document.getElementById('rememberMe');
  if (inputValues[0].length > 0 && inputValues[1].length > 0) {
    checkBox.src.includes('checkbox-checked.svg') ? loginWithPersistence() : login();
  } else {
    document.getElementById('passwordContainer').classList.add('border-red');
    document.getElementById('wrongPassword').style.display = 'block';
  }
}


/**
 * This function is used to open the summary page for guest users and to execute the function handleGuestUser commiting the variable "true".
 */
function openGuestAccess() {
  handleGuestUser(true);
  removeFooterLinkLock();
  window.location.href = "./summary.html";
}


/**
 * Checks if the entered name is valid.
 * A valid name has at least 2 characters.
 * @returns {boolean} Returns true if the name is valid, otherwise false.
 */
function checkEnteredName() {
  let name = document.getElementById('name').value;
  let nameWarning = document.getElementById('nameWarning');
  if (name.length < 2) {
    nameWarning.classList.remove('d-none');
    document.getElementById('name').classList.add('border-red');
    return false;
  } else {
    nameWarning.classList.add('d-none');
    document.getElementById('name').classList.remove('border-red');
    return true;
  }
}


/**
 * Checks if the entered email is valid.
 * A valid email follows the standard email pattern.
 * @returns {boolean} Returns true if the email is valid, otherwise false.
 */
function checkEnteredEmail() {
  let email = document.getElementById('e-mail').value;
  let emailWarning = document.getElementById('emailWarning');
  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    emailWarning.classList.remove('d-none');
    document.getElementById('e-mail').classList.add('border-red');
    return false;
  } else {
    emailWarning.classList.add('d-none');
    document.getElementById('e-mail').classList.remove('border-red');
    return true;
  }
}


/**
 * Checks if the password is entered and meets the minimum length requirement.
 * A valid password has at least 6 characters.
 */
function checkIfPasswordIsEntered() {
  let passwordField = document.getElementById('passwordForm').value;
  let passWarning = document.getElementById('noPasswordWarning');
  if (passwordField.length < 6) {
    passWarning.classList.remove('d-none');
    document.getElementById('redBorderPassword').classList.add('border-red');
  } else {
    passWarning.classList.add('d-none');
    document.getElementById('redBorderPassword').classList.remove('border-red');
  }
}


/**
 * Validates the password by checking if it is entered and if it matches the confirmation.
 * @returns {boolean} Returns true if the password is valid and matches the confirmation, otherwise false.
 */
function validatePassword() {
  checkIfPasswordIsEntered();
  return checkPasswordMatch();
}


/**
 * Opens the legal notice page in a new tab and sets a flag in localStorage.
 */
function openLegalNotice() {
  window.open('legalNotice.html', '_blank', 'noopener,noreferrer');
  localStorage.setItem('openedWithoutLogin', 'true');
}


/**
* Opens the privacy policy page in a new tab and sets a flag in localStorage.
*/
function openPrivacyPolicy() {
  window.open('privacyPolicy.html', '_blank', 'noopener,noreferrer');
  localStorage.setItem('openedWithoutLogin', 'true');
}