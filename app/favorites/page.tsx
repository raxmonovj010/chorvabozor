"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { IFavorite } from "@/types";
import ListingGrid from "@/components/listings/ListingGrid";

export default function FavoritesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [favorites, setFavorites] = useState<IFavorite[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (status === "unauthenticated") { router.push("/login"); return; }
    if (session) fetch("/api/favorites").then(r => r.json()).then(setFavorites).catch(() => {}).finally(() => setLoading(false));
  }, [session, status, router]);
  const listings = favorites.map(f => f.listingId).filter(Boolean);
  return <div className="max-w-7xl mx-auto px-4 py-8"><h1 className="text-2xl font-bold mb-6">❤️ Saqlanganlar</h1><ListingGrid listings={listings as any} loading={loading} /></div>;
}
