import Detail from '../Detail.vue'
// import axios from 'axios'

export default {
    name: 'Map',
    components: {
        Detail
    },
    data () {
        return {
            map: null,
            marker: null,
            lat: null,
            lon: null,
            control: null,
            layers: [
                {
                    id: 0,
                    name: 'Restaurants',
                    active: false,
                    features: []
                },
                {
                    id: 1,
                    name: 'Hotels',
                    active: false,
                    features: []
                },
                {
                    id: 2,
                    name: 'Recreations',
                    active: false,
                    features: []
                },
                {
                    id: 3,
                    name: 'Malls',
                    active: false,
                    features: []
                }
            ]
        }
    },
    props: {
        // layers: {
        //     type: Array
        // },
    },
    mounted () {
        this.initMap();
        // this.initLayers();
        this.callAPI();
        // this.initLayers();
        setTimeout(() => this.initLayers(), 11000);
    },
    beforeUpdate () {
        this.initLayers();
    },
    methods: {
        initMap() {
            var L = window.L;

            var osmUrl='http://{s}.tile.osm.org/{z}/{x}/{y}.png';
            var osmAttrib='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';
            var tileLayer = new L.TileLayer(osmUrl, {attribution: osmAttrib});
            
            var southWest = L.latLng(-89.98155760646617, -180),
            northEast = L.latLng(89.99346179538875, 180);
            var bounds = L.latLngBounds(southWest, northEast);
            
            this.map = new L.Map('map', {
                'center': [-7.2823728, 112.7948972],
                // 'center': [38.63, -90.23],
                'zoom': 17,
                'layers': [tileLayer],
                'minZoom': 3
            });

            var marker = new L.marker([-7.2823728, 112.7948972], {
                draggable: true
            }).addTo(this.map);
            var map = this.map

            var setLonLat = this.setLonLat;
            marker.on('dragend', function () {
                setLonLat(marker.getLatLng().lat.toFixed(7), marker.getLatLng().lng.toFixed(7));
                map.panTo([marker.getLatLng().lat, marker.getLatLng().lng]);
            });
            map.on('click', function (e) {
                marker.setLatLng(e.latlng);
                setLonLat(marker.getLatLng().lat.toFixed(7), marker.getLatLng().lng.toFixed(7));
                map.panTo([marker.getLatLng().lat, marker.getLatLng().lng]);
            });

            this.control = L.Routing.control({
                waypoints: [
                    L.latLng(-7.2823728, 112.7948972),
                    L.latLng(-7.2800122, 112.7970102)
                ],
                geocoder: L.Control.Geocoder.nominatim(),
                routeWhileDragging: true,
                reverseWaypoints: true,
                showAlternatives: true,
                altLineOptions: {
                    styles: [
                        {color: 'black', opacity: 0.15, weight: 9},
                        {color: 'white', opacity: 0.8, weight: 6},
                        {color: 'blue', opacity: 0.5, weight: 2}
                    ]
                }
            }).addTo(map);

            map.setMaxBounds(bounds);
            map.on('drag', function() {
                map.panInsideBounds(bounds, { animate: false });
            });
        },
        initLayers() {
            var L = window.L;

            console.log('start')
            this.layers.forEach((layer) => {
              const markerFeatures = layer.features.filter(feature => feature.type === 'marker');
              console.log(layer)
              markerFeatures.forEach((feature) => {
                feature.leafletObject = L.marker(feature.coords)
                  .bindPopup(feature.name);
              });
            });
        },
        layerChanged(layerId, active) {
            const layer = this.layers.find(layer => layer.id === layerId);
            console.log(layerId, active)
            layer.features.forEach((feature) => {
              if (active) {
                feature.leafletObject.addTo(this.map);
              } else {
                feature.leafletObject.removeFrom(this.map);
              }
            });
        },
        setLonLat (lat, lon) {
            this.lat = lat;
            this.lon = lon;
        },
        route (lat, lon) {
            var latLng = window.L.latLng(lat, lon);
            this.control.spliceWaypoints(this.control.getWaypoints().length - 1, 1, latLng);
        },
        getRestaurants () {
            fetch('http://127.0.0.1:8000/api/place?kind=Restaurants')
            .then(response => response.json())
            .then(data => (this.layers[0].features = data.content.places))
        },
        getHotels () {
            fetch('http://127.0.0.1:8000/api/place?kind=Hotels')
            .then(response => response.json())
            .then(data => (this.layers[1].features = data.content.places))
        },
        getRecreations () {
            fetch('http://127.0.0.1:8000/api/place?kind=Recreations')
            .then(response => response.json())
            .then(data => (this.layers[2].features = data.content.places))
        },
        getMalls () {
            fetch('http://127.0.0.1:8000/api/place?kind=Malls')
            // .then((response) => {
            //     const { places } = response.data.content
            //     this.layers[3].features = places
            //     console.log(response.data)
            // })
            .then(response => response.json())
            .then(data => (this.layers[3].features = data.content.places))
        },
        async callAPI () {
            await this.getRestaurants();
            await this.getHotels();
            await this.getRecreations();
            await this.getMalls();
        }
    }
}