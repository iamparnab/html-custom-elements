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
     * Create stylesheet
     */

    const style = document.createElement('style');
    style.textContent = `
        .popup-w {
            position: relative;
        }
        .popup-w > img {
            width: 20px;
            height: 20px;
            cursor: pointer;
        }
        .popup-w > img:hover + .popup-text{
            display: block
        }
        .popup-w > .popup-text {
            position: absolute;
            display: none;
            top: -40px;
            left: 50%;
            transform: translateX(-50%);
            border-radius: 8px;
            box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
            padding: 10px;
            border: 1px solid rgba(0,0,0,0.16);
            font-size: 14px;
            text-align: center;
            background-color: #fff;
            white-space: nowrap;
        }
     `;

    /**
     * Append style to Shadom DOM
     */
    this._shadowRoot.appendChild(style);
  }
  updatePopupText(text) {
    this._shadowRoot.querySelector('div.popup-text').innerHTML = text;
  }
}

customElements.define('pop-up', Popup);
