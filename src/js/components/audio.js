import {
  templates,
  select
} from '../settings.js';
import utils from '../utils.js';

class Audio {
  constructor(id, data) {
    const thisAudio = this;
    thisAudio.id = id;
    thisAudio.data = data;
    thisAudio.render();
  }
  render() {
    const thisAudio = this;
    const generatedHTML = templates.audioWidget(thisAudio.data);
    thisAudio.element = utils.createDOMFromHTML(generatedHTML);
    const audioContainer = document.querySelector(select.containerOf.audio);
    audioContainer.appendChild(thisAudio.element);
  }

}

export default Audio;