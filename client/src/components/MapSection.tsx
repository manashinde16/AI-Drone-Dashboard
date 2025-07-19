"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";

// Fix marker icons (Leaflet quirk)
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x.src,
  iconUrl: markerIcon.src,
  shadowUrl: markerShadow.src,
});

interface Violation {
  id: string;
  type: string;
  timestamp: string;
  latitude: number;
  longitude: number;
}

export default function MapSection() {
  const [violations, setViolations] = useState<Violation[]>([]);

  useEffect(() => {
    // TODO: Replace with actual API call
    setViolations([
      {
        id: "v1",
        type: "Restricted Area Entry",
        timestamp: "2025-07-15T14:30:00Z",
        latitude: 21.1458,
        longitude: 79.0882,
      },
      {
        id: "v2",
        type: "No-Fly Zone",
        timestamp: "2025-07-16T10:00:00Z",
        latitude: 19.076,
        longitude: 72.8777,
      },
    ]);
  }, []);

  return (
    <div className="w-full h-[500px] rounded-lg overflow-hidden shadow-md border border-white/20">
      <MapContainer
        center={[20.5937, 78.9629]}
        zoom={5}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='© <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        />

        {violations.map((violation) => (
          <Marker
            key={violation.id}
            position={[violation.latitude, violation.longitude]}
          >
            <Popup>
              <strong>{violation.type}</strong>
              <br />
              Time: {new Date(violation.timestamp).toLocaleString()}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
