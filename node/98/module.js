//export default () => console.log('hello');
//export const sayGoodbye = () => console.log('goodbye');

//const exports = module.exports;
/*module.*/ //exports.sayHello = () => console.log('hello');
/*module.*/ //exports.sayGoodbye = () => console.log('goodbye');

module.exports = {
  sayHello: () => console.log('hello'),
  sayGoodbye: () => console.log('goodbye')
};
