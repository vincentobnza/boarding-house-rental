import { Search } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useCurrentPosition } from "@/hooks/useCurrentPosition";
import { Icon } from "leaflet";

export default function Homepage() {
  const position = useCurrentPosition();

  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/128/3595/3595587.png",
    iconSize: [50, 50],
    iconAnchor: [16, 32],
  });

  return (
    <section className="w-full min-h-[75vh] flex">
      <div className="w-1/2 p-10 flex justify-center flex-col gap-4">
        <h1 className="text-6xl font-bold text-orange-400">Smart Search it?</h1>
        <p className="text-2xl mb-10">Find a suitable rental house</p>
        <div className="flex items-center border rounded-lg px-3 py-2 bg-white shadow-sm max-w-md">
          <span className="text-gray-400 mr-2">
            <Search size={20} />
          </span>
          <input
            type="text"
            placeholder="Search for a rental house..."
            className="outline-none flex-1 text-lg bg-transparent"
          />
        </div>
      </div>
      <div className="w-1/2 p-10 flex flex-col">
        <div className="flex-1 min-h-0">
          {position && (
            <MapContainer
              center={position}
              zoom={13}
              style={{ height: "100%", width: "100%" }}
              className="rounded-lg shadow-lg"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker
                position={[position[0] + 0.01, position[1] + 0.01]}
                icon={customIcon}
              >
                <Popup>Dummy Rental House</Popup>
              </Marker>
              {[...Array(5)].map((_, i) => (
                <Marker
                  key={i}
                  position={[
                    position[0] + (Math.random() - 0.5) * 0.04,
                    position[1] + (Math.random() - 0.5) * 0.02,
                  ]}
                  icon={customIcon}
                >
                  <Popup>Rental House #{i + 1}</Popup>
                </Marker>
              ))}
            </MapContainer>
          )}
        </div>
      </div>
    </section>
  );
}
