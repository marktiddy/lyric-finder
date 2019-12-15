var lyricRepository = (function () {

  var apiUrl = 'https://api.lyrics.ovh/v1/';

  //API Call function
  function getSongDetails(bandName, songName) {

    //First let's show a loading spinner and hide our form
    var $documentBody = $('body');
    $documentBody.append($('<div class="container text-info interactive-content"><div class="row"><div class="col lyric-container"><div class="spinner-border text-info" role="status"><span class="sr-only">Loading...</span></div></div></div></div>'))

    //Then hide the form
    var $form = $('#lyrics-form');
    $form.hide();

    //Then we access the API
    $.ajax(`${apiUrl}${bandName}/${songName}`, { dataType: 'json' })
      .then(function (responseJSON) {
        if (responseJSON.lyrics != "") {
          loadContent(bandName, songName, responseJSON)
        } else {
          showError();
        }
      }).catch(function (error) {
        showError()
        showError()
      });
  }

  function showError() {
    var $parentGridItem = $('.lyric-container');
    $parentGridItem.empty();
    $parentGridItem.append($('<h3 class="lyrics-title text-info">Error</h3>'));
    $parentGridItem.append($('<p class="lyrics-content">We didn\'t find that song title. Try searching another</p>'));
    loadResetButton();
  }

  function loadContent(bandName, songName, lyrics) {
    //Remove info text
    var $introText = $('.intro-text');
    $introText.hide();

    //Access the lyric container and empty it

    var $lyricContainer = $('.lyric-container');

    $lyricContainer.empty();

    //Create a new element for the title
    var $newTitle = $(`<h3 class="lyrics-title text-info text-capitalize">${bandName} - ${songName}</h3>`);

    //Create the lyric item
    var lyrics = lyrics.lyrics;
    var $newLyrics = $(`<p class="lyrics-content text-dark">${lyrics}</p>`);

    //Finally, let's append the content
    $lyricContainer.append($newTitle).append($newLyrics);

    //And load a reset button
    loadResetButton()
  }

  function loadResetButton() {
    var $parentContainer = $('.lyric-container');
    var $newButton = $('<button type="button" class="btn btn-info">Search for another song</button><br>');
    $parentContainer.append($newButton);

    //Event listener
    $($newButton).on('click', function (event) {
      var $introText = $('.intro-text');
      $introText.show();
      var $form = $('#lyrics-form');
      $form.show();
      var $container = $('.interactive-content');
      $container.remove();
    });


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
