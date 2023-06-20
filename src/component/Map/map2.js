// import React from 'react';
// import GoogleMapReact from 'google-map-react';

// function GetMap() {
//   const handleMapClick = (event) => {
//     // Get the latitude and longitude of the clicked location
//     const latitude = event.lat;
//     const longitude = event.lng;

//     // Do something with the latitude and longitude values
//     console.log(`Clicked location: ${latitude}, ${longitude}`);
//   };

//   return (
//     <div style={{ height: '400px', width: '100%' }}>
//       <GoogleMapReact
//         defaultCenter={{ lat: 37.7749, lng: -122.4194 }}
//         defaultZoom={12}
//         onClick={handleMapClick}
//       />
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";





function GetMap() {
  const [location, setLocation] = useState({ lat: 37.7749, lng: -122.4194, zoom: 0 });

  const handleClick = (e) => {
    setLocation({
      lat: e.latlng.lat,
      lng: e.latlng.lng,
      zoom: 30
    });
  };

  const handle = () => {
    console.log(location.lat);
  };

  useEffect(() => {

    let mapOptions = {
      center: [51.958, 9.141],
      zoom: 10
    }

    let map = new L.map('map', mapOptions);

    let layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
    map.addLayer(layer);


    let marker = null;
    map.on('click', (event) => {

      if (marker !== null) {
        map.removeLayer(marker);
      }

      marker = L.marker([event.latlng.lat, event.latlng.lng]).addTo(map);

     
      window.alert(event.latlng);

    })

  }, []);

  return <>
    {/* <div>
      <MapContainer center={[location.lat, location.lng]} zoom={location.zoom} onClick={handleClick} style={{ width: '100%', height: '250px' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[location.lat, location.lng]}>
          <Popup>
            Latitude: {location.lat} <br /> Longitude: {location.lng}
          </Popup>
        </Marker>
      </MapContainer>
      
    </div> */}
    <div class="wrap">

      <form action="" class="form">
        <input type="text" id="latitude" placeholder="latitude" />
        <input type="text" id="longitude" placeholder="longitude" />
      </form>

      <div id="map"></div>

    </div>

  </>
}














export default GetMap;
