import { Routes } from './routes';

function popupHandler(rootElem) {
  rootElem.innerHTML = ` 
    <div class="sample-1">
        <pop-up icon='/assets/images/info.svg' text='A nice popup message'>
        </pop-up>
        Hover over the icon.
    </div>
    `;
  /**
   * es6 dynamic import for code splitting.
   */
  import('./src/components/Popup').then(({ Popup }) => {
    /**
     * Define Custom Element
     */
    customElements.define('pop-up', Popup);
  });
}

function timestampHandler(rootElem) {
  rootElem.innerHTML = `
    <div class="sample-2">
        <time-stamp epoch=${Date.now()}></time-stamp>
    </div>
    `;

  import('./src/components/Timestamp').then(({ Timestamp }) => {
    customElements.define('time-stamp', Timestamp);
  });
}

function imgInputHandler(rootElem) {
  rootElem.innerHTML = `
    <i-input></i-input>
  `;

  import('./src/components/ImgInput').then(({ ImgInput }) => {
    customElements.define('i-input', ImgInput);
  });
}

export function rootHandler(rootElem) {
  rootElem.innerHTML = `
    <div class="wrapper">
      <h3>
        Examples of Custom Elements
      </h3>
      <ol>
        <li>
          <a data-link="/popup" href="">Simple Popup</a>
        </li>
        <li>
          <a data-link="/timestamp" href="">Timestamp</a>
        </li>
        <li>
          <a data-link="/img-input" href="">Image Input</a>
        </li>
      </ol>
    </div>
  `;
}

export function routeHandler(rootElem) {
  const route = window.location.pathname;
  switch (route) {
    case Routes.POPUP: {
      popupHandler(rootElem);
      break;
    }
    case Routes.TIMESTAMP: {
      timestampHandler(rootElem);
      break;
    }
    case Routes.IMGINPUT: {
      imgInputHandler(rootElem);
      break;
    }
    default: {
      rootHandler(rootElem);
    }
  }
}
