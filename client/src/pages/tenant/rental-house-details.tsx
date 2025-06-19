import { useParams, useNavigate } from "react-router-dom";
import { houses_data } from "./dummy-data";
import {
  MapPin,
  ArrowLeft,
  Home,
  Bed,
  Bath,
  DoorClosed,
  User,
  Calendar,
  Phone,
  Mail,
  Heart,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";

export default function RentalHouseDetails() {
  const { rentalHouseId } = useParams<{ rentalHouseId: string }>();
  const navigate = useNavigate();

  if (!rentalHouseId) {
    return null;
  }

  // Find the rental house by ID
  const house = houses_data.find(
    (house) => house.id === parseInt(rentalHouseId),
  );

  // If house not found
  if (!house) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center">
        <h1 className="mb-4 text-2xl font-semibold">House not found</h1>
        <p className="mb-6 text-gray-600">
          The rental house you're looking for doesn't exist.
        </p>
        <Button onClick={() => navigate("/tenant/rental-house")}>
          Go back to Rental Houses
        </Button>
      </div>
    );
  }

  // Additional details for the house (simulated since they're not in the original data)
  const details = {
    type: "Studio Apartment",
    beds: 2,
    baths: 1,
    area: "75 sqm",
    furnished: "Yes",
    pets: "No",
    available: "Immediately",
    landlord: "John Owner",
    phone: "+63 912 345 6789",
    email: "john.owner@example.com",
    description:
      "This cozy apartment offers comfort and convenience at an affordable price. Located in a quiet neighborhood with easy access to public transportation, shopping centers, and restaurants. The property features modern amenities, including air conditioning, high-speed internet, and 24/7 security.",
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-8">
      {/* Back button */}
      <Button
        variant="ghost"
        className="mb-6 flex items-center gap-2 rounded"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="h-4 w-4" /> Back to listings
      </Button>

      <div className="grid gap-8 md:grid-cols-3">
        {/* Main content - left 2/3 */}
        <div className="space-y-6 md:col-span-2">
          {/* Title and basic info */}
          <div>
            <h1 className="text-3xl font-bold">{house.name}</h1>
            <p className="mt-2 flex items-center text-gray-600">
              <MapPin className="mr-2 h-4 w-4" /> {house.address}
            </p>
            <h2 className="mt-4 text-2xl font-semibold">
              ₱{house.price} / month
            </h2>
          </div>

          {/* Main image */}
          <div className="aspect-video w-full overflow-hidden rounded-lg">
            <img
              src={house.image}
              alt={house.name}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Property details */}
          <Card className="p-6">
            <h3 className="mb-4 text-xl font-semibold">Property Details</h3>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <div className="flex flex-col items-center rounded-lg bg-gray-50 p-3">
                <Home className="mb-2 text-gray-600" />
                <p className="text-sm font-medium">{details.type}</p>
              </div>
              <div className="flex flex-col items-center rounded-lg bg-gray-50 p-3">
                <Bed className="mb-2 text-gray-600" />
                <p className="text-sm font-medium">{details.beds} Beds</p>
              </div>
              <div className="flex flex-col items-center rounded-lg bg-gray-50 p-3">
                <Bath className="mb-2 text-gray-600" />
                <p className="text-sm font-medium">{details.baths} Bath</p>
              </div>
              <div className="flex flex-col items-center rounded-lg bg-gray-50 p-3">
                <DoorClosed className="mb-2 text-gray-600" />
                <p className="text-sm font-medium">{details.area}</p>
              </div>
            </div>
          </Card>

          {/* Description */}
          <Card className="p-6">
            <h3 className="mb-4 text-xl font-semibold">Description</h3>
            <p className="leading-relaxed text-gray-700">
              {details.description}
            </p>
          </Card>

          {/* Amenities */}
          <Card className="p-6">
            <h3 className="mb-4 text-xl font-semibold">Amenities</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span>Furnished: {details.furnished}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span>Air Conditioning</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span>Wi-Fi Included</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span>Kitchen</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-red-500"></div>
                <span>Pets: {details.pets}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span>Parking Available</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar - right 1/3 */}
        <div className="space-y-6">
          {/* Contact landlord card */}
          <Card className="p-6">
            <h3 className="mb-4 text-xl font-semibold">Contact Landlord</h3>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200">
                <User className="h-6 w-6 text-gray-600" />
              </div>
              <div>
                <p className="font-medium">{details.landlord}</p>
                <p className="text-sm text-gray-600">Property Owner</p>
              </div>
            </div>
            <div className="mt-4 space-y-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-600" />
                <p className="text-sm">Available: {details.available}</p>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-600" />
                <p className="text-sm">{details.phone}</p>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-600" />
                <p className="text-sm">{details.email}</p>
              </div>
            </div>
            <div className="mt-6 space-y-2">
              <Button className="h-12 w-full rounded bg-zinc-800 shadow-none">
                Send Message
              </Button>
              <Button
                variant="outline"
                className="flex h-12 w-full items-center justify-center gap-2 rounded"
              >
                <Heart className="h-4 w-4" /> Save to Bookmarks
              </Button>
            </div>
          </Card>

          {/* Map (just a placeholder) */}
          <Card className="p-6">
            <h3 className="mb-4 text-xl font-semibold">Location</h3>
            <div className="flex aspect-square w-full items-center justify-center rounded-lg bg-gray-200">
              <p className="text-gray-500">Map placeholder</p>
            </div>
            <p className="mt-3 text-sm text-gray-600">{house.address}</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
