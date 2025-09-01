'use strict';
console.log(this);

(function () {
  'use strict';

  /*const potus = {
    first: 'Donald',
    last: 'Trump',
    print() {
      console.log(`first: ${this.first} last: ${this.last}`);
    }
  };

  potus.print();*/

  /*function printPerson(person) {
    console.log(`first: ${person.first} last: ${person.last}`);
  }*/

  function printPerson(date, time) {
    console.log(this);
    console.log(`${date} ${time} - first: ${this.first} last: ${this.last}`);
  }

  function createPerson(first, last) {
    return {
      first,
      last,
      /*print() {
        console.log(`first: ${this.first} last: ${this.last}`);
      }*/
      print: printPerson
    };
  }

  const potus = createPerson('Donald', 'Trump');
  const hegseth = createPerson('Pete', 'Hegseth');

  potus.print('8/31/25', '9:18pm');
  hegseth.print('8/31/25', '9:18pm');

  // printPerson();

  const potusesPrint = potus.print;
  //potusesPrint();

  printPerson.call(potus, '8/31/25', '9:18pm');
  printPerson.apply(potus, ['8/31/25', '9:18pm']);

  const params = ['8/31/25', '9:18pm'];
  printPerson.apply(potus, params);

  potusesPrint.call(potus, '8/31/25', '9:18pm');
  potusesPrint.call(hegseth, '8/31/25', '9:18pm');

  potusesPrint.call({}, '8/31/25', '9:18pm');

  const printPotus = printPerson.bind(potus);
  printPotus();

  const printHegseth = printPerson.bind(hegseth, '8/31/25');
  printHegseth('9:18pm');

  //////////////////////

  const greeter1 = {
    greeting: 'Hello'
  };

  const greeter2 = {
    greeting: 'Shalom'
  };

  function greet(name) {
    console.log(`${this.greeting} ${name}`);
  }

  greet.call(greeter1, 'Donald');
  greet.call(greeter2, 'Donald');

  greet.apply(greeter2, ['Donald']);

  const sayHelloTo = greet.bind(greeter1);
  sayHelloTo('Joe');
  sayHelloTo('Kamala');

  const sayShalomTo = greet.bind(greeter2);
  sayShalomTo('Joe');
  sayShalomTo('Kamala');

  const sayHelloToMelania = greet.bind(greeter1, 'Melania');
  sayHelloToMelania();
}());
