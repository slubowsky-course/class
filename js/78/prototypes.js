'use strict';

function printPerson() {
  console.log(`I am ${this.first} ${this.last}`);
}

const p = {
  first: 'Donald',
  last: 'Trump',
  print() {
    console.log(`I am ${this.first} ${this.last}`);
  }
};

console.log(p);
//printPerson(p);
printPerson.call(p);
p.print();

function createPerson(first, last) {
  return {
    first,
    last,
    print1() {
      console.log(`I am ${this.first} ${this.last}`);
    },
    print: printPerson
  };
};

const melania = createPerson('Melania', 'Trump');
melania.print();

const jd = createPerson('JD', 'Vance');
jd.print();

function talk() {
  console.log(`${this.first} ${this.last} says blah blah`);
};

melania.talk = talk;
jd.talk = talk;

melania.talk();
jd.talk();

/////////////////////////////

const personFunctions = {
  print() {
    console.log(`I am ${this.first} ${this.last}`);
  },
  talk() {
    console.log(`${this.first} ${this.last} says blah blah`);
  }/*,
  foo() {
    console.log('foo2');
  }*/
};

function createPerson2(first, last) {
  const p = {
    first,
    last/*,
    print: personFunctions.print,
    talk: personFunctions.talk*/
    /*foo() {
      console.log('foo1');
    }*/
  };

  Object.assign(p, personFunctions);

  return p;
};

const marco = createPerson2('Marco', 'Rubio');
marco.print();
marco.talk();
// marco.foo();

const employeeFunctions = {
  work() {
    console.log(`${this.first} ${this.last} is working...`);
  },
  print() {
    console.log(`I am ${this.first} ${this.last} and I am the ${this.jobTitle}`);
  }
};

function createEmployee(first, last, jobTitle) {
  const emp = createPerson2(first, last);
  emp.jobTitle = jobTitle;

  /*emp.work = function() {
    console.log(`${this.first} ${this.last} is working...`);
  };
  emp.print = function () {
    console.log(`I am ${this.first} ${this.last} and I am the ${this.jobTitle}`);
  };*/

  Object.assign(emp, employeeFunctions);

  /*emp.toString = function () {
    return `I am ${this.first} ${this.last} and I am the ${this.jobTitle}`;
  };*/

  return emp;
}

const emp = createEmployee('Elon', 'Musk', 'CEO');
emp.print();
emp.talk();
emp.work();

console.log(emp.toString());

// deprecated
/*emp.__proto__ = {
  foo() {
    console.log('foo');
  },
  x: 5
};

const p2 = {
  first: 'Zohan',
  last: 'Mamdani'
};

p2.__proto__ = personFunctions;
p2.print();
p2.talk();*/

function createPerson3(first, last) {
  const p2 = Object.create(personFunctions);
  p2.first = first;
  p2.last = last;
  return p2;
}

const p3 = createPerson3('Zohan', 'Mamdani');
p3.talk();
p3.print();
console.log(p3);

const p4 = createPerson3('Jack', 'Ciatrelli');
p4.talk();
p4.print();
console.log(p4);

personFunctions.walk = function () {
  console.log(`${this.first} ${this.last} is walking`);
};


p3.walk();
p4.walk();

//p3.__proto__.foo = 5;
personFunctions.bar = 6;

console.log(p3, p4);

// Object.setPrototypeOf(p4, {foobar: 10});
// console.log(p4);

const empProto = Object.create(personFunctions);
empProto.work = function () {
  console.log(`${this.first} ${this.last} is working`);
};
empProto.print = employeeFunctions.print;

function createEmployee2(first, last, jobTitle) {
  const emp = Object.create(empProto);
  emp.first = first;
  emp.last = last;
  emp.jobTitle = jobTitle;

  /*emp.work = function() {
    console.log(`${this.first} ${this.last} is working`);
  };*/

  return emp;
}

const emp2 = createEmployee2('Bill', 'Gates', 'CEO');
emp2.talk();
emp2.print();
emp2.work();



////////////////////////////

function Person(first, last) {
  //console.log(this);
  this.first = first;
  this.last = last;

  /*this.talk = function (){
    console.log(`${this.first} ${this.last} says blah blah`);
  };*/
}
/*Person.prototype.talk = function () {
  console.log(`${this.first} ${this.last} says blah blah`);;
};*/
Person.prototype = personFunctions;
Person.prototype.constructor = Person;


const p5 = new Person('Cheryl', 'Governer');
console.log(p5);

//Person('a', 'b');
p5.talk();
p5.walk();
p5.print();

function Employee(first, last, jobTitle) {
  Person.call(this, first, last);
  this.jobTitle = jobTitle;
}
Employee.prototype = Object.create(Person.prototype);
Employee.prototype.constructor = Employee;
Employee.prototype.work = function () {
  console.log(`${this.first} ${this.last} is working`);
};
Employee.prototype.print = function () {
  console.log(`I am ${this.first} ${this.last} and I am ${this.jobTitle}`);
};

const emp3 = new Employee('Mark', 'Zuckerberg', 'CEO');
emp3.talk();
emp3.walk();
emp3.print();
emp3.work();

////////////////////////////////

class PersonC {
  #weight = 0;

  constructor(first, last, weight) {
    this.first = first;
    this.last = last;
    this.#weight = weight;

    let age = 0;
    this.setAge = a =>  {
      age = a;
    };
    this.getAge = () => {
      return age;
    };
  }

  print() {
    console.log(`I am ${this.first} ${this.last} and I weigh ${this.#weight}`);
  }

  talk() {
    console.log(`${this.first} ${this.last} says blah blah`);
  }
}

const p6 = new PersonC('Avi', 'Schnall', 125);
console.log(p6);

p6.print();
p6.talk();

console.log(p5, p6);

//PersonC.prototype.print = 5;
//p6.print();
//console.log(p6.#weight);

class EmployeeC extends PersonC {
  constructor(first, last, jobTitle) {
    super(first, last);
    this.jobTitle = jobTitle;
  }

  work() {
    console.log(`${this.first} ${this.last} is working`);
  }

  print() {
    super.print();
    console.log(`and I am ${this.jobTitle}`);
  }
}

const emp4 = new EmployeeC('Satya', 'Nadella', 'CEO');
emp4.talk();
emp4.print();
emp4.work();

console.log(emp4);
