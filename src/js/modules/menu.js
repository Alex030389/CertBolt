'use strict';
var Menu = function (menuButtonOpen, menuButtonClose, menu) {
  var MENU_ACTIVE_CLASS = menu.replace('.', '') + '--active';
  var menuElement = document.querySelector(menu);
  var menuButtonOpenElement = document.querySelector(menuButtonOpen);
  var menuButtonCloseElement = document.querySelector(menuButtonClose);

  var toggleMenu = function () {
    menuElement.classList.toggle(MENU_ACTIVE_CLASS);
  };

  var onMenuButtonClick = function (evt) {
    evt.preventDefault();
    toggleMenu();
  };
  this.toggle = toggleMenu;

  menuButtonOpenElement.addEventListener('click', onMenuButtonClick);
  menuButtonCloseElement.addEventListener('click', onMenuButtonClick);
};

if (document.querySelector('.mobile-menu')) {
  var mobileMenu = new Menu('.page-header__menu-button', '.mobile-menu__close-button', '.mobile-menu');
}
