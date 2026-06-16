"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const sendOtp = () => {
    if (phone.length < 9) { toast.error("Telefon kiriting"); return; }
    const code = Math.floor(1000 + Math.random() * 9000);
    console.log(`[OTP] ${phone}: ${code}`);
    toast.success(`Kod: ${code}`); setSent(true);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) { toast.error("Ism kiriting"); return; }
    setLoading(true);
    const r = await signIn("phone", { phone, otp, redirect: false });
    if (r?.ok) {
      await fetch("/api/users", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name }) });
      toast.success("Ro'yxatdan o'tdingiz!");
      router.push("/"); router.refresh();
    } else toast.error("Xatolik");
    setLoading(false);
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-sm p-8">
        <div className="text-center mb-6"><span className="text-4xl">🐄</span><h1 className="text-2xl font-bold mt-2">Ro'yxatdan o'tish</h1></div>
        <form onSubmit={handleRegister} className="space-y-4">
          <Input label="Ism" placeholder="Ismingiz" value={name} onChange={e => setName(e.target.value)} />
          <Input label="Telefon" placeholder="+998 90 000 00 00" value={phone} onChange={e => setPhone(e.target.value)} />
          {!sent ? <Button type="button" className="w-full" onClick={sendOtp}>Kod olish</Button> : <>
            <Input label="Kod" placeholder="4 xonali kod" value={otp} onChange={e => setOtp(e.target.value)} />
            <Button type="submit" className="w-full" loading={loading}>Ro'yxatdan o'tish</Button>
          </>}
        </form>
        <p className="text-center text-sm text-gray-500 mt-4">Akkauntingiz bormi? <Link href="/login" className="text-primary hover:underline">Kirish</Link></p>
      </div>
    </div>
  );
}
