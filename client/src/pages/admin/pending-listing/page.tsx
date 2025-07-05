"use client";

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

interface Landlord {
  _id: string;
  payment: { full_name: string };
  business_address: string;
  property_photos: string[];
  monthly_rate: number;
  status: string;
}

export default function PendingListings() {
  const [listings, setListings] = useState<Landlord[]>([]);

  useEffect(() => {
    async function fetchListings() {
      try {
        const res = await fetch("http://localhost:5000/api/landlord/landlords");
        const data = await res.json();
        const pending = data.filter(
          (item: Landlord) => item.status === "pending",
        );
        setListings(pending);
      } catch (error) {
        console.error("Failed to fetch landlords:", error);
      }
    }
    fetchListings();
  }, []);

  return (
    <div className="mx-auto w-full max-w-screen-xl space-y-6 p-6">
      <h2 className="text-2xl font-bold">Pending Listings</h2>
      <div className="grid gap-6">
        {listings.map((listing) => (
          <div
            key={listing._id}
            className="flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm lg:flex-row"
          >
            {/* Image */}
            <div className="relative h-56 w-full lg:h-auto lg:w-80">
              <img
                src={`http://localhost:5000/${listing.property_photos?.[0] ?? ""}`}
                alt={listing.payment?.full_name ?? "No Name"}
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
                  {listing.payment?.full_name ?? "No Name"}
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  {listing.business_address}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <BedDouble className="h-4 w-4" />₱
                  {listing.monthly_rate?.toLocaleString()} / month
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
