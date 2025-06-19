import { Link, useParams } from "react-router-dom";
import { cn } from "@/lib/utils";

interface RentalNavItem {
  label: string;
  path: string;
  type: string;
}

const navItems: RentalNavItem[] = [
  {
    label: "All Rentals",
    path: "/tenant/rental/rental-house",
    type: "rental-house",
  },
  {
    label: "Boarding Houses",
    path: "/tenant/rental/boarding-house",
    type: "boarding-house",
  },
  {
    label: "Near School",
    path: "/tenant/rental/near-school",
    type: "near-school",
  },
];

export default function RentalNavigation() {
  const { type = "rental-house" } = useParams<{ type: string }>();

  return (
    <div className="mb-8 border-b border-zinc-200">
      <nav className="flex space-x-8">
        {navItems.map((item) => (
          <Link
            key={item.type}
            to={item.path}
            className={cn(
              "flex items-center border-b-2 px-1 py-4 text-sm font-medium",
              type === item.type
                ? "border-zinc-900 text-zinc-900"
                : "border-transparent text-zinc-500 hover:border-zinc-300 hover:text-zinc-700",
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
