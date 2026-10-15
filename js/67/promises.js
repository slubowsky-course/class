/*function doSomething1(n, successCallback, failureCallback) {
  setTimeout(() => {
    //failureCallback && failureCallback(new Error('OOPS'));
    successCallback && successCallback(n * 2);
  }, 1000);
}

function doSomething2(n, successCallback, failureCallback) {
  setTimeout(() => {
    //failureCallback && failureCallback(new Error('OOPS'));
    successCallback && successCallback(n * 3);
  }, 1000);
}

function doSomething3(n, successCallback, failureCallback) {
  setTimeout(() => {
    //failureCallback && failureCallback(new Error('OOPS'));
    successCallback && successCallback(n * 4);
  }, 1000);
}*/

//doSomething1(2, r => doSomething2(r, r2 => doSomething3(r2, console.log, e => console.error('oops3', e)), e => console.error('oops2', e)), e => console.error('oops1', e));

/*
doSomething1(2, r => {
  doSomething2(r, r2 => {
    doSomething3(r2, console.log, e => {
      console.error('oops3', e);
    });
  }, e => {
    console.error('oops2', e);
  });
}, e => {
  console.error('oops1', e);
});
*/

/*function errorFunction1(e) {
  console.error('oops1', e);
}

function errorFunction2(e) {
  console.error('oops2', e);
}

function errorFunction3(e) {
  console.error('oops3', e);
}

function successCallback2(r2) {
  doSomething3(r2, console.log, errorFunction3);
}

function successCallback1(r) {
  doSomething2(r, successCallback2, errorFunction2);
}

doSomething1(2, successCallback1, errorFunction1);*/

const myPromise = new Promise((resolve, reject) => {
  //setTimeout(() => {
  resolve(2);
  //}, 1000);
  //reject(new Error('oops'));
});

console.log('before .then');
myPromise
  .then(console.log)
  .catch(console.error);
console.log('after .then');

console.log('before await');
try {
  const r = await myPromise;
  console.log(r);
} catch (e) {
  console.error(e);
}
console.log('after await');


function doSomething1(n) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // reject && reject(new Error('OOPS 1'));
      resolve && resolve(n * 2);
    }, 1000);
  });
}

function doSomething2(n) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // reject && reject(new Error('OOPS 2'));
      resolve && resolve(n * 3);
    }, 1000);
  });
}

function doSomething3(n) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      //reject && reject(new Error('OOPS 3'));
      resolve && resolve(n * 4);
    }, 1000);
  });
}

doSomething1(2)
  .then(r => doSomething2(r))
  .then(r => doSomething3(r))
  .then(r => console.log(r))
  .catch(console.error);

try {
  let r = await doSomething1(2);
  r = await doSomething2(r);
  r = await doSomething3(r);
  console.log(r);
} catch (e) {
  console.error(e);
}

function doSomething() {
  setTimeout(() => {
    console.log('something');
  }, 1000);
}

console.log('before');
doSomething();
console.log('after');

const p1 = doSomething1(2);
const p2 = doSomething2(2);
const p3 = doSomething3(2);

Promise.all([p1, p2, p3])
  .then(r => console.log(r))
  .catch(console.error);

try {
  const r = await Promise.all([p1, p2, p3]);
  console.log(r);
} catch (e) {
  console.error(e);
}
