(function () {
  'use strict';

  const potus = {
    first: 'Joe',
    last: 'Biden',
    age: 180,
    print1() {
      console.log(`first: ${this.first} last: ${this.last} age: ${this.age}`);
    },
    live() {
      console.log('this===>', this);
      /*setInterval(() => {
        console.log(this);
        this.age++;
        this.print1();
      }, 1000);*/


      /*function doIt() {
        console.log(this);
        this.age++;
        this.print1();
      }
      const doItToThis = doIt.bind(this);

      setInterval(doItToThis, 1000);*/
      const that = this;
      setInterval(function() {
        console.log(that);
        that.age++;
        that.print1();
      }, 1000);
    }
  };

  //potus.print1();

  //const potusPrint = potus.print1;
  //potusPrint();
  //potusPrint.call(potus);

  potus.live();
}());
