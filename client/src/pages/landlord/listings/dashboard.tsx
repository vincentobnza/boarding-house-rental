import { Button } from "@/components/ui/button";
import {
  Plus,
  SquarePen,
  MapPin,
  Home,
  Clock,
  MoreVertical,
  Trash,
  List,
  Grid3x3,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

export default function Dashboard() {
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const isThereAnyListing = true;
  return (
    <div className="w-full max-w-screen-xl mx-auto">
      {isThereAnyListing ? (
        <div className="w-full h-full flex flex-col justify-start items-start p-8">
          <div className="w-full flex justify-between items-center">
            <h1 className="text-2xl font-medium">Your Listings</h1>

            {/* 
            view mode buttons
             */}
            <div className="p-1 border border-zinc-200 flex items-center gap-1 rounded-lg bg-white">
              <Button
                size="icon"
                className="rounded shadow-none outline-none"
                variant={viewMode === "list" ? "secondary" : "ghost"}
                onClick={() => setViewMode("list")}
              >
                <List className="w-4 h-4" />
              </Button>
              <Button
                size="icon"
                className="rounded shadow-none outline-none"
                variant={viewMode === "grid" ? "secondary" : "ghost"}
                onClick={() => setViewMode("grid")}
              >
                <Grid3x3 className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div
            className={`w-full mt-10 transition-all duration-500 ${
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "flex flex-col gap-6"
            }`}
            key={viewMode}
            style={{
              animation: "fadeIn 0.5s",
            }}
          >
            {dummyListings.map((listing, index) => (
              <ListingCard
                key={index}
                image={listing.image}
                location={listing.location}
                type={listing.type}
                description={listing.description}
                pending={listing.pending}
                viewMode={viewMode}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col justify-center items-center">
          <img
            src="https://cdn-icons-png.flaticon.com/128/7486/7486754.png"
            alt="No Listings"
            className="size-24 mb-4"
          />
          <h1 className="text-md">
            Looks like you don't have any listings yet.
          </h1>

          <Button
            className="mt-12 h-10 shadow-none rounded"
            size="sm"
            variant="outline"
          >
            <Plus />
            Create Listing
          </Button>
        </div>
      )}
    </div>
  );
}

const dummyListings = [
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzZTt1TFBPwM_CJpJspHT1R5FlFm-fSD4d4A&s",
    location: "Amethyst St., Guillero San Jose Occidental Mindoro",
    type: "Studio Apartment",
    description: "Near school of OMSC",
    pending: false,
  },
  {
    image:
      "https://i.pinimg.com/236x/62/c9/84/62c984784dba3437226cadc8e6f62306.jpg",
    location: "Rizal St., Marzan San Jose Occidental Mindoro",
    type: "Studio Apartment",
    description: "Near school of OMSC",
    pending: true,
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMfm1fVmHtOxIeBT9bgGlWjR7Ci59lps3F8A&s",
    location: "Bonifacio Global City, Taguig",
    type: "Studio Apartment",
    description: "Near school of OMSC",
    pending: true,
  },
];

type ListingCardProps = {
  image: string;
  location: string;
  type: string;
  description: string;
  pending?: boolean;
  viewMode?: "list" | "grid";
};

const ListingCard = ({
  image,
  location,
  type,
  description,
  pending = false,
  viewMode = "list",
}: ListingCardProps) => {
  return (
    <div
      className={`bg-white rounded-lg border border-zinc-200 overflow-hidden group transition-all duration-500 ${
        viewMode === "grid" ? "w-full" : "w-full"
      }`}
      style={{
        boxShadow:
          viewMode === "grid" ? "0 4px 24px 0 rgba(0,0,0,0.04)" : undefined,
        transform: viewMode === "grid" ? undefined : undefined,
      }}
    >
      <div className={`${viewMode === "grid" ? "" : "flex gap-0"}`}>
        <div
          className={`relative ${
            viewMode === "grid" ? "w-full h-48" : "w-80 h-56 flex-shrink-0"
          } overflow-hidden`}
        >
          <img
            src={image}
            alt={location}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          {pending && (
            <div className="absolute top-4 left-4 z-10">
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-amber-800 bg-amber-100 px-3 py-1.5 rounded-full border border-amber-200">
                <Clock className="w-3 h-3" />
                Pending Review
              </span>
            </div>
          )}
          {pending && <div className="absolute inset-0 bg-white/80"></div>}
        </div>
        <div
          className={`flex-1 p-6 flex flex-col justify-between ${
            viewMode === "grid" ? "" : ""
          }`}
        >
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h3 className="text-xl font-semibold text-gray-900 leading-tight">
                  {location}
                </h3>
                <div className="mt-4 flex items-center gap-2 text-gray-600">
                  <Home className="w-4 h-4" />
                  <span className="text-sm ">{type}</span>
                </div>
              </div>
              <DeleteListingDropdown />
            </div>

            <div className="flex items-start gap-2 text-gray-600">
              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <p className="text-sm leading-relaxed">{description}</p>
            </div>
          </div>

          <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
            <div className="text-sm text-gray-500">
              Last updated: 2 days ago
            </div>
            <Button
              size="sm"
              variant="outline"
              className="h-9 px-4 rounded font-medium hover:bg-gray-50 border-gray-200"
            >
              <SquarePen className="w-4 h-4 mr-2" />
              Edit Property
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const DeleteListingDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 text-gray-700 hover:text-gray-900"
        >
          <MoreVertical className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <Button variant="ghost" size="sm" className="w-full rounded">
          <Trash />
          Delete Apartment
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
