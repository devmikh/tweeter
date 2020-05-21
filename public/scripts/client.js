/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  // Helper function to prevent XSS attacks
  const escape = function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  // Given a tweet object, creates and returns an HTML element in a string format
  const createTweetElement = function(tweet) {
    return `<article class="tweet">
            <header class="tweet-header">
              <div class="tweet-user">
                <div class="tweet-avatar">
                  <img src="${tweet.user.avatars}">
                </div>
                <div>
                  <span>${tweet.user.name}</span>
                </div>
              </div>
              <div class='tweet-username'>
                <span>${tweet.user.handle}</span>
              </div>
            </header>
            <main class="tweet-main">
              <p class="tweet-text">${escape(tweet.content.text)}</p>
            </main>
            <footer class="tweet-footer">
              <div class="tweet-date">
                <span>${moment(tweet.created_at).fromNow()}</span>
              </div>
              <ul class="tweet-links">
                <li><a href="#" class="tweet-link"><i class="fas fa-flag"></i></a></li>
                <li><a href="#" class="tweet-link"><i class="fas fa-retweet"></i></a></li>
                <li><a href="#" class="tweet-link"><i class="fas fa-heart"></i></a></li>
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

  // Load all tweets from the db and render them
  loadTweets();

  // Add toggle functionality of the new tweet form
  $('.btn-show').click(function(event) {

    if ($('.new-tweet').is(':visible')) {
      $('.new-tweet').slideUp();
    } else {
      $('.new-tweet').slideDown();
      $('.new-tweet-textarea').focus();
    }
    
  });

  // Form submission behaviour
  $('.new-tweet-form').submit(function(event) {

    // Prevent default behaviour of the form upon submission
    event.preventDefault();

    // Remove an error message if any
    $(".new-tweet-error").slideUp();

    // Get user's input
    const val = $(".new-tweet-textarea").val();

    // If user didn't enter anything, display appropriate error message
    if (val.length === 0) {
      $('.new-tweet-error-no-input').slideDown();
    // If user went over the limit of characters, display appropriate error message
    } else if (val.length > 140) {
      $('.new-tweet-error-too-long').slideDown();
    // If input is validated
    } else {
      // Serialize input of the form
      const data = $(this).serialize();

      // Make a POST request to /tweets with our serialized input data
      $.post('/tweets', data)
      .then(function() {

        // When the POST request is done
        // Clear the input field
        $(".new-tweet-textarea").val("");

        // Set the counter back to 140 characters
        $('.new-tweet-counter').text(140);

        // Load all tweets from the db (they include our newly created tweet)
        loadTweets();

        // Remove an error message if any
        $(".new-tweet-error").slideUp();
      });
    }

  });
});