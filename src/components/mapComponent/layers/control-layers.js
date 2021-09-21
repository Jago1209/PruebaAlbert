import L from 'leaflet'

//BASEMAPS 
export var standard_osm = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: '©OpenStreetMap, ©Standard',minZoom: 0, maxZoom: 19});
export var standard_osm_mm = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: '©OpenStreetMap, ©Standard',minZoom: 0, maxZoom: 19});
export var carto_light = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {attribution: '©OpenStreetMap, ©CartoDB',subdomains: 'abcd',maxZoom: 19});

export var r_perimetro = L.tileLayer.wms("http://34.132.27.64:8080/geoserver/yopal/wms?", {
    layers: 'yopal:r_perimetro',
    format: 'image/png',
    transparent: true,
    minZoom: 0, 
    maxZoom: 19
    //attribution: "Weather data © 2012 IEM Nexrad"
});

export var u_terreno = L.tileLayer.wms("http://34.132.27.64:8080/geoserver/yopal/wms?", {
    layers: 'yopal:u_terreno',
    format: 'image/png',
    transparent: true,
    minZoom: 0,
    maxZoom: 19
    //attribution: "Weather data © 2012 IEM Nexrad"
});
