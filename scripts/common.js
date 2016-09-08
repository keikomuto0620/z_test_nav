(function($) {
  $(function() {

    /*サイドバー
    ==============================================*/
    var btn01 = $('.btn01'); //第1階層ボタン

    var backBtn = $('#js-navi02'); //backボタン
    var homeBtn = $('#js-navi03'); //homeボタン
    backBtn.attr('disabled', 'disabled'); //backボタンを無効化
    homeBtn.attr('disabled', 'disabled'); //homeボタンを無効化

    //アンカーリンクを無効化
    $('.btn').on('click', function() {
      return false;
    });

    btn01.on('click', function() {
      $(this).addClass('is-childOpen'); //第1階層ボタンにクラス付与、第2階層メニューが表示される
      backBtn.prop('disabled', false); //backボタンを有効化
      homeBtn.prop('disabled', false); //homeボタンを有効化
      //return false;

      var btn02 = $(this).next().find('.btn02') //第2階層ボタン

      btn02.on('click', function() {
        if ($(this).attr('href') == '#') {
          $(this).addClass('is-childOpen'); //第2階層ボタンにクラス付与、第3階層メニューが表示される
          //return false;

          var btn03 = $(this).next().find('.btn03'); //第3階層ボタン

          btn03.on('click', function() {
            if ($(this).attr('href') == '#') {
              $(this).addClass('is-childOpen'); //第3階層ボタンにクラス付与、第4階層メニューが表示される
              //return false;
            }
          });
        }
      });

    });
    /*サイドバー表示ボタン（スマホ）
    ==============================================*/
    $('#js-btnNav').on('click', function() {
      $(this).toggleClass('is-side');
      $('#js-side').toggleClass('is-side');
      //$('.sec.is-active').toggleClass('is-active');
    });

    /*ページ
    ==============================================*/
    $('.btn').on('click', function() {
      $('.btn').removeClass('is-current');
      $(this).addClass('is-current');

      if ($(this).attr('href') !== '#') { //クリックされた要素のhref属性が#でない時（子要素を持たない時）
        $('.sec').removeClass('is-active'); //表示中のページを非表示にする
        var page = $(this).attr('href').replace(/#/g, '');

        $('[id=' + page + ']').addClass('is-active'); //クリックされた要素のhref属性と同じidを持つページを表示する
        $('#js-btnNav,#js-side').removeClass('is-side');

      }
    });

    //コンテンツ領域の高さを一番高さのあるページ要素に合わせる
    if (window.matchMedia('(min-width: 768px)').matches) { //PC
      /*var biggestHeight = '0';
      $('.sec').each(function() {
        if ($(this).outerHeight() > biggestHeight) {
          biggestHeight = $(this).outerHeight()
        }
      });
      $('#js-content').outerHeight(biggestHeight);*/
    } else { //SP
      /*var biggestHeight = $('.sec').outerHeight();
      $('#js-content').outerHeight(biggestHeight);*/
    };
    /*フッター
    ==============================================*/
    backBtn.on('click', function() {
      if ($('.btn03.is-childOpen')[0]) {
        $('.btn03.is-childOpen').removeClass('is-childOpen'); //第3階層ボタンのクラスがonの時クラスを削除、第4階層メニューが非表示になる
      } else if ($('.btn02.is-childOpen')[0]) { //第4階層が非表示の時、第2階層ボタンのクラスを削除、第3階層メニューが非表示なる
        $('.btn02.is-childOpen').removeClass('is-childOpen');
      } else { //第3階層が非表示の時、第1階層ボタンのクラスを削除、第2階層メニューが非表示なる
        $('.btn01.is-childOpen').removeClass('is-childOpen');
        $('.btn').removeClass('is-current');
        $('.sec').removeClass('is-active');
        $('#page00').addClass('is-active');
        backBtn.attr('disabled', 'disabled'); //backボタンを無効化
        homeBtn.attr('disabled', 'disabled'); //homeボタンを無効化
      }
    });

    homeBtn.on('click', function() {
      $('.btn').removeClass('is-childOpen is-current'); //サイドバーのボタンのonをすべて削除
      $('.sec').removeClass('is-active');
      $('#page00').addClass('is-active');
      backBtn.attr('disabled', 'disabled'); //backボタンを無効化
      homeBtn.attr('disabled', 'disabled'); //homeボタンを無効化

       $('#js-btnNav,#js-side').removeClass('is-side');
    });


  });
}(jQuery));
