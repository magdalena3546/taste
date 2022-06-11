export const select = {
  templateOf: {
    audioWidget: '#template-audio-widget',
    searchWidget: '#template-search-widget',
    discoverWidget: '#template-discover-widget',
    subscribeWidget: '#template-subscribe-widget',
  },
  containerOf: {
    pages: '#pages',
    audio: '#audio-list',
    search: '.search-wrapper',
    discover: '.discover-wrapper',
    subscribe: '.subscribe-wrapper',
    songs: '.songs-wrapper',
    song: '.song-wrapper',
  },

  nav: {
    links: '.main-nav a',
  },

  search: {
    input: '.search-input',
    button: '.search-btn',
  },
};

export const classNames = {
  letters: {
    uppercase: '.uppercase',
  },
  nav: {
    active: 'active',
  },
  pages: {
    active: 'active',
  }
};

export const settings = {
  db: {
    url: '//' + window.location.hostname + (window.location.hostname == 'localhost' ? ':3131' : ''),
    songs: 'songs',
  }
};

export const templates = {
  audioWidget: Handlebars.compile(document.querySelector(select.templateOf.audioWidget).innerHTML),
  subscribeWidget: Handlebars.compile(document.querySelector(select.templateOf.subscribeWidget).innerHTML),
  searchWidget: Handlebars.compile(document.querySelector(select.templateOf.searchWidget).innerHTML),
  discoverWidget: Handlebars.compile(document.querySelector(select.templateOf.discoverWidget).innerHTML),
};