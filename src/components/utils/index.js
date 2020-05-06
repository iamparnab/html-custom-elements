/**
 * @param {string} selector
 * @param {ThisType} thisArg
 * @returns {HTMLElement}
 */
export function $(selector, thisArg) {
  return (thisArg || document).querySelector(selector);
}

/**
 * @param {*} selector
 * @returns {NodeListOf<HTMLElement>}
 */
export function $all(selector) {
  return document.querySelectorAll(selector);
}
