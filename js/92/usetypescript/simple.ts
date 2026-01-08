let msg = 'hello';
//msg();
//console.log(msg.toUppercase())
//msg = 5;

let y;
y = 5;

let x: number;
x = 5;
x = 'hello';

/*function coinFlip() {
  return Math.random < 0.5;
}*/

// get greeter string
function greeter(name: /*president*/ string | number) {
  if (typeof name === 'string' && name.length > 0) {
    return `hello ${name}`;
  } else {
    return 'Hi!';
  }
}

// console.log(greeter(5));
// console.log(greeter('Donald'));
console.log(greeter('Donald Trump'));

type president = 'Donald Trump' | 'Joe Biden' | 'Barack Obama';
type stuff = 5 | 'Donald' | true;

function foo(x: stuff | undefined | null) {
  console.log(x);
}

foo(undefined);
// foo(1 < 2);

let z: number;
greeter(z);
z = 5;
z = undefined;

//foo(1,2)
foo(undefined);

let q: number | undefined = 5;
q = undefined;

//type Person = { first: string; last?: string };
interface Person {
  readonly first: string,
  last?: string,
  parent?: Person
}

const potus: { first: string; last?: string } = {
  first: 'Donald',
};
potus.last = 'Trump';
//potus.age = 85;

function printPerson(p: Person) {
  // p.first = 'foo';
  //if (p.parent) {
  console.log(p.first, p.last, p.parent?.parent?.first);
}

const jd/*: Person*/ = {
  first: 'JD',
  last: 'Vance',
  age: 55
};

printPerson(jd);

interface Printable { print: () => void }
interface Drawable extends Printable { draw: () => void }

//type Printable = { print: () => void };
//type Drawable = Printable & { draw: () => void };

const pd: Drawable = {
  draw: () => console.log('drawing'),
  print: () => console.log('printing')
}
//pd.foo = 5;

function printAndDraw(thing: Drawable) {
  thing.print();
  thing.draw();
}

printAndDraw(pd);

function add(a: number, b: number): number | string {
  return a > 5 ? a + b : 'foo';
}

const answer = add(5,6);
