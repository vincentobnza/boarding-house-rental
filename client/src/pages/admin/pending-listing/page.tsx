import { Button } from "@/components/ui/button";
import {
  Eye,
  CheckCircle,
  XCircle,
  MapPin,
  BedDouble,
  Clock,
} from "lucide-react";

export default function PendingListings() {
  const listings = [
    {
      id: 1,
      fullName: "Ivan F. Santos",
      address: "Brgy 5, Dagohoy Street",
      beds: 4,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzZTt1TFBPwM_CJpJspHT1R5FlFm-fSD4d4A&s",
    },
    {
      id: 2,
      fullName: "Maria L. Reyes",
      address: "Zone 2, Mabini Street",
      beds: 3,
      image:
        "https://i.pinimg.com/236x/62/c9/84/62c984784dba3437226cadc8e6f62306.jpg",
    },
    {
      id: 3,
      fullName: "Maria L. Reyes",
      address: "Zone 2, Mabini Street",
      beds: 3,
      image:
        "https://i.pinimg.com/236x/62/c9/84/62c984784dba3437226cadc8e6f62306.jpg",
    },
    {
      id: 4,
      fullName: "Maria L. Reyes",
      address: "Zone 2, Mabini Street",
      beds: 3,
      image:
        "https://i.pinimg.com/236x/62/c9/84/62c984784dba3437226cadc8e6f62306.jpg",
    },
    {
      id: 5,
      fullName: "Maria L. Reyes",
      address: "Zone 2, Mabini Street",
      beds: 3,
      image:
        "https://i.pinimg.com/236x/62/c9/84/62c984784dba3437226cadc8e6f62306.jpg",
    },
  ];

  return (
    <div className="mx-auto w-full max-w-screen-xl space-y-6 p-6">
      <h2 className="text-2xl font-bold">Pending Listings</h2>

      <div className="grid gap-6">
        {listings.map((listing) => (
          <div
            key={listing.id}
            className="flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm lg:flex-row"
          >
            {/* Image */}
            <div className="relative h-56 w-full lg:h-auto lg:w-80">
              <img
                src={listing.image}
                alt={listing.fullName}
                className="h-full w-full object-cover"
              />
              <div className="absolute top-4 left-4 z-5">
                <span className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-100 px-3 py-1.5 text-xs font-semibold text-amber-800">
                  <Clock className="h-3 w-3" />
                  Pending Review
                </span>
              </div>
              <div className="absolute inset-0 bg-white/70" />
            </div>

            {/* Info */}
            <div className="flex flex-1 flex-col justify-between p-6">
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-gray-900">
                  {listing.fullName}
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  {listing.address}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <BedDouble className="h-4 w-4" />
                  {listing.beds} beds available
                </div>
              </div>

              <div className="mt-6 flex flex-wrap justify-end gap-2 border-t border-gray-100 pt-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-1 text-gray-600 hover:text-gray-800"
                >
                  <Eye className="h-4 w-4" />
                  View
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-1 text-green-600 hover:text-green-800"
                >
                  <CheckCircle className="h-4 w-4" />
                  Approve
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-1 text-red-600 hover:text-red-800"
                >
                  <XCircle className="h-4 w-4" />
                  Decline
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
