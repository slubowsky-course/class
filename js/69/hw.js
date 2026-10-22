/* global google */
const key = 'slubowsky';
const [{ Map, InfoWindow }, { AdvancedMarkerElement }] = await Promise.all([
  google.maps.importLibrary('maps'),
  google.maps.importLibrary('marker'),
]);

/*const someNumbers = [1,2,3,4,5,6,7];
const [a,c,,foo, ...theRest] = someNumbers;
console.log(a,c,foo, theRest);*/


const map = new Map(document.querySelector('#map'), {
  center: { lat: 40.09543950426593, lng: -74.2221793333354 },
  zoom: 18,
  mapId: 'DEMO_MAP_ID'
});

const savedPlace = JSON.parse(localStorage.getItem('place'));
const marker = new AdvancedMarkerElement({
  map,
  position: savedPlace.location,
  title: savedPlace.title
});

const placesList = document.querySelector('#places');
const searchInput = document.querySelector('#search');

const infoWindow = new InfoWindow();

let currentlySelectedSummary;

document.querySelector('#searchForm').addEventListener('submit', async e => {
  e.preventDefault();

  try {
    const response = await fetch(`http://api.geonames.org/wikipediaSearch?q=${searchInput.value}&maxRows=10&username=${key}&type=json`);

    if (!response.ok) {
      throw new Error(`${response.status}  ${response.statusText}`);
    }

    const { geonames } = await response.json();
    console.log(geonames);

    const bounds = new google.maps.LatLngBounds();

    geonames.forEach(place => {
      const loc = { lat: place.lat, lng: place.lng };

      const img = document.createElement('img');
      img.src = './chulent.jpg'; //place.thumbnailImg;
      img.alt = place.title;
      img.className = 'marker-image';

      const marker = new AdvancedMarkerElement({
        map,
        position: loc,
        title: place.title
      });

      marker.addListener('click', () => {
        infoWindow.setContent(`<div><h5>${place.title}</h5>${place.summary}<a target="_blank" href="https://${place.wikipediaUrl}">more info</a></div>`);
        infoWindow.open({
          anchor: marker
        });
      });

      marker.append(img);

      bounds.extend(loc);

      const placeLi = document.createElement('li');
      placeLi.innerHTML = `
        <div>
          <div class="info">
            <span>${place.title}</span>
            <img src=${'./chulent.jpg' /*place.thumbnailImg*/} alt=${place.title} />
          </div>
          <div class="summary">${place.summary}</div>
        </div>`;
      placesList.append(placeLi);

      const summary = placeLi.querySelector('.summary');

      placeLi.addEventListener('click',async () => {
        map.setZoom(6);

        /*setTimeout(() => {
          map.panTo(loc);

          /*setTimeout(() => {
            map.setZoom(18);
          }, 1500);* /
        }, 1500);
        setTimeout(() => {
          map.setZoom(18);
        }, 3000);*/

        if (currentlySelectedSummary) {
          //currentlySelectedSummary.style.display = 'none';
          currentlySelectedSummary.classList.remove('active');
        }
        currentlySelectedSummary = summary;
        //summary.style.display = 'block';
        currentlySelectedSummary.classList.add('active');
        await doAfter(() => map.panTo(loc), 1500);
        await doAfter(() => map.setZoom(18), 1500);
      });
    });

    map.fitBounds(bounds);

    localStorage.setItem('place', JSON.stringify({
      title: geonames[0].title,
      location: {lat: geonames[0].lat, lng: geonames[0].lng}
    }));
  } catch (e) {
    console.error(e);
  }
});


function doAfter(action, delay) {
  return new Promise((resolve, reject)=> {
    setTimeout(() => {
      action();
      resolve();
    }, delay);
  });
}
