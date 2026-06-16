"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { CATEGORIES, REGIONS } from "@/lib/utils";
export default function FilterSidebar() {
  const router = useRouter(); const sp = useSearchParams();
  const f = (k: string, v: string) => { const p = new URLSearchParams(sp.toString()); if (p.get(k) === v) p.delete(k); else p.set(k, v); p.set("page", "1"); router.push(`/listings?${p}`); };
  return (
    <div className="space-y-4">
      <div><h3 className="font-semibold mb-2">Kategoriya</h3>{CATEGORIES.map(c => <button key={c.id} onClick={() => f("category", c.id)} className={`w-full text-left px-3 py-2 rounded-lg text-sm ${sp.get("category") === c.id ? "bg-primary text-white" : "hover:bg-gray-100"}`}>{c.emoji} {c.label}</button>)}</div>
      <div><h3 className="font-semibold mb-2">Viloyat</h3><select value={sp.get("region") || ""} onChange={e => f("region", e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm"><option value="">Hammasi</option>{REGIONS.map(r => <option key={r} value={r}>{r}</option>)}</select></div>
      <div><h3 className="font-semibold mb-2">Narx</h3><div className="flex gap-2"><input type="number" placeholder="Min" defaultValue={sp.get("minPrice") || ""} className="w-full px-3 py-2 border rounded-lg text-sm" onBlur={e => f("minPrice", e.target.value)}/><input type="number" placeholder="Max" defaultValue={sp.get("maxPrice") || ""} className="w-full px-3 py-2 border rounded-lg text-sm" onBlur={e => f("maxPrice", e.target.value)}/></div></div>
      <div><h3 className="font-semibold mb-2">Jinsi</h3><select value={sp.get("gender") || ""} onChange={e => f("gender", e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm"><option value="">Hammasi</option><option value="erkak">Erkak</option><option value="urg'ocha">Urg'ochi</option></select></div>
      <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={sp.get("vaccinated") === "true"} onChange={() => f("vaccinated", sp.get("vaccinated") === "true" ? "" : "true")} className="w-4 h-4" /> Vaksina qilingan</label>
      <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={sp.get("withDocuments") === "true"} onChange={() => f("withDocuments", sp.get("withDocuments") === "true" ? "" : "true")} className="w-4 h-4" /> Hujjatli</label>
      <button onClick={() => router.push("/listings")} className="text-primary text-sm hover:underline">Filtrlarni tozalash</button>
    </div>
  );
}
