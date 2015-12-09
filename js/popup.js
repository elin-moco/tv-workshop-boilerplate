var SN = SpatialNavigation;
var $popup = $('#popup');
var $comments = $('#comments');

$comments.on('sn:willfocus', function() {
  console.log('focus on comments');
  SN.pause();
});
$comments.keyup(function(evt) {
  switch (evt.keyCode) {
    case 38:
      if (0 == this.scrollTop) {
        SN.resume();
        SN.focus('#tab2');
      }
      break;
    default:
      break;
  }
});

$('input[name=tabs]').on('focus', function() {
  $(this).click();
}).on('change', function() {
  initScreenshots();
  initRelated();
});

$(window).keydown(function(evt) {
  if (evt.keyCode == 27) {
    hidePopup();
    return false;
  }
});
var onEnterPressed = function() {
  $(this).addClass('pressed');
};
var onEnterReleased = function() {
  var $this = $(this);
  $this.removeClass('pressed');
  if ($this.hasClass('banner')) {
    showPopup();
  }
};

$('.action, #close-popup, .screenshot, .rel-item')
  .on('sn:enter-down', onEnterPressed)
  .on('sn:enter-up', onEnterReleased);

function initScreenshots() {
  var $screenshots = $('#screenshots');
  var flkt = $screenshots.data('flickity');
  if (!flkt && $screenshots.is(':visible')) {
    console.log('initScreenshots');
    $screenshots.flickity({
      contain: true
    }).find('.screenshot').on('sn:willfocus', function() {
      $screenshots.flickity('select', $(this).index());
    });
  }
}

function initRelated() {
  var $related = $('#related');
  var flkt = $related.data('flickity');
  if (!flkt && $related.is(':visible')) {
    console.log('initRelated');
    $related.flickity({
      contain: true
    }).find('.rel-item').on('sn:willfocus', function() {
      $related.flickity('select', $(this).parent().index());
    });
  }
}

function showPopup() {
  $popup.removeClass('hide');
  initScreenshots();
  initRelated();
  SN.focus('popup');
}

function hidePopup() {
  $popup.addClass('hide');
  SN.focus();
}

$('#close-popup').click(hidePopup).on('sn:enter-up', hidePopup);
$popup.click(function(e) {
  if (e.target == this) {
    hidePopup();
  }
});
