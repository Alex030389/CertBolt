/////////////////////////////////////////////////////////////////////////////// Lightbox initialization
if ($('.screenshots__list').length) {
  let lightbox = $('.screenshots__list a').simpleLightbox();
}

/////////////////////////////////////////////////////////////////////////////// Object-fit polyfill initialization
objectFitImages();

/////////////////////////////////////////////////////////////////////////////// Initialization form on the License page
if (document.querySelector('.requirements__form')) {
  window.form.init(document.querySelector('.requirements__form'));
};

/////////////////////////////////////////////////////////////////////////////// Initialization form on the Login page
if (document.querySelector('.login__form')) {
  window.form.init(document.querySelector('.login__form'));
};

/////////////////////////////////////////////////////////////////////////////// Initialization form on the Registration page
if (document.querySelector('.registration__form')) {
  window.form.init(document.querySelector('.registration__form'));
};

/////////////////////////////////////////////////////////////////////////////// Initialization form of comments
if (document.querySelector('.comments__form')) {
  window.form.init(document.querySelector('.comments__form'));
};

/////////////////////////////////////////////////////////////////////////////// Initialization form on the contact-us page
if (document.querySelector('.contact-us__form')) {
  window.form.init(document.querySelector('.contact-us__form'));
};

/////////////////////////////////////////////////////////////////////////////// Initialization form on the search page
if (document.querySelector('.not-available__form')) {
  window.form.init(document.querySelector('.not-available__form'));
};

/////////////////////////////////////////////////////////////////////////////// Initialization forms in the modal New User
if (document.querySelector('.modal__form--register')) {
  window.form.init(document.querySelector('.modal__form--register'));
};

/////////////////////////////////////////////////////////////////////////////// Initialization forms of "forgot password" page
if (document.querySelector('.reset-pass__form')) {
  window.form.init(document.querySelector('.reset-pass__form'));
};

// if (document.querySelector('.modal__form--login')) {
//   window.form.init(document.querySelector('.modal__form--login'));
// };

/////////////////////////////////////////////////////////////////////////////// Initialization Phone Codes and Flags
if (document.querySelector('input[type="tel"]')) {
  window.intlTelInput(document.querySelector('input[type="tel"]'), {
    initialCountry: "auto",
    nationalMode: false,
    preferredCountries: [],
    geoIpLookup: function(success, failure) {
      $.get("https://ipinfo.io", function() {}, "jsonp").always(function(resp) {
        var countryCode = (resp && resp.country) ? resp.country : "";
        success(countryCode);
      });
    },
    utilsScript: "design/js/plugins/utils.js"
  });
}

/////////////////////////////////////////////////////////////////////////////// Initialization Smooth scroll bar
// (function () {
//   var isSmoothScrollActive = false;
//   var Scrollbar = window.Scrollbar;
//   Scrollbar.use(window.OverscrollPlugin)
//   var codePhoneScroll;
//   var modalTabContainerScroll;
//   var tableScrolls = [];
//   var selectScrolls = [];

//   var activateSmoothScroll = function () {
//     window.bodyScroll = Scrollbar.init(document.querySelector('.scroll'), {
//       plugins: {
//         // overscroll: {
//         //   effect: 'glow',
//         //   glowColor: 'rgba(0, 0, 0, 0.5)'
//         // },
//         overscroll: false,
//       },
//     });
  
//     window.onload = function () {
//       // Scroll on selectric selects
//       if (document.querySelector('.selectric-scroll')) {
//         var selects = Array.from(document.querySelectorAll('.selectric-scroll'));
//         selects.forEach(function (select, index) {
//           var selectScroll = Scrollbar.init(select, {
//             plugins: {
//               // overscroll: {
//               //   effect: 'glow',
//               //   glowColor: 'rgba(91, 124, 196, 0.6)'
//               // },
//               overscroll: false,
//             },
//           });
//           selectScrolls[index] = selectScroll;
//         });
//       }
//     };
  
//     // Scroll of tables with limit height
//     if (document.querySelector('.video__table-body')) {
//       let tables = Array.from(document.querySelectorAll('.video__table-body'));
//       tables.forEach(function (table, index) {
//         let tableScroll = Scrollbar.init(table, {
//           plugins: {
//             overscroll: false
//           },
//         });
//         tableScrolls[index] = tableScroll;
//       });
//     };

//     // Scroll in the phone field
//     if (document.querySelector('.iti__country-list')) {
//       codePhoneScroll = Scrollbar.init(document.querySelector('.iti__country-list'), {
//         plugins: {
//           // overscroll: {
//           //   effect: 'glow',
//           //   glowColor: 'rgba(91, 124, 196, 0.6)'
//           // },
//         overscroll: false,
//         },
//       });
//     }
  
//     // Initialization smooth scroll for anchor links
//     let initAnchorLinks = function () {
//       let links = Array.from(document.querySelectorAll('a[href*="#"]'));
  
//       let onAnchorLinkClick = function (evt) {
//         let linkId = '#' + evt.currentTarget.href.split('#')[1];
//         if (linkId !== '#') {
//           var blockTarget = document.querySelector(linkId);
//         };
  
//         if (blockTarget) {
//           window.bodyScroll.scrollIntoView(blockTarget);
//         };
//       };
  
//       if (links) {
//         links.forEach(function (link) {
//           link.addEventListener('click', onAnchorLinkClick);
//         });
//       };
//     };

