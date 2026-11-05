function Drawable() { }
Drawable.prototype.draw = function () {
  console.log('drawing');
}

function Printable() { }
Printable.prototype.print = function () {
  console.log('printing');
}

const d1 = new Drawable();
d1.draw();

const p1 = new Printable();
p1.print();


class DrawableAndPrintable extends Printable {

}
console.dir(DrawableAndPrintable);
Object.assign(DrawableAndPrintable.prototype, Drawable.prototype);
console.dir(DrawableAndPrintable);

const dp1 = new DrawableAndPrintable();
dp1.draw();
dp1.print();
