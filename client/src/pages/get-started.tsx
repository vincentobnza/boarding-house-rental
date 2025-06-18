import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, House, User } from "lucide-react";
import React from "react";

export default function GetStarted() {
  const userTypes = [
    {
      name: "Landlord",
      description:
        "Manage your properties, list available rooms, and connect with potential tenants.",
      icon: <House className="mb-4 size-8 text-blue-500" />,
    },
    {
      name: "Tenant",
      description:
        "Find your next home, browse listings, and easily communicate with landlords.",
      icon: <User className="mb-4 size-8 text-emerald-500" />,
    },
  ];
  const [selectedUserType, setSelectedUserType] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleUserTypeSelect = (type: string) => {
    setSelectedUserType(type);
  };

  const handleContinue = () => {
    if (selectedUserType) {
      navigate(`/${selectedUserType.toLowerCase()}`);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-slate-50 p-4">
      <div className="mx-auto max-w-2xl text-center">
        <h4 className="text-sm font-bold tracking-widest text-zinc-500 uppercase">
          WELCOME
        </h4>
        <h1 className="mt-2 text-4xl font-bold text-zinc-900 md:text-5xl">
          What type of user are you?
        </h1>
        <p className="mt-4 text-lg text-zinc-600">
          Choose your role to get started with our platform.
        </p>
      </div>

      <div className="mt-12 mb-10 grid w-full max-w-2xl gap-6 md:grid-cols-2">
        {userTypes.map((user, index) => (
          <Card
            key={index}
            name={user.name}
            description={user.description}
            icon={user.icon}
            selected={selectedUserType === user.name}
            onClick={() => handleUserTypeSelect(user.name)}
          />
        ))}
      </div>
      <Button
        size="lg"
        disabled={!selectedUserType}
        onClick={handleContinue}
        className="group flex items-center rounded-lg bg-zinc-900 px-8 py-6 text-lg font-semibold text-white hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Continue as {selectedUserType || "..."}
        <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
      </Button>

      <p className="mt-12 text-sm text-zinc-600">
        Are you an administrator?
        <Link
          to="/admin/login"
          className="ml-2 font-semibold text-zinc-900 underline hover:text-zinc-700"
        >
          Login here
        </Link>
      </p>
    </div>
  );
}

type CardProps = {
  name: string;
  description: string;
  icon: React.ReactNode;
  selected?: boolean;
  onClick?: () => void;
};

const Card = ({ name, description, icon, selected, onClick }: CardProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "flex w-full cursor-pointer flex-col items-center rounded-xl border-2 border-zinc-200 bg-white p-8 text-center transition-all duration-300 ease-in-out hover:border-zinc-400 hover:shadow-lg",
        {
          "scale-105 border-zinc-900 bg-zinc-50 shadow-xl": selected,
        },
      )}
    >
      {icon}
      <h2 className="text-2xl font-bold text-zinc-900">{name}</h2>
      <p className="mt-4 text-sm text-zinc-500">{description}</p>
    </div>
  );
};
