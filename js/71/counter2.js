window.app = window.app || {};

window.app.counters = (function () {
  let numCounters = 0;

  return {
    createCounter: function () {
      numCounters++;
      console.log(`${numCounters} have been created`);

      let i = 0;

      return {
        increment: () => ++i,
        getCount: () => i
      };
    },
    getNumCounters: () => numCounters
  };
}());
