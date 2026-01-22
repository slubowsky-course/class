/*let i = 0;
let die = false;

setTimeout(() => {
  die = true;
}, 1000);

while(! die) {
  console.log(i++);

  // if (i = 10) die = true;
}*/

let i = 0;
const interval = setInterval(() => i++, 0);
setTimeout(() => {
  clearInterval(interval);
  console.log(i);
}, 1000);
