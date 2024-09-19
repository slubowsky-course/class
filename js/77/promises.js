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
      //failureCallback(n + 2);
    }, 1000);
  }

  function doSomethingThree(n, successCallback, failureCallback) {
    setTimeout(() => {
      successCallback(n + 3);
      //failureCallback(n + 3);
    }, 1000);
  }*/

  //doSomethingOne(1, r => console.log(r), r => console.error(r));

  //doSomethingTwo(1, r => console.log(r), r => console.error(r));

  /*doSomethingOne(1, r => doSomethingTwo(r, r => doSomethingThree(r, r => console.log(r), r => console.error(r)), r => console.error(r)), r => console.error(r));

  doSomethingOne(1, r => {
    doSomethingTwo(r, r => {
      doSomethingThree(r, r => {
        console.log(r);
      }, r => console.error(r));
    }, r => console.error(r));
  }, r => console.error(r));*/

  const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('fetched this');
      //reject('oops we failed');
    }, 1000);
  });

  myPromise
    .then(r => console.log(r))
    .catch(e => console.error(e));

  try {
    const r = await myPromise;
    console.log(r);
  } catch (e) {
    console.error(e);
  }


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
        //reject(n + 2);
      }, 1000);
    });
  }

  function doSomethingThree(n) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(n + 3);
        //reject(n + 3);
      }, 1000);
    });
  }


  const r = doSomethingOne(1)
    .then(r => doSomethingTwo(r))
    .then(r => doSomethingThree(r))
    .then(r => console.log(r))
    .catch(e => console.error(e));

  try {
    let r = await doSomethingOne(1);
    r = await doSomethingTwo(r);
    r = await doSomethingThree(r);
    console.log(r);
  } catch (e) {
    console.error(e);
  }
}());
