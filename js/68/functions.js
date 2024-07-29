(function () {
  'use strict';


  const functions = [];

  for (/*let*/ var i = 0; i < 10; i++) {
    //functions[i] = () => console.log(i);
    //functions[i] = createFunction(i);

    functions[i] = (function createFunction(n) {
      return () => console.log(n);
    }(i));

    //functions[i]();
  }

  functions.forEach(f => f());

  /*function createFunction(n) {
    return () => console.log(n);
  }*/

}());
