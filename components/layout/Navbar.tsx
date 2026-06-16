"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Button from "@/components/ui/Button";
import { useState } from "react";
export default function Navbar() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🐄</span>
          <span className="text-xl font-bold text-primary">ChorvaBozor.uz</span>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <Link href="/listings" className="text-gray-600 hover:text-primary">Elonlar</Link>
          <Link href="/listings/create" className="text-gray-600 hover:text-primary">Elon qo'shish</Link>
          {session ? (
            <div className="flex items-center gap-4">
              <Link href="/favorites" className="text-gray-600 hover:text-primary">❤️</Link>
              <Link href="/profile" className="text-gray-600 hover:text-primary">{(session.user as any)?.name || "Profil"}</Link>
              <Button size="sm" variant="ghost" onClick={() => signOut()}>Chiqish</Button>
            </div>
          ) : <Link href="/login"><Button size="sm">Kirish</Button></Link>}
        </div>
        <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} /></svg>
        </button>
      </div>
      {open && <div className="md:hidden bg-white border-t p-4 space-y-3">
        <Link href="/listings" className="block py-2" onClick={() => setOpen(false)}>Elonlar</Link>
        <Link href="/listings/create" className="block py-2" onClick={() => setOpen(false)}>Elon qo'shish</Link>
        {session ? <><Link href="/profile" className="block py-2" onClick={() => setOpen(false)}>Profil</Link><Link href="/favorites" className="block py-2" onClick={() => setOpen(false)}>Saqlanganlar</Link><Button variant="ghost" className="w-full" onClick={() => signOut()}>Chiqish</Button></>
          : <Link href="/login" onClick={() => setOpen(false)}><Button className="w-full">Kirish</Button></Link>}
      </div>}
    </nav>
  );
}
