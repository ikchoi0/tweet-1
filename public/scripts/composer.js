// Shows the button that automatically scrolls the window to home when the user scrolls the page more than 100 unit from home vertically

$(() => {
  $(document).scroll(function () {
    var y = $(this).scrollTop();
    const writeNewTweet = $(".nav-right");
    const scrollToTopIcon = $(".scroll-top");
    if (y > 100) {
      writeNewTweet.css("display", "none");
      scrollToTopIcon.css("display", "block");
    } else {
      writeNewTweet.css("display", "flex");
      scrollToTopIcon.css("display", "none");
    }
  });
  $(".scroll-top").on("click", function () {
    $("html, body").animate({ scrollTop: 0 }, 100);
    $("section.new-tweet").slideDown("slow");    
    $(".tweet-text").focus();
  });
});