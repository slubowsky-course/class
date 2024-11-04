//(function () {
'use strict';

/*const vehicle = {
  color: 'red',
  speed: 0,
  go(speed) {
    this.speed = speed;
    console.log(`now going ${this.speed}`);
  },
  print() {
    console.log(`color: ${this.color} speed: ${this.speed}`);
  }
};

vehicle.print();
vehicle.go(65);
vehicle.print();*/

/*function go(speed) {
  this.speed = speed;
  console.log(`now going ${this.speed}`);
}

function print() {
  console.log(`color: ${this.color} speed: ${this.speed}`);
}*/

const vehicleFunctions = {
  go(speed) {
    this.speed = speed;
    console.log(`now going ${this.speed}`);
  },
  print() {
    console.log(`color: ${this.color} speed: ${this.speed}`);
  }
};

function createVehicle(color) {
  //return {
  //color: color,
  //speed: 0,
  /*go(speed) {
    this.speed = speed;
    console.log(`now going ${this.speed}`);
  },
  print() {
    console.log(`color: ${this.color} speed: ${this.speed}`);
  }*/
  // print,
  // go
  // print: vehicleFunctions.print,
  // go: vehicleFunctions.go
  //};

  const v = {
    color,
    speed: 0
  };
  Object.assign(v, vehicleFunctions);
  return v;
}

const rv = createVehicle('red');
const gv = createVehicle('green');
rv.go(65);
gv.go(85);
rv.print();
gv.print();

const planeFunctions = {
  go(speed) {
    this.speed = speed;
    console.log(`now flying ${this.speed}`);
  }
};

function createPlane(color) {
  const p = createVehicle(color);
  /*p.go = function (speed) {
    this.speed = speed;
    console.log(`now flying ${this.speed}`);
  };*/
  Object.assign(p, planeFunctions);
  return p;
}

const op = createPlane('orange');
op.go('650');
op.print();

console.log(rv, op);

//////////////////////////////

function createVehicleP(color) {
  /*const v = {
    color,
    speed: 0
  };*/

  //v.__proto__ = vehicleFunctions;
  //Object.setPrototypeOf(v, vehicleFunctions);

  const v = Object.create(vehicleFunctions);
  v.color = color;
  v.speed = 0;

  return v;
}

const ppv = createVehicleP('purple');
ppv.go(65);
ppv.print();

const planePrototype = Object.create(vehicleFunctions);
planePrototype.go = function (speed) {
  this.speed = speed;
  console.log(`now flying ${this.speed}`);
};

function createPlaneP(color) {
  //const p = Object.create(vehicleFunctions);
  const p = Object.create(planePrototype);
  p.color = color;
  p.speed = 0;

  //Object.assign(p, planePrototype);

  return p;
}

const pbp = createPlaneP('brown');
pbp.go(650);
pbp.print();

console.log(ppv, pbp);

const pvp = createPlaneP('violet');
pvp.go(650);
pvp.print();

planePrototype.foo = function () { console.log('foo'); };

pbp.foo();
pvp.foo();

// pbp.bar = function () { console.log('bar'); };

console.log(pbp, pvp);

////////////////////////////////////

function Vehicle(color) {
  this.color = color;
  this.speed = 0;
}
//Object.assign(Vehicle.prototype, vehicleFunctions);
Vehicle.prototype.go = function (speed) {
  this.speed = speed;
  console.log(`now going ${this.speed}`);
};
Vehicle.prototype.print = function () {
  console.log(`color: ${this.color} speed: ${this.speed}`);
};
Vehicle.prototype.clone = function () {
  const copy = new /*Vehicle*/this.constructor();
  Object.assign(copy, this);
  return copy;
};

const cwv = new Vehicle('white');
cwv.go(65);
cwv.print();
console.log(cwv);

console.log(ppv, cwv);

function Plane(color) {
  this.color = color;
  this.speed = 0;
  Plane.numberOfPlanes++;
}
Plane.numberOfPlanes = 0;
Plane.getNumberOfPlanes = function () {
  return this.numberOfPlanes;
};

//Plane.prototype = Vehicle.prototype;
//Plane.prototype = new Vehicle();
Plane.prototype = Object.create(Vehicle.prototype);
Plane.prototype.constructor = Plane;

Plane.prototype.go = function (speed) {
  this.speed = speed;
  console.log(`now flying ${this.speed}`);
};

const clp = new Plane('lime');
clp.go(650);
clp.print();

console.log(clp);

const copyVehicle = cwv.clone();
copyVehicle.print();
console.log(copyVehicle);

const copyPlane = clp.clone();
copyPlane.print();
copyPlane.go(750);

//////////////////////////////////////////////

class VehicleC {
  speed = 0;

  constructor(color) {
    this.color = color;
    // this.speed = 0;
  }

  go(speed) {
    this.speed = speed;
    console.log(`now going ${this.speed}`);
  }

  print() {
    console.log(`color: ${this.color} speed: ${this.speed}`);
  }
}

const car = new VehicleC('magenta');
car.go(65);
car.print();
console.log(car);


class PlaneC extends VehicleC {
  static #numberOfPlanes = 0;

  static getNumberOfPlanes() {
    return PlaneC.#numberOfPlanes;
  }

  constructor(color) {
    super(color);
    PlaneC.#numberOfPlanes++;
  }

  go(speed) {
    this.speed = speed;
    console.log(`now flying ${this.speed}`);
  }
}


const jet = new PlaneC('silver');
jet.go(761);
jet.print();

console.log(jet);

console.log(op, pbp, clp, jet);


//////////////////////////////////////////


function Drawable() { }
Drawable.prototype.draw = function () { console.log('drawing'); };

const drawable = new Drawable();
drawable.draw();

function Printable() { }
//Printable.prototype = Object.create(Drawable.prototype);
Printable.prototype.print = function () { console.log('printing'); };

const printable = new Printable();
printable.print();

function PrintableDrawable() {}
//PrintableDrawable.prototype = Object.create(Drawable.prototype);
PrintableDrawable.prototype = Object.create(Printable.prototype);
Object.assign(PrintableDrawable.prototype, Drawable.prototype);

const printableDrawable = new PrintableDrawable();

printableDrawable.draw();
printableDrawable.print();

//}());
