import {
  templates,
  select
} from '../settings.js';
import utils from '../utils.js';

class Song {
  constructor(id, data) {
    const thisSong = this;
    thisSong.id = id;
    thisSong.data = data;
    thisSong.render();
  }
  render() {
    const thisSong = this;
    const generatedHTML = templates.audioWidget(thisSong.data);
    thisSong.element = utils.createDOMFromHTML(generatedHTML);
    const songsContainer = document.querySelector(select.containerOf.songs);
    songsContainer.appendChild(thisSong.element);

  }
}

export default Song;