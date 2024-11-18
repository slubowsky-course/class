//import { Person, foo, bar } from './person.js';
//import Person, { foo, bar } from './person.js';
import PersonFromOtherFile, { foo as x, bar } from './person.js';

const Person = 1;
const foo = 2;

const p2 = new /*Person*/PersonFromOtherFile('Kamala', 'Harris');
p2.print();

console.log(/*foo*/x, bar);
p.print();
