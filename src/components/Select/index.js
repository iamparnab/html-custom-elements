import style from './style.scss';
import optionStyle from './options.scss';
import 'Root/main.scss';

import { $all, $ } from '../utils';
import { BeautifulOption } from './Option';

export class BeautifulSelect extends HTMLElement {
  constructor() {
    super();
    this.styleElem = null;
    this._shadow = null;
    this._main = null;
  }

  connectedCallback() {
    const options = $all('beautiful-option');

    const fragment = document.createDocumentFragment();

    for (let i = 0; i < options.length; i += 1) {
      const beautifulOption = document.createElement('beautiful-option');
      beautifulOption.setAttribute('value', options[i].innerText);

      if (i === 0) {
        beautifulOption.className = 'main';
        this._main = beautifulOption;
      } else if (i === 1) {
        const fakeBeautifulOption = document.createElement('beautiful-option');
        fakeBeautifulOption.setAttribute('value', options[0].innerText);
        fragment.appendChild(fakeBeautifulOption);
      }

      fragment.appendChild(beautifulOption);
    }

    const shadowRoot = this.attachShadow({ mode: 'closed' });

    /**
     * Create wrapper
     */
    const selectWrapper = document.createElement('div');
    selectWrapper.className = 'select-wrapper';
    selectWrapper.appendChild(fragment);
    selectWrapper.addEventListener('click', this.clickHandler.bind(this));

    shadowRoot.appendChild(selectWrapper);

    const styleElem = document.createElement('style');
    styleElem.textContent = style;
    shadowRoot.appendChild(styleElem);

    this._shadow = shadowRoot;
  }

  clickHandler(event) {
    if (this._main !== event.target) {
      this._main.innerHTML = event.target.innerText;

      this._shadow.removeChild(this.styleElem);
      this.styleElem = null;

      this._main.className = 'main';
      this._main = $.call(this._shadow, 'beautiful-option');
    } else {
      this._main.classList.remove('main');
      const styleElem = document.createElement('style');
      styleElem.textContent = optionStyle;

      /**
       * Clear existing style
       */
      if (this.styleElem) {
        this._shadow.removeChild(this.styleElem);
      }

      this.styleElem = styleElem;

      this._shadow.appendChild(this.styleElem);
    }
  }
}

customElements.define('beautiful-select', BeautifulSelect);
customElements.define('beautiful-option', BeautifulOption);
