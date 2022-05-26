$(() => {
  loadtweets();
});

function loadtweets() {
  const data = $.ajax("http://localhost:8080/tweets/").done(function (json) {
    return renderTweets(json);
  });
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
