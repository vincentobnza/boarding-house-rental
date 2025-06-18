import BackgroundImage from "@/assets/admin_image.jpg";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-zinc-100">
      <img
        src={BackgroundImage}
        alt="Background"
        className="absolute inset-0 h-full w-full object-cover opacity-20 grayscale"
      />
      <div className="z-5 mx-auto flex w-full max-w-lg flex-col items-center justify-center gap-8 p-5">
        <div className="px-4">
          <p className="font-bold">ADMIN</p>
        </div>
        <h1 className="text-5xl font-bold md:text-7xl">Smart Search</h1>
        <p className="mb-12 text-center text-sm font-semibold md:text-lg">
          Web Based Boarding and Rental House Locator Platform using Results
          Ranking and Filtering (RRF) in San Jose, Occidental Mindoro
        </p>

        <Button size="lg" asChild className="bg-zinc-900">
          <Link to="/landlord/login">Login your Account as Admin</Link>
        </Button>

        <Link
          to="/get-started"
          className="text-lg font-semibold text-zinc-900 underline"
        >
          Back
        </Link>
      </div>
    </div>
  );
}
