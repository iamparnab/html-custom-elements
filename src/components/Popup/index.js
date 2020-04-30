export class Popup extends HTMLElement {
  constructor() {
    super();
    const icon = this.getAttribute('icon');
    const text = this.getAttribute('text');

    const shadowRoot = this.attachShadow({ mode: 'closed' });
    /**
     * Create HTML
     */
    shadowRoot.innerHTML = `
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
            top: -30px;
            left: -100px;
            width: 200px;
            border-radius: 8px;
            box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
            padding: 4px;
            border: 1px solid rgba(0,0,0,0.16);
            font-size: 14px;
            text-align: center;
            background-color: #fff;
        }
     `;

    /**
     * Append style to Shadom DOM
     */
    shadowRoot.appendChild(style);
  }
}

customElements.define('pop-up', Popup);
