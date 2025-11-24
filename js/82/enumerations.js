const person = {
  age: 80
};

const potus = {
  first: 'Donald',
  last: 'Trump',
  print: function () {
    console.log(this.first, this.last);
  }
};
Object.setPrototypeOf(potus, person);
console.log(potus);

Object.defineProperty(potus, 'email', {
  value: 'dtrump@whitehouse.gov',
  writable: true,
  configurable: true,
  enumerable: true
});

console.log(potus.email);

for (const prop in potus) {
  if (potus.hasOwnProperty(prop)) {
    if (typeof potus[prop] !== 'function') {
      console.log(prop, potus[prop]);
      console.dir(potus[prop]);
    }
  }
}

console.log(Object.keys(potus));
console.log(Object.values(potus));
console.log(Object.entries(potus));

Object.entries(potus).forEach(pair => {
  console.log(pair);
  console.log(pair[0], pair[1]);
});
