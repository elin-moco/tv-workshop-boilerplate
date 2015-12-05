$(function() {
  var $popup = $('#popup');

  $('#banners').flickity({
    pageDots: false,
    wrapAround: true,
    contain: true
  }).find('.banner').each(function(index, banner) {
    $(banner).click(showPopup).css('background-color', Please.make_color());
  });

  $('#collections').flickity({
    pageDots: false,
    cellAlign: 'left',
    contain: true
  }).find('.collection').each(function(index, collection) {
    $(collection).text(index + 1)
      .css('background-color', Please.make_color());
  });

  var itemCount = 0;
  $('.item').each(function(index, item) {
    $(item).css('background-color', Please.make_color())
      .height(Math.round(Math.random() * 300) + 300)
      .text(++itemCount);
  }).promise().then(function() {
    $('#items').masonry({
      gutter: 10,
      isFitWidth: true
    }).infinitescroll({
      loading: {
        img: 'img/cube.gif',
        msgText: 'Loading...'
      },
      itemSelector: '.item'
    }, function(newItems) {
      var $newItems = $(newItems);
      $newItems.each(function(index, newItem) {
        $(newItem).css('background-color', Please.make_color())
          .height(Math.round(Math.random() * 300) + 150)
          .text(++itemCount);
      });
      $(this).masonry('appended', $newItems);
    });
  });

  $('input[name=tabs]').on('change', function() {
    initScreenshots();
    initRelated();
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
});
