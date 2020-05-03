import style from './style.scss';
import 'Root/main.scss';

export class FileInput extends HTMLElement {
  constructor() {
    super();

    let shadow = this.attachShadow({ mode: 'closed' });

    let img = document.createElement('img');
    img.setAttribute(
      'src',
      this.getAttribute('icon') || 'assets/images/Pink.ico'
    );

    let label = document.createElement('label');
    label.setAttribute('for', 'file-input');
    label.append(img);

    let finput = document.createElement('input');
    finput.setAttribute('type', 'file');
    finput.setAttribute('accept', this.getAttribute('accept'));
    finput.setAttribute('id', 'file-input');
    finput.onchange = (event) => {
      label.innerText = event.target.value;
      this.dispatchEvent(
        new CustomEvent('change', {
          detail: { value: event.target.value },
        })
      );
    };

    let styleElem = document.createElement('style');
    styleElem.textContent = style;

    shadow.append(styleElem, label, finput);
  }
}

customElements.define('f-input', FileInput);
