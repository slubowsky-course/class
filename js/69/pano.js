/* global google */
const { Map } = await google.maps.importLibrary('maps');
console.log(Map);

const map = new Map(document.querySelector('#map'), {
  center: { lat: 40.09543950426593, lng: -74.2221793333354 },
  zoom: 18
});

const pano = new google.maps.StreetViewPanorama(document.querySelector('#pano'), {
  position: { lat: 40.09543950426593, lng: -74.2221793333354 },
  pov: {
    pitch: 15,
    heading: 0
  }
});

map.setStreetView(pano);


map.addListener('center_changed', () => {
  pano.setPosition(map.getCenter());
});
