//(function () {
'use strict';

class Person {
  #age = 0;

  constructor(first, last, age) {
    this.first = first;
    //this.last = last;
    this.#age = age;

    let myLast = last;
    this.setLast = function (l) {
      myLast = l;
    };
    this.getLast = function () {
      return myLast;
    };
  }

  get age() {
    return this.#age;
  }

  set age(age) {
    if (age < 0) {
      throw new Error('Age must be >= 0');
    }
    this.#age = age;
  }

  toString() {
    //return `first: ${this.first} last: ${this.getLast()} age: ${this.#age}`;

    return Object.entries(this).map(([key, value]) => `${key}: ${value}`).join(', ');
  }
}

const donald = new Person('Donald', 'Trump', 80);
//donald.first = 'donald';
//donald.last = 'Trump';
//donald.age = 80;
//console.log(donald.#age);

console.log(`I am ${donald}`);

class Student extends Person {
  #grade = 0;
  constructor(first, last, age, grade) {
    super(first, last, age);
    this.#grade = grade;
  }

  /*toString() {
    return `${super.toString()} grade: ${this.#grade}`;
  }*/
}

const elon = new Student('Elon', 'Musk', 55, 100);
console.log(`student is ${elon}`);

/////////////////////////////////

function createPerson(first, last, age) {
  let myAge = age;
  const p =  {
    first,
    last,
    /*get age() {
      return myAge;
    },
    set age(age) {
      myAge = age;
    }*/

    get fullname() {
      return `${this.first} ${this.last}`;
    },
    set fullname(name) {
      const parts = name.split(' ');
      this.first = parts[0];
      this.last = parts[1];
    }
  };
  Object.defineProperty(p, 'age', {
    get() {
      return myAge;
    },
    set(age) {
      myAge = age;
    }
  });


  return p;

}

const jd = createPerson('JD', 'Vance', 45);
console.log(jd);

//////////////////////

const o = Object.create({ foo() { console.log('foo'); } }, {
  first: { value: 'Joe', configurable: true, writable: true, enumerable: true }
});

Object.defineProperty(o, 'last', {
  value: 'Biden',
  enumerable: true
});

//o.foo = 5;

o.bar = function () {
  console.log('bar');
};

console.log(o);

///////////////////

for (const prop in o) {
  console.log(prop);
}

const o2 = Object.create(o);
console.log(o2);

for (const prop in o2) {
  console.log(prop);
}

console.log('---------');
for (const prop in o2) {
  //if (o2.hasOwnProperty(prop)) {
  console.log(prop, o2[prop]);
  //}
}

///////////////

console.log(jd.fullname);
jd.fullname = 'Tim Walz';
console.log(jd);

console.log(Object.keys(o));

Object.keys(o).forEach(k => console.log(`${k} -> ${o[k]}`));

Object.values(o).forEach(v => console.log(v));

Object.entries(o).forEach(keyValuePair => console.log(`${keyValuePair[0]} -> ${keyValuePair[1]}`));


Object.entries(o).forEach(([key, value]) => console.log(`${key} -> ${value}`));

console.log(Object.entries(o));
//}());


console.log(elon.toString());
