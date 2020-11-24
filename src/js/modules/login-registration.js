'use strict';

const FormSections = function (classes) {
  const loginButtonElement = document.querySelector(classes.loginButton);
  const registrationButtonElement = document.querySelector(classes.registrationButton);
  const sections = Array.from(document.querySelectorAll(classes.section));

  const onButtonClick = (evt) => {
    evt.preventDefault();
    sections.forEach((section, index) => {
      if (index === 0) {
        section.style.display = `block`;
      } else {
        section.style.display = `none`;
      }
    })
  };

  const onRegistrationClick = (evt) => {
    evt.preventDefault();
    sections.forEach((section, index, array) => {
      if (index !== array.length - 1) {
        section.style.display = `none`;
      } else {
        section.style.display = `block`;
      }
    })
  };

  const onLoginClick = (evt) => {
    evt.preventDefault();
    sections.forEach((section, index, array) => {
      if (index !== array.length - 2) {
        section.style.display = `none`;
      } else {
        section.style.display = `block`;
      }
    })
  };

  loginButtonElement.addEventListener('click', onLoginClick);
  registrationButtonElement.addEventListener('click', onButtonClick);
  document.querySelector(`.registration__submit-button`).addEventListener('click', onRegistrationClick);
};
