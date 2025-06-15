import { Heart, MapPin } from "lucide-react";

export default function TenantDashboard() {
  const rentalHousesData = [
    {
      id: 1,
      name: "Cozy Downtown Apartment",
      price: "1200",
      address: "123 Main St, Anytown",
      image:
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/589669833.jpg?k=081ce18fb721016f0fdb3529fcce6cffe8bdab48d514e09db2a26137ae4dc80b&o=&hp=1",
    },
    {
      id: 2,
      name: "Spacious Suburban House",
      price: "2500",
      address: "456 Oak Ave, Suburbia",
      image:
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/584272485.jpg?k=12b874e1d304c3a07a6823fbdbc4d6098cc2611aaa004e8a7a8465f76cfa4fab&o=&hp=1",
    },
    {
      id: 3,
      name: "Modern Loft with a View",
      price: "1800",
      address: "789 Pine Ln, City Center",
      image:
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/584272509.jpg?k=f9b501b4cbba3a8cf3c924a9dbb4dbc543114104d3f757a92a46da0e7fc9cba6&o=&hp=1",
    },
    {
      id: 4,
      name: "Charming Countryside Cottage",
      price: "950",
      address: "101 Country Rd, Ruralville",
      image:
        "https://mir-s3-cdn-cf.behance.net/project_modules/hd/95d91433833937.5605e86f60b34.JPG",
    },
    {
      id: 5,
      name: "Luxury Beachfront Villa",
      price: "5000",
      address: "202 Ocean Dr, Beachtown",
      image:
        "https://images.adsttc.com/media/images/5ded/b076/3312/fd2a/6a00/032d/newsletter/IMG_0762-0764_ed.jpg?1575858270",
    },
  ];

  return (
    <div className="mx-auto flex w-full max-w-screen-xl flex-grow flex-col items-start justify-start p-8">
      <h1 className="mb-6 text-xl font-medium">
        Rental Houses {""}
        {rentalHousesData.length > 0
          ? `(${rentalHousesData.length})`
          : "(No rental houses available)"}
      </h1>
      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {rentalHousesData.map((house) => (
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
