import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Building, Locate, Search } from "lucide-react";
import { Suspense, useEffect, useRef, useState } from "react";
import LocationPicker from "@/components/location-picker";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type NominamResult = {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
  type: string;
};

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search";

export default function NewListing() {
  return (
    <div className="w-full max-w-screen-lg mx-auto flex flex-col items-start justify-start p-8">
      <div className="ml-2 flex flex-col gap-2">
        <h1 className="text-2xl font-bold">
          <span>
            <Building className="size-6 inline mr-2 mb-1 text-green-700" />
          </span>
          New Apartment
        </h1>
        <p>Create a new apartment listing to attract potential tenants.</p>
      </div>

      <div className="mt-10 w-full max-w-screen-lg mx-auto space-y-6">
        <BasicInformation />
        <LocationInformation />
      </div>
    </div>
  );
}

const BasicInformation = () => {
  return (
    <div className="w-full p-6 border border-zinc-200 rounded-xl">
      <p>
        Basic Information <span className="ml-1 text-red-500">*</span>
      </p>

      <form className="mt-8 w-full grid md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="title">Title</label>
          <Input
            placeholder="Enter a catchy title for your listing"
            id="title"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="title">Apartment Type</label>
          <Input placeholder="e.g., Studio Type, Bed Spacer, ..." id="title" />
        </div>
        <div className="flex flex-col gap-2 justify-start items-start">
          <label htmlFor="title">Status</label>
          <Select>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Status</SelectLabel>
                <SelectItem value="available">
                  <div className="size-2 rounded-full bg-green-600" />
                  Available
                </SelectItem>
                <SelectItem value="unavailable">
                  <div className="size-2 rounded-full bg-orange-600" />
                  Occupied
                </SelectItem>
                <SelectItem value="pending">
                  <div className="size-2 rounded-full bg-red-600" />
                  Under Maintenance
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </form>
    </div>
  );
};

const LocationInformation = () => {
  const [latlng, setLatlng] = useState<[number, number] | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<NominamResult[]>([]);
  const [selectedStreet, setSelectedStreet] = useState<string | null>(null);
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (search.length < 3) {
      setSearchResults([]);
      return;
    }
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => {
      fetch(
        `${NOMINATIM_BASE_URL}?q=${encodeURIComponent(
          search + ", San Jose, Occidental Mindoro, Philippines"
        )}&format=json&addressdetails=1&limit=8&accept-language=en&extratags=1`
      )
        .then((res) => res.json())
        .then((data) => setSearchResults(data));
    }, 400);
  }, [search]);

  const setCurrentLocation = (position: GeolocationPosition) => {
    const { latitude, longitude } = position.coords;
    setLatlng([latitude, longitude]);
  };

  const handleGetCurrentLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(setCurrentLocation, (error) => {
        console.error("Error getting location:", error);
      });
      toast.success("Location is set to your current position.");
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const truncateText = (text: string, maxLength: number = 40) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <div className="w-full p-6 border border-zinc-200 rounded-xl">
      <p>
        Location Information <span className="ml-1 text-red-500">*</span>
      </p>
      <form className="mt-8 w-full grid md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="title">Address 1</label>
          <Input placeholder="Street, barangay" id="title" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="title">Address line 2</label>
          <Input
            placeholder="(Optional), Apartment complex, building"
            id="title"
          />
        </div>
        <div className="flex flex-col gap-2 justify-start items-start md:col-span-2">
          <div className="w-full flex flex-col justify-start items-start gap-4">
            <label htmlFor="latlng">Set Latitude / Longitude</label>

            <div className="w-full flex justify-between items-center">
              <Button
                className="rounded h-11 text-zinc-600"
                variant="outline"
                onClick={(e: React.FormEvent) => {
                  e.preventDefault();
                  handleGetCurrentLocation();
                }}
              >
                <Locate />
                Set to your current position
              </Button>

              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[400px] h-11 rounded justify-between"
                  >
                    <span className="truncate pr-2 text-zinc-500">
                      {selectedStreet
                        ? truncateText(selectedStreet)
                        : "Search Streets"}
                    </span>
                    <Search className="opacity-50 flex-shrink-0" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[400px] p-0 z-[9999] rounded">
                  <Command>
                    <CommandInput
                      placeholder="Search places in San Jose, Occidental Mindoro..."
                      className="h-9"
                      value={search}
                      onValueChange={setSearch}
                    />
                    <CommandList>
                      <CommandEmpty>No Streets found.</CommandEmpty>
                      <CommandGroup>
                        {searchResults.map((result) => (
                          <CommandItem
                            key={result.place_id}
                            value={result.display_name}
                            onSelect={() => {
                              setSelectedStreet(result.display_name);
                              setLatlng([
                                parseFloat(result.lat),
                                parseFloat(result.lon),
                              ]);
                              setOpen(false);
                            }}
                          >
                            <div>
                              <div className="font-medium">
                                {result.display_name}
                              </div>
                              <div className="text-xs text-gray-500">
                                {result.type &&
                                  result.type.charAt(0).toUpperCase() +
                                    result.type.slice(1)}
                              </div>
                            </div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="w-full mt-3">
            <Suspense fallback={<div>Loading map...</div>}>
              <LocationPicker value={latlng} onChange={setLatlng} />
            </Suspense>
          </div>
          {latlng && (
            <div className="mt-2 text-sm text-gray-600">
              Selected: {latlng[0].toFixed(6)}, {latlng[1].toFixed(6)}
            </div>
          )}

          <div className="mt-4 p-4 bg-amber-50 border border-amber-400 rounded">
            <p className="text-sm text-amber-800">
              <strong>Note:</strong> Please ensure the location is accurate as
              it will be used to help tenants find your property. Double-check
              the pin placement on the map matches your actual address.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};
