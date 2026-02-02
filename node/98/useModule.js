//import sayHello, {sayGoodbye} from './module.js';
//import foo, {sayGoodbye as bar} from './module.js';

//sayHello();
//sayGoodbye();

//foo();
//bar();

/*const myModule = require('./module.js');
myModule.sayHello();
myModule.sayGoodbye();*/

//import Person from './Person.js';

//const Person = require('./Person').Person;

const Person = require('./Person');
const p = new Person('Donald', 'Trump');
p.print();
