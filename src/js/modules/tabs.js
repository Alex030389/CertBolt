'use strict';

(function () {
  var initTabs = function (buttonsClass, blocksClass) {
    var DEFAULT_ACTIVE_TAB_NUMBER = 0;
    var buttons = Array.from(document.querySelectorAll('.' + buttonsClass));
    var blocks = Array.from(document.querySelectorAll('.' + blocksClass));
    var activeButtonClass = buttonsClass + '--active';
    var activeBlockClass = blocksClass + '--active';
    var hiddenBlockClass = blocksClass + '--hidden';
    var activeTabNumber;

    var setActiveTabDefault = function (number) {
      buttons[number].classList.add(activeButtonClass);
      blocks[number].classList.add(activeBlockClass);
      blocks.forEach(function (block) {
        if (!block.classList.contains(activeBlockClass)) {
          block.classList.add(hiddenBlockClass);
        }
      });
    };
    
    var initActiveTabNumber = function () {
      activeTabNumber = buttons.findIndex(function (button) {
        if (button.classList.contains(activeButtonClass)) {
          return button;
        } else {
          return false;
        }
      });
    };

    var disableOldTab = function () {
      try {
        buttons[activeTabNumber].classList.remove(activeButtonClass);
        blocks[activeTabNumber].classList.remove(activeBlockClass);
        blocks[activeTabNumber].classList.add(hiddenBlockClass);
      } catch (err) {};
    };

    var enableNewTab = function (clickedButton) {
      try {
        clickedButton.classList.add(activeButtonClass);
        initActiveTabNumber();
        blocks[activeTabNumber].classList.remove(hiddenBlockClass);
        blocks[activeTabNumber].classList.add(activeBlockClass);
      } catch (err) {};
    };

    var onButtonClick = function (evt) {
      evt.preventDefault();
      disableOldTab();
      enableNewTab(evt.currentTarget);
    };

    var initButtons = function () {
      if (buttons) {
        buttons.forEach(function (button) {
          button.addEventListener('click', onButtonClick);
        });
      }
    };

    setActiveTabDefault(DEFAULT_ACTIVE_TAB_NUMBER);
    initActiveTabNumber();
    initButtons();
  };

  if (document.querySelector('.button--tab')) {
    initTabs('button--tab', 'info__item');

    var buttonsElements = Array.from(document.querySelectorAll('.button--tab')).concat(Array.from(document.querySelectorAll('.button--tab-mobile')));

    buttonsElements.forEach(function(button) {
      button.addEventListener('click', function(evt) {
        evt.target.blur();
      });
    });
  }

  if (document.querySelector('.button--tab-mobile')) {
    initTabs('button--tab-mobile', 'info__item--mobile');
  }

  if (document.querySelector('.faq__navigation-button')) {
    initTabs('faq__navigation-button', 'faq__item');
  }

  if (document.querySelector('.modal__tab-navigation-button')) {
    initTabs('modal__tab-navigation-button', 'modal__tabs-item');
  }
})();
