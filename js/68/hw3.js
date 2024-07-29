/* global theInterestCalculator */
(function () {
  'use strict';

  theInterestCalculator.setRate(.1);
  theInterestCalculator.setYears(2);
  console.log(theInterestCalculator.calculateInterest(100));

  console.log(theInterestCalculator.setRate(.1)
                       .setYears(2)
                       .calculateInterest(100));

}());
