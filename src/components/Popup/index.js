import style from './style.scss';
import 'Root/main.scss';

export class Popup extends HTMLElement {
  constructor() {
    super();
    this.icon = this.getAttribute('icon');
    this._shadowRoot = this.attachShadow({ mode: 'closed' });
  }

  /**
   * Observe attribute change
   */
  static get observedAttributes() {
    /**
     * Only observe 'text' attribute
     */
    return ['text'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    /**
     * This lifecycle method gets invoked everytime
     * the observed attributes are changed.
     * On the first call oldValue will be null,
     */
    console.table({
      'Attribute Name': name,
      'Old Value': oldValue,
      'New Value': newValue,
    });

    if (oldValue === null) {
      this.createCustomElement(this.icon, newValue);
    } else {
      this.updatePopupText(newValue);
    }
  }

  createCustomElement(icon, text) {
    /**
     * Create HTML
     */
    this._shadowRoot.innerHTML = `
        <div class="popup-w">
            <img src=${icon} alt="popup-icon"/>
            <div class="popup-text">
                ${text}
            </div>
        </div>
    `;
    /**
     * Create style element
     */
    const styleElem = document.createElement('style');
    /**
     * Add style string(by to-string-loader) in the node
     */
    styleElem.textContent = style;
    /**
     * Append style to Shadom DOM
     */
    this._shadowRoot.appendChild(styleElem);
  }
  updatePopupText(text) {
    this._shadowRoot.querySelector('div.popup-text').innerHTML = text;
  }
}

customElements.define('pop-up', Popup);
