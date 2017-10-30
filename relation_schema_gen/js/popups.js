(function ($) {
  'use strict';
  $('.trigger-popup').magnificPopup({
    type:'inline',
    showCloseBtn: false,
    mainClass: 'mfp-anim',
    removalDelay: 300
  });
  // custom close button
  $('.popup-close-btn').on('click', $.magnificPopup.instance.close);
})(jQuery);
