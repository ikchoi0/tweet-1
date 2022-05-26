// Add eventlistener to toggle button. It slides out the form for writing a new tweet message. 
$(() => {
  $("span.toggle-tweet").on("click", function () {
    const $newTweetSection = $("section.new-tweet");
    if ($newTweetSection.css("display") === "none") {
      $newTweetSection.slideDown("slow");
      $(".tweet-text").focus();
    } else {
      $newTweetSection.slideUp("slow");
    }
  });
  $("span.toggle-tweet").on("mouseenter", function () {
    const toggleIcon = $(".toggle-tweet > i");
    toggleIcon.css("animation", "bounce 2s ease infinite");
  });
  $("span.toggle-tweet").on("mouseleave", function () {
    const toggleIcon = $(".toggle-tweet > i");
    toggleIcon.css("animation", "");
  });
});
