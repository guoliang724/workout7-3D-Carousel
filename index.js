//program entrance
$(function () {
  var $lis = $(".pic-list li");
  var currentIndex = 0;
  function active(index) {
    var preIndex = index - 1;
    preIndex = preIndex < 0 ? $lis.length - 1 : preIndex;
    var nextIndex = index + 1;
    nextIndex = nextIndex == $lis.length ? 0 : nextIndex;

    //add the index with first-layer
    //add the index-1 with second-layer-left
    //add the index+1 with second-layer-right
    $($lis[index])
      .addClass("first-layer")
      .siblings()
      .removeClass("first-layer");
    $($lis[preIndex])
      .addClass("second-layer-left")
      .siblings()
      .removeClass("second-layer-left");
    $($lis[nextIndex])
      .addClass("second-layer-right")
      .siblings()
      .removeClass("second-layer-right");
    //set element to be active
    $(`.inspectors span:eq(${index})`)
      .addClass("active")
      .siblings()
      .removeClass("active");
    //set the background to be current index pic
    $(".bg").css(
      "background-image",
      "url(" + $($lis[index]).find("img").prop("src") + ")"
    );
    //set the current to the the index
    currentIndex = index;
  }

  //set the default display
  active(0);

  //clicking indicator to change page
  $(".inspectors span").click(function () {
    active($(this).index());
  });

  //auto rolling

  var timer = setInterval(() => {
    active(currentIndex);
    currentIndex++;
    currentIndex = currentIndex % $lis.length;
  }, 1500);

  //
  $(".pic-list").mouseenter(() => {
    clearInterval(timer);
  });
  $(".pic-list").mouseleave(() => {
    timer = setInterval(() => {
      active(currentIndex);
      currentIndex++;
      currentIndex = currentIndex % $lis.length;
    }, 1500);
  });
});
