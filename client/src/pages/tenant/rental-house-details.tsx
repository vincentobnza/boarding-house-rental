import { useParams, useNavigate } from "react-router-dom";
import { houses_data } from "./dummy-data";
import React from "react";
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

interface PropertyDetail {
  icon: React.ElementType;
  label: string;
  value: string | number;
  display: (v: string | number) => string;
}

const propertyDetails: PropertyDetail[] = [
  {
    icon: Home,
    label: "type",
    value: "Studio Apartment",
    display: (v) => String(v),
  },
  {
    icon: Bed,
    label: "beds",
    value: 2,
    display: (v) => `${v} Beds`,
  },
  {
    icon: Bath,
    label: "baths",
    value: 1,
    display: (v) => `${v} Bath`,
  },
  {
    icon: DoorClosed,
    label: "area",
    value: "75 sqm",
    display: (v) => String(v),
  },
];

interface Amenity {
  label: string;
  value: string | boolean;
  color: string;
  display: (v?: string | boolean) => string;
}

const amenities: Amenity[] = [
  {
    label: "Furnished",
    value: "Yes",
    color: "bg-green-500",
    display: (v) => `Furnished: ${v}`,
  },
  {
    label: "Air Conditioning",
    value: true,
    color: "bg-green-500",
    display: () => "Air Conditioning",
  },
  {
    label: "Wi-Fi Included",
    value: true,
    color: "bg-green-500",
    display: () => "Wi-Fi Included",
  },
  {
    label: "Kitchen",
    value: true,
    color: "bg-green-500",
    display: () => "Kitchen",
  },
  {
    label: "Pets",
    value: "No",
    color: "bg-red-500",
    display: (v) => `Pets: ${v}`,
  },
  {
    label: "Parking Available",
    value: true,
    color: "bg-green-500",
    display: () => "Parking Available",
  },
];

interface LandlordDetail {
  icon: React.ElementType;
  label: string;
  value: string;
  display: (v: string) => string;
}

const landlordDetails: LandlordDetail[] = [
  {
    icon: Calendar,
    label: "Available",
    value: "Immediately",
    display: (v) => `Available: ${v}`,
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+63 912 345 6789",
    display: (v) => v,
  },
  {
    icon: Mail,
    label: "Email",
    value: "john.owner@example.com",
    display: (v) => v,
  },
];

const description =
  "This cozy apartment offers comfort and convenience at an affordable price. Located in a quiet neighborhood with easy access to public transportation, shopping centers, and restaurants. The property features modern amenities, including air conditioning, high-speed internet, and 24/7 security.";

export default function RentalHouseDetails() {
  const { rentalHouseId } = useParams<{ rentalHouseId: string }>();
  const navigate = useNavigate();

  if (!rentalHouseId) return null;

  const house = houses_data.find(
    (house) => house.id === parseInt(rentalHouseId),
  );

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

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-8">
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
          <div>
            <h1 className="text-3xl font-bold">{house.name}</h1>
            <p className="mt-2 flex items-center text-gray-600">
              <MapPin className="mr-2 h-4 w-4" /> {house.address}
            </p>
            <h2 className="mt-4 text-2xl font-semibold">
              ₱{house.price} / month
            </h2>
          </div>

          <div className="aspect-video w-full overflow-hidden rounded-lg">
            <img
              src={house.image}
              alt={house.name}
              className="h-full w-full object-cover"
            />
          </div>

          <Card className="p-6">
            <h3 className="mb-4 text-xl font-semibold">Property Details</h3>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {propertyDetails.map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col items-center rounded-lg bg-zinc-50 p-3"
                >
                  <item.icon className="mb-2 text-gray-600" />
                  <p className="text-sm font-medium">
                    {item.display(item.value)}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="mb-4 text-xl font-semibold">Description</h3>
            <p className="leading-relaxed text-gray-700">{description}</p>
          </Card>

          <Card className="p-6">
            <h3 className="mb-4 text-xl font-semibold">Amenities</h3>{" "}
            <div className="grid grid-cols-2 gap-3">
              {amenities.map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${item.color}`}></div>
                  <span>
                    {typeof item.value === "boolean"
                      ? item.display()
                      : item.display(item.value)}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar - right 1/3 */}
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="mb-4 text-xl font-semibold">Contact Landlord</h3>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200">
                <User className="h-6 w-6 text-gray-600" />
              </div>
              <div>
                <p className="font-medium">John Owner</p>
                <p className="text-sm text-gray-600">Property Owner</p>
              </div>
            </div>
            <div className="mt-4 space-y-4">
              {landlordDetails.map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <item.icon className="h-4 w-4 text-gray-600" />
                  <p className="text-sm">{item.display(item.value)}</p>
                </div>
              ))}
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

          <Card className="p-6">
            <h3 className="mb-2 text-xl font-semibold">Location</h3>
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
