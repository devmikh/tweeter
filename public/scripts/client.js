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
        renderTweets(tweets);
      });
  }

  loadTweets();

  $('form').submit(function(event) {
    event.preventDefault();
    const val = $("#tweet-text").val();
    if (val.length === 0) {
      alert("Please enter a message");
    } else if (val.length > 140) {
      alert("Your message is too long");
    } else {
      const data = $(this).serialize();
      $.post('/tweets', data)
      .then(function(response){
        $("#tweet-text").val("");
        loadTweets();
        console.log("response >>", response);
      });
    }
     
  });
});