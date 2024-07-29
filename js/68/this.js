(function () {
  'use strict';

  /*function printPerson (person) {
    console.log(`first: ${person.first} last: ${person.last}`);
  }*/

  function printPerson(date, time) {
    console.log('this', this);
    console.log(`On ${date} at ${time} first: ${this.first} last: ${this.last}`);
  }

  function personCreator(first, last) {
    return {
      first,
      last,
      print: function (date, time) {
        console.log(`On ${date} at ${time} first: ${this.first} last: ${this.last}`);
      }
    };
  }

  const potus = personCreator('Joe', 'Biden');
  const vpotus = personCreator('Kamala', 'Harris');

  console.log(potus, vpotus);

  potus.print('7/28/24', '9:00pm');
  vpotus.print();

  //printPerson(potus);
  // printPotus();

  const potusesPrint = potus.print;
  //potusesPrint();

  //printPerson();
  printPerson.call(potus, '7/28/24', '9:00pm');
  printPerson.call(vpotus, '7/28/24', '9:00pm');

  potusesPrint.call(potus, '7/28/24', '9:00pm');
  potusesPrint.call(vpotus, '7/28/24', '9:00pm');

  printPerson.apply(vpotus, ['7/28/24', '9:00pm']);

  const printPotus = printPerson.bind(potus);
  printPotus('7/28/24', '9:00pm');

  const printVpotusOn728At920 = printPerson.bind(vpotus, '7/28/24', '9:20pm');
  printVpotusOn728At920();

  ///////////////////////////////

  const greeter1 = {
    greeting: 'Hello'
  };

  const greeter2 = {
    greeting: 'Shalom'
  };

  function greet(name) {
    console.log(`${this.greeting} ${name}`);
  }

  greet.call(greeter1, 'Joe');
  greet.apply(greeter2, ['Kamala']);

  const sayHelloToKamala = greet.bind(greeter1, 'Kamala');
  const sayShalomToJoe = greet.bind(greeter2, 'Joe');

  sayHelloToKamala();
  sayShalomToJoe();


}());
