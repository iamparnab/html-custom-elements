import style from './style.scss';
import '../../../main.scss';

export class ImgInput extends HTMLElement {
  constructor() {
    super();

    let shadow = this.attachShadow({ mode: 'closed' });

    let container = document.createElement('div');

    let input = document.createElement('input');

    let img = document.createElement('img');
    img.setAttribute(
      'src',
      this.getAttribute('icon') || 'assets/images/paw.svg'
    );

    container.append(input, img);

    let styleElem = document.createElement('style');
    styleElem.textContent = style;

    shadow.append(styleElem, container);
  }
}

customElements.define('i-input', ImgInput);
