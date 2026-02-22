import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import MapComponent from './components/Map';
import RightPanel from './components/RightPanel';
import shipsData from './data/ships.json';

function App() {
  const [ships] = useState(shipsData);
  const [alerts] = useState(shipsData.filter(ship => ship.alert));
  const [selectedShip, setSelectedShip] = useState(null);
  const [layers, setLayers] = useState({
    ais: true,
    zones: true,
    satellite: true
  });

  const handleAlertClick = (alert) => {
    setSelectedShip(alert);
  };

  const handleShipClick = (ship) => {
    setSelectedShip(ship);
  };

  const toggleLayer = (layerKey) => {
    setLayers(prev => ({
      ...prev,
      [layerKey]: !prev[layerKey]
    }));
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#0d1117] text-white font-sans">
      <Sidebar
        alerts={alerts}
        onAlertClick={handleAlertClick}
        layers={layers}
        toggleLayer={toggleLayer}
      />

      <main className="flex-1 relative flex">
        <MapComponent
          ships={ships}
          selectedShip={selectedShip}
          onShipClick={handleShipClick}
          layers={layers}
        />

        {selectedShip && (
          <div className="absolute top-0 right-0 h-full z-[2000] transition-transform duration-300 ease-in-out">
             <RightPanel
               ship={selectedShip}
               onClose={() => setSelectedShip(null)}
             />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
