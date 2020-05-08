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
 * @param {ThisType} thisArg
 * @returns {NodeListOf<HTMLElement>}
 */
export function $all(selector, thisArg) {
  return (thisArg || document).querySelectorAll(selector);
}
