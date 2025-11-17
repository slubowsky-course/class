const organism = {};
const animal = Object.create(organism);
const mammal = Object.create(animal);
const dog = Object.create(mammal);

console.log(dog);

mammal.hasHair = true;
dog.speak = () => console.log('woof woof');

const spot = Object.create(dog);
spot.name = 'Spot';
spot.breed = 'German Sheperd';
spot.weight = 125;
spot.color = 'black';

const rover = Object.create(spot);
console.log(rover.name, rover);
rover.name = 'Rover';
rover.weight = 100;

console.log(rover.name, rover);
