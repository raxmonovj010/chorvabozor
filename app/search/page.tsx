"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
export default function SearchPage() {
  const [q, setQ] = useState("");
  const router = useRouter();
  const handleSearch = (e: FormEvent) => { e.preventDefault(); router.push(`/listings?q=${encodeURIComponent(q)}`); };
  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <span className="text-6xl">🔍</span>
      <h1 className="text-3xl font-bold mt-4">Qidirish</h1>
      <form onSubmit={handleSearch} className="mt-6 flex gap-2">
        <input type="text" value={q} onChange={e => setQ(e.target.value)} placeholder="Qidirish..." className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" />
        <button type="submit" className="px-6 bg-primary text-white rounded-lg hover:bg-primary-dark">Qidirish</button>
      </form>
    </div>
  );
}
