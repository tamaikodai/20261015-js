$(function() {
  // 画像の枚数
  const count = $("#slide li").length;

  // 現在の画像番号
  let current = 1;

  // 次に表示する画像番号
  let next = 2;

  // 切り替え間隔
  const interval = 3000;

  // アニメーション時間
  const duration = 500;

  // タイマー
  let timer;

  // アニメーション中かどうか
  let animating = false;

  // 最初の画像以外を非表示
  $("#slide li:not(:first-child)").hide();

  // 自動スライド開始
  timer = setInterval(slideTimer, interval);

  // スライド切り替え関数
  function slideTimer() {
    // アニメーション中は処理しない
    if (animating || current === next) {
      return;
    }

    animating = true;

    const $current = $("#slide li").eq(current - 1);
    const $next = $("#slide li").eq(next - 1);

    // 次の画像を表示状態にして、透明にする
    $next
      .show()
      .removeClass("fade-in rotate-out")
      .css({
        opacity: 0,
        transform: "rotate(0deg) scale(1)"
      });

    // 現在の画像を回転させながら消す
    $current.addClass("rotate-out");

    // 次の画像をフェードイン
    $next.addClass("fade-in");

    // アニメーション終了後の処理
    setTimeout(function() {
      $current
        .hide()
        .removeClass("rotate-out")
        .css({
          opacity: 1,
          transform: "rotate(0deg) scale(1)"
        });

      $next
        .removeClass("fade-in")
        .css("opacity", 1);

      // 現在の画像番号を更新
      current = next;

      // 次の画像番号を更新
      next = current + 1;

      // 最後の画像の次は1番目
      if (next > count) {
        next = 1;
      }

      // ボタンの選択状態を更新
      $("#button a")
        .removeClass("target")
        .eq(current - 1)
        .addClass("target");

      animating = false;
    }, duration);
  }

  // ボタンをクリックしたとき
  $("#button li a").click(function() {
    // アニメーション中のクリックは無視
    if (animating) {
      return false;
    }

    // クリックしたボタンの画像番号
    const selected = Number($(this).text());

    // 同じ画像なら何もしない
    if (selected === current) {
      return false;
    }

    // 次の画像を指定
    next = selected;

    // タイマーをリセット
    clearInterval(timer);

    // すぐにスライドを切り替える
    slideTimer();

    // 自動スライドを再開
    timer = setInterval(function() {
      if (!animating) {
        slideTimer();
      }
    }, interval);

    return false;
  });
});