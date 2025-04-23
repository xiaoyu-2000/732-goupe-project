import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  useMapEvents
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Component to handle map clicks
const AddPathHandler = ({ onAddPoint }) => {
  useMapEvents({
    click(e) {
      onAddPoint(e.latlng);
    }
  });
  return null;
};

export default function NewMarkerPage() {
  const [pathPoints, setPathPoints] = useState([]);

  const handleAddPoint = (latlng) => {
    setPathPoints((prev) => [...prev, latlng]);
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <MapContainer center={[-36.85, 174.76]} zoom={14} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        <AddPathHandler onAddPoint={handleAddPoint} />

        {/* Show all the markers */}
        {pathPoints.map((pos, idx) => (
          <Marker key={idx} position={pos} />
        ))}

        {/* Show polyline if more than 1 point */}
        {pathPoints.length > 1 && (
          <Polyline positions={pathPoints} color="blue" />
        )}
      </MapContainer>
    </div>
  );
}
