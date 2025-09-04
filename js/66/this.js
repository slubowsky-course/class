(function () {
  'use strict';

  const potus = {
    first: 'Donald',
    last: 'Trump',
    age: 80,
    print1: function () {
      console.log(`first: ${this.first} last: ${this.last} age:${this.age}`);
    },
    live() {
      console.log('in live', this);

      setInterval(() => {
        console.log(this);
        this.age++;
        this.print1();
      }, 1000);

      /*const that = this;

      setInterval(function () {
        console.log(that);
        that.age++;
        that.print1();
      }, 1000);*/
    }
  };

  potus.print1();
  potus.live();

  //const potusesPrint = potus.print1;
  //potusesPrint();

}());
