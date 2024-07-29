
window.theInterestCalculator = (function() {
  'use strict';

  let rate;
  let years;

  /*function calculateInterest(principal) {
    let total = principal;
    for(let i = 0; i < years; i++) {
      total += total * rate;
    }
    return total - principal;
  }*/

  console.log('when function created', this);

  return {
    setRate: function (r) {
      console.log(this);
      rate = r;
      return this;
    },
    setYears: function (y) {
      console.log(this);
      years = y;
      return this;
    },
    calculateInterest: function (principal) {

      console.log('in calculateInterest', this);

      let arrowFuncSetYears = (y) => {
        console.log(this);
        years = y;
        return this;
      };

      arrowFuncSetYears(4);


      let total = principal;
      for (let i = 0; i < years; i++) {
        total += total * rate;
      }
      return total - principal;
    }
  };
}());

//const theInterestCalculator = interestCalculator();

/*theInterestCalculator.setRate(.1);
theInterestCalculator.setYears(2);
console.log(theInterestCalculator.calculateInterest(100));*/
