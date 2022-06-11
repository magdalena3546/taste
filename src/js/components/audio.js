import {
  templates,
} from '../settings.js';
import utils from '../utils.js';

class Audio {
  constructor(id, data, container) {
    const thisAudio = this;
    thisAudio.id = id;
    thisAudio.data = data;
    thisAudio.render(container);
  }
  render(container) {
    const thisAudio = this;
    const generatedHTML = templates.audioWidget(thisAudio.data);
    thisAudio.element = utils.createDOMFromHTML(generatedHTML);

    container.appendChild(thisAudio.element);
  }

}

export default Audio;