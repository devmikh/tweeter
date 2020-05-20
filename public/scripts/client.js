/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



$(document).ready(function() {
  // Given a tweet object, creates and returns an HTML element in a string format
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
  
  /* 
  * Given an array of tweet objects, creates an HTML element
  * for each of them and appends it to the #tweet-container
  */
  const renderTweets = (tweetArray) => {
    for (const tweet of tweetArray) {
      $("#tweet-container").prepend(createTweetElement(tweet));
    }
  }
  
  // Sends a GET request to the server and returns a JSON object
  const loadTweets = () => {
    $.getJSON('/tweets')
      .then(function(tweets) {
        renderTweets(tweets);
      });
  }

  loadTweets();

  $('form').submit(function(event) {
    event.preventDefault();

    const data = $(this).serialize();
    $.post('/tweets', data)
      .then(function(response){
        console.log("response >>", response);
      }); 
  });
});