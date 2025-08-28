'use strict';

function printPerson(person) {
  console.log(`First: ${person.first} Last: ${person.last}`);
}

const potus = {
  first: 'Donald',
  last: 'Trump',
  print: function () {
    console.log(`First: ${this.first} Last: ${this.last}`);
  }
};

potus.age = 80;
potus.last = 'Trumpo';

console.log(potus);
console.log(potus.first, potus.last);
potus.print();
printPerson(potus);


function createPerson(first, last) {
  return {
    first,
    last,
    print() {
      console.log(`First: ${this.first} Last: ${this.last}`);
    }
  };
}

const jd = createPerson('JD', 'Vance');
const patel = createPerson('k', 'patel');
jd.print();
patel.print();

////////////////////////////////////

let potusJsonString = JSON.stringify(potus);
console.log(potusJsonString);

let reconstitutedPotus = JSON.parse(potusJsonString);
console.log(reconstitutedPotus);
console.log(reconstitutedPotus.first, reconstitutedPotus.last);

const reconstitudedPotusAsPerson = createPerson(reconstitutedPotus.first, reconstitutedPotus.last);
reconstitudedPotusAsPerson.print();

///////////////

potus.first = 'Kamala';
potus.print();

/////////////////////


function createPerson2(first, last) {
  function foo(){
    console.log('foo was called');
  }

  return {
    getFirst() {
      return first;
    },
    setFirst(f) {
      if (f === 'Kamala') {
        throw new Error('No Kamalas allowed');
      }
      first = f;
      return this;
    },
    getLast() {
      return last;
    },
    setLast(l) {
      last = l;
      return this;
    },
    print() {
      foo();
      console.log(`First: ${first} Last: ${last}`);
      return this;
    }
  };
}

const kamala = createPerson2('Kamala', 'Harris');
//kamala._first = 'Donald';
kamala.setFirst('Donald');

console.log(kamala.getFirst());


console.log(kamala);

kamala.print();

const melania = createPerson2('Melania', 'Trump');
console.log(melania);

melania.setFirst('Ivanka');
melania.setLast('Kushner');
melania.print();
melania.print();

melania.setFirst('Ivanka')
        .setLast('Kushner')
        .print()
        .print();

console.log(melania.getFirst().toUpperCase());

melania.setFirst('Kamala');
