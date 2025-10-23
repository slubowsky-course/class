(async function () {
  'use strict';

  /*function doSomethingOne(n, successCallback, failureCallback) {
    setTimeout(() => {
      successCallback(n + 1);

      //failureCallback(n + 1);
    }, 1000);
  }

  function doSomethingTwo(n, successCallback, failureCallback) {
    setTimeout(() => {
      successCallback(n + 2);

      // failureCallback(n + 2);
    }, 1000);
  }

  function doSomethingThree(n, successCallback, failureCallback) {
    setTimeout(() => {
      successCallback(n + 3);

      // failureCallback(n + 3);
    }, 1000);
  }

  // doSomethingOne(1, r => doSomethingTwo(r, r => doSomethingThree(r, r => console.log(r), e => console.error('three', e)), e => console.error('two', e)), e => console.error('one', e));

  doSomethingOne(1, r => {
    doSomethingTwo(r, r => {
      doSomethingThree(r, r => {
        console.log(r);
      }, e => console.error('three', e));
    }, e => console.error('two', e));
  }, e => console.error('one', e));*/

  /*const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => resolve('foo'), 1000);
    // reject('foo');
  });

  console.log('before');

  myPromise
    .then(r => console.log(r))
    .catch(e => console.error(e));

  console.log('after');

  try {
    const r = await myPromise;
    console.log(r);
  } catch (e) {
    console.error(e);
  }*/


  function doSomethingOne(n) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(n + 1);

        //reject(n + 1);
      }, 1000);
    });
  }

  function doSomethingTwo(n) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(n + 2);

        // reject(n + 2);
      }, 1000);
    });
  }

  function doSomethingThree(n) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(n + 3);

        // reject(n + 3);
      }, 1000);
    });
  }

  /*doSomethingOne(1)
    .then(r => doSomethingTwo(r))
    .then(r => doSomethingThree(r))
    .then(r => console.log(r))
    .catch(e => console.error(e));

  try {
    const r1 = await doSomethingOne(1);
    const r2 = await doSomethingTwo(r1);
    const r3 = await doSomethingThree(r2);
    console.log(r3);
  } catch(e) {
    console.error(e);
  }

  function someFunction() {
    setTimeout(() => {
      console.log('in some function');
    }, 1000);
  }


  console.log('before');
  someFunction();
  console.log('after');*/

  const p1 = doSomethingOne(1);
  const p2 = doSomethingTwo(1);
  const p3 = doSomethingThree(1);

  Promise.all([p1, p2, p3])
    .then(r => console.log(r))
    .catch(e => console.error(e));

  try {
    const r = await Promise.all([p1, p2, p3]);
    console.log(r);
  } catch(e) {
    console.error(e);
  }

}());
