import 'leaflet/dist/leaflet.css';
import 'leaflet-minimap/dist/Control.MiniMap.min.css';

const L =require ('leaflet');
import 'leaflet-minimap';
import {standard_osm_mm} from '../layers/control-layers'
import { map } from '../map-control';


export var minimap= new L.Control.MiniMap(standard_osm_mm, 
{   minZoom: 0,
    maxZoom: 13,
    toggleDisplay: true ,
    minimized:false,
    position: "bottomleft"
}).addTo(map);

