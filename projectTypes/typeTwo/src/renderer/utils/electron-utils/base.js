/**
 *
 * */

export const base = obj => {
  window.electron_utils = Object.assign(window.electron_utils || {},obj);
  return window.electron_utils;
}
