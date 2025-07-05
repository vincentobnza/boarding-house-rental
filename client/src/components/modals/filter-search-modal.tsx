import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

type NominatimResult = {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
  type: string;
};

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search";

export function FilterSearchModal() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<NominatimResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] =
    useState<NominatimResult | null>(null);
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);

  // Initialize filter values from URL search params
  const [minPrice, setMinPrice] = useState<string>(
    searchParams.get("minPrice") || "",
  );
  const [maxPrice, setMaxPrice] = useState<string>(
    searchParams.get("maxPrice") || "",
  );
  const [facilityType, setFacilityType] = useState<string>(
    searchParams.get("facilityType") || "",
  );
  const [bedsAvailable, setBedsAvailable] = useState<string>(
    searchParams.get("bedsAvailable") || "",
  );

  // Update URL when filter values change
  useEffect(() => {
    const params = new URLSearchParams();

    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    if (facilityType) params.set("facilityType", facilityType);
    if (bedsAvailable) params.set("bedsAvailable", bedsAvailable);
    if (selectedLocation) {
      params.set("location", selectedLocation.display_name);
      params.set("lat", selectedLocation.lat);
      params.set("lon", selectedLocation.lon);
    }

    setSearchParams(params, { replace: true });
  }, [
    minPrice,
    maxPrice,
    facilityType,
    bedsAvailable,
    selectedLocation,
    setSearchParams,
  ]);

  // Initialize location from URL params on component mount
  useEffect(() => {
    const locationFromUrl = searchParams.get("location");
    const latFromUrl = searchParams.get("lat");
    const lonFromUrl = searchParams.get("lon");

    if (locationFromUrl && latFromUrl && lonFromUrl) {
      const locationFromParams: NominatimResult = {
        place_id: 0, // We don't have this from URL, but it's not critical
        display_name: locationFromUrl,
        lat: latFromUrl,
        lon: lonFromUrl,
        type: "saved", // Indicate this came from URL
      };
      setSelectedLocation(locationFromParams);
      setSearchQuery(locationFromUrl);
    }
  }, [searchParams]); // Run when searchParams change

  useEffect(() => {
    // If the current searchQuery is the name of the selectedLocation,
    // it means the user has just selected it. Don't start a new search.
    if (selectedLocation && searchQuery === selectedLocation.display_name) {
      // Ensure loading is off and results are clear.
      if (isLoading) setIsLoading(false);
      // searchResults should be empty from handleSelectLocation, but clear if not.
      if (searchResults.length > 0) setSearchResults([]);
      // timeout should be cleared by handleSelectLocation, but clear if not.
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
        searchTimeout.current = null;
      }
      return;
    }

    if (searchQuery.length < 3) {
      setSearchResults([]);
      if (isLoading) setIsLoading(false); // Stop loading if query is too short
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
        searchTimeout.current = null;
      }
      return;
    }

    // Debounce: Clear previous timeout
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    setIsLoading(true); // Start loading for a new user-typed query
    searchTimeout.current = setTimeout(() => {
      const params = new URLSearchParams({
        q: searchQuery + ", San Jose, Occidental Mindoro, Philippines",
        format: "json",
        addressdetails: "1",
        limit: "5", // Limit results to 5
        "accept-language": "en",
      });

      fetch(`${NOMINATIM_BASE_URL}?${params.toString()}`)
        .then((response) => response.json())
        .then((data) => {
          setSearchResults(data as NominatimResult[]);
        })
        .catch((error) => {
          console.error("Error fetching from Nominatim:", error);
          setSearchResults([]); // Clear results on error
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, 500); // Debounce for 500ms

    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
    };
  }, [searchQuery, selectedLocation, isLoading, searchResults.length]); // Dependencies updated

  const handleSelectLocation = (location: NominatimResult) => {
    setIsLoading(false); // Explicitly stop loading indicator
    setSearchResults([]); // Clear the suggestions list

    // Cancel any pending API call
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
      searchTimeout.current = null;
    }

    setSelectedLocation(location); // Mark this location as selected
    setSearchQuery(location.display_name); // Update the input field with the selected name

    console.log("Selected location:", location);
    // You might want to close the dialog or pass the location to a parent component here
  };

  const handleSearch = () => {
    // Create search parameters object
    const searchFilters = {
      location: selectedLocation?.display_name || searchQuery,
      lat: selectedLocation?.lat || "",
      lon: selectedLocation?.lon || "",
      minPrice: minPrice || "",
      maxPrice: maxPrice || "",
      facilityType: facilityType || "",
      bedsAvailable: bedsAvailable || "",
    };

    // Remove empty values
    const filteredParams = Object.fromEntries(
      Object.entries(searchFilters).filter(([, value]) => value !== ""),
    );

    console.log("Search triggered with:", filteredParams);

    // Update URL with search parameters
    const params = new URLSearchParams();
    Object.entries(filteredParams).forEach(([key, value]) => {
      params.set(key, value);
    });
    setSearchParams(params);

    // Here you would typically make an API call to your backend
    // with these filter parameters from the URL search params
  };

  const handleClearFilters = () => {
    setMinPrice("");
    setMaxPrice("");
    setFacilityType("");
    setBedsAvailable("");
    setSelectedLocation(null);
    setSearchQuery("");
    setSearchParams(new URLSearchParams()); // Clear all search params
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex max-w-full cursor-pointer items-center rounded-lg border bg-white px-3 py-2 shadow-sm transition-shadow hover:shadow-md md:max-w-md">
          <span className="mr-2 text-gray-400">
            <Search size={20} />
          </span>
          <div className="md:text-md flex-1 bg-transparent text-base text-gray-500 outline-none">
            Search for a rental house...
          </div>
          <span className="ml-2 rounded border bg-gray-100 px-2 py-1 font-mono text-xs text-gray-600">
            crtl f
          </span>
        </div>
      </DialogTrigger>
      <DialogContent className="z-[999999] flex min-h-[80vh] flex-col overflow-y-auto sm:max-w-2xl">
        <DialogHeader className="sticky top-0 z-10 mb-4 flex flex-col items-center border-b border-zinc-200 pb-4 text-center">
          <DialogTitle className="text-3xl">Filter Search</DialogTitle>
          <DialogDescription className="text-md">
            Tell us about your ideal rental/boarding house.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-grow px-4 py-2">
          <Command className="rounded-lg border">
            <CommandInput
              placeholder="Search for a location in San Jose, Occidental Mindoro..."
              value={searchQuery}
              onValueChange={setSearchQuery}
            />
            {(searchResults.length > 0 || isLoading) && (
              <CommandList>
                {isLoading && <CommandEmpty>Loading...</CommandEmpty>}
                {!isLoading &&
                  searchResults.length === 0 &&
                  searchQuery.length >= 3 && (
                    <CommandEmpty>No results found.</CommandEmpty>
                  )}
                <CommandGroup heading="Suggestions">
                  {searchResults.map((result) => (
                    <CommandItem
                      key={result.place_id}
                      value={result.display_name}
                      onSelect={() => handleSelectLocation(result)}
                      className="cursor-pointer"
                    >
                      <div>
                        <div className="font-medium">{result.display_name}</div>
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
            )}
          </Command>
        </div>

        {/* Filter options */}
        <div className="my-6 space-y-6 px-4">
          {/* Price Range */}
          <div>
            <Label className="text-md font-semibold">Price Range (PHP)</Label>
            <div className="mt-2 grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="min-price" className="text-sm text-gray-600">
                  Min Price
                </Label>
                <Input
                  id="min-price"
                  type="number"
                  placeholder="e.g., 1000"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="max-price" className="text-sm text-gray-600">
                  Max Price
                </Label>
                <Input
                  id="max-price"
                  type="number"
                  placeholder="e.g., 5000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* Facility Type */}
          <div>
            <Label htmlFor="facility-type" className="text-md font-semibold">
              Type of Facility
            </Label>
            <Select value={facilityType} onValueChange={setFacilityType}>
              <SelectTrigger id="facility-type" className="mt-2 w-full">
                <SelectValue placeholder="Select facility type" />
              </SelectTrigger>
              <SelectContent position="popper" className="z-[1000000]">
                <SelectGroup>
                  <SelectLabel>Facility Types</SelectLabel>
                  <SelectItem value="boarding-house">Boarding House</SelectItem>
                  <SelectItem value="rental-house">Rental House</SelectItem>
                  <SelectItem value="any">Any</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Beds Available */}
          <div>
            <Label htmlFor="beds-available" className="text-md font-semibold">
              Beds Available
            </Label>
            <Input
              id="beds-available"
              type="number"
              placeholder="e.g., 2"
              value={bedsAvailable}
              onChange={(e) => setBedsAvailable(e.target.value)}
              className="mt-2"
            />
          </div>
        </div>

        <DialogFooter className="sticky bottom-0 z-10 flex items-center justify-between border-t border-zinc-200 bg-white pt-4">
          <Button
            type="button"
            onClick={handleClearFilters}
            variant="outline"
            className="h-11 rounded"
            size="lg"
          >
            Clear Filters
          </Button>
          <Button
            type="button"
            onClick={handleSearch}
            className="h-11 rounded bg-zinc-800"
            size="lg"
          >
            Search
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
