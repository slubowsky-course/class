'use strict';

const food = {
  name: 'chulent',
  calories: 5000
};

food.sugar = 5;

food.calories = 6000;

console.log(food);

// food = {foo: 5};

function foodCreator(name, calories) {
  /*let name = n;
  let calories = c;*/

  let myRandomNumber = Math.floor(Math.random() * 100) + 1;

  return {
    getName: () => name,
    setName: function (n) {
      name = n;
      return this;
    },
    getCalories: () => calories,
    setCalories: function (c) {
      calories = c;
      return this;
    },
    print: function() {
      console.log(`name: ${name}, calories: ${calories}, random number: ${myRandomNumber}`);
    }
  };
}

const hotDog = foodCreator('hotdog', 2000);
const cottonCandy = foodCreator('cotton candy', 32424235);

//hotDog.sugar = 6;

hotDog.setCalories(2201);
hotDog.calories = 2200;
hotDog._calories = 2200;

console.log(hotDog.getName(), hotDog.getCalories());
console.log(cottonCandy.getName(), cottonCandy.getCalories());

console.log(hotDog);
console.log(cottonCandy);

hotDog.print();
cottonCandy.print();

//hotDog = foodCreator('broken', 100);


hotDog.setName('Big Hotdog')
      .setCalories(5000)
      .print();

cottonCandy.setName('red cotton candy')
  .setCalories(454365)
  .print();
