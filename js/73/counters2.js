window.app = window.app || {};


window.app.counters = (function () {
  let numCounters = 0;

  return {
    createCounter: function () {
      numCounters++;

      let i = 0;

      return {
        increment: () => ++i,
        getCount: () => i,
      };
    },
    getNumCounters: () => numCounters
  };
}());
