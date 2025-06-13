import { Button } from "@/components/ui/button";
import { MapPinHouse } from "lucide-react";
import BackgroundImage from "@/assets/homepage_image.jpg";
import { Link } from "react-router-dom";

export default function SplashScreen() {
  return (
    <div className="w-full min-h-screen bg-orange-100 flex items-center justify-center relative">
      <img
        src={BackgroundImage}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale"
      />
      <div className="w-full max-w-lg mx-auto flex flex-col items-center justify-center gap-8 z-5 p-5">
        <div className="size-24 bg-orange-500 text-white rounded-full grid place-items-center">
          <MapPinHouse size={35} />
        </div>
        <h1 className="text-5xl md:text-7xl font-bold">Smart Search</h1>
        <p className="text-sm md:text-lg text-center font-semibold mb-12">
          Web Based Boarding and Rental House Locator Platform using Results
          Ranking and Filtering (RRF) in San Jose, Occidental Mindoro
        </p>

        <Button size="lg" asChild>
          <Link to="/home">Get Started</Link>
        </Button>
      </div>
    </div>
  );
}
