/* globals google */
(function () {
  'use strict';

  const map = new google.maps.Map(document.querySelector('#map'), {
    center: { lat: 40.096435526114426, lng: -74.22148623738576 },
    zoom: 16,
  });

  const drawingManager = new google.maps.drawing.DrawingManager();
  drawingManager.setMap(map);

  const drawings = JSON.parse(localStorage.drawings || '[]');
  //const drawings = localStorage.drawings ? JSON.parse(localStorage.drawings) : { markers: [], circles: [] };
  //const markers = localStorage.markers ? JSON.parse(localStorage.markers) : [];
  /*drawings.markers.forEach(marker => {
    new google.maps.Marker({
      map,
      position: marker.position
    });
  });

  //const circles = localStorage.circles ? JSON.parse(localStorage.circles) : [];
  drawings.circles.forEach(circle => {
    new google.maps.Circle({
      map,
      center: circle.center,
      radius: circle.radius,
    });
  });*/

  drawings.forEach(drawing => {
    switch (drawing.type) {
      case 'marker':
        new google.maps.Marker({
          map,
          position: drawing.position
        });
        break;
      case 'circle':
        new google.maps.Circle({
          map,
          center: drawing.center,
          radius: drawing.radius,
        });
        break;
      case 'polyline':
        new google.maps.Polyline({
          map,
          geodesic: true,
          path: drawing.path
        });
        break;
      case 'polygon':
        new google.maps.Polygon({
          map,
          path: drawing.path
        });
        break;
      case 'rectangle':
        new google.maps.Rectangle({
          map,
          bounds: drawing.bounds
        });
        break;
    }

  });

  /*google.maps.event.addListener(drawingManager, 'overlaycomplete', function (event) {
    const overlay = event.overlay;
    switch (event.type) {
      case 'marker':
        markers.push({position: overlay.getPosition()});
        localStorage.markers = JSON.stringify(markers);
        break;
      case 'circle':
        circles.push({ radius: overlay.getRadius(), center: overlay.getCenter() });
        localStorage.circles = JSON.stringify(circles);
        break;
      default:
        console.log(`not yet ready for ${overlay.type}`);
    }
  });*/

  drawingManager.addListener('markercomplete', overlay => {
    drawings.push({ type: 'marker', position: overlay.getPosition() });
    localStorage.drawings = JSON.stringify(drawings);
  });

  drawingManager.addListener('circlecomplete', overlay => {
    drawings.push({ type: 'circle', radius: overlay.getRadius(), center: overlay.getCenter() });
    localStorage.drawings = JSON.stringify(drawings);
  });

  drawingManager.addListener('polylinecomplete', overlay => {
    drawings.push({ type: 'polyline', path: overlay.getPath().getArray() });
    localStorage.drawings = JSON.stringify(drawings);
  });

  drawingManager.addListener('polygoncomplete', overlay => {
    drawings.push({ type: 'polygon', path: overlay.getPath().getArray() });
    localStorage.drawings = JSON.stringify(drawings);
  });

  drawingManager.addListener('rectanglecomplete', overlay => {
    drawings.push({ type: 'rectangle', bounds: overlay.getBounds() });
    localStorage.drawings = JSON.stringify(drawings);
  });
}());
