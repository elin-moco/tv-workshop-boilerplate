$(function() {
  // A short name of the SpatialNavigation singleton object.
  var SN = SpatialNavigation;
  // Initialize
  SN.init();
  // Add first section "banners".
  SN.add('banners', {
    selector: '#banners .banner',
    defaultElement: '.is-selected',
    straightOnly: true
  });

  // Add "collections" section.
  SN.add('collections', {
    selector: '#collections .collection',
    defaultElement: '.is-selected',
    enterTo: 'last-focused',
    straightOnly: true
  });

  // Set "items" section.
  SN.add('items', {
    selector: '#items .item',
    straightOnly: true
  });

  var $banners = $('#banners');
  $banners.flickity({
    pageDots: false,
    wrapAround: true
  }).find('.banner').on('sn:willfocus', function() {
    ($(this).index(), $banners.data('flickity').selectedIndex);
    var next = $(this).index() - $banners.data('flickity').selectedIndex;
    if (1 == next || next < -1) {
      $banners.flickity('next');
    } else if (-1 == next || next > 1) {
      $banners.flickity('previous');
    }
  }).each(function(index, banner) {
    $(banner).css('background-color', Please.make_color());
  });

  $('#collections').flickity({
    pageDots: false,
    cellAlign: 'center',
    contain: true
  }).find('.collection-col').on('sn:willfocus', function() {
    $('#collections').flickity('select', $(this).index());
  }).find('.collection').each(function(index, collection) {
    $(collection).text(index + 1)
      .css('background-color', Please.make_color());
  });

  $('.banner, .collection').click(function() {
    this.focus();
  });

  var onEnterPressed = function() {
    $(this).addClass('pressed');
  };
  var onEnterReleased = function() {
    $(this).removeClass('pressed');
  };

  $('.banner, .collection, .item')
    .on('sn:enter-down', onEnterPressed)
    .on('sn:enter-up', onEnterReleased);

  var itemCount = 0;
  var updateItem = function(item) {
    $(item).css('background-color', Please.make_color())
      .height(Math.round(Math.random() * 300) + 300)
      .text(++itemCount);
  };
  $('.item').each(function(index, item) {
    updateItem(item);
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
      //Make new items focusable
      SN.makeFocusable();
      var $newItems = $(newItems);
      $newItems.each(function(index, newItem) {
        updateItem(newItem);
      });
      $(this).masonry('appended', $newItems);
      $newItems
        .on('sn:enter-down', onEnterPressed)
        .on('sn:enter-up', onEnterReleased);
    });

    SN.makeFocusable();
    SN.focus('banners');
  });
});
