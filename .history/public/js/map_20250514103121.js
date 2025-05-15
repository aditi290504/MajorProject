mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: "mapbox://style/mapbox/streets-v12",
    center: coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
    zoom: 9 // starting zoom
    });
    

const marker = new mapboxgl.Marker({color:"red"})
  .setLngLat(coordinates)
  .setPopup(
    new mapboxgl.Popup({offset:25})
      .setHTML(`<h4>Exact location will be provided after booking</h4>`)
  )
  .loadImage(
  'https://docs.mapbox.com/mapbox-gl-js/assets/cat.png',
  (error, image) => {
    if (error) throw error;
  }
  )
  .addImage('cat', image)
  .addLayer({
  'id': 'points',
  'type': 'symbol',
  'source': 'point',
  'layout': {
    'icon-image': 'cat',   // Use the 'cat' image we added earlier
    'icon-size': 0.25      // Scale it down to 25% of original size}})
  .addTo(map);    