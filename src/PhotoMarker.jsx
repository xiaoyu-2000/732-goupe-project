import React from "react";
import { Marker } from "react-leaflet";
import L from "leaflet";

const createPhotoIcon = (image, count) => {
  const html = `
    <div style="
      position: relative;
      width: 60px;
      height: 60px;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 0 6px rgba(0,0,0,0.5);
      background-color: #fff;
    ">
      <img src="${image}" style="width: 100%; height: 100%; object-fit: cover;" />
      <div style="
        position: absolute;
        bottom: 3px;
        right: 6px;
        font-size: 12px;
        font-weight: bold;
        color: white;
        text-shadow: 0 0 4px black;
      ">${count}</div>
    </div>
  `;

  return L.divIcon({
    html,
    className: "",
    iconSize: [60, 60],
    iconAnchor: [30, 30],
  });
};

export default function PhotoMarker({ lat, lng, image, count }) {
  return <Marker position={[lat, lng]} icon={createPhotoIcon(image, count)} />;
}
