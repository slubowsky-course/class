(async function () {
  'use strict';

  /*const numbers = [2, 4, 6, 8, 10, 11, 12, 13];
  const [a, second, , another, ...foo] = numbers;
  console.log(a, second, another, foo);

  const potus = { first: 'Kamala', last: 'Harris', age: 55, email: 'kharris@whitehouse.gov' };
  const {last, age, ...rest} = potus;
  console.log(last, age, rest);*/

  const { Map } = await google.maps.importLibrary('maps');
  const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary('marker');

  const bmg = { lat: 40.096435526114426, lng: -74.22148623738576 };
  const pcs = { lat: 40.10904236548321, lng: -74.2177665335666 };

  const map = new Map(
    document.querySelector('#map'), {
    zoom: 18,
    center: bmg,
    mapId: 'DEMO_MAP_ID',
    mapTypeId: google.maps.MapTypeId.SATELLITE
  });

  const infowindow = new google.maps.InfoWindow(/*{
    content: 'This is BMG'
  }*/);

  const bmgImg = document.createElement('img');
  bmgImg.src = 'bmg.jpg';

  /*const pinElement = new PinElement({
    scale: 2,
    background: '#FBBC04'
  });*/
  const marker = new AdvancedMarkerElement({
    map: map,
    position: bmg,
    title: 'BMG',
    //content: pinElement.element
    content: bmgImg
  });

  marker.addListener('click', () => {
    infowindow.setContent(`<div class="info-window"><h5>BMG</h5>Beth Medrash Govoha (Hebrew: בית מדרש גבוה, pronounced: Beis Medrash Gavo'ha.lit: "High House of Learning"; also known as Lakewood Yeshiva or BMG) is a Haredi Jewish Lithuanian yeshiva in Lakewood Township, New Jersey.It was founded by Rabbi Aharon Kotler in 1943 and is the second - largest yeshiva in the world, after Mir Yeshiva in Jerusalem.[1][2] As of 2019, it had 6, 715 students, 2, 748 regular and 3, 967 in Kollel status.[3] The principal Rosh yeshiva since 1982 is Rabbi Malkiel Kotler.Talmud and halakha studies in the institution are carried in the form of over 200 small groups, Chaburos, which consist of several students mentored by a veteran, each pursuing its own specific curriculum with an emphasis on individual learning.[4]<br><a href="https://en.wikipedia.org/wiki/Beth_Medrash_Govoha" target="_blank">more info</a></div>`);

    infowindow.open({
      anchor: marker,
      map,
    });
  });

  const marker2 = new AdvancedMarkerElement({
    map: map,
    position: pcs,
    title: 'PCS',
  });

  marker2.addListener('click', () => {
    infowindow.setContent('This is PCS');

    infowindow.open({
      anchor: marker2,
      map,
    });
  });

  map.addListener('center_changed', () => {
    const newCenter = map.getCenter();
    console.log(newCenter.lat(), newCenter.lng());
  });

  setTimeout(() => {
    const bounds = new google.maps.LatLngBounds();
    bounds.extend(bmg);
    bounds.extend(pcs);
    map.fitBounds(bounds);

    setTimeout(() => {
      map.panTo(pcs);

      setTimeout(() => {
        map.setZoom(20);
      }, 3000);
    }, 3000);
  }, 3000);
}());
