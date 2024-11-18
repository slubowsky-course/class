export default class Person {
  constructor(first, last) {
    this.first = first;
    this.last = last;
  }

  print() {
    console.log(`${this.first} ${this.last}`);
  }
}

const p = new Person('Donald', 'Trump');
p.print();

export const foo = 5;
export const bar = 'bar';
