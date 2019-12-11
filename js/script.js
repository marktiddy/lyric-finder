var lyricRepository = (function () {

  var apiUrl = 'https://api.lyrics.ovh/v1/';

  //API Call function
  function getSongDetails(bandName, songName) {
    $.ajax(`${apiUrl}${bandName}/${songName}`, { dataType: 'json' })
      .then(function (responseJSON) {
        if (responseJSON.lyrics != "") {
          loadContent(bandName, songName, responseJSON)
        } else {
          showError();
        }
      }).catch(function (error) {
        showError()
      });
  }

  function showError() {
    var $parentGridItem = $('.main-content');
    $parentGridItem.empty();
    $parentGridItem.append($('<h2 class="lyrics-title">Error</h2>'));
    $parentGridItem.append($('<p class="lyrics-content">We didn\'t find that song title. Try searching another</p>'));
  }

  function loadContent(bandName, songName, lyrics) {

    //Let's get our parent grid class first
    var $parentGridItem = $('.main-content');

    //Empty the parent
    $parentGridItem.empty();

    //Create a new element for the title
    var $newTitle = $(`<h2 class="lyrics-title">${bandName} - ${songName}</h2>`);

    //Create the lyric item
    var lyrics = lyrics.lyrics;
    var $newLyrics = $(`<p class="lyrics-content">${lyrics}</p>`);

    //Finally, let's append the content
    $parentGridItem.append($newTitle).append($newLyrics);

  }

  //Add event listeners form our form
  $('#lyric-search-submit').on('click', function (event) {
    eventListenerAction();
  });

  $('#lyrics-form').on('keypress', function (event) {
    if (event.which == 13) {
      eventListenerAction();
    }
  });

  //Event listener for clicking into form fields
  $('input').click(function (event) {
    var $input = $('input');
    $input.prop("placeholder", "");
  })

  //Function to respond to event listeners
  function eventListenerAction() {
    event.preventDefault();
    //Check for errors and see what the function returns
    if (errorChecking()) {
      getSongDetails($('#band-name').val(), $('#song-title').val());
    }
  }


  //function to error check form
  function errorChecking() {
    var $bandField = $('#band-name');
    var $songField = $('#song-title');
    var $bandError = $('.band-error');
    var $songError = $('.song-error');

    //First check the band field
    if ($bandField.val() != '' && $songField.val() != '') {
      $bandError.fadeOut().hide();
      $songError.fadeOut().hide();
      //Both fields have content so we can run the API call by returning true
      return true;
    } else if ($bandField.val() == '' && $songField.val() == '') {
      $bandError.fadeIn().show();
      $songError.fadeIn().show();
      return false;
    } else if ($bandField.val() == '') {
      $bandError.fadeIn().show();
      $songError.fadeOut().hide();
      return false;
    } else {
      $bandError.fadeOut().hide();
      $songError.fadeIn().show();
      return false;
    }

  }


  return {
    loadContent: loadContent,
  }
})();
