'use strict';

const potus = {
  first: 'Joe',
  last: 'Biden',

  print: function () {
    console.log(`I am ${this.first} ${this.last}`);
  }
};

console.log(potus, typeof (potus));

potus.age = 213;

function printPerson(p) {
  console.log(`I am ${p.first} ${p.last}`);
}

printPerson(potus);
//printPerson(5);

potus.first = 'Kamala';
potus.last = 'Harris';
potus.saying = 'Unburdened by what his been';
potus.print();

function printPerson2() {
  console.log(`I am ${this.first} ${this.last}`);
}

function createPerson(first, last) {
  return {
    /*first: first,
    last: last,*/
    first,
    last,
    /*print: function () {
      console.log(`I am ${this.first} ${this.last}`);
    }*/
    print() {
      console.log(`I am ${this.first} ${this.last}`);
      //console.log(`I am ${first} ${last}`);
    }
    //print: printPerson2
  };
}

const donald = createPerson('Donald', 'Trump');
const vance = createPerson('JD', 'Vance');
console.log(donald, vance);

donald.print();
vance.print();

//printPerson2();

/////

/*{
  "first": "Donald",
  "last": "Trump"
}*/

let personJson = JSON.stringify(donald);
console.log(personJson, typeof (personJson));

let reconstitutedPerson = JSON.parse(personJson);
console.log(reconstitutedPerson, typeof (reconstitutedPerson));

//reconstitutedPerson.print();
let donaldTheSecond = createPerson(reconstitutedPerson.first, reconstitutedPerson.last);
donaldTheSecond.print();

donaldTheSecond.first = 'Donny';
donaldTheSecond.print();
console.log(donaldTheSecond);
