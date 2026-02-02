//export default class Person {

//module.exports.Person = class Person {
module.exports = class Person {
  constructor(first, last) {
    this.first = first;
    this.last = last;
  }

  print() {
    console.log(this.first, ' ', this.last);
  }
}
