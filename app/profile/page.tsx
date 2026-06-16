"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { IUser } from "@/types";
import Button from "@/components/ui/Button";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    if (status === "unauthenticated") { router.push("/login"); return; }
    if (session) fetch("/api/users").then(r => r.json()).then(setUser).catch(() => {});
  }, [session, status, router]);
  if (status === "loading" || !user) return <div className="text-center py-16 text-gray-500">Yuklanmoqda...</div>;
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold">{user.name?.charAt(0) || "U"}</div>
          <div><h1 className="text-xl font-bold">{user.name}</h1><p className="text-gray-500 text-sm">{user.phone || user.email}</p></div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t text-center">
          <div><p className="text-2xl font-bold text-primary">{user.activeCount || 0}</p><p className="text-sm text-gray-500">Faol</p></div>
          <div><p className="text-2xl font-bold text-primary">{user.listingsCount || 0}</p><p className="text-sm text-gray-500">Jami</p></div>
          <div><p className="text-2xl font-bold text-primary">{user.rating || 0}</p><p className="text-sm text-gray-500">Reyting</p></div>
        </div>
      </div>
      <div className="flex gap-3"><Link href="/profile/my-listings"><Button>Mening elonlarim</Button></Link><Link href="/favorites"><Button variant="outline">Saqlanganlar</Button></Link><Link href="/listings/create"><Button variant="outline">Yangi elon</Button></Link></div>
    </div>
  );
}
