import { EventEmitter } from 'events';
//const EventEmitter = require('events').EventEmitter;

export const myEventEmitter = new EventEmitter();
myEventEmitter.setMaxListeners(12);

//////////////////////

//import myEventEmitter from './events';
myEventEmitter.on('page complete', () => console.log('Page was printed'));
myEventEmitter.on('page complete', () => console.log('Page was printed'));
myEventEmitter.on('page complete', () => console.log('Page was printed'));
myEventEmitter.on('page complete', () => console.log('Page was printed'));
myEventEmitter.on('page complete', () => console.log('Page was printed'));
myEventEmitter.on('page complete', () => console.log('Page was printed'));
myEventEmitter.on('page complete', () => console.log('Page was printed'));
myEventEmitter.on('page complete', () => console.log('Page was printed'));
myEventEmitter.on('page complete', () => console.log('Page was printed'));
myEventEmitter.on('page complete', () => console.log('Page was printed'));
myEventEmitter.on('page complete', () => console.log('Page was printed'));

myEventEmitter.emit('page complete');
