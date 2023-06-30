import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet-omnivore';
import shp from 'shpjs'; // Import the shpjs library

function Map({ shapefile }) {
  const mapRef = useRef(null);

  useEffect(() => {
    const map = L.map(mapRef.current).setView([0, 0], 1);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map);

    const shapeLayer = L.geoJSON(null, {
      style: {
        color: 'blue',
        fillColor: 'yellow',
        fillOpacity: 0.5,
      },
    });

    // Read the shapefile and convert it to GeoJSON
    shp(shapefile)
      .then((geojson) => {
        shapeLayer.addData(geojson);
        shapeLayer.addTo(map);
        map.fitBounds(shapeLayer.getBounds());
      })
      .catch((error) => {
        console.log('Error reading shapefile:', error);
      });

    return () => {
      map.remove();
    };
  }, [shapefile]);

  return <div id="map" ref={mapRef} style={{ height: '500px', width: '100%' }}></div>;
}

export default Map;
