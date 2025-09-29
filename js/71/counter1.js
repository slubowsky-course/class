window.app = window.app || {};

window.app.counter = (function () {
  let i = 0;

  return {
    increment: () => ++i,
    getCount: () => i
  };
}());
