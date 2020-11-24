'use strict';

const LoadMore = function (buttonClass, itemsClass, showItemsNumber = 4) {
  const button = document.querySelector(buttonClass);
  const items = Array.from(document.querySelectorAll(itemsClass));
  let isInited = false;

  const init = () => {
    items.forEach((item, index) => {
      if (index >= showItemsNumber) {
        item.style.display = 'none';
      };
    });
  };

  const destroy = () => {
    items.forEach((item) => {
      item.style.display = '';
    });
  };

  const showItems = (items) => {
    items.forEach((item) => item.style.display = '');
  };

  const onButtonClick = (evt) => {
    evt.preventDefault();
    const hidedItems = items.filter((item) => item.style.display === 'none');
    const nextPartHidedItems = hidedItems.slice(0, showItemsNumber);

    if (hidedItems.length > showItemsNumber) {
      showItems(nextPartHidedItems);
    } else if (hidedItems.length > 0 && hidedItems.length <= showItemsNumber) {
      showItems(nextPartHidedItems);
      button.style.display = 'none';
    };
  };


  button.addEventListener('click', onButtonClick);

  if (innerWidth <= 480) {
    init();
    isInited = true;
  };
  
  window.addEventListener('resize', () => {
    if (innerWidth <= 480 && isInited === false) {
      init();
      isInited = true;
    } else if (innerWidth > 480 && isInited === true) {
      destroy();
      isInited = false;
    };
  });
};

try {
  const featuredLoadMore = new LoadMore ('.top__load-button', '.top__item--featured');
  const curriculumLoadMore = new LoadMore ('.top__load-button', '.top__item--curriculum');
} catch (err) {};
