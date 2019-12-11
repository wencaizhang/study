/*
 * 回到顶部，依赖 jQuery
 */
function renderBackTop() {
  var style = `
  <style>
    .hide { display: none; } 
    #scrollUp { position: fixed;
      right: 50px;
      bottom: 100px;
      z-index: 9000;
      display: block;
      width: 40px;
      height: 40px;
      background: linear-gradient(rgba(0,0,0,0.3) 0, rgba(0,0,0,0.3) 100%);
      text-align: center;
      line-height: 32px;
      font-size: 24px;
      color: white;
      text-decoration: none; 
    }
  </style>`
  var html = '<div id="backTop"><a id="scrollUp" class="hide" href="javascript:;" title="回到顶部">︿</a></div>'
  $('body').append(style + html);
}

function listenScroll() {
  var scrollTrigger = 100; // px

  // $(window).scrollTop()与 $(document).scrollTop()产生结果一样
  // 一般使用document注册事件，window使用情况如 scroll, scrollTop, resize
  $(window).on('scroll', function () {
    if ($(window).scrollTop() > scrollTrigger) {
      $('#backTop a').removeClass('hidden');
    } else {
      $('#backTop a').addClass('hidden');
    }
  });
}

function listenBackTop() {
  $('#backTop').on('click', function (e) {
    // html,body 都写是为了兼容浏览器
    $('html,body').animate({
      scrollTop: 0
    }, 700);

    return false;
  });
}

renderBackTop();
listenScroll();
listenBackTop();