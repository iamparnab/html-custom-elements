export class BeautifulOption extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerText = this.getAttribute('value');
  }
}
