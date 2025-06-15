import { Button } from "@/components/ui/button";
import {
  Plus,
  MapPin,
  Home,
  Clock,
  MoreVertical,
  Trash,
  List,
  Grid3x2,
  Pencil,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Dashboard() {
  const [viewMode, setViewMode] = useState<"list" | "grid">(() => {
    const storedViewMode = localStorage.getItem("viewMode") as
      | "list"
      | "grid"
      | null;
    return storedViewMode || "list";
  });
  const [filterStatus, setFilterStatus] = useState<
    "reviewed" | "pending" | undefined // Changed type
  >(undefined); // Initialized to undefined
  const isThereAnyListing = true;

  useEffect(() => {
    localStorage.setItem("viewMode", viewMode);
  }, [viewMode]);

  // Filter listings based on selected status
  const filteredListings = dummyListings.filter((listing) => {
    if (filterStatus === "reviewed") return !listing.pending;
    if (filterStatus === "pending") return listing.pending;
    return true; // Handles undefined (all)
  });

  return (
    <div className="w-full max-w-screen-xl mx-auto">
      {isThereAnyListing ? (
        <div className="w-full h-full flex flex-col justify-start items-start p-8">
          <div className="w-full flex justify-between items-center">
            <h1 className="text-2xl font-medium">
              Your Listings
              {filteredListings.length > 0
                ? ` (${filteredListings.length})`
                : ""}
            </h1>
            {/* 
            view mode buttons
             */}
            <div className="flex items-center space-x-4">
              <Select
                value={filterStatus}
                onValueChange={(value) => {
                  if (value === "all") {
                    setFilterStatus(undefined);
                  } else {
                    setFilterStatus(value as "reviewed" | "pending");
                  }
                }}
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Filter by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    <SelectItem value="all">
                      <div className="flex items-center gap-2">
                        <div className="size-2 rounded-full bg-blue-400" />
                        All Listings
                      </div>
                    </SelectItem>{" "}
                    {/* Added All option */}
                    <SelectItem value="reviewed">
                      <div className="flex items-center gap-2">
                        <div className="size-2 rounded-full bg-emerald-400" />
                        Reviewed
                      </div>
                    </SelectItem>
                    <SelectItem value="pending">
                      <div className="flex items-center gap-2">
                        <div className="size-2 rounded-full bg-amber-400" />
                        Pending
                      </div>
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Link to="/landlord/dashboard/listings/new">
                <Button className="shadow-none rounded h-11 bg-zinc-800">
                  <Plus />
                  Create Listing
                </Button>
              </Link>
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
                  <Grid3x2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
          <div className="w-full mt-10">
            <AnimatePresence mode="wait">
              {viewMode === "grid" ? (
                <motion.div
                  key="grid"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -40 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {filteredListings.map((listing, index) => {
                    return (
                      <ListingCard
                        key={index}
                        image={listing.image}
                        location={listing.location}
                        type={listing.type}
                        description={listing.description}
                        pending={listing.pending}
                        viewMode={viewMode}
                      />
                    );
                  })}
                </motion.div>
              ) : (
                <motion.div
                  key="list"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -40 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="flex flex-col gap-6"
                >
                  {filteredListings.map((listing, index) => (
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
                </motion.div>
              )}
            </AnimatePresence>
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

// Rest of the component remains the same...
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
  {
    image:
      "https://mir-s3-cdn-cf.behance.net/projects/404/39dcba181036319.651603b0ec063.png",
    location: "Tagumpay 2, Caminawit San Jose Occidental Mindoro",
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
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-amber-800 bg-amber-100 px-3 py-1.5 rounded border border-amber-200">
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
                <h3 className="text-xl font-semibold text-gray-900 leading-tight line-clamp-1">
                  {location}
                </h3>
                <div className="mt-4 flex items-center gap-2 text-gray-600">
                  <Home className="w-4 h-4" />
                  <span className="text-sm ">{type}</span>
                </div>
              </div>
              <DeleteListingDropdown />
            </div>

            <div className="flex items-start gap-2 text-gray-600 mb-8">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{description}</span>
            </div>

            <Button
              className={`h-11 rounded ${viewMode === "grid" ? "w-full" : ""}`}
              variant="outline"
            >
              <Pencil />
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
