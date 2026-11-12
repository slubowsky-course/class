import './style.css';
import config from './config.json';

document.body.style.color = config.color;

import X, {FOO as y} from './Person.js';

const potus = new X('Donald', 'Trump');
potus.print();

console.log(y);
