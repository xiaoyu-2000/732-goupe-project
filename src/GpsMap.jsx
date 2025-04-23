import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import PhotoMarker from "./PhotoMarker";
import photoMarkers from "./photoData";

// Fix the default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function GpsMap() {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
      },
      (err) => {
        console.error("Error getting location", err);
        alert("Cannot get your location");
      }
    );
  }, []);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      {position ? (
        <MapContainer
          center={position}
          zoom={16}
          style={{ height: "100%", width: "100%" }}
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />

          <ZoomControl position="topright" />

          <Marker position={position}>
            <Popup>You are here 📍</Popup>
          </Marker>

          {photoMarkers.map((marker) => (
            <PhotoMarker
              key={marker.id}
              lat={marker.lat}
              lng={marker.lng}
              image={marker.image}
              count={marker.count}
            />
          ))}
        </MapContainer>
      ) : (
        <p>Getting your GPS data...</p>
      )}
    </div>
  );
}
