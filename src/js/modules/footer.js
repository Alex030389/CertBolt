'use strict';

(function () {
  var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;

  var stickFooter = function () {
    var FOOTER = document.querySelector('.page-footer');
    var MAIN = document.querySelector('.page-main');
    var BODY = document.querySelector('body');
    var footerHeight = FOOTER.offsetHeight;

    BODY.style.position = 'relative';
    MAIN.style.marginBottom = footerHeight + 'px';
    FOOTER.style.position = 'absolute';
    FOOTER.style.bottom = '0';
    FOOTER.style.left = '0';
    FOOTER.style.width = '100%';
  };

  if (isIE11) {
    stickFooter();
    window.addEventListener('resize', stickFooter);
  }
})();
