$(function() {
  // A short name of the SpatialNavigation singleton object.
  var SN = SpatialNavigation;
  // Initialize spatial navigation
  SN.init();
  // Add first section "banners".
  SN.add('banners', {
    selector: '#banners .banner',
    defaultElement: '.is-selected',
    straightOverlapThreshold: 0.4,
    straightOnly: true
  });

  // Add "collections" section.
  SN.add('collections', {
    selector: '#collections .collection',
    defaultElement: '.is-selected',
    enterTo: 'last-focused',
    straightOverlapThreshold: 0.4,
    straightOnly: true
  });

  // Set "items" section.
  SN.add('items', {
    selector: '#items .item',
    straightOverlapThreshold: 0.4,
    straightOnly: true
  });

  var onFocus = function() {
    $.scrollTo($(this).offset().top - 60, 100);
  };
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

  $('.banner, .collection, .item')
    .on('sn:willfocus', onFocus)
    .on('sn:enter-down', onEnterPressed)
    .on('sn:enter-up', onEnterReleased);

  // Setup banners
  var onBannerFocused = function(banner) {
    var $banner = $(banner);
    var next = $banner.index() - $banners.data('flickity').selectedIndex;
    if (1 == next || next < -1) {
      $banners.flickity('next');
    } else if (-1 == next || next > 1) {
      $banners.flickity('previous');
    }
  };

  var $banners = $('#banners');
  $banners.flickity({
    pageDots: false,
    wrapAround: true,
    contain: true
  }).find('.banner').on('sn:willfocus', function() {
    onBannerFocused(this);
  }).click(function() {
    onBannerFocused(this);
    this.focus();
  }).each(function(index, banner) {
    $(banner).click(showPopup).css('background-color', Please.make_color());
  });

  // Setup collections
  var onCollectionFocused = function(collection) {
    $('#collections').flickity('select', $(collection).index());
  };
  $('#collections').flickity({
    pageDots: false,
    cellAlign: 'center',
    contain: true
  }).find('.collection-col').on('sn:willfocus', function() {
    onCollectionFocused(this);
  }).find('.collection').click(function() {
    onCollectionFocused(this.parentElement);
    this.focus();
  }).each(function(index, collection) {
    $(collection).text(index + 1)
      .css('background-color', Please.make_color());
  });

  // Setup items and lazy loading
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
        .on('sn:willfocus', onFocus)
        .on('sn:enter-down', onEnterPressed)
        .on('sn:enter-up', onEnterReleased);
    });

    SN.makeFocusable();
    SN.focus('banners');
  });
});
