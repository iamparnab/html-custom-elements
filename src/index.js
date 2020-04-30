import { Routes } from '../routes';
import { popupHandler, rootHandler, timestampHandler } from '../route-handlers';

const rootElem = document.querySelector('#root');

/**
 * Load initial HTML, for now assuming that always
 * / path will be loaded first.
 */
rootHandler(rootElem);

/**
 * Attach routechange event on window
 */
window.addEventListener('routechange', () => {
  const route = window.location.pathname;
  switch (route) {
    case Routes.POPUP: {
      popupHandler(rootElem);
      break;
    }
    case Routes.TIMESTAMP: {
      timestampHandler(rootElem);
    }
  }
});

/**
 * Attach popstate event to handle browser navigation
 */
window.addEventListener('popstate', () => {
  const route = window.location.pathname;
  switch (route) {
    case Routes.ROOT: {
      rootHandler(rootElem);
      break;
    }
  }
});

/**
 * Prevent anchor tag clicks and handle the route
 */
document.addEventListener('click', (event) => {
  const {
    nodeName,
    dataset: { link },
  } = event.target;
  /**
   * Anchor nodes with data-link attribute can
   * perform frontend routing.
   */
  if (nodeName === 'A' && link !== void 0) {
    event.preventDefault();
    window.history.pushState({}, '', link);
    window.dispatchEvent(new Event('routechange'));
  }
});
