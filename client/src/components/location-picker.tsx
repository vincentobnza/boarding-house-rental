import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";

const DEFAULT_POSITION: [number, number] = [13.0731, 121.4106]; // fallback if geolocation fails

export default function LocationPicker({
  value,
  onChange,
}: {
  value?: [number, number];
  onChange?: (position: [number, number]) => void;
}) {
  const [position, setPosition] = useState<[number, number] | null>(null);

  useEffect(() => {
    if (!position) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const coords: [number, number] = [
              pos.coords.latitude,
              pos.coords.longitude,
            ];
            setPosition(coords);
            if (onChange) onChange(coords);
          },
          () => {
            setPosition(DEFAULT_POSITION);
            if (onChange) onChange(DEFAULT_POSITION);
          }
        );
      } else {
        setPosition(DEFAULT_POSITION);
        if (onChange) onChange(DEFAULT_POSITION);
      }
    }
  }, [onChange, position]);

  useEffect(() => {
    if (
      value &&
      (!position || value[0] !== position[0] || value[1] !== position[1])
    ) {
      setPosition(value);
    }
  }, [value, position]);

  function LocationMarker() {
    useMapEvents({
      click(e) {
        setPosition([e.latlng.lat, e.latlng.lng]);
        if (onChange) onChange([e.latlng.lat, e.latlng.lng]);
      },
    });
    return position ? <Marker position={position} /> : null;
  }

  return position ? (
    <MapContainer
      center={position}
      zoom={15}
      scrollWheelZoom={true}
      style={{ height: "300px", width: "100%", borderRadius: "12px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker />
    </MapContainer>
  ) : (
    <div>Loading map...</div>
  );
}
