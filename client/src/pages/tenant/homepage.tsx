import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useCurrentPosition } from "@/hooks/useCurrentPosition";
import { Icon } from "leaflet";
import { FilterSearchModal } from "@/components/modals/filter-search-modal";
export default function Homepage() {
  const position = useCurrentPosition();
  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/128/3595/3595587.png",
    iconSize: [50, 50],
    iconAnchor: [16, 32],
  });
  return (
    <section className="flex min-h-[80vh] w-full flex-col md:flex-row">
      <div className="flex w-full flex-col justify-center gap-4 p-6 md:w-1/2 md:p-10">
        <h1 className="text-4xl font-bold text-zinc-900 md:text-6xl">
          Smart Search it?
        </h1>
        <p className="mb-6 text-lg md:mb-10 md:text-2xl">
          Find a suitable rental house
        </p>
        <FilterSearchModal />
        <p className="mt-5 text-sm opacity-50 md:text-base">
          This app uses your current location to find rental houses
        </p>
      </div>
      <div className="flex h-[300px] min-h-[300px] w-full flex-col md:h-auto md:w-1/2">
        <div className="min-h-0 flex-1">
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
