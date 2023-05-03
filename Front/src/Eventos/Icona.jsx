import * as L from 'leaflet';
import Ic from './4598615.png';
import Ic2 from './marker-icon-2x-green.png';
import Ic3 from './marker-icon-2x-gold.png'
import Ic4 from './marker-icon-2x-red.png'

 


 const Icona = new L.Icon({
     iconUrl: Ic,
     iconRetinaUrl: Ic,
     iconAnchor: null,
     popupAnchor: null,
     shadowUrl: null,
     shadowSize: 0,
     shadowAnchor:0,
     iconSize: new L.Point(50,60),
     
 });

 const Icona2 = new L.Icon({
    iconUrl: Ic2,
    iconRetinaUrl: Ic2,
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: 0,
    shadowAnchor:0,
    iconSize: new L.Point(24,41),
    
});

const Icona3 = new L.Icon({
    iconUrl: Ic3,
    iconRetinaUrl: Ic3,
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: 0,
    shadowAnchor:0,
    iconSize: new L.Point(24,41),
    
});

const Icona4 = new L.Icon({
    iconUrl: Ic4,
    iconRetinaUrl: Ic4,
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: 0,
    shadowAnchor:0,
    iconSize: new L.Point(24,41),
    
});



export { Icona, Icona2, Icona3, Icona4 };

