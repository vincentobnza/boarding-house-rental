import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Eye,
  CheckCircle,
  XCircle,
  MapPin,
  BedDouble,
  Clock,
} from "lucide-react";

interface Registration {
  _id: string;
  business_name: string;
  business_address: string;
  Property_name: string;
  Property_Address: string;
  Property_Description: string;
  Property_Image: string;
  status: string;
}

export default function PendingListings() {
  const [listings, setListings] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/landlordregistration"
        );
        const data = await res.json();
        setListings(
          data.filter((item: Registration) => item.status === "pending")
        );
      } catch (err) {
        console.error("Error fetching listings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  return (
    <div className="w-full max-w-screen-xl mx-auto space-y-6 p-6">
      <h2 className="text-2xl font-bold">Pending Listings</h2>

      {loading ? (
        <p>Loading...</p>
      ) : listings.length === 0 ? (
        <p>No pending listings.</p>
      ) : (
        <div className="grid gap-6">
          {listings.map((listing) => (
            <div
              key={listing._id}
              className="bg-white border border-zinc-200 rounded-xl shadow-sm flex flex-col lg:flex-row overflow-hidden"
            >
              {/* Image */}
              <div className="relative w-full lg:w-80 h-56 lg:h-auto">
                <img
                  src={`http://localhost:5000/${listing.Property_Image}`}
                  alt={listing.Property_name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-800 bg-amber-100 px-3 py-1.5 rounded-full border border-amber-200">
                    <Clock className="w-3 h-3" />
                    {listing.status}
                  </span>
                </div>
                <div className="absolute inset-0 bg-white/70" />
              </div>

              {/* Info */}
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {listing.Property_name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    {listing.Property_Address}
                  </div>
                  <div className="text-sm text-gray-600">
                    {listing.Property_Description}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 flex flex-wrap gap-2 justify-end">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-1 text-gray-600 hover:text-gray-800"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-1 text-green-600 hover:text-green-800"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Approve
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-1 text-red-600 hover:text-red-800"
                  >
                    <XCircle className="w-4 h-4" />
                    Decline
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
