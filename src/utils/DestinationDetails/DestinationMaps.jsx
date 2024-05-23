// components/DestinationMaps.js

"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import L from "leaflet-defaulticon-compatibility";
import { CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const center = [29.7174, -95.4687]; // Coordinates for Gerald D. Hines Waterwall Park

const DestinationMaps = ({ destinationData }) => {
  const city = destinationData?.locations?.city;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <CircularProgress />;

  return (
    <div className="rounded-full overflow-hidden"> {/* Added overflow-hidden */}
      <h1 className="text-2xl font-bold mb-4 text-center">Map of {city}</h1>
      <MapContainer
        style={mapContainerStyle}
        center={center}
        zoom={6}
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={center}>
          <Popup>Gerald D. Hines Waterwall Park</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default DestinationMaps;
