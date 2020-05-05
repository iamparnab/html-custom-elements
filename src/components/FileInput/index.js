import style from './style.scss';
import 'Root/main.scss';

export class FileInput extends HTMLElement {
  constructor() {
    super();

    let shadow = this.attachShadow({ mode: 'closed' });

    const div = document.createElement('div');

    if (this.getAttribute('candrop')) {
      div.setAttribute('id', 'dropTarget');
      div.textContent = 'Drag and drop your files here';
      div.ondragover = (event) => {
        event.preventDefault();
      };
      div.ondrop = (event) => {
        event.preventDefault();
        this.addFiles(event.dataTransfer.files, label);
      };
    }

    let img = document.createElement('img');
    img.setAttribute(
      'src',
      this.getAttribute('icon') || 'assets/images/Pink.ico'
    );

    let label = document.createElement('label');
    label.setAttribute('for', 'file-input');
    label.setAttribute('data-file-chosen', 'false');
    label.setAttribute('title', 'No file chosen');
    label.textContent = 'No file chosen';

    let finput = document.createElement('input');
    finput.setAttribute('type', 'file');
    finput.setAttribute('accept', this.getAttribute('accept'));
    finput.setAttribute('id', 'file-input');
    finput.onchange = (_) => {
      this.addFiles(finput.files, label);
    };

    this._error = document.createElement('div');

    let inputContainer = document.createElement('div');
    inputContainer.setAttribute('id', 'inputContainer');
    inputContainer.append(img, label, this._error);

    let styleElem = document.createElement('style');
    styleElem.textContent = style;

    shadow.append(styleElem, div, inputContainer, finput);
  }

  addFiles(files, elem) {
    let filelist = [];
    for (let i = 0; i < files.length; i++) {
      filelist.push(files[i]);
    }

    const acceptedExtensions = this.getAttribute('accept').split(',');
    const isFileAllowed = filelist.some((file) => {
      const extension = file.name.split('.').slice(-1)[0];
      return acceptedExtensions.includes('.' + extension);
    });
    if (!isFileAllowed) {
      this._error.innerHTML = `Wrong extension. Allowed types are <i>${acceptedExtensions.join(
        ', '
      )}.</i>`;
      return;
    }

    this._error.innerHTML = '';
    const fileNames = filelist.map((file) => file.name).join('; ');
    elem.removeAttribute('data-file-chosen');
    elem.setAttribute('title', fileNames);
    elem.textContent = fileNames;

    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { files: filelist },
      })
    );
  }
}

customElements.define('f-input', FileInput);
