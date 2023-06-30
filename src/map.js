import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet-omnivore';

function Map({ shapefile }) {
  const mapRef = useRef(null);

  useEffect(() => {
    const map = L.map(mapRef.current).setView([0, 0], 1);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map);

    const shapeLayer = L.geoJSON(null, {
      style: {
        color: 'blue',
        fillColor: 'yellow',
        fillOpacity: 0.5,
      },
    });

    const reader = new FileReader();
    reader.onload = (e) => {
      L.leafletOmnivore.shp(e.target.result).addTo(shapeLayer);
      shapeLayer.addTo(map);
      map.fitBounds(shapeLayer.getBounds());
    };
    reader.readAsArrayBuffer(shapefile);

    return () => {
      map.remove();
    };
  }, [shapefile]);

  return <div id="map" ref={mapRef} style={{ height: '500px', width: '100%' }}></div>;
}

export default Map;
