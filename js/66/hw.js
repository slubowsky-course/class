//(function () {
  'use strict';

  function performTransaction(amount, category) {
    console.log(category);
    this.balance += amount;
  }

  function createAccount(openingBalance) {
    console.log(this);
    return {
      balance: openingBalance,/*
      performTransaction(amount) {
        this.balance += amount;
      }*/
    };
  }

  const account1 = createAccount(1000);
  const account2 = createAccount(2000);

  //account1.performTransaction(500);
  //account2.performTransaction(-500);

  // performTransaction(500);

  // account1.balance = 1000000;

  performTransaction.call(account1, 500, 'pay check');
  performTransaction.call(account2, -500, 'food');

  performTransaction.apply(account1, [500, 'interest']);
  performTransaction.apply(account2, [-500, 'tuition']);

  const depositIntoAccount1 = performTransaction.bind(account1);
  depositIntoAccount1(1, 'foo');

  const depositFiftyIntoAccount1 = performTransaction.bind(account1, 50);
  depositFiftyIntoAccount1('bonus');

  const withdrawTenForSnacks = performTransaction.bind(account1, -10, 'snacks', 5);
  withdrawTenForSnacks();

  console.log(account1, account2);



  /*
  function createAccount(openingBalance) {
    let balance = openingBalance;

    return {
      getBalance() {
        return balance;
      },
      performTransaction(amount) {
        balance += amount;
      }
    };
  }
  */

//}());
