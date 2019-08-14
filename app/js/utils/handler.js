export const on = (event, el) => (handler) => {
  el.addEventListener(event, handler, true);
  return () => el.removeEventListener(event, handler, true);
}
