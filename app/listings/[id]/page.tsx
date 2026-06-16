"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { IListing } from "@/types";
import ListingDetail from "@/components/listings/ListingDetail";
import ListingGrid from "@/components/listings/ListingGrid";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

export default function DetailPage() {
  const { id } = useParams();
  const { data: session } = useSession();
  const [listing, setListing] = useState<IListing | null>(null);
  const [similar, setSimilar] = useState<IListing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/listings/${id}`).then(r => r.json()).then(d => { setListing(d.listing); setSimilar(d.similar || []); }).catch(() => {}).finally(() => setLoading(false));
  }, [id]);

  const toggleFav = async () => {
    if (!session) { toast.error("Avval kiring"); return; }
    await fetch("/api/favorites", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ listingId: id }) });
    toast.success("Saqlangan!");
  };

  if (loading) return <div className="max-w-6xl mx-auto px-4 py-8"><div className="h-96 bg-gray-100 rounded-xl animate-pulse" /></div>;
  if (!listing) return <div className="text-center py-16"><span className="text-6xl">😔</span><p className="mt-4 text-gray-500">Topilmadi</p></div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <ListingDetail listing={listing} onFavorite={toggleFav} />
      {similar?.length > 0 && <div className="mt-16"><h2 className="text-2xl font-bold mb-6">O'xshash elonlar</h2><ListingGrid listings={similar} /></div>}
    </div>
  );
}
