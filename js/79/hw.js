'use strict';

function go(speed) {
  this.speed = speed;
  console.log(`now going ${this.speed}`);
}

function print() {
  console.log(`${this.color} at ${this.speed}`);
}

const vehicle = {
  color: 'white',
  speed: 0,
  /*go(speed) {
    this.speed = speed;
    console.log(`now going ${this.speed}`);
  },
  print() {
    console.log(`${this.color} at ${this.speed}`);
  }*/
  go,
  print
};

vehicle.go(55);
vehicle.print();

const vehicleFunctions = {
  go(speed) {
    this.speed = speed;
    console.log(`now going ${this.speed}`);
  },
  print() {
    console.log(`${this.color} at ${this.speed}`);
  }
};

function createVehicle(color) {
  const v = {
    color: color,
    speed: 0,
    /*go(speed) {
      this.speed = speed;
      console.log(`now going ${this.speed}`);
    },
    print() {
      console.log(`${this.color} going ${this.speed}`);
    }*/
    // go: vehicleFunctions.go,
    // print: vehicleFunctions.print
  };

  Object.assign(v, vehicleFunctions);

  return v;
}

const v1 = createVehicle('blue');
const v2 = createVehicle('red');
v1.go(65);
v2.go(70);
v1.print();
v2.print();


function createPlane(color) {
  const p = createVehicle(color);
  p.go = function (speed) {
    this.speed = speed;
    console.log(`now flying ${this.speed}`);
  };
  return p;
}

const p1 = createPlane('orange');
p1.go(400);
p1.print();


console.log(v1, p1);

/////////////////////////////////

function createVehicleP(color) {
  const v = Object.create(vehicleFunctions);
  /*const v = {
    color,
    speed: 0
  };*/
  v.color = color;
  v.speed = 0;

  //v.__proto__ = vehicleFunctions;
  //Object.setPrototypeOf(v, vehicleFunctions);

  return v;
}

const v3 = createVehicleP('black');
v3.go(100);
v3.print();


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

  /*p.go = function (speed) {
    this.speed = speed;
    console.log(`now flying ${this.speed}`);
  };*/

  return p;
}

const p2 = createPlaneP('yellow');
p2.go(1000);
p2.print();

////////////////////////////////

function Vehicle(color) {
  this.color = color;
  this.speed = 0;

  //Vehicle.prototype.numberOfVehicles++;
  Vehicle.numberOfVehicles++;
}
//Vehicle.prototype = vehicleFunctions;
Vehicle.prototype.go = function (speed) {
  this.speed = speed;
  console.log(`now going ${this.speed}`);
};
Vehicle.prototype.print = function () {
  console.log(`${this.color} vehicle going ${this.speed}`);
};
Vehicle.prototype.clone = function () {
  const copy = new /*Vehicle();*/ this.constructor();
  copy.color = this.color;
  copy.speed = this.speed;
  return copy;
};
//Vehicle.prototype.numberOfVehicles = 0;
//Vehicle.prototype.getNumberOfVehicles = () => Vehicle.prototype.numberOfVehicles;
Vehicle.numberOfVehicles = 0;
Vehicle.getNumberOfVehicles = () => Vehicle.numberOfVehicles;

const v4 = new Vehicle('purple');
v4.go(25);
v4.print();

function Plane(color) {
  //this.color = color;
  //this.speed = 0;
  Vehicle.call(this, color);

  /*this.go = function (speed) {
    this.speed = speed;
    console.log(`now flying ${this.speed}`);
  };*/
}
//Plane.prototype = new Vehicle();
Plane.prototype = Object.create(Vehicle.prototype);
Plane.prototype.constructor = Plane;
Plane.prototype.go = function (speed) {
  this.speed = speed;
  console.log(`now flying ${this.speed}`);
};

const p3 = new Plane('purple');
p3.go(250);
p3.print();

const v5 = v4.clone();
v4.print();
v5.print();
console.log(v4, v5);

const p4 = p3.clone();
console.log(p3, p4);
p3.go(500);
p4.go(500);

//////////////////////////

class VehicleC {
  speed = 0;
  static #numberOfVehicles = 0;

  constructor(color) {
    this.color = color;
    VehicleC.#numberOfVehicles++;
  }

  static getNumberOfVehicles() {
    return VehicleC.#numberOfVehicles;
  }

  go(speed) {
    this.speed = speed;
    console.log(`now going ${this.speed}`);
  }

  print() {
    console.log(`${this.color} vehicle at ${this.speed}`);
  }
}

const v6 = new VehicleC('green');
console.log(v6);
v6.go(55);
v6.print();

console.log(v3, v5, v6);

class PlaneC extends VehicleC {
  /*constructor(color) {
    super(color);
  }*/

  go(speed) {
    this.speed = speed;
    console.log(`now flying ${this.speed}`);
  }
}

const p5 = new PlaneC('gray');
console.log(p5);
p5.go(1200);
p5.print();

console.log(p1, p2, p3, p5);
console.log(Vehicle.getNumberOfVehicles());
console.log(VehicleC.getNumberOfVehicles());

VehicleC.numberOfVehicles = 6000;
console.log(VehicleC.getNumberOfVehicles());
