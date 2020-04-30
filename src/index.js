import { Routes } from '../routes';
import { rootHandler, routeHandler } from '../route-handlers';

const rootElem = document.querySelector('#root');

/**
 * Load initial HTML, for now assuming that always
 * / path will be loaded first.
 */
routeHandler(rootElem);

/**
 * Attach routechange event on window
 */
window.addEventListener('routechange', () => {
  routeHandler(rootElem);
});

/**
 * Attach popstate event to handle browser navigation
 */
window.addEventListener('popstate', () => {
  routeHandler(rootElem);
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
