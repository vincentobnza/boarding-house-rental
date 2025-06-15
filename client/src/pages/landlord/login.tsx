import BackgroundImage from "@/assets/landlord_image.jpeg";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";
import TextField from "@/components/shared/text-field";

export default function LandlordLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    // For now, let's keep the redirect for demonstration
    window.location.href = "/landlord/dashboard";
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-zinc-100">
      <div className="flex h-screen w-full flex-col md:flex-row">
        {/* Left Side - Image */}
        <div className="relative hidden w-1/2 items-center justify-center bg-zinc-900 md:flex">
          <img
            src={BackgroundImage}
            alt="Landlord Welcome"
            className="h-full w-full object-cover grayscale"
          />
          {/* OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-transparent opacity-50"></div>
        </div>

        {/* Right Side - Form */}
        <div className="flex w-full items-center justify-center p-4 md:w-1/2">
          <div className="mx-auto flex w-full max-w-md flex-col items-start justify-start gap-8">
            <form
              onSubmit={handleSubmit}
              className="z-10 flex w-full flex-col items-start justify-start gap-6"
            >
              <div>
                <h2 className="mb-4 text-5xl font-bold text-zinc-900">
                  Sign In
                </h2>
                <p className="text-lg text-zinc-600">
                  Access your dashboard to manage your properties.
                </p>
              </div>
              <div className="flex w-full flex-col gap-2">
                <TextField
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full"
                />
                <TextField
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full"
                />
              </div>
              <Button
                type="submit"
                className="focus:ring-opacity-50 h-12 w-full rounded-lg bg-zinc-900 text-white transition-colors duration-300 ease-in-out hover:bg-zinc-800 focus:ring-2 focus:ring-zinc-500 focus:outline-none"
              >
                Login
              </Button>

              <p className="text-center text-sm text-zinc-600">
                Don't have an account?
                <span>
                  <Link
                    to="/landlord/signup"
                    className="ml-1 font-semibold text-zinc-900 underline hover:text-zinc-700"
                  >
                    Register here
                  </Link>
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
