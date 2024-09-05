(function () {
  'use strict';

  for(let i = 0; i < 10; i++) {
    window.app.counter.increment();
  }

  const counter1 = window.app.counters.createCounter();
  const counter2 = window.app.counters.createCounter();

  for (let i = 0; i < 5; i++) {
    counter1.increment();
  }

  for (let i = 0; i < 15; i++) {
    counter2.increment();
  }

  console.log(window.app.counter.getCount(), counter1.getCount(), counter2.getCount());
  console.log(`There are now ${window.app.counters.getNumCounters()} counters`);
}());
