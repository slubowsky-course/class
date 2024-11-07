//(function () {
'use strict';

class Element {
  #innerText;
  #children;

  constructor(innerText) {
    this.#innerText = innerText;

    if (this.constructor === Element) {
      //if(new.target === Element) {
      throw new Error('Illegal to create an Element. Use a subclass');
    }
  }

  getInnerText() {
    return this.#innerText;
  }

  setInnerText(innerText) {
    this.#innerText = innerText;
  }

  /*constructor(innerText) {
    let text = innerText;

    this.setInnerText = function (it) {
      text = it;
    };

    this.getInnerText = function() {
      return text;
    };
  }*/

  addChild(child) {
    if (!this.#children) {
      this.#children = [];
    }
    this.#children.push(child);
  }

  removeChild(child) {
    this.#children = this.#children?.filter(c => c !== child);
  }

  getChildren() {
    return [...this.#children];
  }

  render() {
    console.log(this.#innerText);
    //console.log(this.getInnerText());

    this.#children?.forEach(c => c.render());
  }

  foo() {
    throw new Error('subclass must implement foo()');
  }
}

class Div extends Element {
  render() {
    console.log('in div render');
    super.render();
  }

  foo() {
    console.log('div.foo');
  }
}

class H1 extends Element {
  render() {
    console.log('in H1 render');
    super.render();
  }
}

const div = new Div('a');
const h1a = new H1('b');
const h1b = new H1('c');

div.addChild(h1a);
div.addChild(h1b);

div.render();

console.log(div, h1a);

div.setInnerText('new text for div');
//div.#innerText = 'foo';

div.render();

//new Element('foo').render();

div.foo();

div.removeChild(h1a);

console.log('---------');
div.render();
console.log(div.getChildren().push(new H1('added')));
console.log('---------');
div.render();
//}());

////////////////////////

const numbers = [1, 2, 3, 4, 5, 6, 7, 8];

const [a, , c, ...foo] = numbers;
console.log(a, c, foo);

const potus = { first: 'Donald', last: 'Trump', age: 80, terms: 2 };
const { first: firstName, last, ...rest } = potus;
console.log(firstName, last, rest);

console.log(...numbers);
console.log([...numbers]);
console.log({ ...potus });

const flotus = { ...potus, phone: '1234567890', first: 'Melania' };
//flotus.first = 'Melania';
//flotus.age = 60;

console.log(potus, flotus);

const aa = { a: 1, b: 2 };
const bb = { b: 3, c: 4 };
const cc = { ...aa, ...bb };
console.log(cc);

/*function sum(a, b, c, d, e, f, g, h) {
  return a + b + c + d + e + f + g + h;
}

console.log(sum(numbers[0], numbers[1], numbers[2], numbers[3], numbers[4], numbers[5], numbers[6], numbers[7]));*/

///function sum(numbers) {
  /*let t = 0;
  numbers.forEach(n => t += n);
  return t;*/
  //return numbers.reduce((a, n) => a + n, 0);
//}

//console.log(sum(numbers));

/*function sum2() {
  console.log(arguments);
  return Array.from(arguments).reduce((a, n) => a + n, 0);
}*/

//sum2(...numbers);

function sum3(...numbers) {
  return numbers.reduce((a, n) => a + n, 0);
}
console.log(sum3(...numbers));

console.log(Math.max(...numbers));
