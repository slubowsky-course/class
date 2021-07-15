let potus = {
  firstName: 'Joe',
  lastName: 'Biden',
  age: 212,
  print: function () {
    console.log(this.firstName, this.lastName, this.age);
  }
};

console.log(potus);

function printPerson(person) {
  console.log(person.firstName, person.lastName, person.age);
}

printPerson(potus);
potus.print();