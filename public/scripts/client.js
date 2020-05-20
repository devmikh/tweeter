/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = (tweet) => {
  return `<article class="tweet">
          <header>
            <div class='user'>
              <div>
                <img src="${tweet.user.avatars}">
              </div>
              <div>
                <span>${tweet.user.name}</span>
              </div>
            </div>
            <div class='username'>
              <span>${tweet.user.handle}</span>
            </div>
          </header>
          <main>
            <p>${tweet.content.text}</p>
          </main>
          <footer>
            <div class='date'>
              <span>${tweet.created_at}</span>
            </div>
            <ul>
              <li><a href="#"><i class="fas fa-flag"></i></a></li>
              <li><a href="#"><i class="fas fa-retweet"></i></a></li>
              <li><a href="#"><i class="fas fa-heart"></i></a></li>
            </ul>
          </footer>
        </article>`
};

const renderTweets = (tweetArray) => {
  for (const tweet of tweetArray) {
    $("#tweet-container").append(createTweetElement(tweet));
  }
}

const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

$(document).ready(function() {
  renderTweets(data);

  $('form').submit(function(event) {
    event.preventDefault();

    const data = $(this).serialize();
    $.post('/tweets/', data)
      .then(function(response){
        console.log("response >>", response);
      }); 
  });
});