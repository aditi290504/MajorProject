mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    st
    center: [coordinates], // starting position [lng, lat]. Note that lat must be set between -90 and 90
    zoom: 9 // starting zoom
    });
    

const marker = new mapboxgl.Marker()
        .setLngLat([coordinates])
        .addTo(map);    