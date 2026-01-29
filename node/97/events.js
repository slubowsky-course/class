import { EventEmitter } from "node:events";

export const myEventEmitter = new EventEmitter();
myEventEmitter.setMaxListeners(20);
/////

myEventEmitter.on('time for break', () => {
  console.log('Its time for a break');
});

myEventEmitter.on('time for break', () => {
  console.log('Its time for a break');
});

myEventEmitter.on('time for break', () => {
  console.log('Its time for a break');
});

myEventEmitter.on('time for break', () => {
  console.log('Its time for a break');
});

myEventEmitter.on('time for break', () => {
  console.log('Its time for a break');
});

myEventEmitter.on('time for break', () => {
  console.log('Its time for a break');
});

myEventEmitter.on('time for break', () => {
  console.log('Its time for a break');
});

myEventEmitter.on('time for break', () => {
  console.log('Its time for a break');
});

myEventEmitter.on('time for break', () => {
  console.log('Its time for a break');
});

myEventEmitter.on('time for break', () => {
  console.log('Its time for a break');
});

myEventEmitter.on('time for break', () => {
  console.log('Its time for a break');
});

setTimeout(()=> {
  myEventEmitter.emit('time for break');
}, 5000);
