import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Circle, useMap, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon issues in React Leaflet
// Although we use custom icons, it's good practice to fix defaults just in case
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapController = ({ selectedShip }) => {
  const map = useMap();

  useEffect(() => {
    if (selectedShip) {
      map.flyTo([selectedShip.lat, selectedShip.lng], 13, {
        animate: true,
        duration: 2
      });
    }
  }, [selectedShip, map]);

  return null;
};

const MapComponent = ({ ships, selectedShip, onShipClick, layers }) => {

  // Custom Icons
  const createCustomIcon = (status, isSelected) => {
    const color = status === 'illegal' ? '#da3633' : '#238636';
    const pulseClass = status === 'illegal' ? 'animate-pulse-red' : '';
    const sizeClass = isSelected ? 'scale-125' : 'scale-100';

    // We render HTML for the icon
    return L.divIcon({
      className: 'bg-transparent',
      html: `
        <div class="relative flex items-center justify-center w-full h-full group cursor-pointer">
           ${status === 'illegal' ? `<div class="absolute w-full h-full rounded-full ${pulseClass}" style="box-shadow: 0 0 10px ${color};"></div>` : ''}
           <div class="w-3 h-3 rounded-full border border-white shadow-lg z-10 ${sizeClass} transition-transform duration-300" style="background-color: ${color}; box-shadow: 0 0 8px ${color};"></div>
           <div class="absolute -bottom-6 bg-black/80 text-white text-[10px] px-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-gray-700 pointer-events-none z-20">
             ${status === 'illegal' ? 'TARGET' : 'VESSEL'}
           </div>
        </div>
      `,
      iconSize: [40, 40],
      iconAnchor: [20, 20]
    });
  };

  return (
    <div className="flex-1 h-full relative bg-[#0d1117] overflow-hidden">
      <MapContainer
        center={[-18.15, 49.41]}
        zoom={10}
        style={{ height: '100%', width: '100%', background: '#0d1117' }}
        zoomControl={false}
      >
        <ZoomControl position="bottomright" />
        <MapController selectedShip={selectedShip} />

        {/* Base Layer: Dark Matter */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {/* Satellite Layer Toggle */}
        {layers.satellite && (
           <TileLayer
             url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
             opacity={0.6}
           />
        )}

        {/* Artisanal Zones Toggle */}
        {layers.zones && (
          <>
            <Circle
              center={[-18.10, 49.48]}
              radius={2000}
              pathOptions={{ color: '#e69f00', fillColor: '#e69f00', fillOpacity: 0.2, dashArray: '5, 5' }}
            />
            <Circle
              center={[-18.20, 49.45]}
              radius={1500}
              pathOptions={{ color: '#e69f00', fillColor: '#e69f00', fillOpacity: 0.2, dashArray: '5, 5' }}
            />
          </>
        )}

        {/* Render Ships */}
        {ships.map((ship) => {
           // Filter logic
           if (ship.status === 'legal' && !layers.ais) return null;

           return (
            <Marker
              key={ship.id}
              position={[ship.lat, ship.lng]}
              icon={createCustomIcon(ship.status, selectedShip?.id === ship.id)}
              eventHandlers={{
                click: () => onShipClick(ship),
              }}
            >
            </Marker>
           );
        })}
      </MapContainer>

      {/* Tactical Overlay Elements */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] bg-[#161b22]/90 backdrop-blur px-4 py-1 rounded-full border border-[#30363d] flex items-center gap-4 shadow-lg">
        <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-xs font-mono text-gray-300">SAT-LINK: ACTIVE</span>
        </div>
        <div className="w-px h-3 bg-gray-600"></div>
        <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-gray-300">GRID: 49.41E / -18.15S</span>
        </div>
      </div>

      <div className="absolute bottom-4 left-4 z-[1000] bg-[#161b22]/80 backdrop-blur border border-[#30363d] p-2 rounded text-[10px] text-gray-400 font-mono shadow-lg">
        <div className="mb-1 text-[#58a6ff]">SECTOR: TOAMASINA EAST</div>
        <div>SCALE: 1:50,000</div>
      </div>
    </div>
  );
};

export default MapComponent;
