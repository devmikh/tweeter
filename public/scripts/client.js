/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



$(document).ready(function() {

  const escape = function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  // Given a tweet object, creates and returns an HTML element in a string format
  const createTweetElement = function(tweet) {
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
              <p>${escape(tweet.content.text)}</p>
            </main>
            <footer>
              <div class='date'>
                <span>${moment(tweet.created_at).fromNow()}</span>
              </div>
              <ul>
                <li><a href="#"><i class="fas fa-flag"></i></a></li>
                <li><a href="#"><i class="fas fa-retweet"></i></a></li>
                <li><a href="#"><i class="fas fa-heart"></i></a></li>
              </ul>
            </footer>
          </article>`
  };
  
  /* 
  * Given an array of tweet objects, creates an HTML element
  * for each of them and appends it to the #tweet-container
  */
  const renderTweets = function(tweetArray) {
    for (const tweet of tweetArray) {
      $("#tweet-container").prepend(createTweetElement(tweet));
    }
  }
  
  // Sends a GET request to the server and returns a JSON object
  const loadTweets = function() {
    $.getJSON('/tweets')
      .then(function(tweets) {
        $("#tweet-container").empty();
        renderTweets(tweets);
      });
  }

  loadTweets();

  $('#button-display-form').click(function(event) {
    if ($('.new-tweet').is(':visible')) {
      $('.new-tweet').slideUp();
    } else {
      $('.new-tweet').slideDown();
      $('#tweet-text').focus();
    }
    
  });

  $('form').submit(function(event) {
    event.preventDefault();
    const val = $("#tweet-text").val();
    $(".error").slideUp();
    if (val.length === 0) {
      $('#error-no-input').slideDown();
    } else if (val.length > 140) {
      $('#error-too-long').slideDown();
    } else {
      const data = $(this).serialize();
      $.post('/tweets', data)
      .then(function() {
        $("#tweet-text").val("");
        loadTweets();
        $(".error").slideUp();
      });
    }
  });
});