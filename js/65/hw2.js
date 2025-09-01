window.interestCalculator = (function() {
  'use strict';

  let rate = .1;
  let years = 2;

  function calculateInterest(principle) {
    let total = principle;

    for (let i = 0; i < years; i++) {
      total += total * rate;
    }

    return total - principle;
  }

  return {
    setRate(r) {
      rate = r;
      return this;
    },
    setYears(y) {
      years = y;
      return this;
    },
    calculateInterest
  };
}());
