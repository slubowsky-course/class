class Element {
  // innerText = 'foo';
  // children = [];
  #innerText;
  #children;

  constructor(innerText) {
    if (this.constructor === Element) {
      throw new Error('Element base class can not be created directly');
    }

    this.#innerText = innerText;
  }

  addChild(child) {
    if (!this.#children) {
      this.#children = [];
    }
    this.#children.push(child);
  }

  removeChild(child) {
    this.#children = this.#children?.filter(c => c !== child);
  }

  render() {
    console.log(this.#innerText);
    this.#children?.forEach(child => child.render());
  }

  get innerText() {
    return this.#innerText;
  }

  set innerText(innerText) {
    this.#innerText = innerText;
  }

  foo() {
    throw new Error('subclass must override foo');
  }

  get children() {
    return [...this.#children];
  }
}

class Div extends Element {
  /*constructor(innerText) {
    super(innerText);
  }*/

  render() {
    console.log('Im a div');
    super.render();
  }

  foo() {
    console.log('div.foo()');
  }
}

class H1 extends Element {
  render() {
    console.log('Im a H1');
    super.render();
  }
}

const div = new Div('a');
const h1a = new H1('b');
const h1b = new H1('c');
div.addChild(h1a);
div.addChild(h1b);
div.render();

// div.#innerText = 'foo';
div.innerText = 'foo';
console.log(div.innerText);

console.log('--------------');
//div.removeChild(h1a);
div.render();

console.log(div, h1a, h1b);

// new Element();
div.foo();

div.children.push(new H1('Im a new one'));
console.log(div.children);
div.render();

///////////

const numbers = [1, 2, 3, 4, 5, 6, 7, 8];
const [a, b, , d, ...rest] = numbers;
console.log(a, b, d, rest);

const potus = { first: 'Donald', last: 'Trump', age: 80, email: 'dtrump@whitehouse.gov' };
const { first: f, last, ...restP } = potus;
console.log(f, last, restP);

console.log(...numbers);
console.log([...numbers]);

//console.log(...potus);
const potusDouble = { ...potus };
potus.age++;
console.log(potus, potusDouble);

const melania = { ...potus, first: 'Melania' };
// const jd = {first: 'JD', ...potus};
console.log(melania); //, jd);

const aa = { a: 1, b: 2 };
const bb = { b: 3, c: 4 };
const cc = { ...aa, ...bb };
console.log(cc);

function sum(/*numbers*/...numbers) {
  console.log(numbers);
  //console.log(arguments);
  //return Array.from(arguments).reduce((a, c) => a + c, 0);
  return numbers.reduce((a, c) => a + c, 0);
}

console.log(sum(1, 2));
//console.log(sum([1,2]));
console.log(sum(...numbers));


console.log(Math.max(...numbers));
