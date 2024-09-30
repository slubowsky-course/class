/* global google*/
(async function () {
  'use strict';

  const { Map/*, StreetViewPanorama*/, InfoWindow } = await google.maps.importLibrary('maps');
  const { AdvancedMarkerElement } = await google.maps.importLibrary('marker');
  const { DrawingManager } = await google.maps.importLibrary('drawing');

  const bmg = { lat: 40.096435526114426, lng: -74.22148623738576 };
  const geoNamesApiKey = 'slubowsky';

  const map = new Map(document.querySelector('#map'), {
    zoom: 16,
    center: bmg,
    mapId: 'DEMO_MAP_ID'
  });

  const infowindow = new InfoWindow();

  /*const pano = new google.maps.StreetViewPanorama(
    document.querySelector('#pano'),
    {
      position: bmg,
      pov: {
        heading: 34,
        pitch: 10,
      },
    }
  );
  map.setStreetView(pano);

  map.addListener('center_changed', () => {
    pano.setPosition(map.getCenter());
  });*/

  const searchInput = document.querySelector('#search');
  const sidebarList = document.querySelector('#sidebar ul');

  document.querySelector('#searchForm').addEventListener('submit', async e => {
    e.preventDefault();

    try {
      const r = await fetch(`http://api.geonames.org/wikipediaSearch?q=${searchInput.value}&maxRows=10&username=${geoNamesApiKey}&type=json`);
      if (!r.ok) {
        throw new Error(`${r.status} - ${r.statusText}`);
      }
      const places = await r.json();

      const bounds = new google.maps.LatLngBounds();
      places.geonames.forEach(place => {
        const position = { lat: place.lat, lng: place.lng };
        addPlaceToMap(place, position);
        bounds.extend(position);
        addPlaceToSidebar(place, position);
      });
      map.fitBounds(bounds);
    } catch (e) {
      console.error(e);
    }
  });

  function addPlaceToMap(place, position) {
    let img;
    if (place.thumbnailImg) {
      img = document.createElement('img');
      img.src = place.thumbnailImg;
      img.className = 'thumbnail';
    }

    const marker = new AdvancedMarkerElement({
      map,
      position: position,
      title: place.title,
      content: img
    });

    marker.addListener('click', () => {
      infowindow.setContent(`<div>
                              <h3>${place.title}</h3>
                              ${place.summary}
                              <a href="https://${place.wikipediaUrl}" target="_blank">more info</a>
                            </div>`);
      infowindow.open({
        anchor: marker,
        map,
      });
    });
  }

  function addPlaceToSidebar(place, position) {
    const li = document.createElement('li');
    li.innerHTML = `<span>${place.title}</span>
          <img src="${place.thumbnailImg || 'media/video.png'}"/>
          <div class="summary">${place.summary}</div>`;
    sidebarList.appendChild(li);
    li.addEventListener('click', async () => {
      document.querySelector('.active')?.classList.remove('active');
      li.classList.add('active', 'visited');
      //li.querySelector('.summary').style = 'display: block';
      map.setZoom(10);
      /*setTimeout(() => {
        map.panTo(position);
        setTimeout(() => map.setZoom(18), 1000);
      }, 1000);*/
      //setTimeout(() => map.setZoom(18), 2000);

      console.log('before');
      await doAfter(() => map.panTo(position), 1000);
      console.log('middle');
      await doAfter(() => map.setZoom(18), 1000);
      console.log('done');
    });
  }

  function doAfter(action, delay) {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(action()), delay);
    });
  }

  ///////////////////////////

  const markers = [];
  var drawingManager = new DrawingManager();
  drawingManager.setMap(map);

  drawingManager.addListener('overlaycomplete', e => {
    console.log('overlaycomplete', e);

    switch (e.type) {
      case 'marker':
        markers.push(e.overlay.getPosition());
        localStorage.markers = JSON.stringify(markers);
        break;
      case 'circle':
        console.log('circle');
    }
  });

  /*drawingManager.addListener('markercomplete', e => {
    console.log('markercomplete', e);


  });*/

  if (localStorage.markers) {
    const storedMarkers = JSON.parse(localStorage.markers);
    storedMarkers.forEach(m => {
      const marker = new AdvancedMarkerElement({
        map,
        position: m
      });
    });
  }

}());
