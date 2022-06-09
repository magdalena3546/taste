import {
  classNames,
  select,
  settings,
} from './settings.js';
import Audio from './components/audio.js';
import Subscribe from './components/subscribe.js';
import Search from './components/search.js';
import Song from './components/song.js';


const app = {
  initUppercase: function () {
    const lowercaseWords = document.querySelectorAll(classNames.letters.uppercase);
    console.log(lowercaseWords);
    for (let word of lowercaseWords) {
      const uppercaseWord = word.innerHTML.toUpperCase();
      word.innerHTML = uppercaseWord;
    }
  },

  initPages: function () {
    const thisApp = this;
    thisApp.pages = document.querySelector(select.containerOf.pages).children;
    thisApp.navLinks = document.querySelectorAll(select.nav.links);

    const idFromHash = window.location.hash.replace('#/', '');
    let pageMatchingHash = thisApp.pages[0].id;
    for (let page of thisApp.pages) {
      if (page.id == idFromHash) {
        pageMatchingHash = page.id;
        break;
      }
    }
    thisApp.activatePage(pageMatchingHash);
    for (let link of thisApp.navLinks) {
      link.addEventListener('click', function (event) {
        const clickedElement = this;
        event.preventDefault();

        const id = clickedElement.getAttribute('href').replace('#', '');
        thisApp.activatePage(id);

        window.location.hash = '#/' + id;
      });
    }
  },


  activatePage: function (pageId) {
    const thisApp = this;
    for (let page of thisApp.pages) {
      page.classList.toggle(classNames.pages.active, page.id == pageId);
    }

    for (let link of thisApp.navLinks) {
      link.classList.toggle(classNames.nav.active, link.getAttribute('href') == '#' + pageId);
    }
  },

  initAudioSection: function () {
    const thisApp = this;
    for (let songData in thisApp.data.songs) {
      new Audio(thisApp.data.songs[songData].id, thisApp.data.songs[songData]);
      const sel = '.player' + thisApp.data.songs[songData].id;
      // eslint-disable-next-line no-undef
      GreenAudioPlayer.init({
        selector: sel,
        stopOthersOnPlay: true
      });
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
      });
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


  initSearchSong: function () {
    const thisApp = this;
    thisApp.btn = document.querySelector(select.search.button);
    thisApp.input = document.querySelector(select.search.input);
    const songsContainer = document.querySelector(select.containerOf.songs);


    thisApp.btn.addEventListener('click', function (event) {
      event.preventDefault();
      songsContainer.innerHTML = '';
      const filtersSongs = [];

      for (let songData in thisApp.data.songs) {

        if (!filtersSongs[songData] && thisApp.data.songs[songData].title.toUpperCase().includes(thisApp.input.value.toUpperCase()) || thisApp.data.songs[songData].author.toUpperCase().includes(thisApp.input.value.toUpperCase())) {
          filtersSongs.push(thisApp.data.songs[songData]);
        }
      }

      for (let song in filtersSongs) {
        new Song(filtersSongs[song].id, filtersSongs[song]);
        const sel = '.songs-wrapper .player' + filtersSongs[song].id;
        // eslint-disable-next-line no-undef
        GreenAudioPlayer.init({
          selector: sel,
          stopOthersOnPlay: true
        });
      }
    });
  },

  init: function () {
    const thisApp = this;
    thisApp.initPages();
    thisApp.initData();
    thisApp.initSubscribe();
    thisApp.initSearch();
    thisApp.initSearchSong();
    thisApp.initUppercase();
  }
};

app.init();