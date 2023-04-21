import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

function Mapa() {
  const position = [51.505, -0.09]; // Coordenadas iniciales del mapa
  
  return (
    <MapContainer center={position} zoom={13} style={{ height: "400px" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={position}>        
      </Marker>
    </MapContainer>
  );
}

export default Mapa;
