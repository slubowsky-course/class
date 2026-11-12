import dayjs from 'dayjs';

export default class Person {
  constructor(first, last) {
    this.first = first;
    this.last = last;
  }

  print() {
    console.log(`${this.first} - ${this.last} - ${dayjs('2019-01-25').format('[YYYYescape] YYYY-MM-DDTHH:mm:ssZ[Z]') }`);
  }
};


export const FOO = 5;
