import {
  templates,
} from '../settings.js';


class Subscribe {
  constructor(element) {
    const thisSubscribe = this;
    thisSubscribe.render(element);
  }

  render(element) {
    const thisSubscribe = this;
    const generatedHTML = templates.subscribeWidget();
    thisSubscribe.dom = {};
    thisSubscribe.dom.wrapper = element;
    thisSubscribe.dom.wrapper.innerHTML = generatedHTML;
  }
}
export default Subscribe;