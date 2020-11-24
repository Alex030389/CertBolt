$(function() {
  $('select').selectric({
    maxHeight: 310
  });
});

(function () {
  var selects = Array.from(document.querySelectorAll('.form__select'));

  var onSelectChange = function (evt) {
    console.log('1');
  };

  selects.forEach(function (select) {
    select.addEventListener('change', onSelectChange);
  });
})();