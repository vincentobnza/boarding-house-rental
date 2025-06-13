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
    <section className="w-full min-h-[80vh] flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 p-6 md:p-10 flex justify-center flex-col gap-4">
        <h1 className="text-4xl md:text-6xl font-bold text-zinc-900">
          Smart Search it?
        </h1>
        <p className="text-lg md:text-2xl mb-6 md:mb-10">
          Find a suitable rental house
        </p>
        <div className="flex items-center border rounded-lg px-3 py-2 bg-white shadow-sm max-w-full md:max-w-md">
          <span className="text-gray-400 mr-2">
            <Search size={20} />
          </span>
          <input
            type="text"
            placeholder="Search for a rental house..."
            className="outline-none flex-1 text-base md:text-lg bg-transparent"
          />
          <span className="ml-2 px-2 py-1 rounded bg-gray-100 border text-gray-600 text-xs font-mono">
            ⏎ Enter
          </span>
        </div>
        <p className="mt-5 opacity-50 text-sm md:text-base">
          This app uses your current location to find rental houses
        </p>
      </div>
      <div className="w-full md:w-1/2 flex flex-col min-h-[300px] h-[300px] md:h-auto">
        <div className="flex-1 min-h-0">
          {position && (
            <MapContainer
              center={position}
              zoom={13}
              style={{ height: "100%", width: "100%" }}
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
