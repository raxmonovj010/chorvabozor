"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ListingForm from "@/components/listings/ListingForm";

export default function CreatePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => { if (status === "unauthenticated") router.push("/login"); }, [status, router]);
  if (status === "loading" || !session) return <div className="text-center py-16 text-gray-500">Yuklanmoqda...</div>;
  return <div className="max-w-3xl mx-auto px-4 py-8"><h1 className="text-2xl font-bold mb-8">Yangi elon</h1><ListingForm /></div>;
}
