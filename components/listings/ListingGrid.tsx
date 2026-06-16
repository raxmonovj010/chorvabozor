"use client";
import { IListing } from "@/types"; import ListingCard from "./ListingCard";
export default function ListingGrid({ listings, loading }: { listings: IListing[]; loading?: boolean }) {
  if (loading) return <div className="grid grid-cols-1 md:grid-cols-3 gap-6">{[1,2,3,4,5,6].map(i => <div key={i} className="h-64 bg-gray-100 rounded-xl animate-pulse"/>)}</div>;
  if (!listings?.length) return <div className="text-center py-16"><span className="text-6xl">📭</span><p className="mt-4 text-gray-500">Hozircha elonlar yo'q</p></div>;
  return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{listings.map(l => <ListingCard key={l._id} listing={l}/>)}</div>;
}
