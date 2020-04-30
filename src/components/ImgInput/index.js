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

    let style = document.createElement('style');
    style.textContent = `
        div {
          position: relative;
          display: inline-block;
              }
  
              input {
                  padding: 15px;
          font-size: 14px;
          border-radius: 4px;
          border: 1px solid #000000e3;
        }
        input:focus {
          outline: none;
        }
  
              img {
          top: 50%;
          width: 30px;
          right: 15px;
                  position: absolute;
                  transform: translateY(-50%);
              }
          `;

    shadow.append(style, container);
  }
}

customElements.define('i-input', ImgInput);
