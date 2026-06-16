"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { IListing } from "@/types";
import ListingCard from "@/components/listings/ListingCard";

export default function ClientHome() {
  const [listings, setListings] = useState<IListing[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("/api/listings?limit=12").then(r => r.json()).then(d => setListings(d.listings)).catch(() => {}).finally(() => setLoading(false));
  }, []);
  return (
    <section className="py-12 max-w-7xl mx-auto px-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">So'nggi elonlar</h2>
        <Link href="/listings" className="text-primary font-medium hover:underline">Barchasi →</Link>
      </div>
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1,2,3,4,5,6].map(i => <div key={i} className="h-64 bg-gray-100 rounded-xl animate-pulse" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {listings.map(l => <ListingCard key={l._id} listing={l} />)}
        </div>
      )}
    </section>
  );
}
