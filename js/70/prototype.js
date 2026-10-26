function printPerson(p) {
  console.log(`${p.first} ${p.last}`);
}

function printPerson2() {
  console.log(`${this.first} ${this.last}`);
}

const p = {
  first: 'Donald',
  last: 'Trump',
  print() {
    console.log(`${this.first} ${this.last}`);
  }
};

console.log(p);
printPerson(p);
p.print();

printPerson2.call(p);

function createPerson(first, last) {
  return {
    first,
    last,
    /*print() {
      console.log(`${this.first} ${this.last}`);
    }*/
    print: printPerson2
  };
}

const p1 = createPerson('Melania', 'Trump');
const p2 = createPerson('Jared', 'Kushner');

p1.print();
p2.print();

function talk() {
  console.log(`${this.first} says - blah`);
}

p1.talk = talk;
p2.talk = talk;
p1.talk();
p2.talk();

////////////////////////////

const personFunctions = {
  print() {
    console.log(`${this.first} ${this.last}`);
  },
  talk() {
    console.log(`${this.first} says - blah`);
  },
  walk() {
    console.log(`${this.first} is walking`);
  }
};

function createPerson2(first, last) {
  const p = {
    first,
    last,
    /*print: personFunctions.print,
    talk: personFunctions.talk,
    walk: personFunctions.walk*/

  };

  Object.assign(p, personFunctions);

  return p;
}

const p3 = createPerson2('Bibi', 'Netanyahu');
p3.talk();
p3.print();
p3.walk();

const employeeFunctions = {
  work() {
    console.log(`${this.first} is working...`);
  },
  print() {
    console.log(`${this.first} ${this.last} - ${this.jobTitle}`);
  }
};

function createEmployee(first, last, jobTitle) {
  const e = createPerson2(first, last);
  e.jobTitle = jobTitle;
  /*e.work = function () {
    console.log(`${this.first} is working...`);
  };
  e.print = function () {
    console.log(`${this.first} ${this.last} - ${this.jobTitle}`);
  };*/

  Object.assign(e, employeeFunctions);

  e.toString = function () {
    console.log(`Our employee toString ${this.first} ${this.last} ${this.jobTitle}`);
  };

  return e;
}

const elon = createEmployee('Elon', 'Musk', 'Techno King');
elon.talk();
elon.walk();
elon.print();
elon.work();

console.log(elon.toString());

///////////////


const pp = Object.create(personFunctions);
pp.first = 'Ben';
pp.last = 'Gvir';
console.log(pp);

pp.talk();
pp.walk();
pp.print();


function createPerson3(first, last) {
  const p = Object.create(personFunctions);
  p.first = first;
  p.last = last;
  return p;
}

const pp2 = createPerson3('JD', 'Vance');
pp2.talk();
pp2.walk();
pp2.print();

const pp3 = createPerson3('Usha', 'Vance');
pp3.talk();
pp3.walk();
pp3.print();


personFunctions.sing = function() {
  console.log(`${this.first} is singing`);
};

pp2.sing();
pp3.sing();


const employeeFunctions2 = Object.create(personFunctions);
employeeFunctions2.work = function () {
  console.log(`${this.first} is working...`);
};
employeeFunctions2.print = function() {
  console.log(`${this.first} ${this.last} - ${this.jobTitle}`);
};

function createEmployee2(first, last, jobTitle) {
  const e = Object.create(employeeFunctions2);
  e.first = first;
  e.last = last;
  e.jobTitle = jobTitle;
  return e;
}

const zuck = createEmployee2('Mark', 'Zuckerberg', 'CEO');
zuck.walk();
zuck.work();
zuck.print();