//     // Scroll on modal tabs
//     if (document.querySelector('.modal__right-content')) {
//       modalTabContainerScroll = Scrollbar.init(document.querySelector('.modal__right-content'), {
//         plugins: {
//           // overscroll: {
//           //   effect: 'glow',
//           //   glowColor: 'rgba(91, 124, 196, 0.6)'
//           // },
//         overscroll: false,
//         },
//       });
//       Array.from(document.querySelectorAll('.modal__tab-navigation-button')).forEach((button) => {
//         button.addEventListener('click', function () {
//           modalTabContainerScroll.update();
//         });
//       });
//     }

//     if (document.querySelector('.feedbacks__view-all-button')) {
//       const buttons = Array.from(document.querySelectorAll('.feedbacks__view-all-button'));

//       buttons.forEach((button) => {
//         button.addEventListener('click', function () {
//           setTimeout(function () {
//             window.bodyScroll.update()
//           }, 350);
//         });
//       });
//     }
  
//     initAnchorLinks();
//     isSmoothScrollActive = true;
//   };

//   let deactivateSmoothScroll = function () {
//     selectScrolls.forEach(function (selectScroll) {
//       selectScroll.destroy();
//     });
//     tableScrolls.forEach(function (tableScroll) {
//       tableScroll.destroy();
//     });
//     if (window.bodyScroll) {
//       window.bodyScroll.destroy();
//     }
//     codePhoneScroll && codePhoneScroll.destroy();
//     modalTabContainerScroll && modalTabContainerScroll.destroy();
//     isSmoothScrollActive = false;
//   };

//   if (innerWidth >= 1024) {
//     activateSmoothScroll();
//   };
  

//   window.addEventListener('resize', function () {
//     if (innerWidth >= 1024 && !isSmoothScrollActive) {
//       activateSmoothScroll();
//     } else if (innerWidth < 1024 && isSmoothScrollActive) {
//       deactivateSmoothScroll();
//     };
//   });

//   window.deactivateSmoothScroll = deactivateSmoothScroll;
//   window.activateSmoothScroll = activateSmoothScroll;

//   // Initialization smooth scroll for anchor links (starting from tablet version)
//   let page = $('html, body');

//   $('a[href*="#"]').click(function(evt) {
//     if (evt.currentTarget.href.split('#')[1]) {
//       page.animate({
//         scrollTop: $($.attr(this, 'href')).offset().top
//       }, 400);
//       return false;
//     };
//   });
// })();

/////////////////////////////////////////////////////////////////////////////// Initialization Login/Registration in modal

// if (document.querySelector('.modal__switch-button--login')) {
//   const modalLoginRegistartion = new FormSections({
//     loginButton: '.registration__link',
//     registrationButton: '.modal__switch-button--register',
//     section: '.modal__part-wrapper'
//   });
// };

//////////////////////////////////////////////////////////////////////////////////////////// Modal windows

// Modal Discount 30%
if (document.querySelector('.modal--discount')) {
  var discountModal = new Modal({
    modalClass: 'modal--discount',
    overlayClass: 'overlay',
    closeButtonClass: 'modal__close'
  });
};

// Modal Purchase Help
if (document.querySelector('.modal--purchase-help')) {
  var purchaseHelpModal = new Modal({
    modalClass: 'modal--purchase-help',
    overlayClass: 'overlay',
    closeButtonClass: 'modal__close',
    callButtonClass: 'order__link'
  });
};

// Modal Free Download
if (document.querySelector('.modal--new-user2')) {
  var newUserModal = new Modal({
    modalClass: 'modal--new-user2',
    overlayClass: 'overlay',
    closeButtonClass: 'modal__close',
    callButtonClass: 'info__submit-button--free-download'
  });
};

// Button of mobile version
// if (document.querySelector('.modal--new-user')) {
//   var newUserMobileModal = new Modal({
//     modalClass: 'modal--new-user',
//     overlayClass: 'overlay',
//     closeButtonClass: 'modal__close',
//     callButtonClass: 'info__submit-button--free-download'
//   });
// };

/////////////////////////////////////////////////////////////// lazy
var lazyLoadInstance = new LazyLoad({
	elements_selector: ".lazy"
});

/////////////////////////////////////////////////////////////// submenu__icon
var mainMenu = document.querySelector(".page-header__main-menu");
if(getComputedStyle(mainMenu).display != 'none') {
  submenuIconArrLoad();
  setTimeout(function() {
    mobileMenuIconLoad();
  }, 3000);
} else {
  setTimeout(function() {
    mobileMenuIconLoad();
    setTimeout(function() {
      submenuIconArrLoad();    
    }, 2000);
  },1000);
}

function mobileMenuIconLoad() {
  var mobileMenuIcon = document.querySelectorAll('.mobile-menu__vendor-icon');
  if(mobileMenuIcon.length) {
    for (var i = 0; i < mobileMenuIcon.length; i++)  {
      mobileMenuIcon[i].setAttribute('src', mobileMenuIcon[i].getAttribute('data-src'));
      mobileMenuIcon[i].removeAttribute('data-src');
    }
  }
}

function submenuIconArrLoad() {
  var submenuIconArr = document.querySelectorAll('.submenu__icon');
  for (var i = 0; i < submenuIconArr.length; i++)  {
    submenuIconArr[i].setAttribute('src', submenuIconArr[i].getAttribute('data-src'));
    submenuIconArr[i].removeAttribute('data-src');
  }
}