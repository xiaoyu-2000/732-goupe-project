import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import polyline from "@mapbox/polyline";

// ✅ Load API key from .env file
const ORS_API_KEY = process.env.REACT_APP_ORS_API_KEY;

export default function RoutePlanner() {
  const [cityList, setCityList] = useState("");
  const [coords, setCoords] = useState([]);         // For drawing route line
  const [cityMarkers, setCityMarkers] = useState([]); // Only input cities to show marker

  // Step 1: Convert city names to coordinates
  const getCoordinatesForCities = async (cities) => {
    const results = [];

    for (const city of cities) {
      try {
        const response = await fetch(
          `https://api.openrouteservice.org/geocode/search?api_key=${ORS_API_KEY}&text=${encodeURIComponent(city)}&boundary.country=NZ`
        );
        const data = await response.json();
        console.log(`📍 Geocode result for "${city}":`, data);

        if (data.features && data.features.length > 0) {
          const coord = data.features[0].geometry.coordinates; // [lng, lat]
          results.push(coord);
        } else {
          alert(`❌ Could not find location for "${city}"`);
        }
      } catch (error) {
        alert(`❌ Error fetching city: "${city}"`);
        console.error(error);
      }
    }

    return results;
  };

  // Step 2: Request route and draw
  const handleDrawRoute = async () => {
    const cityArray = cityList.split(",").map(c => c.trim());
    const geoPoints = await getCoordinatesForCities(cityArray);

    console.log("📌 Coordinates to send:", geoPoints);
    setCityMarkers(geoPoints); // 🆕 Save city markers separately

    if (geoPoints.length < 2) {
      alert("Please enter at least two valid cities.");
      return;
    }

    try {
      const response = await fetch("https://api.openrouteservice.org/v2/directions/driving-car", {
        method: "POST",
        headers: {
          Authorization: ORS_API_KEY,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          coordinates: geoPoints,
          instructions: true,
          geometry: true,
          units: "m",
          language: "en"
        })
      });

      console.log("📡 POST response status:", response.status);
      const data = await response.json();
      console.log("📨 Full POST response:", data);

      if (data.error) {
        console.error("🛑 API Error:", data.error.message || data.error);
        return;
      }

      if (!data || !data.routes || !data.routes[0].geometry) {
        alert("Route generation failed.");
        return;
      }

      const encoded = data.routes[0].geometry;
      const decodedCoords = polyline.decode(encoded).map(([lat, lng]) => [lat, lng]);
      console.log("✅ Decoded coordinates:", decodedCoords);

      setCoords(decodedCoords);
    } catch (error) {
      console.error("❌ POST request error:", error);
      alert("Something went wrong during route generation. Check console.");
    }
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      {/* Input bar */}
      <div style={{
        position: "absolute",
        top: 20,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1000,
        backgroundColor: "white",
        padding: "12px 20px",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        display: "flex",
        gap: "10px"
      }}>
        <input
          type="text"
          placeholder="Enter cities, e.g. Auckland, Hamilton, Wellington"
          value={cityList}
          onChange={(e) => setCityList(e.target.value)}
          style={{
            width: "400px",
            padding: "8px",
            borderRadius: "8px",
            border: "1px solid #ccc"
          }}
        />
        <button
          onClick={handleDrawRoute}
          style={{
            padding: "8px 16px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#0077ff",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          Draw Route
        </button>
      </div>

      {/* Map */}
      <MapContainer
        center={[-41, 174]}
        zoom={6}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {/* Route Line */}
        {coords.length > 1 && (
          <Polyline positions={coords} color="blue" />
        )}

        {/* Markers ONLY for input cities */}
        {cityMarkers.map((pos, i) => (
          <Marker key={i} position={[pos[1], pos[0]]}>
            <Popup>{`City ${i + 1}`}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
