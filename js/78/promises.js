(async function () {
  'use strict';

  const myPromise = new Promise((resolve, reject) => {
    //setTimeout(() => {
      resolve('fetched this');
      //reject('oops we failed');
    //}, 1000);
  });

  console.log('before promise');

  myPromise
    .then(r => console.log(r))
    .catch(e => console.error(e));

  console.log('after promise');


  console.log('before promise');
  try {
    const r = await myPromise;
    console.log(r);
  } catch (e) {
    console.error(e);
  }
  console.log('after promise');


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

  function someFunction() {
    setTimeout(() => {
      console.log('in someFunction');
    }, 1000);
  }

  console.log('before someFunction');
  someFunction();
  console.log('after someFunction');

  const p = doSomethingOne(1);
  const p2 = doSomethingTwo(1);
  const p3 = doSomethingThree(1);
  Promise.all([p, p2, p3])
    .then(r => console.log(r))
    .catch(e => console.error(e));

  try {
    const r = await Promise.all([p, p2, p3]);
    console.log(r);
  } catch(e) {
    console.error(e);
  }
}());
