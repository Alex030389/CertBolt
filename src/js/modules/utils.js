'use strict';

window.utils = {
  scrollTop: function () { // Функция прокручивает страницу в начало
    var top = Math.max(document.body.scrollTop,document.documentElement.scrollTop);
    if(top > 0) {
      window.scrollBy(0,((top+10)/-20));
      var t = setTimeout('utils.scrollTop()',10);
    } else clearTimeout(t);
    return false;
  },

  switchBlock: function (blocksClass, activateBlockNumber) {
    let blocks = Array.from(document.querySelectorAll(blocksClass));
    let activeBlock = blocks.find(function (block) {
      return block.classList.contains(blocksClass.replace('.', '') + '--active');
    });
    activeBlock.classList.remove(blocksClass.replace('.', '') + '--active');
    blocks[activateBlockNumber - 1].classList.add(blocksClass.replace('.', '') + '--active');
  },
};
