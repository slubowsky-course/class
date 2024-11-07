//(function () {
'use strict';

const organism = {};
const animal = Object.create(organism);
const mammal = Object.create(animal);
const dog = Object.create(mammal);

mammal.hasHair = true;

console.log(organism, animal, mammal, dog);

console.log(dog.hasHair, mammal.hasHair, animal.hasHair, organism.hasHair);

dog.speak = () => console.log('woof woof');

dog.speak();

///////////////////////

const spot = Object.create(dog);
spot.name = 'spot';
spot.color = 'black';
spot.breed = 'german shepherd';

spot.owner = { first: 'Donald', last: 'Trump' };
console.log(spot);

const rover = Object.create(spot);
rover.name = 'rover';
rover.owner = { first: 'Melania', last: 'Trump' };
console.log(rover);

//}());
