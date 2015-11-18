$(function() {
  $('.banners').flickity({
    pageDots: false,
    wrapAround: true,
    contain: true
  }).find('.banner').each(function(index, banner) {
    $(banner).css('background-color', Please.make_color());
  });

  $('.collections').flickity({
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
    $('.items').masonry({
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

});
