//import something from './index.js';

export default class Person {
  constructor(first, last) {
    this.first = first;
    this.last = last;
  }

  print() {
    console.log(`first: ${this.first} last: ${this.last}`);
  }
}

const potus = new Person('Donald', 'Trump');
potus.print();

export const foo = 'FOO';
export function bar() { console.log('bar') };
export const bar2 = () => console.log('bar2');

// console.log(something);
