'use strict';

(function () {
  // Initializes "show password" buttons
  var initPasswordButtons = function (passwordButtonsClass) {
    var buttons = Array.from(document.querySelectorAll('.' + passwordButtonsClass));

    var changeButtonMode = function (button) {
      button.classList.toggle(passwordButtonsClass + '--active');
    };

    var changeInputType = function (input) {
      var inputType = input.type;
      if (inputType === 'password') {
        input.type = 'text';
      } else {
        input.type = 'password';
      }
    };

    var onPasswordButtonClick = function (evt) {
      evt.preventDefault();
      var input = evt.target.previousElementSibling;
      changeButtonMode(evt.target);
      changeInputType(input);
    };

    buttons.forEach(function (button) {
      button.addEventListener('click', onPasswordButtonClick);
    });
  };

  initPasswordButtons('form__password-eye-button');
})();
