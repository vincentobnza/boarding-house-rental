import { Heart, MapPin } from "lucide-react";
import { houses_data } from "./dummy-data";
import { Link, useLocation } from "react-router-dom";
import { useMemo } from "react";

export interface RentalHouse {
  id: number;
  name: string;
  price: string;
  address: string;
  image: string;
}

interface RentalHouseCardProps {
  house: RentalHouse;
}

const RentalHouseCard = ({ house }: RentalHouseCardProps) => {
  return (
    <Link to={`/tenant/rental-house/${house.id}`} className="block">
      <div className="group relative h-90 w-full cursor-pointer overflow-hidden rounded bg-zinc-700 transition-transform duration-300 hover:scale-[1.02]">
        <img
          src={house.image}
          alt="image"
          className="h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-125"
        />

        {/* favorite icon */}
        <div className="absolute top-2 right-2 z-10 rounded bg-zinc-900/20 p-2 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
          <Heart className="h-5 w-5 text-white" />
        </div>
        {/* overlay */}
        <div className="bg-opacity-50 absolute inset-0 flex flex-col justify-end bg-gradient-to-b from-transparent to-zinc-700 p-8">
          <h1 className="mb-1 text-xl font-bold text-white">{house.name}</h1>
          <p className="mb-8 text-sm text-zinc-300">
            <span>
              <MapPin className="mr-2 mb-0.5 inline size-3.5 text-white" />
            </span>
            {house.address}
          </p>
          <p className="rounded-full text-lg font-semibold text-white group-hover:underline">
            Php. {house.price}/month
          </p>
        </div>
      </div>
    </Link>
  );
};

export default function RentalPage() {
  const location = useLocation();
  const pathname = location.pathname;

  // Extract type from pathname
  const getTypeFromPath = () => {
    if (pathname.includes("boarding-house")) return "boarding-house";
    if (pathname.includes("near-school")) return "near-school";
    return "rental-house"; // default
  };

  const type = getTypeFromPath();

  const pageConfig = useMemo(() => {
    switch (type) {
      case "boarding-house":
        return {
          title: "Boarding House", // Exact match with navigation
          description: "Find comfortable boarding houses for your stay",
        };
      case "near-school":
        return {
          title: "Near School", // Exact match with navigation
          description: "Properties located near educational institutions",
        };
      case "rental-house":
      default:
        return {
          title: "Rental House", // Exact match with navigation
          description: "Browse available rental properties",
        };
    }
  }, [type]);

  return (
    <div className="mx-auto flex w-full max-w-screen-xl flex-grow flex-col items-start justify-start p-8">
      <div className="mb-12 flex w-full items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-2xl font-medium">{pageConfig.title}</h1>
          <p className="mt-1 text-zinc-500">{pageConfig.description}</p>
        </div>
        <div className="flex items-center space-x-3 rounded border border-zinc-200 bg-zinc-50 px-3 py-1 font-semibold">
          <div
            className={`size-2 rounded-full ${houses_data.length > 0 ? "bg-green-500" : "bg-orange-500"}`}
          />
          <p className="text-sm">
            {houses_data.length > 0
              ? `${houses_data.length} available properties`
              : "No properties available"}
          </p>
        </div>
      </div>
      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {houses_data.map((house) => (
          <RentalHouseCard key={house.id} house={house} />
        ))}
      </div>
    </div>
  );
}
