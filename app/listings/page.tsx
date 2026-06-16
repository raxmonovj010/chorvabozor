"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { IListing } from "@/types";
import ListingGrid from "@/components/listings/ListingGrid";
import FilterSidebar from "@/components/filters/FilterSidebar";
import Button from "@/components/ui/Button";

function Content() {
  const sp = useSearchParams();
  const [listings, setListings] = useState<IListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [sort, setSort] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);

  const fetchListings = async () => {
    setLoading(true);
    const p = new URLSearchParams(sp.toString());
    p.set("page", page.toString()); p.set("limit", "12");
    if (sort === "price-asc") p.set("sort", "price"); else if (sort === "views") p.set("sort", "views"); else p.delete("sort");
    try {
      const res = await fetch(`/api/listings?${p}`);
      const d = await res.json();
      setListings(d.listings); setTotal(d.pagination.totalPages);
    } catch { setListings([]); } finally { setLoading(false); }
  };

  useEffect(() => { setPage(1); }, [sp]);
  useEffect(() => { fetchListings(); }, [page, sort, sp]);

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <button className="md:hidden text-primary font-medium mb-4" onClick={() => setShowFilters(!showFilters)}>{showFilters ? "Filtrlarni yopish ▲" : "Filtrlarni ochish ▼"}</button>
      <div className={`md:w-64 flex-shrink-0 ${showFilters ? "block" : "hidden md:block"}`}><FilterSidebar /></div>
      <div className="flex-1">
        <div className="flex justify-end mb-4">
          <select value={sort} onChange={e => setSort(e.target.value)} className="px-4 py-2 border rounded-lg text-sm bg-white">
            <option value="newest">Eng yangi</option><option value="price-asc">Narx: arzon</option><option value="price-desc">Narx: qimmat</option><option value="views">Eng ko'p ko'rilgan</option>
          </select>
        </div>
        <ListingGrid listings={listings} loading={loading} />
        {total > 1 && <div className="flex items-center justify-center gap-2 mt-8">
          <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage(p => p - 1)}>←</Button>
          <span className="text-sm text-gray-500">{page} / {total}</span>
          <Button variant="outline" size="sm" disabled={page >= total} onClick={() => setPage(p => p + 1)}>→</Button>
        </div>}
      </div>
    </div>
  );
}

export default function ListingsPage() {
  return <div className="max-w-7xl mx-auto px-4 py-8"><Suspense fallback={<div className="text-center py-16 text-gray-500">Yuklanmoqda...</div>}><Content /></Suspense></div>;
}
