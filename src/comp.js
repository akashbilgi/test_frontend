import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
function InteractiveMap() {
    const mapRef = useRef(null);
  
    useEffect(() => {
      // Create the Leaflet map
      const map = L.map(mapRef.current).setView([51.505, -0.09], 13);
  
      // Add the tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
      }).addTo(map);
  
      // Event listener for clicks on the map
      map.on('click', function(e) {
        L.marker(e.latlng).addTo(map);
        // Store the marker coordinates or perform any other logic you need
      });
  
      // Clean up the map when the component is unmounted
      return () => {
        map.remove();
      };
    }, []);
  
    return <div id="map" ref={mapRef} style={{ height: '500px', width: '500px' }}></div>;
  }

  export default InteractiveMap;
