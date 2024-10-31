//(function () {
'use strict';

const potus = {
  first: 'Joe',
  last: 'Biden',
  print() {
    console.log(`I am ${this.first} ${this.last}`);
  }
};

potus.print();

//////////////////

function printPerson() {
  console.log(`I am ${this.first} ${this.last}`);
}

function createPerson(first, last) {
  return {
    first,
    last,
    /*print() {
      console.log(`I am ${this.first} ${this.last}`);
    }*/
    print: printPerson
  };
}

const joe = createPerson('Joe', 'Biden');
const kamala = createPerson('Kamala', 'Harris');
joe.print();
kamala.print();

function talk() {
  console.log(`${this.first} is talking...`);
}

joe.talk = talk;
kamala.talk = talk;

joe.talk();
kamala.talk();

//////////////////////////

const personFunctions = {
  print() {
    console.log(`I am ${this.first} ${this.last}`);
  },
  talk() {
    console.log(`${this.first} is talking...`);
  }
};

function createPerson2(first, last) {
  /*return {
    first,
    last,
    print: personFunctions.print,
    talk: personFunctions.talk
  };*/

  const p = {
    first,
    last
  };

  Object.assign(p, personFunctions);

  return p;
}

const donald = createPerson2('Donald', 'Trump');
donald.print();
donald.talk();

//////////////////////////

const p = {
  first: 'Joe',
  last: 'Biden',
  print() {
    console.log(`I am ${this.first} ${this.last}`);
  },
  toString() {
    return `first: ${this.first} last: ${this.last}`;
  }
};

console.log(p.toString());

console.log(p);

/////////////////////////////

const p2 = {
  first: 'J',
  last: 'Vance'
};

// deprecated
p2.__proto__ = personFunctions;
p2.print();
p2.talk();

function createPerson3(first, last) {
  const p = Object.create(personFunctions);
  p.first = first;
  p.last = last;
  return p;
}

const walz = createPerson3('Tim', 'Walz');
walz.talk();
walz.print();

const aoc = createPerson3('Alexandra', 'Cortez');
aoc.talk();
aoc.print();

personFunctions.walk = function () {
  console.log(`${this.first} is walking....`);
};

walz.walk();
aoc.walk();

/////////////////////////////////////

function Person(first, last) {
  this.first = first;
  this.last = last;

  //this.talk = personFunctions.talk;
  //Object.assign(this, personFunctions);
  //Person.prototype.numberOfPeople++;
  Person.numberOfPeople++;
}
//Person.prototype.talk = function () { console.log(`${this.first} is talking...`); };
//Person.prototype = personFunctions;
//Person.prototype.constructor = Person;
Object.assign(Person.prototype, personFunctions);

//Person.prototype.numberOfPeople = 0;
Person.numberOfPeople = 0;

/*Person.prototype.getNumberOfPeople = function () {
  return Person.prototype.numberOfPeople;
};*/
Person.getNumberOfPeople = function () {
  return Person.numberOfPeople;
};

const p3 = new Person('Robert', 'Kennedy');
console.log(p3, p3.constructor);

/*const p4 = Object.create(Person.prototype);
Person.call(p4, 'a', 'b');
console.log(p4);*/

//Person('a', 'b');

p3.talk();
p3.walk();
p3.print();

console.log(walz, p3);

/////////////////////

function Employee(first, last, jobTitle) {
  Person.call(this, first, last);
  //this.first = first;
  //this.last = last;
  this.jobTitle = jobTitle;

  //Person.numberOfPeople++;
}
//Employee.prototype = Person.prototype;
//Employee.prototype = new Person();
Employee.prototype = Object.create(Person.prototype);

Employee.prototype.print = function () {
  console.log(`I am ${this.first} ${this.last} and I am the ${this.jobTitle}`);
};

const elon = new Employee('Elon', 'Musk', 'CEO');
console.log(elon);

elon.talk();
elon.walk();
elon.print();

const mark = new Employee('Mark', 'Zuckerberg', 'President');
mark.talk();
mark.walk();
mark.print();

console.log(elon, mark);

///////////////////////////////////

class PersonC  {
  age = 0;
  #weight = 150;

  static #numberOfPeople = 0;

  constructor(first, last, weight) {
    this.first = first;
    this.last = last;
    this.#weight = weight || this.#weight;

    let email;
    this.setEmail = function (e) {
      email = e;
    };
    this.getEmail = function () {
      return email;
    };

    PersonC.#numberOfPeople++;
  }

  static getNumberOfPeople() {
    return PersonC.#numberOfPeople;
  }

  #sleep() {
    console.log(`${this.first} is sleeping. ZZZzzzzzzzz`);
  }

  print() {
    console.log(`I am ${this.first} ${this.last} and I am ${this.age} years old and I weigh ${this.#weight}`);
  }

  talk() {
    console.log(`${this.first} is talking...`);
  }

  walk() {
    console.log(`${this.first} is walking....`);
    this.#sleep();
  }
}

const melania = new PersonC('Melania', 'Trump');
console.log(melania);
melania.age = 60;
melania.print();

//console.log(melania.#weight);
//melania.#sleep();

melania.walk();

melania.setEmail('mtrump@trump.com');
console.log(melania.email);
console.log(melania.getEmail());

console.log(PersonC.getNumberOfPeople());
//console.log(PersonC.#numberOfPeople);


//console.log(melania.getNumberOfPeople());

const divs = document.querySelectorAll('div');
console.dir(divs);
//}());
