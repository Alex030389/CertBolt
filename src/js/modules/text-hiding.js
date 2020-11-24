'use strict';

(function () {

  var initHidingBlock = function (block, button, limitSymbols) {
    var BUTTON_HIDE_TEXT = 'Hide'; // Текск кнопки, что бы спрятать текст
    var isHiddenText = false; // Флаг спрятан или показан текст
    var blockText;  // Полный текст блока
    var button; // Кнопка скрытия/показа текста
    var buttonText; // Первоначальный текст кнопки

    var hideText = function () { // Прячет текст
      var limitedText = block.innerHTML.substring(0, limitSymbols) + '...';
      block.innerHTML = limitedText;
      button.textContent = buttonText;
      isHiddenText = true;
    };

    var showAllText = function () { // Показывает текст
      block.innerHTML = blockText;
      button.textContent = BUTTON_HIDE_TEXT;
      isHiddenText = false;
    };

    var initButton = function () { // Инициализирует кнопку
      button.addEventListener('click', function (evt) {
        evt.preventDefault();
        if (isHiddenText) {
          showAllText();
        } else {
          hideText();
        }
      });
    };

    var initTextHiding = function () { // Инициализирует весь функционал
      buttonText = button.textContent;
      blockText = block.innerHTML;
      initButton();
      hideText();
    };

    initTextHiding();
  };

  // ============== Initialization ================

  // About Course
  if (document.querySelector('.about-course__text')) {
    initHidingBlock(document.querySelector('.about-course__text'), document.querySelector('.about-course__button'), 381);
  }
})();
