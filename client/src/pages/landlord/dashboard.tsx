import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Dashboard() {
  const isThereAnyListing = false;
  return (
    <div className="w-full">
      {isThereAnyListing ? (
        <div className="w-full h-full flex justify-center items-center">
          <h1 className="text-2xl font-bold">Your Listings</h1>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col justify-center items-center">
          <img
            src="https://cdn-icons-png.flaticon.com/128/7486/7486754.png"
            alt="No Listings"
            className="size-24 mb-4"
          />
          <h1 className="text-md">Ohh no! You don't have any listings yet.</h1>

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
