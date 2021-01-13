<template>
    <div>
        <Detail :layers="layers" @layerChanged="layerChanged" :lat="lat" :lon="lon" @route="route"/>
        <div id="map"></div>
    </div>
</template>

<script src="./js/map.js"/>

<style scoped>
    #map {
        /* height: 100vh;
        position: relative; */
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1;
    }
</style>