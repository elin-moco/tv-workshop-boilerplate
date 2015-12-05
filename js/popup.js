var $popup = $('#popup');

$('input[name=tabs]').on('change', function() {
  initScreenshots();
  initRelated();
});

$(window).keydown(function(evt) {
  if (evt.keyCode == 27) {
    hidePopup();
    return false;
  }
});

function initScreenshots() {
  var $screenshots = $('#screenshots');
  var flkt = $screenshots.data('flickity');
  if (!flkt && $screenshots.is(':visible')) {
    console.log('initScreenshots');
    $screenshots.flickity({
      contain: true
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
    });
  }
}

function showPopup() {
  $popup.removeClass('hide');
  initScreenshots();
  initRelated();
}

function hidePopup() {
  $popup.addClass('hide');
}

$('#close-popup').click(hidePopup);
$popup.click(function(e) {
  if (e.target == this) {
    hidePopup();
  }
});
