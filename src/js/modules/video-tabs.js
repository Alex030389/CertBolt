'use strict';

var SimpleTabs = function (buttonsClass, blocksClass) {
  let buttons = Array.from(document.querySelectorAll(buttonsClass));
  let blocks = Array.from(document.querySelectorAll(blocksClass));
  let activeButton;
  let activeBlock;
  let isButtonsLinked = false;

  const onButtonClick = function (evt) {
    evt.preventDefault();
    if (activeButton) {
      activeButton.classList.remove(buttonsClass.replace('.', '') + '--active');
    };
    evt.currentTarget.classList.add(buttonsClass.replace('.', '') + '--active');
    activeButton = evt.currentTarget;
    let buttonNumber = buttons.indexOf(evt.currentTarget);
    if (activeBlock) {
      activeBlock.style.display = '';
    };
    try {
      blocks[buttonNumber].style.display = 'block';
      activeBlock = blocks[buttonNumber];
    } catch (err) {};
  };

  const onButtonClickToScroll = evt => {
    evt.preventDefault();
    let page = $('html, body');
    page.animate({
      scrollTop: $('#video').offset().top
    }, 400);
  };

  buttons.forEach(function (button) {
    button.addEventListener('click', onButtonClick);
  });

  if (innerWidth < 480) {
    buttons.forEach(function (button) {
      button.addEventListener('click', onButtonClickToScroll);
    });
    isButtonsLinked = true;
  };

  window.addEventListener('resize', function () {
    if (innerWidth < 480 && !isButtonsLinked) {
      buttons.forEach(function (button) {
        button.addEventListener('click', onButtonClickToScroll);
      });
      isButtonsLinked = true;
    } else if (innerWidth >= 480 && isButtonsLinked) {
      buttons.forEach(function (button) {
        button.removeEventListener('click', onButtonClickToScroll);
      });
      isButtonsLinked = false;
    };
  });
};

// VideoTabs on the videocourse page
if (document.querySelector('.top__link--curriculum')) {
  var videoTabs = new SimpleTabs('.top__link--curriculum', '.video__item');
};

const onStartFreeClick = () => {
  document.querySelector('.top__link--curriculum').click();
};