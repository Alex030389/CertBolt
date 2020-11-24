let FormParts = function (options) {
  let parts = Array.from(document.querySelectorAll(options.partsClass));
  let activePart = document.querySelector(options.partsClass + '--active')
  let progressBar = document.querySelector(options.progressBar.containerClass);
  let activePartNumber = parts.indexOf(activePart);

  let updateActivePartNumber = function () {
    activePartNumber = parts.indexOf(activePart);
  };

  let setNextStepBar = function () {
    if (progressBar.classList.contains(options.progressBar.containerClass.replace('.', '') + '--first-step')) {
      progressBar.classList.remove(options.progressBar.containerClass.replace('.', '') + '--first-step');
      progressBar.classList.add(options.progressBar.containerClass.replace('.', '') + '--second-step');
      return;
    } else if (progressBar.classList.contains(options.progressBar.containerClass.replace('.', '') + '--second-step')) {
      progressBar.classList.remove(options.progressBar.containerClass.replace('.', '') + '--second-step');
      progressBar.classList.add(options.progressBar.containerClass.replace('.', '') + '--last-step');
      return;
    } else {
      return;
    };
  };

  let setPreviousStepBar = function () {
    if (progressBar.classList.contains(options.progressBar.containerClass.replace('.', '') + '--last-step')) {
      progressBar.classList.remove(options.progressBar.containerClass.replace('.', '') + '--last-step');
      progressBar.classList.add(options.progressBar.containerClass.replace('.', '') + '--second-step');
      return;
    } else if (progressBar.classList.contains(options.progressBar.containerClass.replace('.', '') + '--second-step')) {
      progressBar.classList.remove(options.progressBar.containerClass.replace('.', '') + '--second-step');
      progressBar.classList.add(options.progressBar.containerClass.replace('.', '') + '--first-step');
      return;
    } else {
      return;
    };
  };

  let setNextPart = function () {
    parts[activePartNumber].classList.remove(options.partsClass.replace('.', '') + '--active');
    parts[activePartNumber + 1].classList.add(options.partsClass.replace('.', '') + '--active');
    activePart = parts[activePartNumber + 1];
    updateActivePartNumber();
    if (progressBar) {
      setNextStepBar();
    };
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  };

  let setPreviousPart = function () {
    parts[activePartNumber].classList.remove(options.partsClass.replace('.', '') + '--active');
    parts[activePartNumber - 1].classList.add(options.partsClass.replace('.', '') + '--active');
    activePart = parts[activePartNumber - 1];
    updateActivePartNumber();
    if (progressBar) {
      setPreviousStepBar();
    };
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  };

  let initPreviousButtons = function () {
    let buttons = Array.from(document.querySelectorAll(options.previousButtonsClass));

    buttons.forEach(function (button) {
      button.addEventListener('click', setPreviousPart);
    });
  };

  // First part
  let initFirstPart = function () {
    let buttonNext = parts[0].querySelector(options.firstPartNextButtonClass);

    let onButtonNextClick = function (evt) {
      evt.preventDefault();
      setNextPart();
    };

    buttonNext.addEventListener('click', onButtonNextClick);
  };

  // Second Part
  let initSecondPart = function () {
    let buttonNext = parts[1].querySelector(options.otherPartNextButtonClass);

    let onButtonNextClick = function (evt) {
      evt.preventDefault();
      if (window.form.validate(parts[1])) {
        setNextPart();
      };
    };

    let addFieldsListeners = function (block) {
      let fields = Array.from(block.querySelectorAll('input[required]')).concat(Array.from(block.querySelectorAll('select[required]')));

      fields.forEach(function (field) {
        if (field.tagName === 'SELECT') {
          field.addEventListener('change', function (evt) {
            if (window.form.checkValueFields(fields)) {
              buttonNext.removeAttribute('disabled');
            };
          });
        } else {
          field.addEventListener('input', function (evt) {
            if (window.form.checkValueFields(fields)) {
              buttonNext.removeAttribute('disabled');
            };
          });
        };
      });
    };

    addFieldsListeners(parts[1]);
    buttonNext.addEventListener('click', onButtonNextClick);
  };

  // Last Part
  let initLastPart = function () {
    let form = document.querySelector(options.formClass);
    let buttonSubmit = parts[2].querySelector(options.submitButtonClass);

    let onButtonSubmitClick = function (evt) {
      evt.preventDefault();
      if (window.form.validate(form)) {
        form.submit();
      };
    };

    buttonSubmit.addEventListener('click', onButtonSubmitClick);
  };

  initPreviousButtons();
  initFirstPart();
  initSecondPart();
  initLastPart();
};

if (document.querySelector('.form__checkout-part')) {
  let checkoutForm = new FormParts({
    formClass: '.data__form',
    partsClass: '.form__checkout-part',
    firstPartNextButtonClass: '.order__next-button',
    previousButtonsClass: '.data__navigation-button--previous',
    otherPartNextButtonClass: '.data__navigation-button--next',
    submitButtonClass: '.data__form-submit-button',
    inputWrapperClass: '.form__field-wrapper',
    selectWrapperClass: '.form__select-wrapper',
    formHintClass: '.form__hint',
    progressBar: {
      containerClass: '.checkout-bar__list',
      pointClass: '.checkout-bar__item'
    },
  });
};
