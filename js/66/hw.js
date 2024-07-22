'use strict';

function convertCelsiusToFarenheit(celsius) {
  return ((Number(celsius) / 5) * 9) + 32;
}

function convertFarenheitToCelsius(farenheit) {
  return ((Number(farenheit) - 32) * 5) / 9;
}

let celsius = prompt('Enter a celsius temperature to convert to farenheit');
let farenheit = convertCelsiusToFarenheit(celsius);
alert(`${celsius} is ${farenheit} in farenheit`);

farenheit = prompt('Enter a farenheit temperature to convert to celsius');
celsius = convertFarenheitToCelsius(farenheit);
alert(`${farenheit} is ${celsius} in celsius`);
