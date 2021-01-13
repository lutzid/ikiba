export default {
    name: 'Detail',
    props: {
        layers: {
            type: Array
        },
        lat: {
            type: String
        },
        lon: {
            type: String
        }
    },
    data () {
        return {
            isAdd: false,
            isEdit: false,
            isRefresh: false,
            name: '',
            kind: '',
            places: [],
            updated: {
                id: null,
                name: '',
                kind: '',
                lat: 0,
                lon: 0,
            },
            search: ''
        }
    },
    computed: {
        addSwitcher () {
            return this.isAdd ? false : true;
        },
        nameSwitcher () {
            return this.isAdd ? 'back' : 'add'
        },
        editSwitcher () {
            return this.isEdit ? false : true;
        },
        refreshSwitcher () {
            return this.isRefresh ? false : true;
        },
        searchedPlaces () {
            return this.places.filter((place) => {
                return place.name.toLowerCase().match(this.search.toLowerCase());
            })
        }
    },
    methods: {
        layerChanged (layerId, active){
            this.$emit('layerChanged', layerId, active )
        },
        stateAdd () {
            this.isAdd = this.addSwitcher;
        },
        stateEdit () {
            this.isEdit = this.editSwitcher;
        },
        submit () {
            this.axios.post('http://127.0.0.1:8000/api/place', {
                name: this.name,
                kind: this.kind,
                lat: this.lat,
                lon: this.lon
            }).then((response) => {
                this.refreshSwitcher;
                this.refresh();
                console.log(response.data)
            })
        },
        route (lat, lon) {
            this.$emit('route', lat, lon )
        },
        getPlaces () {
            this.axios.get('http://127.0.0.1:8000/api/places')
                .then((response) => {
                    const { places } = response.data.content
                    this.places = places
                    console.log(this.places)
                })
        },
        edit (item) {
            const { id, name, kind, lat, lon } = item;
            this.updated.id = id;
            this.updated.name = name;
            this.updated.kind = kind;
            this.updated.lat = lat;
            this.updated.lon = lon;
            this.isEdit = this.editSwitcher;
        },
        update () {
            this.axios.put('http://127.0.0.1:8000/api/place', {
                id: this.updated.id,
                name: this.updated.name,
                kind: this.updated.kind,
                lat: this.updated.lat,
                lon: this.updated.lon
            }).then((response) => {
                this.refreshSwitcher;
                this.refresh();
                console.log(response.data)
            })
        },
        refresh () {
            this.getPlaces();
            console.log(this.isEdit);
            if(this.isAdd) this.stateAdd();
            if(this.isEdit) this.stateEdit();
            console.log(this.isEdit);
            this.refreshSwitcher;
        },
        del (id) {
            console.log(id)
            this.axios.post(`http://127.0.0.1:8000/api/place/${id}`)
            .then((response) => {
                this.refreshSwitcher;
                this.refresh();
                console.log(response.data)
            })
            
        }
    },
    mounted () {
        this.getPlaces()
    }
}