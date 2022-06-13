import {
  classNames,
  select,
  settings,
} from './settings.js';
import Audio from './components/audio.js';
import Subscribe from './components/subscribe.js';
import Search from './components/search.js';
import Discover from './components/discover.js';

const app = {
  initUppercase: function () {
    const lowercaseWords = document.querySelectorAll(classNames.letters.uppercase);
    for (let word of lowercaseWords) {
      const uppercaseWord = word.innerHTML.toUpperCase();
      word.innerHTML = uppercaseWord;
    }
  },

  initPages: function () {
    const thisApp = this;
    thisApp.pages = document.querySelector(select.containerOf.pages).children;
    console.log(thisApp.pages);
    thisApp.links = document.querySelectorAll(select.pages.links);
    console.log(thisApp.links);

    const idFromHash = window.location.hash.replace('#/', '');
    let pageMatchingHash = thisApp.pages[0].id;
    for (let page of thisApp.pages) {
      if (page.id == idFromHash) {
        pageMatchingHash = page.id;
        break;
      }
    }
    thisApp.activatePage(pageMatchingHash);
    for (let link of thisApp.links) {
      link.addEventListener('click', function (event) {
        const clickedElement = this;
        event.preventDefault();
        const id = clickedElement.getAttribute('href').replace('#', '');
        thisApp.activatePage(id);
        window.location.hash = '#/' + id;
        thisApp.updateSearch();
      });
    }
  },


  activatePage: function (pageId) {
    const thisApp = this;
    for (let page of thisApp.pages) {
      page.classList.toggle(classNames.pages.active, page.id == pageId);
    }

    for (let link of thisApp.links) {
      link.classList.toggle(classNames.nav.active, link.getAttribute('href') == '#' + pageId);
    }
  },

  initData: function () {
    const thisApp = this;
    thisApp.data = {};
    const url = settings.db.url + '/' + settings.db.songs;

    fetch(url)
      .then(function (rawResponse) {
        return rawResponse.json();
      })
      .then(function (parsedResponse) {
        thisApp.data.songs = parsedResponse;
        thisApp.initAudioSection();
        thisApp.initDiscover();
        thisApp.initUppercase();
      });
  },
  initAudioSection: function () {
    const thisApp = this;
    const audioContainer = document.querySelector(select.containerOf.audio);

    for (let songData in thisApp.data.songs) {
      new Audio(thisApp.data.songs[songData].id, thisApp.data.songs[songData], audioContainer);
      const sel = '.player' + thisApp.data.songs[songData].id;
      // eslint-disable-next-line no-undef
      GreenAudioPlayer.init({
        selector: sel,
        stopOthersOnPlay: true
      });
    }
  },

  initSubscribe: function () {
    const thisApp = this;
    const subscribeWrapper = document.querySelector(select.containerOf.subscribe);
    thisApp.subscribe = new Subscribe(subscribeWrapper);
  },

  initSearch: function () {
    const thisApp = this;
    const searchWrapper = document.querySelector(select.containerOf.search);
    thisApp.search = new Search(searchWrapper);

  },

  updateSearch: function () {
    const thisApp = this;
    thisApp.input.value = '';
    thisApp.songsContainer.innerHTML = '';
  },

  initSearchSong: function () {
    const thisApp = this;
    thisApp.btn = document.querySelector(select.search.button);
    thisApp.input = document.querySelector(select.search.input);
    thisApp.songsContainer = document.querySelector(select.containerOf.songs);

    thisApp.btn.addEventListener('click', function (event) {
      event.preventDefault();
      thisApp.songsContainer.innerHTML = '';
      const filtersSongs = [];
      if (thisApp.input.value.trim()) {
        for (let songData in thisApp.data.songs) {
          if (thisApp.data.songs[songData].title.toUpperCase().includes(thisApp.input.value.toUpperCase()) || thisApp.data.songs[songData].author.toUpperCase().includes(thisApp.input.value.toUpperCase())) {
            filtersSongs.push(thisApp.data.songs[songData]);
          }
        }
      }

      if (filtersSongs.length == 0) {
        thisApp.songsContainer.innerHTML = '<p class="text"> not found </p>';
      } else {
        thisApp.songsContainer.innerHTML = '<p class="text"> We have found ' + filtersSongs.length + ' songs... </p>';
      }

      for (let song in filtersSongs) {
        new Audio(filtersSongs[song].id, filtersSongs[song], thisApp.songsContainer);
        const sel = '.songs-wrapper .player' + filtersSongs[song].id;
        // eslint-disable-next-line no-undef
        GreenAudioPlayer.init({
          selector: sel,
          stopOthersOnPlay: true
        });
      }
    });
  },
  initDiscover: function () {
    const thisApp = this;
    const discoverWrapper = document.querySelector(select.containerOf.discover);
    thisApp.discover = new Discover(discoverWrapper);
    const songs = thisApp.data.songs;
    let song = songs[Math.floor(Math.random() * songs.length + 1)];
    thisApp.songContainer = document.querySelector(select.containerOf.song);
    new Audio(song.id, song, thisApp.songContainer);
    const sel = '.song-wrapper .player' + song.id;
    // eslint-disable-next-line no-undef
    GreenAudioPlayer.init({
      selector: sel,
      stopOthersOnPlay: true
    });
  },

  init: function () {
    const thisApp = this;
    thisApp.initSubscribe();
    thisApp.initPages();
    thisApp.initData();
    thisApp.initSearch();
    thisApp.initSearchSong();

  }
};

app.init();