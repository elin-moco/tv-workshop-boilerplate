$(function() {
  // A short name of the SpatialNavigation singleton object.
  var SN = SpatialNavigation;
  // Initialize
  SN.init();
  // Add first section "banners".
  SN.add('banners', {
    selector: '#banners .banner',
    straightOnly: true
  });

  // Add "collections" section.
  SN.add('collections', {
    selector: '#collections .collection',
    enterTo: 'last-focused',
    straightOnly: true
  });

  // Set "items" section.
  SN.add('items', {
    selector: '#items .item',
    straightOnly: true
  });

  $('#banners').flickity({
    pageDots: false,
    wrapAround: true,
    contain: true
  }).find('.banner').each(function(index, banner) {
    $(banner).css('background-color', Please.make_color());
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
      //SN.init();
      SN.makeFocusable();
    });

    SN.makeFocusable();
    SN.focus('banners');
  });
});
