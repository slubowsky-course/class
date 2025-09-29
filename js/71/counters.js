for(let i = 0; i < 10; i++) {
  window.app.counter.increment();
}

const counterA = window.app.counters.createCounter();
const counterB = window.app.counters.createCounter();

for (let i = 0; i < 5; i++) {
  counterA.increment();
}

for (let i = 0; i < 15; i++) {
  counterB.increment();
}

console.log(window.app.counter.getCount(), counterA.getCount(), counterB.getCount());

console.log(`there are ${window.app.counters.getNumCounters()} counters`);

