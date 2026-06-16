"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { IListing } from "@/types";
import ListingGrid from "@/components/listings/ListingGrid";
import toast from "react-hot-toast";
import Button from "@/components/ui/Button";

export default function MyListingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [listings, setListings] = useState<IListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<string>("active");

  useEffect(() => {
    if (status === "unauthenticated") { router.push("/login"); return; }
    if (session) {
      fetch("/api/listings?limit=100").then(r => r.json()).then(d => setListings(d.listings)).catch(() => {}).finally(() => setLoading(false));
    }
  }, [session, status, router]);

  const filtered = listings.filter(l => l.status === tab);
  const update = async (id: string, s: string) => {
    await fetch(`/api/listings/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: s }) });
    toast.success("O'zgartirildi");
    setListings(p => p.map(l => l._id === id ? { ...l, status: s as any } : l));
  };
  const del = async (id: string) => {
    if (!confirm("O'chirilsinmi?")) return;
    await fetch(`/api/listings/${id}`, { method: "DELETE" });
    toast.success("O'chirildi");
    setListings(p => p.filter(l => l._id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Mening elonlarim</h1>
      <div className="flex gap-2 mb-6">
        {["active", "sold", "inactive"].map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 rounded-lg text-sm font-medium ${tab === t ? "bg-primary text-white" : "bg-gray-100 text-gray-600"}`}>{t === "active" ? "Faol" : t === "sold" ? "Sotilgan" : "Arxiv"}</button>
        ))}
      </div>
      <ListingGrid listings={filtered} loading={loading} />
      {filtered.map(l => (
        <div key={l._id} className="flex gap-2 mt-2">
          {tab === "active" && <><Button size="sm" onClick={() => update(l._id, "sold")}>Sotildi</Button><Button size="sm" variant="outline" onClick={() => update(l._id, "inactive")}>Arxiv</Button></>}
          <Button size="sm" variant="danger" onClick={() => del(l._id)}>O'chirish</Button>
        </div>
      ))}
    </div>
  );
}
