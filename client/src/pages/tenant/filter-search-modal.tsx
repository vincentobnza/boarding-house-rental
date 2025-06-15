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
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<NominatimResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] =
    useState<NominatimResult | null>(null);
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);

  // New state variables for filters
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [facilityType, setFacilityType] = useState<string>("");
  const [bedsAvailable, setBedsAvailable] = useState<string>("");

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
    // Implement search logic with all filters
    console.log("Search triggered with:", {
      location: selectedLocation,
      minPrice,
      maxPrice,
      facilityType,
      bedsAvailable,
      searchQuery, // if no specific location is selected, use the query
    });
    // Here you would typically make an API call to your backend
    // with these filter parameters.
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex items-center border rounded-lg px-3 py-2 bg-white shadow-sm max-w-full md:max-w-md cursor-pointer hover:shadow-md transition-shadow">
          <span className="text-gray-400 mr-2">
            <Search size={20} />
          </span>
          <div className="outline-none flex-1 text-base md:text-md bg-transparent text-gray-500">
            Search for a rental house...
          </div>
          <span className="ml-2 px-2 py-1 rounded bg-gray-100 border text-gray-600 text-xs font-mono">
            crtl f
          </span>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl z-[999999] min-h-[80vh] overflow-y-auto flex flex-col">
        <DialogHeader className="text-center flex flex-col items-center border-b border-zinc-200 pb-4 mb-4 sticky top-0 z-10">
          <DialogTitle className="text-3xl">Filter Search</DialogTitle>
          <DialogDescription className="text-md">
            Tell us about your ideal rental/boarding house.
          </DialogDescription>
        </DialogHeader>

        <div className="px-4 py-2 flex-grow">
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
        <div className="my-6 px-4 space-y-6">
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
              <SelectTrigger id="facility-type" className="w-full mt-2">
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

        <DialogFooter className="flex justify-center items-center pt-4 border-t border-zinc-200 sticky bottom-0 bg-white z-10">
          <Button
            type="button" // Changed from submit to button to prevent form submission if not intended
            onClick={handleSearch} // Call handleSearch on click
            className="bg-zinc-800 rounded self-center h-11"
            size="lg"
          >
            Search
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
