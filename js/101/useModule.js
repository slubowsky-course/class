//import sayHello from './module.js';
//import foo, { sayGoodbye as bar } from './module.js';

//sayHello();
//foo();
//sayGoodbye();
//bar();

/*const myModule = require('./module.js');
myModule.sayHello();
myModule.sayGoodbye();*/

//const sayHello = require('./module.js').sayHello;
//sayHello();

/*import Person from './Person.js';
const potus = new Person('Donald', 'Trump');
potus.print();*/

//const Person = require('./Person.js').Person;
const Person = require('./Person.js');
const potus = new Person('Donald', 'Trump');
potus.print();
