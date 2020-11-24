'use strict';

// Main function of initialization
let Modal = function (options) {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var MODAL_CALL_BUTTONS = Array.from(document.querySelectorAll('.' + options.callButtonClass));
  var OVERLAY = document.querySelector('.' + options.overlayClass);
  var MODAL = OVERLAY.querySelector('.' + options.modalClass);
  var CLOSE_BUTTONS = Array.from(MODAL.querySelectorAll('.' + options.closeButtonClass));
  var DOCUMENT_BODY = document.querySelector('body');
  var shutDownPopup = new CustomEvent('shutDownPopup');

  // Blocks the body
  var blockBody = function () {
    DOCUMENT_BODY.style.overflow = 'hidden';
  };

  // Unblocks the body
  var unblockBody = function () {
    DOCUMENT_BODY.style.overflow = '';
  };

  // By clicking on the popup closes
  var onCloseButtonClick = function (evt) {
    evt.preventDefault();
    closeModal();
  };

  // By press Enter on the cross popup closes
  var onCloseButtonKeydown = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      evt.preventDefault();
      closeModal();
    }
  };

  // By press Esc popup closes
  var onWindowKeydown = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      evt.preventDefault();
      closeModal();
    }
  };

  // By clicking on the overlay popup closes
  var onOverlayClick = function (evt) {
    if (evt.target === OVERLAY) {
      closeModal();
    }
  };

  // Show overlay
  var showOverlay = function () {
    OVERLAY.style.display = 'flex';
    setTimeout(function () {
      OVERLAY.classList.add(options.overlayClass + '--active');
    }, 10);
  };

  // Hide overlay
  var hideOverlay = function () {
    OVERLAY.classList.remove(options.overlayClass + '--active');
    setTimeout(function () {
      OVERLAY.style.display = '';
    }, 300);
  };

  // Show modal
  var showModal = function () {
    MODAL.style.display = 'block';
    setTimeout(function () {
      MODAL.classList.add('modal--active');
    }, 10);
  };

  // Hide modal
  var hideModal = function () {
    MODAL.classList.remove('modal--active');
    setTimeout(function () {
      MODAL.style.display = '';
    }, 300);
  };

  // Opens the popup and adds eventListeners
  var openModal = function () {
    blockBody();
    showOverlay();
    showModal();
    CLOSE_BUTTONS.forEach((button) => button.addEventListener('click', onCloseButtonClick));
    CLOSE_BUTTONS.forEach((button) => button.addEventListener('keydown', onCloseButtonKeydown));
    // CLOSE_BUTTON.addEventListener('click', onCloseButtonClick);
    // CLOSE_BUTTON.addEventListener('keydown', onCloseButtonKeydown);
    window.addEventListener('keydown', onWindowKeydown);
    OVERLAY.addEventListener('mousedown', onOverlayClick);
  };

  // Closes the popup and removes eventListeners
  var closeModal = function () {
    unblockBody();
    hideModal();
    hideOverlay();
    CLOSE_BUTTONS.forEach((button) => button.removeEventListener('click', onCloseButtonClick));
    CLOSE_BUTTONS.forEach((button) => button.removeEventListener('keydown', onCloseButtonKeydown));
    // CLOSE_BUTTON.removeEventListener('click', onCloseButtonClick);
    // CLOSE_BUTTON.removeEventListener('keydown', onCloseButtonKeydown);
    window.removeEventListener('keydown', onWindowKeydown);
    OVERLAY.removeEventListener('mousedown', onOverlayClick);
    MODAL.dispatchEvent(shutDownPopup);
  };

  // By clicking on the button openes popup
  var onButtonClick = function (evt) {
    evt.preventDefault();
    openModal();
  };

  this.open = openModal;
  this.close = closeModal;
  this.popup = MODAL;
  
  if (MODAL_CALL_BUTTONS !== null) {
    MODAL_CALL_BUTTONS.forEach(function (button) {
      button.addEventListener('click', onButtonClick);
    });
  };
};
