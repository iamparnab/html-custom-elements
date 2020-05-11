import style from './style.scss';
import 'Root/main.scss';
import { $ } from '../utils';

export class AutoComplete extends HTMLElement {
  static get observedAttributes() {
    return ['list'];
  }
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'closed' });
    this._shadow = shadowRoot;
    this.listElement = null;
    this.inputElement = null;
    this.list = [];

    shadowRoot.innerHTML = this.render();

    /**
     * Create style
     */
    const styleElement = document.createElement('style');
    styleElement.textContent = style;

    /**
     * Attach to shadowRoot
     */

    shadowRoot.appendChild(styleElement);

    this.listElement = $('.list', this._shadow);
    this.inputElement = $('input', this._shadow);
  }

  attributeChangedCallback(name, _, newValue) {
    if (name === 'list') this.list = newValue.split(',');
  }

  connectedCallback() {
    this.inputElement.focus();
    this.inputElement.addEventListener('keyup', this.changeHandler.bind(this));
    this.listElement.addEventListener('click', this.clickHandler.bind(this));
  }

  clickHandler(ev) {
    if (ev.target.dataset.item) {
      this.inputElement.value = ev.target.innerText;
      this.listElement.innerHTML = '';
    }
  }

  changeHandler(ev) {
    const text = ev.target.value.trim();

    if (text) {
      this.listElement.innerHTML = '';
      const fragment = document.createDocumentFragment();

      for (let i = 0; i < this.list.length; i += 1) {
        const item = this.list[i];
        const regex = new RegExp(text, 'i');
        const result = regex.exec(item);
        if (result) {
          const before = item.slice(0, result.index);
          const middle = item.slice(result.index, result.index + text.length);
          const after = item.slice(result.index + text.length);

          const div = document.createElement('div');
          div.setAttribute('data-item', item);

          div.innerHTML = `${before}<span class="highlight">${middle}</span>${after}`;

          fragment.appendChild(div);
        }
      }

      this.listElement.appendChild(fragment);
    } else {
      this.listElement.innerHTML = 'No Results found';
    }
  }
  render() {
    return `
      <div class="auto-complete-w">
        <div><input placeholder="Start searching fruits..." /></div>
        <div class="list"></div> 
      </div>
    `;
  }
}

customElements.define('auto-complete', AutoComplete);
