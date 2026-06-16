"use client";
import Image from "next/image"; import Link from "next/link";
import { IListing } from "@/types"; import { formatPrice, CATEGORIES } from "@/lib/utils";

export default function ListingCard({ listing }: { listing: IListing }) {
  const cat = CATEGORIES.find(c => c.id === listing.category);
  return (
    <Link href={`/listings/${listing._id}`} className="block group">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
        <div className="relative h-48 bg-gray-100">
          {listing.images?.[0] ? <Image src={listing.images[0]} alt={listing.title} fill className="object-cover group-hover:scale-105 transition-transform" />
            : <div className="flex items-center justify-center h-full text-5xl">{cat?.emoji || "🐄"}</div>}
          {listing.priceNegotiable && <span className="absolute top-2 left-2 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">Kelishilgan</span>}
        </div>
        <div className="p-4">
          <h3 className="font-semibold truncate">{listing.title}</h3>
          <p className="text-lg font-bold text-primary mt-1">{formatPrice(listing.price)}</p>
          <p className="text-sm text-gray-500 mt-1">{listing.location?.region} {listing.animal?.age ? `• ${listing.animal.age.value} ${listing.animal.age.unit}` : ""}</p>
        </div>
      </div>
    </Link>
  );
}
