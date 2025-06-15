import { Heart, MapPin } from "lucide-react";
import { houses_data } from "./dummy-data";

export default function NearSchool() {
  return (
    <div className="mx-auto flex w-full max-w-screen-xl flex-grow flex-col items-start justify-start p-8">
      <h1 className="mb-6 text-xl font-medium">
        Near School {""}
        {houses_data.length > 0
          ? `(${houses_data.length})`
          : "(No rental houses available)"}
      </h1>
      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {houses_data.map((house) => (
          <RentalHouseCard key={house.id} house={house} />
        ))}
      </div>
    </div>
  );
}

interface RentalHouse {
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
    <div className="group relative h-90 w-full overflow-hidden rounded-lg bg-black shadow-2xl">
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
      <div className="bg-opacity-50 absolute inset-0 flex flex-col justify-end bg-gradient-to-b from-transparent to-black p-8">
        <h1 className="mb-1 text-xl font-bold text-white">{house.name}</h1>
        <p className="mb-8 text-sm text-gray-300">
          <span>
            <MapPin className="mr-2 mb-0.5 inline size-3.5 text-white" />
          </span>
          {house.address}
        </p>
        <p className="rounded-full p-2 text-sm font-semibold text-white">
          Php. {house.price}/month
        </p>
      </div>
    </div>
  );
};
