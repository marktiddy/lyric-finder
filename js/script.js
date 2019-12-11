var lyricRepository = (function () {

  var apiUrl = 'https://api.lyrics.ovh/v1/';


  var lyricObject = {
    band: 'Blink 182',
    title: 'Waggy',
    lyrics: 'Watching your house shrink away in my rear-view mirror'
  }

  function getLyrics() {
    return lyricObject;
  }

  function loadContent() {
    //Load the lyrics
    var lyrics = getLyrics();

    //Let's get our parent grid class first
    var $parentGridItem = $('.main-content');

    //Create a new element for the title
    var $newTitle = $(`<h2 class="lyrics-title">${lyrics.band} - ${lyrics.title}</h2>`);

    //Create the lyric item
    var $newLyrics = $(`<p class="lyrics-content">${lyrics.lyrics}</p>`);

    //Finally, let's append the content
    $parentGridItem.append($newTitle).append($newLyrics);
  }


  return {
    getLyrics: getLyrics,
    loadContent: loadContent,
  }
})();

//Load the default lyrics
lyricRepository.loadContent();