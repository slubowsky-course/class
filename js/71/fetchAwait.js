(function () {
  'use strict';

  async function getTheData() {
    console.log('in getTheData');

    try {
      const response = await fetch('people.json');
      if (! response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }
      const people = await response.json();
      console.log(people);

      console.log(response.status);
    } catch(e) {
      console.error('oops', e);
    }
  }

  getTheData();

  console.log('file done');
}());
