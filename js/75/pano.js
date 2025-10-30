/* global google */

/*
//(function () {

function initMap() {
  'use strict';

  new google.maps.Map(document.querySelector('#map'), {
    zoom: 18,
    center: { lat: -34.397, lng: 150.644 }
  });
}

//}());
*/

/*const someNumbers = [1,2,3,4,5,6,7,8,9];
const [a, one, foo, , theFourth, ...x] = someNumbers;
console.log(a, one, foo, theFourth, x);

const potus = {first: 'Donald', last: 'Trump', age: 80, email: 'dtrump@whitehouse.gov', children: [{name: 'Donald'}, {name: 'Ivanka'}]};
let {first: theFirst, age, ...rest} = potus;
console.log(theFirst, age, rest);
rest.children[0].name = 'foo';
theFirst = 'foo';
console.log(potus);*/

(async function () {
  'use strict';

  const { Map } = await google.maps.importLibrary('maps');
  const bmg = { lat: 40.096044749672394, lng: -74.22197586384449 };

  const map = new Map(document.getElementById('map'), {
    center: bmg,
    zoom: 20,
  });

  const pano = new google.maps.StreetViewPanorama(document.querySelector('#pano'), {
    position: bmg,
    pov: {
      heading: 214,
      pitch: 10
    }
  });

  map.setStreetView(pano);

  map.addListener('center_changed', () => {
    pano.setPosition(map.getCenter());
  });

}());
