import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";




export default function Map({service}) {
    const [position, setPosition] = useState([service?.latitude, service?.longitude]);

  
    useEffect( () => {
      
    }, []);
  
    const customMarker = new L.Icon({
      iconUrl: "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png",
      iconSize: [32, 32],
      iconAnchor: [16, 32],
    });

    
  
    return <>
      <MapContainer
        center={position}
        zoom={15}
        style={{width:"100%",height:"300px"}}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={position} icon={customMarker}>
          <Popup>{service?.title}</Popup>
        </Marker>
      </MapContainer>
</>
}
