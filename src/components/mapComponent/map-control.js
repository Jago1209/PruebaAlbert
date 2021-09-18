import $, { getJSON } from "jquery";
import 'leaflet/dist/leaflet.css';
import './map.scss';
import 'leaflet-minimap/dist/Control.MiniMap.min.css';

const L =require ('leaflet');

import {standard_osm} from './layers/control-layers'
import {carto_light} from './layers/control-layers'
import {r_perimetro} from './layers/control-layers';
import {u_terreno} from './layers/control-layers';
import {AwesomeMarkersIcon} from './controls/icons/famIcon'

export var codigo = "";
export var shape_area = "";


export var map = L.map('map', {
    center: [5.231819574759624, -72.24060058593751],
    zoom: 11,
    layers: [standard_osm, r_perimetro, u_terreno]
});

L.control.zoom({position: 'topright'}).addTo(map);

// scale control
new L.control.scale({imperial: false}).addTo(map)

//marcador
L.marker([5.3357, -72.3942], {icon: AwesomeMarkersIcon('glyphicon', 'flag','red')}).addTo(map);

//info punto

map.on('click', function(e) {        
    var popLocation= e.latlng;
    

    var este = getInfo();

    if(codigo == "" ||  shape_area ==""){
    var popup = L.popup()
    .setLatLng(popLocation)
    .setContent('<p>No se tiene información de esta área</p>')
    .openOn(map);

    }else{
    var popup = L.popup()
    .setLatLng(popLocation)
    .setContent('<p>Codigo: <br/>' + codigo + '</p><br/> <p>Area: <br/>' + shape_area + '</p>')
    .openOn(map); 
    codigo = "";
    shape_area = "";
    }

           
});



 function getInfo(){
    var location = map.getBounds().toBBoxString();
    var settings = {
        "url": "http://34.132.27.64:8080/geoserver/yopal/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetFeatureInfo&FORMAT=image/Fpng&TRANSPARENT=true&QUERY_LAYERS=yopal:u_terreno&LAYERS=yopal:u_terreno&exceptions=application/Fvnd.ogc.se_inimage&INFO_FORMAT=application/json&FEATURE_COUNT=1&X=15&Y=15&SRS=EPSG:4326&WIDTH=31&HEIGHT=31&typeName=namespace:numero_sub&BBOX="+ location,
        "method": "GET",
        "timeout": 0,
      };
      
      $.ajax(settings).done(function (response) {
        codigo = response.features[0].properties.codigo;
        shape_area = response.features[0].properties.shape_area;
      });

      return codigo, shape_area;
}