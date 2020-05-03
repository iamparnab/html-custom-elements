const chalk = require('chalk');
const fs = require('fs');

const componentName = process.argv[2];

const Files = Object.freeze({
  HTML: 0,
  SCSS: 1,
  JS: 2,
});

if (componentName) {
  const componentRouteName = componentName.replace(/-/g, '');
  const componentClassName = kebabCaseToTitleCase(componentName);

  const path = `./src/components/${componentClassName}`;

  /**
   * Create Files
   */
  createFile(Files.HTML);
  createFile(Files.SCSS);
  createFile(Files.JS);

  /**
   * Add entry to menu (i.e root index.html)
   */

  fs.readFile('./index.html', (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    const htmlString = data.toString();
    const closingOLTagIndex = htmlString.indexOf('</ol>');

    const finalString =
      htmlString.slice(0, closingOLTagIndex) +
      `\t<li>\n\t\t\t\t\t<a href="/${componentRouteName}">${componentClassName}</a>\n\t\t\t\t</li>\n\t\t\t` +
      htmlString.slice(closingOLTagIndex);

    fs.writeFileSync('./index.html', finalString);
  });

  function createFile(type) {
    let fileContent = '';
    let file = '';
    switch (type) {
      case Files.HTML: {
        file = path + '/index.html';
        fileContent = html(componentClassName, componentRouteName);
        break;
      }
      case Files.SCSS: {
        file = path + '/style.scss';
        fileContent = scss(componentName);
        break;
      }
      case Files.JS: {
        file = path + '/index.js';
        fileContent = js(componentClassName);
        break;
      }
    }
    fs.mkdir(path, { recursive: true }, (err) => {
      if (err) {
        console.log(err);
        return;
      }
      fs.writeFileSync(file, fileContent);
      logProgress('Created', file);
    });
  }
}

function logProgress(text1, text2) {
  console.log(chalk.yellowBright(text1) + ' ' + chalk.blueBright(text2));
}

function html(componentClassName, componentRouteName) {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>${componentClassName}</title>
  </head>
  <body id="root">
    <${componentName}></${componentName}>
  </body>
  <script src="dist/${componentRouteName}.bundle.js"></script>
</html>
`;
}

function scss() {
  return `.${componentName}-w {
  position: relative;
  animation: float 5s infinite forwards linear;
}
@keyframes float {
  0% {
    transform: translate(0px, 0px);
  }
  25% {
    transform: translate(-100px, -100px);
  }
  50% {
    transform: translate(100px, -100px);
  }
  75% {
    transform: translate(100px, 100px);
  }
}
  `;
}

function js(componentClassName) {
  return `import style from './style.scss';
import 'Root/main.scss';

export class ${componentClassName} extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({mode: 'closed'});
    shadowRoot.innerHTML = '<div class="${componentName}-w">${componentName} works!</div>'

    /**
     * Create style
     */
    const styleElement = document.createElement('style');
    styleElement.textContent = style;

    /**
     * Attach to shadowRoot
     */

     shadowRoot.appendChild(styleElement)
  }
}
  
customElements.define('${componentName}', ${componentClassName});
`;
}

function kebabCaseToTitleCase(kebabCase) {
  const titleCase = [];
  let i = 0;
  while (i < kebabCase.length) {
    const char = kebabCase[i];

    if (i === 0) {
      titleCase.push(char.toUpperCase());
      i += 1;
    } else {
      if (char === '-') {
        titleCase.push(
          String.fromCharCode(kebabCase[i + 1].charCodeAt(0) - 32)
        );
        i += 2;
      } else {
        titleCase.push(char);
        i += 1;
      }
    }
  }
  return titleCase.join('');
}
