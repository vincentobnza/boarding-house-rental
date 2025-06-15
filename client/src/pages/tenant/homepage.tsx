import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useCurrentPosition } from "@/hooks/useCurrentPosition";
import { Icon } from "leaflet";
import { FilterSearchModal } from "./filter-search-modal";
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
        <FilterSearchModal />
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
