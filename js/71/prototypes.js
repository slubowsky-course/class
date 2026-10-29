const personFunction = {
  talk() {
    console.log(`${this.first} says hi!`);
  },
  walk() {
    console.log(`${this.first} is walking...`);
  }
};
// personFunction.foo = function () { console.log('foo'); };

function createPerson(first) {
  const p = Object.create(personFunction);
  p.first = first;
  return p;
}

const p = createPerson('Donald');
console.log(p);
p.talk();
p.walk();
//p.foo();

//////////////////////////

function Person(first) {
  this.first = first;
}
Person.prototype.talk = function () {
  console.log(`${this.first} says hi!`);
};
Person.prototype.walk = function () {
  console.log(`${this.first} is walking...`);
};
// Person.prototype = personFunction;
// Person.prototype.constructor = Person;

const cp1 = new Person('Donald');
console.log(cp1);
cp1.walk();
cp1.talk();

function Employee(first, jobTitle) {
  this.first = first;
  this.jobTitle = jobTitle;
}
Employee.prototype = Object.create(Person.prototype);
Employee.prototype.constructor = Employee;

Employee.prototype.work = function () {
  console.log(`${this.first} is working...`);
};

const e1 = new Employee('Elon', 'Technoking');
e1.talk();
e1.walk();
e1.work();
console.log(e1);

//cp1.work();

/////////////////////////

class PersonC {
  #weight = 100;

  constructor(first) {
    this.first = first;
    // this.weight = 100;

    /*let weight;

    this.setWeight = function (w) {
      weight = w;
    };

    this.getWeight = function () {
      return weight;
    };*/
  }

  set Weight(w) {
    this.#weight = w;
  }

  get Weight() {
    return this.#weight;
  }

  talk() {
    console.log(`${this.first} says hi! I weigh ${this.#weight}`);
  }

  walk() {
    console.log(`${this.first} is walking...`);
  }
}

const pc1 = new PersonC('Donald');
pc1.walk();
pc1.talk();

console.log(pc1);

// pc1.setWeight(100);
console.log(pc1.weight);
//console.log(pc1.getWeight());
//console.log(pc1.setWeight(200));
//pc1.#weight = 300;
//console.log(pc1.getWeight());
console.log(pc1);
console.log(pc1.Weight);


class EmployeeC extends PersonC {
  constructor(first, jobTitle) {
    super(first);
    this.jobTitle = jobTitle;
  }

  work() {
    console.log(`${this.first} is walking...`);
  }
}

const e2 = new EmployeeC('Bill', 'CEO');
e2.walk();
e2.talk();
e2.work();
console.log(e2);
