'use strict';

(function () {
  //
  // First top slider on the index-page
  //
  if (document.querySelector('.top__list-wrapper--vendor')) {
    var topSlider = new Swiper('.top__list-wrapper--vendor', {
      slidesPerView: 'auto',
      lazy: {
        loadPrevNext: true,
        loadPrevNextAmount: 7,
        loadOnTransitionStart: true
      },
      scrollbar: {
        el: '.top__slider-pagination--vendor'
      },
      navigation: {
        nextEl: '.top__vendor-slider-button--next',
        prevEl: '.top__vendor-slider-button--previous',
      },
      breakpoints: {
        425: {
          lazy: {
            loadPrevNext: true,
            loadPrevNextAmount: 4,
            loadOnTransitionStart: true
          }
        }
      }
    });
  }


  if (document.querySelector('.comments-v2__list-container')) {
    var commentsSlider = new Swiper('.comments-v2__list-container', {
      slidesPerView: 'auto',
      spaceBetween: 20,
      scrollbar: {
        el: '.top__slider-pagination--comments-v2'
      },
      navigation: {
        nextEl: '.top__featured-slider-button--next',
        prevEl: '.top__featured-slider-button--previous',
      },
      breakpoints: {
        576: {
          autoHeight: true
        }
      }      
    });
  }

 
  // ============================================================ trim string 
  if($('.comments-v2__item > .comments-v2__text').length && $(window).width() > 576) {

    for(let i = 0; i < $('.comments-v2__text').length; i++) {
      if($('.comments-v2__text').eq(i).text().length >= 150) {
        $('.comments-v2__text').eq(i).css({'cursor': 'pointer'});
        $('.comments-v2__text').eq(i).on('click', function() {
          $(this).text($(this).data('comment'));
          $(this).css({'cursor': 'auto'})
        })
      }
    }

    trimString(".comments-v2__item > .comments-v2__text", 150);

    function trimString(string, stringLength) {
      $(string).text(function (i, text) {
        if (text.length >= stringLength) {
          stringLength -= 5;
          text = text.substring(0, stringLength);
          var lastIndex = text.lastIndexOf(" "); // last space position
          text = text.substring(0, lastIndex) + '...'; // cut to the last word
        }
        $(this).text(text);
      });
    }
  }
  
  //
  // Second top slider on the index-page
  //
  if (document.querySelector('.top__list-wrapper--certifications')) {
    var topSlider2 = new Swiper('.top__list-wrapper--certifications', {
      slidesPerView: 'auto',
      lazy: {
        loadPrevNext: true,
        loadPrevNextAmount: 7,
        loadOnTransitionStart: true
      },
      scrollbar: {
        el: '.top__slider-pagination--certifications'
      },
      navigation: {
        nextEl: '.top__certifications-slider-button--next',
        prevEl: '.top__certifications-slider-button--previous',
      },
      breakpoints: {
        425: {
          lazy: {
            loadPrevNext: true,
            loadPrevNextAmount: 4,
            loadOnTransitionStart: true
          }
        }
      }
    });
  }

  //
  // Featured slider on the index-page
  //
  // Function of adaptive initialization of a slider of top products
  var initFeaturedSlider = function (sliderContainerClass, sideOverlayClass) {
    var isFeaturedSliderActivated = false; // Activation slaider flag
    var featuredSlider; // Object of slider
    var leftOverlay = document.querySelector(sliderContainerClass).querySelector(sideOverlayClass + '--left');
    var rightOverlay = document.querySelector(sliderContainerClass).querySelector(sideOverlayClass + '--right');
    
  
    var activateSlider = function () { // Activation slider function
      featuredSlider = new Swiper(sliderContainerClass, {
        slidesPerView: 'auto',
        scrollbar: {
          el: '.top__slider-pagination--featured',
        },
        navigation: {
          nextEl: '.top__featured-slider-button--next',
          prevEl: '.top__featured-slider-button--previous',
        },
        on: {
          reachBeginning: function () {
            if (leftOverlay) {
              leftOverlay.classList.add(sideOverlayClass.replace('.', '') + '--hidden');
            }
          },
          reachEnd: function () {
            if (rightOverlay) {
              rightOverlay.classList.add(sideOverlayClass.replace('.', '') + '--hidden');
            }
          },
          fromEdge: function () {
            if (rightOverlay && leftOverlay) {
              rightOverlay.classList.remove(sideOverlayClass.replace('.', '') + '--hidden');
              leftOverlay.classList.remove(sideOverlayClass.replace('.', '') + '--hidden');
            }
          },
        }
      });
      isFeaturedSliderActivated = true;
    };

    var deactivateSlider = function () { // Deactivation slider function
      featuredSlider.destroy();
      isFeaturedSliderActivated = false;
    };

    window.addEventListener('resize', function () {
      if (innerWidth > 480 && isFeaturedSliderActivated === false) {
        activateSlider();
      } else if (innerWidth <= 480 && isFeaturedSliderActivated === true) {
        deactivateSlider();
      }
    });

    if (innerWidth >= 480) {
      activateSlider();
    }
  };

  if (document.querySelector('.top__list-wrapper--featured')) {
    initFeaturedSlider('.top__list-wrapper--featured');
  }
  
  //
  // Gallery slider on the post-page
  //
  if (document.querySelector('.post__gallery')) {
    var gallerySlider = new Swiper('.post__gallery', {
      pagination: {
        el: '.gallery__pagination',
        type: 'fraction',
      },
      navigation: {
        nextEl: '.gallery__button--next',
        prevEl: '.gallery__button--previous',
      },
    });
  }

  //
  // Related posts slider on the post-page
  //
  if (document.querySelector('.related__list-wrapper')) {
    var topSlider = new Swiper('.related__list-wrapper', {
      slidesPerView: 'auto',
      scrollbar: {
        el: '.related__slider-pagination'
      },
      navigation: {
        nextEl: '.related__slider-button--next',
        prevEl: '.related__slider-button--previous',
      },
      touchReleaseOnEdges: true,
    });
  }

  //
  // Screenshots slider on the certification-page
  //
  if (document.querySelector('.screenshots__list-wrapper')) {
    var screenshotsSlider = new Swiper('.screenshots__list-wrapper', {
      slidesPerView: 4,
      spaceBetween: 5,
      navigation: {
        nextEl: '.screenshots__button--next',
        prevEl: '.screenshots__button--previous',
      },
    });
  }

  //
  // Results slider on the certification-page
  //
  var initResultsSlider = function (sliderContainerClass) {
    var isResultsSliderActivated = false; // Activation slaider flag
    var resultsSlider; // Object of slider

    var activateSlider = function () { // Activation slider function
      resultsSlider = new Swiper(sliderContainerClass, {
        slidesPerView: 1,
        navigation: {
          nextEl: '.results__slider-button--next',
          prevEl: '.results__slider-button--previous',
        },
      });
      isResultsSliderActivated = true;
    };

    var deactivateSlider = function () { // Deactivation slider function
      resultsSlider.destroy();
      isResultsSliderActivated = false;
    };

    window.addEventListener('resize', function () {
      if (innerWidth <= 768 && isResultsSliderActivated === false) {
        activateSlider();
      } else if (innerWidth > 768 && isResultsSliderActivated === true) {
        deactivateSlider();
      }
    });

    if (innerWidth <= 768) {
      activateSlider();
    }
  };

  if (document.querySelector('.results__list-wrapper')) {
    initResultsSlider('.results__list-wrapper');
  }

  //
  // Purchase slider on the certification-page
  //
  var initPurchaseSlider = function (sliderContainerClass) {
    var isPurchaseSliderActivated = false; // Activation slaider flag
    var purchaseSlider; // Object of slider

    var activateSlider = function () { // Activation slider function
      purchaseSlider = new Swiper(sliderContainerClass, {
        slidesPerView: 1,
        navigation: {
          nextEl: '.purchase__slider-button--next',
          prevEl: '.purchase__slider-button--previous',
        },
      });
      isPurchaseSliderActivated = true;
    };

    var deactivateSlider = function () { // Deactivation slider function
      purchaseSlider.destroy();
      isPurchaseSliderActivated = false;
    };

    window.addEventListener('resize', function () {
      if (innerWidth <= 992 && isPurchaseSliderActivated === false) {
        activateSlider();
      } else if (innerWidth > 992 && isPurchaseSliderActivated === true) {
        deactivateSlider();
      }
    });

    if (innerWidth <= 992) {
      activateSlider();
    }
  };

  if (document.querySelector('.purchase__list-wrapper')) {
    initPurchaseSlider('.purchase__list-wrapper');
  }

  //
  // Tab labels slider on the certification-page
  //
  if (document.querySelector('.info__tab-list-wrapper')) {
    var tabLabelsSlider = new Swiper('.info__tab-list-wrapper', {
      slidesPerView: 'auto',
      scrollbar: {
        el: '.info__slider-pagination',
        hide: true,
      },
      touchReleaseOnEdges: true,
    });
  }

  if (document.querySelector('.info__tab-list-wrapper-mobile')) {
    var tabLabelsSliderMobile = new Swiper('.info__tab-list-wrapper-mobile', {
      slidesPerView: 'auto',
      scrollbar: {
        el: '.info__slider-pagination',
        hide: true,
      },
      touchReleaseOnEdges: true,
    });
  }

  //
  // One product Screenshots slider
  //
  if (document.querySelector('.info__screenshots-wrapper')) {
    var oneProductScreenshotsSlider = new Swiper('.info__screenshots-wrapper', {
      loop: true,
      slidesPerView: 'auto',
      centeredSlides: true,
      pagination: {
        el: '.info__swiper-pagination',
        clickable: true
      },
      navigation: {
        nextEl: '.info__slider-button--next',
        prevEl: '.info__slider-button--previous',
      },
    });
  }

  //
  // Curriculum slider on the videocourse-page
  //
  if (document.querySelector('.top__list-wrapper--curriculum')) {
    initFeaturedSlider('.top__list-wrapper--curriculum', '.curriculum__overlay');
  }

  //
  // Videotutorials sliders (multiinitializations)
  //
  if (document.querySelector('.videotutorials__list-wrapper')) {
    let videotutorialsSliders = Array.from(document.querySelectorAll('.videotutorials__list-wrapper'));
    let paginationClass = 'videotutorials__slider-pagination-';
    let buttonNextClass = 'videotutorials__slider-button--next-';
    let buttonPreviousClass = 'videotutorials__slider-button--previous-';

    videotutorialsSliders.forEach(function (slider, index) {
      slider.parentNode.querySelector('.videotutorials__slider-pagination').classList.add(paginationClass + index);
      slider.parentNode.querySelector('.videotutorials__slider-button--next').classList.add(buttonNextClass + index);
      slider.parentNode.querySelector('.videotutorials__slider-button--previous').classList.add(buttonPreviousClass + index);

      var videotutorialSlider = new Swiper (slider, {
        slidesPerView: 'auto',
        lazy: {
          loadPrevNext: true,
          loadPrevNextAmount: 7,
          loadOnTransitionStart: true
        },
        breakpoints: {
          425: {
            lazy: {
              loadPrevNext: true,
              loadPrevNextAmount: 3,
              loadOnTransitionStart: true
            }
          }
        },
        scrollbar: {
          el: '.videotutorials__slider-pagination-' + index,
        },
        navigation: {
          nextEl: '.videotutorials__slider-button--next-' + index,
          prevEl: '.videotutorials__slider-button--previous-' + index,
        }
      });
    });
  };
})();
