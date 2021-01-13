<template>
  <div id="app">
    <Map/>
  </div>
</template>

<script>
import Map from './components/Map.vue'
// import data from './assets/data2.json'
// import axios from 'axios';

export default {
  name: 'App',
  components: {
    Map
  },
  data () {
    return {
      // layers: [
      //           {
      //               id: 0,
      //               name: 'Restaurants',
      //               active: false,
      //               features: []
      //           },
      //           {
      //               id: 1,
      //               name: 'Hotels',
      //               active: false,
      //               features: []
      //           },
      //           {
      //               id: 2,
      //               name: 'Recreations',
      //               active: false,
      //               features: []
      //           },
      //           {
      //               id: 3,
      //               name: 'Malls',
      //               active: false,
      //               features: []
      //           }
      //       ]
    }
  },
  // methods: {
  //   getMalls () {
  //       fetch('http://127.0.0.1:8000/api/place?kind=Malls')
  //       // .then((response) => {
  //       //     const { places } = response.data.content
  //       //     this.layers[3].features = places
  //       //     console.log(response.data)
  //       // })
  //       .then(response => response.json())
  //       .then(data => (this.layers[3].features = data.content.places))
  //   }
  // },
  // mounted () {
  //   this.getMalls();
  // }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
