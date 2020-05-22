// Character counter functionality
$(document).ready(function() {
  $('.new-tweet-textarea').on('keyup', function() {

    let count = 140 - $(this).val().length;
    const $counter = $('.new-tweet-counter');
    $counter.text(count);

    if (count < 0) {
      $counter.css("color", "#FF0000");
    } else {
      $counter.css("color", "#545149");
    }
    
  });
});