//(function () {
'use strict';

function performTransaction(amount, memo) {
  console.log(memo);
  this.balance += amount;
}

function createAccount(openingBalance) {
  return {
    balance: openingBalance,
    /*performTransaction(amount) {
      this.balance += amount;
    }*/
  };
}

const account1 = createAccount(5000);
const account2 = createAccount(2000);

//account1.performTransaction(-1000);
//account2.performTransaction(2000);
performTransaction.call(account1, -1000, 'food');
performTransaction.call(account2, 2000, 'paycheck');
performTransaction.apply(account1, [-1000, 'food']);
performTransaction.apply(account2, [2000, 'paycheck']);

const transactOnAccount1 = performTransaction.bind(account1);
transactOnAccount1(25);

const withdraw50FromAccount2 = performTransaction.bind(account2, -50);

withdraw50FromAccount2('food');
withdraw50FromAccount2('misc');

const withdraw100FromAccount2ForVacation = performTransaction.bind(account2, -100, 'vacation');

withdraw100FromAccount2ForVacation();
withdraw100FromAccount2ForVacation();

console.log(account1, account2);

/*function createAccount(openingBalance) {
  let balance = openingBalance;

  return  {
    performTransaction(amount) {
      balance += amount;
    },
    getBalance: function () {
      console.log(`The private closure balance is ${balance} the fake added on balance is ${this.balance}`);
      return balance;
    }
  };
}

const account1 = createAccount(5000);
account1.getBalance();

const account2 = createAccount(2000);

account1.performTransaction(-1000);
account2.performTransaction(2000);

account1.balance = 10000000;
account1.getBalance();

account1.foo = 'bar';

console.log(account1, account2);

console.log(account1.getBalance(), account2.getBalance());*/

/*
let secret = 'this is secret #1';

function getPotus() {
  let secret3 = 'this is secret 3';

  function foo() {
    console.log('foo called');
  }

  return {
    secret2: 'this is secret #2',
    first: 'Joe',
    last: 'Biden',
    print() {
      foo();
      console.log(`${this.first} ${this.last} ${this.age} ${secret} ${this.secret2} ${secret3}`);
    }
  };
}
const potus = getPotus();
potus.print();
potus.age = 100000;

console.log(potus);
potus.print();*/

//}());
