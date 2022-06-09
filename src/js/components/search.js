import {
  templates,
} from '../settings.js';

class Search {
  constructor(element) {
    const thisSearch = this;
    thisSearch.render(element);
  }

  render(element) {
    const thisSearch = this;
    const generatedHTML = templates.searchWidget();
    thisSearch.dom = {};
    thisSearch.dom.wrapper = element;
    thisSearch.dom.wrapper.innerHTML = generatedHTML;
  }

}

export default Search;