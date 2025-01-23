//const sayHello = () => console.log('hello!');
//export default sayHello;
//export const sayGoodbye = () => console.log('Goodbye');

//const exports = module.exports;

/*module.*/ //exports.sayHello = () => console.log('hello!');
/*module.*/ //exports.sayGoodbye = () => console.log('Goodbye');

/*module.*/exports = {
  sayHello: () => console.log('hello!'),
  sayGoodbye: () => console.log('Goodbye')
};
