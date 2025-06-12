import { Button } from "@/components/ui/button";
import { MapPinHouse } from "lucide-react";

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-orange-100 flex items-center justify-center">
      <div className="w-full max-w-lg mx-auto flex flex-col items-center justify-center gap-8">
        <div className="size-24 bg-orange-500 text-white rounded-full grid place-items-center">
          <MapPinHouse size={35} />
        </div>
        <h1 className="text-7xl font-bold">Smart Search</h1>
        <p className="text-center font-semibold mb-12">
          Web Based Boarding and Rental House Locator Platform using Results
          Ranking and Filtering (RRF) in San Jose, Occidental Mindoro
        </p>

        <Button size="lg">Continue</Button>
      </div>
    </div>
  );
}
