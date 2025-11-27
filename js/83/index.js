//import { Person, foo } from './person.js';
import PersonFromOtherFile, {foo as fooFromOtherFile, bar as barFromOtherFile, bar2} from './person.js';
import PersonFromOtherFile2, { foo as fooFromOtherFile2, bar as barFromOtherFile2, bar2 as barFromOtherFile3 } from './person2.js';


const Person = 1;
const foo = 2;
const bar = 3;

const vpotus = new PersonFromOtherFile('JD', 'Vance');
vpotus.print();

//potus.print();

console.log(fooFromOtherFile);
barFromOtherFile();
bar2();

console.log(fooFromOtherFile2);
barFromOtherFile2();
barFromOtherFile3();
new PersonFromOtherFile2();

// const something = 5;
// export default something;
