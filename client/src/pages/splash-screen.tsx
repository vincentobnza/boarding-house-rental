import { Button } from "@/components/ui/button";
import { MapPinHouse } from "lucide-react";
import BackgroundImage from "@/assets/homepage_image.jpg";
import { Link } from "react-router-dom";

export default function SplashScreen() {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-white">
      <img
        src={BackgroundImage}
        alt="Background"
        className="absolute inset-0 h-full w-full object-cover opacity-20 grayscale"
      />
      <div className="z-5 mx-auto flex w-full max-w-lg flex-col items-center justify-center gap-8 p-5">
        <div className="grid size-24 place-items-center rounded-full bg-orange-50 text-orange-400">
          <MapPinHouse size={35} />
        </div>
        <h1 className="text-5xl font-bold md:text-6xl">Smart Search</h1>
        <p className="mb-12 text-center text-sm font-semibold md:text-lg">
          Web Based Boarding and Rental House Locator Platform using Results
          Ranking and Filtering (RRF) in San Jose, Occidental Mindoro
        </p>

        <Button size="lg" className="text-lg uppercase shadow-none" asChild>
          <Link to="/get-started">Get Started</Link>
        </Button>
      </div>
    </div>
  );
}
