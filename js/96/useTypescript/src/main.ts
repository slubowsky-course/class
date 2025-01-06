import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    Hello World!!!
  </div>
`;


type goodPresident = 'Donald Trump' | 'Ronald Reagan';

type myValidValues = 5 | 'Donald Trump' | true;

function greeter(name: /*goodPresident*/ /*string | number*/ myValidValues) {
  if(typeof name == 'string') {
    return `Hello, ${name} your name is ${name.length} letters long!`;
  } else {
    return 'Hi!';
  }
}

const potus = false;//'Donald Trump'; //5;//'Joe Biden'; //{first: 'Joe'}; // 5;
console.log(greeter(potus));

//let x: number | string = 5;
//x = 'foo';
let x: number | string;
x = 5;
x = 'foo';

let gp: goodPresident;
gp = 'Joe Biden';

let z: number | undefined;
console.log(z);
z = undefined;

interface Person {
  first: string,
  last : string,
  //email: string,
  parent?: Person
}

function greeter2(person?: Person): goodPresident {
  if (person) {
    console.log(`Hello ${person.first} ${person.last}`);
    console.log(person.parent?.first);
  } else {
    console.log('Hi!');
  }

  //return person?.first === 'Joe' ? 50 : 'Hi';
  return 'Donald Trump';
}

/*interface PersonPlus extends Person {
  age: number;
}*/

const nextPotus: Person/*Plus*/ = {
  first: 'Donald',
  last: 'Trump',
  age: 91
}

let result = greeter2(nextPotus);
result = 'Joe Biden';

let a: object;
a = {first: 'Joe'};

let numbers = [1,2,3,4,5];
let letters = ['A', 'B', 'C'];
let mixed: (string | number | Person)[] = ['A', 1];
//let mixed: (string | number)[] = [];

numbers.push('A');
letters.push(1);
mixed.push('B');
mixed.push(2);
mixed.push(nextPotus);

/*function manipulateDom(elem: HTMLElement) {

}*/

function removeElementFromArray<T>(theArray: T[], index: number) {
  theArray.splice(index, 1);
  return theArray;
}

const letters2 = removeElementFromArray(letters, 1);
console.log(letters2);

const numbers2 = removeElementFromArray(numbers, 2);
console.log(numbers2);

const persons = [{first:'', last: '', nextPotus}];
const persons2 = removeElementFromArray(persons, 0);
console.log(persons2);

// numbers2.push('A');
// letters2.push(1);

class Student implements Person {
  /*first: string;
  last: string;
  age: number;*/
  //#weight: number;

  constructor(public first: string, public last: string, public age: number, private weight: 190, foo?: number) {
    /*this.first = first;
    this.last = last;
    this.age = age;*/
    console.log(foo);

    //this.#weight = weight;
  }

  print() {
    console.log(`${this.first} ${this.last} ${this.age} ${this.weight}`);
  }
}

const kamala = new Student('Kamala', 'Harris', 55, 190, 0);
//kamala.first = 'Kamala';
//kamala.last = 'Harris';
//kamala.age = 55;

console.log(kamala);

kamala.print();

kamala.weight = 200;

console.log(kamala);

greeter2(kamala);

abstract class Base {
  abstract foo(x: string): number;

  bar() {
    console.log('Bar');
  }
}

class Derived extends Base {
  foo(x: string) {
    return 5;
  }
}

//const b = new Base();
const d = new Derived();
const q = d.foo('foo');
console.log(q);
d.bar();
