import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function Onboarding() {
  const userType = [
    {
      name: "Landlord",
      icon: "https://cdn-icons-png.flaticon.com/128/11789/11789997.png",
    },
    {
      name: "Tenant",
      icon: "https://cdn-icons-png.flaticon.com/128/11608/11608210.png",
    },
  ];
  const [selectedUserType, setSelectedUserType] = useState<string | null>(null);

  const handleUserTypeSelect = (type: string) => {
    setSelectedUserType(type);
  };

  return (
    <div className="bg-orange-50 w-full min-h-screen flex justify-center items-center flex-col">
      <h4 className="mb-4 font-semibold">WELCOME</h4>
      <h1 className="text-4xl font-bold">What type of user are you?</h1>

      <div className="mt-14 w-full max-w-lg grid md:grid-cols-2 gap-4 mb-10">
        {userType.map((user, index) => (
          <Card
            key={index}
            name={user.name}
            icon={user.icon}
            selected={selectedUserType === user.name}
            onClick={() => handleUserTypeSelect(user.name)}
          />
        ))}
      </div>
      <Button
        size="lg"
        disabled={!selectedUserType}
        className="disabled:opacity-20 disabled:cursor-not-allowed"
      >
        <Link to={`/${selectedUserType?.toLowerCase()}`}>
          Continue as {selectedUserType}
        </Link>
        <ArrowRight />
      </Button>

      <p className="mt-12 text-lg font-bold">
        Authorized User?
        <span className="ml-2 underline text-orange-500">
          <Link to="/admin/login">Login as Admin</Link>
        </span>
      </p>
    </div>
  );
}

type UserType = {
  name: string;
  icon: string;
  selected?: boolean;
  onClick?: () => void;
};

const Card = ({ name, icon, selected, onClick }: UserType) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "w-full bg-white p-10 flex justify-center items-center flex-col gap-4 rounded-lg border border-zinc-200 cursor-pointer transition-all",
        {
          "bg-orange-100 border-3 border-orange-500 shadow-lg": selected,
        }
      )}
    >
      <img src={icon} alt={name} className="size-24 mb-5" />
      <h1 className="text-xl font-semibold">{name}</h1>
    </div>
  );
};
