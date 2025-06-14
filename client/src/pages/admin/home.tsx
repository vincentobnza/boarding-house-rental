import BackgroundImage from "@/assets/admin_image.jpg";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-zinc-100 flex items-center justify-center relative">
      <img
        src={BackgroundImage}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale"
      />
      <div className="w-full max-w-lg mx-auto flex flex-col items-center justify-center gap-8 z-5 p-5">
        <div className="px-4">
          <p className="font-bold">ADMIN</p>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold">Smart Search</h1>
        <p className="text-sm md:text-lg text-center font-semibold mb-12">
          Web Based Boarding and Rental House Locator Platform using Results
          Ranking and Filtering (RRF) in San Jose, Occidental Mindoro
        </p>

        <Button size="lg" asChild className="bg-zinc-900">
          <Link to="/landlord/login">Login your Account as Admin</Link>
        </Button>

        <Link
          to="/onboarding"
          className="text-lg font-semibold underline text-zinc-900"
        >
          Back
        </Link>
      </div>
    </div>
  );
}
