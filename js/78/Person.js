
  class PersonC {
    constructor(first, last) {
      this.first = first;
      this.last = last;
    }

    print() {
      console.log(`I am ${this.first} ${this.last}`);
    }

    talk() {
      console.log(`${this.first} ${this.last} says blah blah`);
    }
  }
