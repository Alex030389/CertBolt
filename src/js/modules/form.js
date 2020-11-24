'use strict';

// $(function() {
//   if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
//     $('.form__field').addClass('form__field--border-for-safary');
//   }
// });

(function () {
  let formHintClassName = '.form__hint';
  let selectWrapperClass = '.form__select-wrapper';

  let createHint = function (message) {
    let hint = document.createElement('p');
    hint.className = formHintClassName.replace('.', '');
    hint.textContent = message;
    return hint;
  };

  let showHint = function (fieldWrapper, message) {
    if (!fieldWrapper.querySelector(formHintClassName)) {
      const field = fieldWrapper.querySelector('input') || fieldWrapper.querySelector('textarea');
      let hint = createHint(message);

      if (field.id === 'requirements-code' && !fieldWrapper.parentNode.parentNode.querySelector(formHintClassName)) {
        fieldWrapper.parentNode.parentNode.appendChild(hint);
      } else if (field.id !== 'requirements-code') {
        fieldWrapper.appendChild(hint);
      }
    };
  };

  let initSelectWrapper = function (field) {
    let container = field.parentNode;
    while (!container.classList.contains(selectWrapperClass.replace('.', ''))) {
      container = container.parentNode;
    }
    return container;
  };

  let onFieldInput = function (evt) {
    if (evt.target.id === 'requirements-code') {
      let hint = evt.target.parentNode.parentNode.parentNode.querySelector(formHintClassName);

      if (hint) {
        evt.target.parentNode.parentNode.parentNode.removeChild(hint);
      };
    } else {
      let hint = evt.target.parentNode.querySelector(formHintClassName);

      if (hint) {
        evt.target.parentNode.removeChild(hint);
      };
    }
  };

  let onSelectChange = function (evt) {
    let selectWrapper = initSelectWrapper(evt.target);
    let hint = selectWrapper.querySelector(formHintClassName);
    if (hint) {
      selectWrapper.removeChild(hint);
    }
  };

  let onSelectricClick = function (evt) {
    let selectWrapper = initSelectWrapper(evt.currentTarget);
    let hint = selectWrapper.querySelector(formHintClassName);
    if (hint) {
      selectWrapper.removeChild(hint);
    }
  };

  let onRadioChange = function (evt) {
    let hint = evt.target.parentNode.parentNode.querySelector(formHintClassName);
    if (hint) {
      evt.target.parentNode.parentNode.removeChild(hint);
    };
  };

  let validateEmail = function (string) {
    let regular = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regular.test(string);
  };

  let addFieldsListeners = function (fields) {
    fields.forEach(function (field) {
      if (field.tagName === 'SELECT') {
        let wrapper = initSelectWrapper(field);
        let selectricOptions = Array.from(wrapper.querySelectorAll('li'));
        field.addEventListener('change', onSelectChange);
        selectricOptions.forEach(function (element) {
          element.addEventListener('click', onSelectricClick)
        });
      } else if (Array.isArray(field)) {
        field.forEach((input) => input.addEventListener('change', onRadioChange));
      } else {
        field.addEventListener('input', onFieldInput);
      };
    });
  };

  let isSomeRadioChecked = function (inputs) {
    for (let input of inputs) {
      if (input.checked) {
        return true;
      }
    }

    return false;
  };

  let checkValueFields = function (fields) {
    for (let i = 0; i < fields.length; i++) {
      if (!Array.isArray(fields[i])) {
        if (!fields[i].value) {
          return false;
        };
      } else if (fields[i][0]) {
        if (!isSomeRadioChecked(fields[i])) {
          return false;
        }
      }
    };

    return true;
  };

  let checkFields = function (fields) {
    let invalidFields = [];
    let isEmailValid = true;
    let password = '';
    let isPasswordsSame = true;
    
    fields.forEach(function (field) {
      if (field.tagName === 'SELECT' && field.value === '') {
        let selectWrapper = initSelectWrapper(field);
        showHint(selectWrapper, 'Please select one of the options');
        invalidFields.push(field);
      } else if (field.type === 'email' && field.value === '') {
        showHint(field.parentNode, 'Please enter your email');
        isEmailValid = false;
        invalidFields.push(field);
      } else if (field.type === 'email' && !validateEmail(field.value)) {
        showHint(field.parentNode, 'Please enter correct email');
        isEmailValid = false;
        invalidFields.push(field);
      } else if (field.type === 'email' && validateEmail(field.value)) {
        isEmailValid = true;
      } else if (field.type === 'password' && !field.value) {
        showHint(field.parentNode, 'Please enter password');
      } else if (Array.isArray(field) && field[0] && !isSomeRadioChecked(field)) {
        showHint(field[0].parentNode.parentNode, 'Please rate this course');
      } else if (field.type === 'password' && field.value) {
        if (password && password !== field.value) {
          isPasswordsSame = false;
          showHint(field.parentNode, 'Passwords should match');
        } else if (!password) {
          password = field.value;
        };
      } else if (field.value === '') {
        showHint(field.parentNode, 'Please fill in this field');
        invalidFields.push(field);
      };
    });
    if (invalidFields[0]) {
      invalidFields[0].focus();
    };

    return checkValueFields(fields) && isEmailValid && isPasswordsSame ? true : false;
  };

  let validateFields = function (block) {
    let fields = Array.from(
      Array.from(block.querySelectorAll('input[required]')))
      .concat(Array.from(block.querySelectorAll('select[required]')))
      .concat(Array.from(block.querySelectorAll('textarea[required]'))
    );

    const radios = Array.from(block.querySelectorAll('input[name="rate_course"]'));

    if (radios) {
      fields.push(radios);
    }
    
    addFieldsListeners(fields);
    return checkFields(fields);
  };

  let initForm = function (form) {
    let submitButton = form.querySelector('button[type="submit"]');

    if (submitButton) {
      submitButton.addEventListener('click', function (evt) {
        evt.preventDefault();
        
        if (validateFields(form)) {
          form.submit();
        };
      });
    }
  };

  window.form = {
    validate: validateFields,
    checkValueFields: checkValueFields,
    init: initForm
  };
})();

// Animation of recapcha button
(function () {
  const buttonRacapchaClass = '.form__recapcha-refresh';
  let button = document.querySelector(buttonRacapchaClass);

  if (button) {
    button.addEventListener('click', function(evt) {
      evt.preventDefault();
      button.classList.add(buttonRacapchaClass.replace('.', '') + '--active');
      setTimeout(function () {
        button.classList.remove(buttonRacapchaClass.replace('.', '') + '--active');
      }, 500);
    });
  }
})();
