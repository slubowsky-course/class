/*let total = 0;
for(let i = 2; i < process.argv.length; i++) {
  total += Number(process.argv[i]);
}
console.log(total);*/

const [,,...rest] = process.argv;
/*rest.forEach(n => {
  total += Number(n);
});*/
console.log(rest.reduce((t, n) => t + Number(n), 0));
