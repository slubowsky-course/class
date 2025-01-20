/*let i = 0;
let die = false;

setTimeout(() => die = true, 1000);

while(!die) {
  console.log(++i);
}*/

let i = 0;
const interval = setInterval(() => console.log(++i), 0);
setTimeout(() => clearInterval(interval), 1000);
