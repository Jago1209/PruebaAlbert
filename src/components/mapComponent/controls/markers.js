const L =require ('leaflet');
import 'leaflet-marker-rotation/src/rotatedMarker';
import { map } from '../map-control';
import { AwesomeMarkersIcon } from './icons/famIcon';

export var dynamicMarker=(icono, coords,angle)=>{
    return L.rotatedMarker(coords, {
        icon: icono,
        rotationOrigin:'center',
        rotationAngle: angle
    });
}