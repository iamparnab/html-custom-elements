/**
 * @param {*} selector
 * @returns {HTMLElement}
 */
export function $(selector) {
  return (this || document).querySelector(selector);
}

/**
 * @param {*} selector
 * @returns {NodeListOf<HTMLElement>}
 */
export function $all(selector) {
  return document.querySelectorAll(selector);
}
