import './style.css';
import X, { x as y } from './Car.js';
import dayjs from 'dayjs';

const car = new X('red');
car.drive();
console.log(y);

const now = dayjs();
console.log(now.format('dddd, MMMM D, YYYY h:mm:ss A'));
