"use client";
import { useState } from "react";
import Image from "next/image";
import { IListing } from "@/types";
import { formatPrice, formatDate, CATEGORIES } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

export default function ListingDetail({ listing, onFavorite }: { listing: IListing; onFavorite?: () => void }) {
  const [showPhone, setShowPhone] = useState(false);
  const [img, setImg] = useState(0);
  const cat = CATEGORIES.find(c => c.id === listing.category);

  return (
    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
      <div>
        <div className="relative h-80 md:h-96 bg-gray-100 rounded-xl overflow-hidden">
          {listing.images?.[img] ? <Image src={listing.images[img]} alt={listing.title} fill className="object-cover" />
            : <div className="flex items-center justify-center h-full text-8xl">{cat?.emoji || "🐄"}</div>}
        </div>
        {listing.images?.length > 1 && <div className="flex gap-2 mt-3">{[...Array(listing.images.length)].map((_, i) => (
          <button key={i} onClick={() => setImg(i)} className={`w-16 h-16 rounded-lg overflow-hidden border-2 ${i === img ? "border-primary" : "border-transparent"}`}>
            <Image src={listing.images[i]!} alt="" width={64} height={64} className="object-cover w-full h-full" />
          </button>
        ))}</div>}
      </div>

      <div>
        <div className="flex items-center gap-2 mb-2">
          {cat && <Badge variant="info">{cat.emoji} {cat.label}</Badge>}
          {listing.priceNegotiable && <Badge variant="warning">Kelishilgan</Badge>}
        </div>
        <h1 className="text-2xl font-bold">{listing.title}</h1>
        <p className="text-3xl font-bold text-primary mt-2">{formatPrice(listing.price)}</p>

        <div className="grid grid-cols-2 gap-3 bg-gray-50 rounded-lg p-4 mt-4">
          {listing.animal?.breed && <div><span className="text-sm text-gray-500">Zoti</span><p className="font-medium">{listing.animal.breed}</p></div>}
          {listing.animal?.age && <div><span className="text-sm text-gray-500">Yoshi</span><p className="font-medium">{listing.animal.age.value} {listing.animal.age.unit}</p></div>}
          {listing.animal?.gender && <div><span className="text-sm text-gray-500">Jinsi</span><p className="font-medium">{listing.animal.gender === "erkak" ? "Erkak" : "Urg'ochi"}</p></div>}
          {listing.animal?.weight && <div><span className="text-sm text-gray-500">Vazni</span><p className="font-medium">{listing.animal.weight} kg</p></div>}
          {listing.animal?.count && <div><span className="text-sm text-gray-500">Soni</span><p className="font-medium">{listing.animal.count} dona</p></div>}
          <div><span className="text-sm text-gray-500">Viloyat</span><p className="font-medium">{listing.location?.region}</p></div>
        </div>

        <div className="flex gap-2 mt-2">
          {listing.animal?.isVaccinated && <Badge variant="success">✅ Vaksina qilingan</Badge>}
          {listing.animal?.withDocuments && <Badge variant="success">📄 Hujjatli</Badge>}
        </div>

        <div className="mt-4 space-y-2">
          {listing.showPhone && <Button variant={showPhone ? "primary" : "outline"} className="w-full" onClick={() => setShowPhone(true)}>{showPhone ? listing.phone : "📞 Telefonni ko'rish"}</Button>}
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={onFavorite}>🤍 Saqlash</Button>
          </div>
        </div>

        <p className="mt-4 text-gray-600 whitespace-pre-wrap">{listing.description}</p>
        <p className="mt-4 text-sm text-gray-400">{formatDate(new Date(listing.createdAt))} • 👁 {listing.views} marta ko'rildi</p>
      </div>
    </div>
  );
}
