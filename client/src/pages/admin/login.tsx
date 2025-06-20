import BackgroundImage from "@/assets/admin_image.jpg";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Label } from "@/components/ui/label";

export default function LandlordLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <div className="w-full min-h-screen bg-zinc-100 flex items-center justify-center relative">
      <img
        src={BackgroundImage}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale"
      />
      <div className="w-full max-w-lg mx-auto flex flex-col items-center justify-center gap-8 z-5 p-5">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-md p-8 w-full flex flex-col gap-6 z-10"
        >
          <div className="px-4 mx-auto text-center">
            <h2 className="font-bold text-2xl mb-4">ADMIN LOGIN</h2>
            <p>Please enter your credentials to access your account.</p>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email" className="font-medium">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password" className="font-medium">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button
            type="submit"
            onClick={() => {
              window.location.href = "/admin/dashboard"; // Redirect to dashboard on successful login
            }}
            className="w-full h-12 bg-zinc-900 rounded-lg"
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
