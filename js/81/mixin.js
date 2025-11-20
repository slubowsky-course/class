//(function () {
'use strict';

function Drawable() { }
Drawable.prototype.draw = () => console.log('drawing...');

const drawable = new Drawable();
drawable.draw();


function Printable() { }
Printable.prototype.print = () => console.log('printing...');

const printable = new Printable();
printable.print();

function DrawableAndPrintable() { }
//DrawableAndPrintable.prototype = Object.create(Drawable.prototype);
DrawableAndPrintable.prototype = Object.create(Printable.prototype);
DrawableAndPrintable.prototype.foo = () => console.log('foo');
Object.assign(DrawableAndPrintable.prototype, Drawable.prototype);


const pad = new DrawableAndPrintable();
//pad.draw();
pad.print();

console.log(pad);

//////////////////

const potus = Object.create({ foo: () => console.log('foo') }, {
  first: { value: 'Donald', writable: true },
  last: { value: 'Trump', writable: true, configurable: true }
});
potus.foo();
potus.bar = 5;
console.log(potus);
delete potus.bar;
console.log(potus);
//}());
