const triangleAlertIcon = `<i class="fa-solid fa-triangle-exclamation"></i>`;

$(() => {
  $("section.new-tweet > form").on("submit", function (e) {
    e.preventDefault();
    const wordRamaining = $(".word-count").val();
    const { error, message } = validateInputLength(Number(wordRamaining));
    if (error) {
      const errorMessage = `${triangleAlertIcon}  ${message}  ${triangleAlertIcon}`;
      $(".error-message-content").html(errorMessage).slideDown("slow");
    } else {
      $.ajax({
        url: "http://localhost:8080/tweets/",
        type: "POST",
        data: $(this).serialize(),
        success: function (json) {
          $("textarea").val("");
          $(".word-count").val(140);
          $(".tweet-container").prepend(createTweetElement(json));
        },
        error: function (error) {
          console.log("error: ", error);
        },
      });
    }
  });
  function loadtweets() {
    const data = $.ajax("http://localhost:8080/tweets/").done(function (json) {
      return renderTweets(json);
    });
  }
  loadtweets();
});

function validateInputLength(length) {
  if (length === 140) {
    return { error: true, message: "Your message is cannot be empty!" };
  }
  if (length < 0 || null) {
    return { error: true, message: "Your message is too long!!" };
  }
  return { error: false };
}

const renderTweets = function (tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  const $tweetContainer = $(`<section class="tweet-container"></section>`);
  for (let tweet of tweets) {
    $(createTweetElement(tweet)).appendTo($tweetContainer);
  }
  $($tweetContainer).appendTo(".container");
};

const createTweetElement = function (tweet) {
  let $tweetData = $(`
    <article class="tweet">
      <header>
        <img src=${tweet.user.avatars} alt="avatar">
        <div class="userInfo">
          <div>${tweet.user.name}</div></div>
          <div class="userId">${tweet.user.handle}</div>
        </div>
      </header>
      <div class="tweet-content"></div>
      <div class="line"></div>
      <footer>
        <div class="time-ago">${timeago.format(tweet.created_at)}</div>
        <div class="icons">
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
      </footer>
    </article>`);
  // This was added to prevent XSS
  $tweetData.find(".tweet-content").text(tweet.content.text);
  return $tweetData;
};
