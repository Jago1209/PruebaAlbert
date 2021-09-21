import $, { getJSON } from "jquery";
import 'leaflet/dist/leaflet.css';
import './map.scss';

import './controls/dist/leaflet-control-boxzoom';
import './controls/dist/leaflet-control-boxzoom.css';
import 'leaflet-minimap/dist/Control.MiniMap.min.css';

const L =require ('leaflet');

import {standard_osm} from './layers/control-layers';
import {r_perimetro} from './layers/control-layers';
import {u_terreno} from './layers/control-layers';
import {AwesomeMarkersIcon} from './controls/icons/famIcon';

export var codigo = "";
export var shape_area = "";


export var map = L.map('map', {
    center: [5.231819574759624, -72.24060058593751],
    zoom: 11,
    layers: [standard_osm, r_perimetro, u_terreno]
});

//BoxZoom
new L.Control.boxzoom({ position:'topleft' }).addTo(map);

//scale control
new L.control.scale({imperial: false}).addTo(map)

//marcador
L.marker([5.3357, -72.3942], {icon: AwesomeMarkersIcon('glyphicon', 'flag','red')}).addTo(map);

//info punto
map.on('click', function(e) {        
    var popLocation= e.latlng;
    //llamamos la funcion que envia el punto en el que se hizo click
    var este = getInfo(popLocation); 
});

//capturamos punto de origen del click
var x = 0;
var y = 0; 
document.addEventListener('click', onMouseUpdate, true);
function onMouseUpdate(e) {
  x = e.pageX;
  y = e.pageY;
}

//capturamos el tamaño de la ventana
var height = window.innerHeight;
var width = window.innerWidth;



//consulta a geoserver
 function getInfo(popLocation){
    var location = map.getBounds().toBBoxString();
    var length;

    //url y parametros de consulta
    var settings = {
        "url": "http://34.132.27.64:8080/geoserver/yopal/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetFeatureInfo&FORMAT=image/Fpng&TRANSPARENT=true&QUERY_LAYERS=yopal:u_terreno&LAYERS=yopal:u_terreno&exceptions=application/Fvnd.ogc.se_inimage&INFO_FORMAT=application/json&FEATURE_COUNT=1&X=" + x + "&Y=" + y + "&SRS=EPSG:4326&WIDTH=" + width + "&HEIGHT=" + height + "&typeName=namespace:numero_sub&BBOX="+ location,
        "method": "GET",
        "timeout": 0,
      };
      
      //ejecuto consulta
      $.ajax(settings).done(function (response) {
        //capturo longitud de la respuesta 
        length = response.features.length;
        //confirmo si la consulta genero respuesta o no
        if(length == 0){

          var popup = L.popup()
          .setLatLng(popLocation)
          .setContent('<p>No se tiene información de esta área</p>')
          .openOn(map);

            }else{
            codigo = response.features[0].properties.codigo;
            shape_area = response.features[0].properties.shape_area;
            
            var popup = L.popup()
            .setLatLng(popLocation)
            .setContent('<p>Codigo: <br/>' + codigo + '</p><br/> <p>Area: <br/>' + shape_area + '</p>')
            .openOn(map); 

            codigo = "";
            shape_area = "";
          }
      });

}

