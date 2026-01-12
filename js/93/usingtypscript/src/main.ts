import './style.css';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    hello world
  </div>
`;

interface Person {
  first: string;
  last: string;
  parent?: Person;
  //age: number;
}

function foo(y: Person) {
  console.log(y.parent?.first);
}

let letters = ['a', 'b', 'c'];
let numbers = [1, 2, 3];
let mixed: (string | number | Person)[] = []; // = [1, 'b'];

//letters.push(4);
//numbers.push('d');
mixed.push(1);
mixed.push('a');
mixed.push({ first: 'Donald', last: 'Trump' });

console.log(letters, numbers);

let position: [lat: number, lng: number];
position = [12.3, 45.6];//, 2];
//position = ['a', 1];
console.log(position, position[0], position[1]);


function removeFromArray<T>(array: T[], index: number) {
  array.splice(index, 1);
  return array;
}

let newLetters = removeFromArray(letters, 1);
let newNumbers = removeFromArray(numbers, 1);
let newMixed = removeFromArray(mixed, 1);

newLetters.push(4);
newNumbers.push('d');

console.log(letters, numbers, mixed);


class Student implements Person {
  /*first: string;
  last: string;*/

  constructor(public first: string, public last: string, private weight: number) {
    /*this.first = first;
    this.last = last;*/
  }

  print() {
    console.log(this.first, this.last, this.weight);
  }
}

/*const donald = new Student();
donald.first = 'Donald';
donald.last = 'Trump'*/

const donald = new Student('Donald', 'Trump', 220);
//donald.weight = 210;




console.log(donald);

foo(donald);

abstract class Base {
  abstract foo(x: string): void;
}

class Concrete extends Base {
  foo = (x: string) => console.log(x);
}

new Concrete().foo('bar');
