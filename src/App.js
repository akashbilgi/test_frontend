import React, { useState } from 'react';
import Map from './map';

function App() {
  const [shapefile, setShapefile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setShapefile(file);
  };

  return (
    <div>
      <h1>Shapefile Viewer</h1>
      <input type="file" accept=".shp" onChange={handleFileChange} />
      {shapefile && <Map shapefile={shapefile} />}
    </div>
  );
}

export default App;

