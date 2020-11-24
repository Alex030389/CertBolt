'use strict';

(function () {
  var MENU_ACTIVE_CLASS = 'page-header__search-form-wrapper--active';
  var searchElement = document.querySelector('.page-header__search-form-wrapper');
  var searchButtonOpenElement = document.querySelector('.page-header__search-button');

  var initSearch = function (searchButtonOpenElement, searchElement) {
    var toggleSearch = function () {
      searchElement.classList.toggle(MENU_ACTIVE_CLASS);
    };

    var onSearchButtonOpenClick = function (evt) {
      evt.preventDefault();
      toggleSearch();
    };

    searchButtonOpenElement.addEventListener('click', onSearchButtonOpenClick);
  };

  if (searchButtonOpenElement) {
    initSearch(searchButtonOpenElement, searchElement);
  }
})();
