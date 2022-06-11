import {
  templates,
} from '../settings.js';

class Discover {
  constructor(element) {
    const thisDiscover = this;
    thisDiscover.render(element);
  }

  render(element) {
    const thisDiscover = this;
    const generatedHTML = templates.discoverWidget();
    thisDiscover.dom = {};
    thisDiscover.dom.wrapper = element;
    thisDiscover.dom.wrapper.innerHTML = generatedHTML;
  }

}

export default Discover;