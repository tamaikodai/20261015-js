$(function(){
    let dir = -1;
    let interval = 3000;
    let duration = 700;

    let timer;

    $("#slide ul").prepend(("#slide li:last-child"));
    $("#slide ul").css("left", -1000);

    timer = setInterval(slideTimer , interval);

    function slideTimer() {
    if (dir == -1) {
      $("#slide ul").animate({ left: "-=1000px" }, duration, function () {

        $(this).append($("#slide li:first-child"));

        $(this).css("left", -1000);
      });
    } else {

      $("#slide ul").animate({ "left": "+=1000px" }, duration,
        function() {

          $(this).prepend($("#slide li:last-child"));

          $(this).css("left", -1000);

          dir = -1;
        }
      );
    }
  }

  $("#prevBtn").click(function () {

    dir = 1;

    clearInterval(timer);
    timer = setInterval(slideTimer, interval);

    slideTimer();
  });

  $("#nextBtn").click(function () {
    dir = -1;

    clearInterval(timer);
    timer = setInterval(slideTimer, interval);

    slideTimer();
  });
});
