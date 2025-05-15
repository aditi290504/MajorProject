mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: coordinates,
    zoom: 9
});

map.on('load', () => {
    map.loadImage('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU-0sgMITwNqzwWbNZfDxjhGmmje755YgLHQ&s', (error, image) => {
        if (error) throw error;

        map.addImage('cat', image);

        map.addSource('point', {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: [{
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: coordinates
                    },
                    properties: {}
                }]
            }
        });

        map.addLayer({
            id: 'points',
            type: 'symbol',
            source: 'point',
            layout: {
                'icon-image': 'cat',
                'icon-size': 0.15
            }
        });

        // Optional popup on click
        map.on('click', 'points', (e) => {
            new mapboxgl.Popup()
                .setLngLat(e.lngLat)
                .setHTML(`<h4>Exact location will be provided after booking</h4>`)
                .addTo(map);
        });
    });
});
