/* global interestCalculator: true */

//const interestCalculator = getInterestCalculator();
interestCalculator.setRate(.2);
interestCalculator.setYears(4);
console.log(interestCalculator.calculateInterest(100));

// interestCalculator = 5;

console.log(interestCalculator.setRate(.3)
                  .setYears(10)
                  .calculateInterest(100));
