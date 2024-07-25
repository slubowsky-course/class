'use strict';
console.log('1', this);

(function () {


  function printPerson(/*person*/) {
    console.log('2', this);

    // console.log(`first: ${person.first} last: ${person.last}`);
    console.log(`first: ${this.first} last: ${this.last}`);
  }

  const potus = {
    first: 'Joe',
    last: 'Biden',
    /*print: function () {
      console.log(`first: ${this.first} last: ${this.last}`);
    }*/
   print: printPerson
  };

  potus.print();
  printPerson(potus);

  const vpotus = {
    first: 'Kamala',
    last: 'Harris',
    /*print: function () {
      console.log(`first: ${this.first} last: ${this.last}`);
    }*/
   print: printPerson
  };

  vpotus.print();
  //printPerson(vpotus);

}());
