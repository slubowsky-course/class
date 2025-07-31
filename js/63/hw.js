'use strict';

function convertToFarenheit(celsius) {
  //  Divide by 5, then multiply by 9, then add 32
  return ((Number(celsius) / 5) * 9) + 32;
}

function convertToCelsius(farenheit) {
  // Deduct 32, then multiply by 5, then divide by 9
  return ((farenheit - 32) * 5) / 9;
}

const farenheit = prompt('Enter a temperature in farenheit to convert to celsius');
alert(`${farenheit} farenheit is ${convertToCelsius(farenheit)} in celsius `);

const celsius = prompt('Enter a temperature in celsius to convert to farenheit');
alert(`${celsius} celsius is ${convertToFarenheit(celsius)} in farenheit`);
