const MAX_WORDS = 140;
const TRIANGLE_ALERT = `<i class="fa-solid fa-triangle-exclamation"></i>`;
const URL = "http://localhost:8080/tweets/";

$(() => {
  $("section.new-tweet > form").on("submit", function (e) {
    e.preventDefault();
    const wordRamaining = $(".word-count").val();
    const { error, message } = validateInputLength(Number(wordRamaining));
    if (error) {
      const errorMessage = `${TRIANGLE_ALERT}  ${message}  ${TRIANGLE_ALERT}`;
      $(".error-message-content").html(errorMessage).slideDown("slow");
    } else {
      $.ajax({
        url: URL,
        type: "POST",
        data: $(this).serialize(),
      })
        .then(
          sendTweeter(() => {
            setTimeout(() => {
              $(".fa-twitter").hide();
              $(".fadingEffect").hide();
              $(".fa-envelope").hide();
            }, 1100);
          })
        )
        .done(function (json) {
          $("textarea").val("");
          $(".word-count").val(MAX_WORDS);
          $(".tweet-container").prepend(createTweetElement(json));
        })

        .fail(() => {
          console.log("error: ", error);
        });
    }
  });
});

function sendTweeter(callback) {
  $(".fa-envelope").show();
  $(".fa-twitter").show();
  $(".fadingEffect").show();
  $(".fa-twitter").css("animation", "leftToRight ease-out 1s");
  $(".fadingEffect").css("animation", "hideBox 1s ease-out alternate");
  $(".fa-envelope").css("animation", "moveEnvelope linear 1s");
  callback();
}

function validateInputLength(length) {
  if (length === MAX_WORDS) {
    return { error: true, message: "Your message is cannot be empty!" };
  }
  if (length < 0 || null) {
    return { error: true, message: "Your message is too long!!" };
  }
  return { error: false };
}
