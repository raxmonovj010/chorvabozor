"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const sendOtp = () => {
    if (phone.length < 9) { toast.error("Telefon raqamni kiriting"); return; }
    const code = Math.floor(1000 + Math.random() * 9000);
    console.log(`[OTP] ${phone}: ${code}`);
    toast.success(`Kod: ${code}`);
    setSent(true);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true);
    const r = await signIn("phone", { phone, otp, redirect: false });
    if (r?.ok) { toast.success("Xush kelibsiz!"); router.push("/"); router.refresh(); }
    else toast.error("Xatolik");
    setLoading(false);
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-sm p-8">
        <div className="text-center mb-6"><span className="text-4xl">🐄</span><h1 className="text-2xl font-bold mt-2">Kirish</h1></div>
        <form onSubmit={handleLogin} className="space-y-4">
          <Input label="Telefon" placeholder="+998 90 000 00 00" value={phone} onChange={e => setPhone(e.target.value)} />
          {!sent ? <Button type="button" className="w-full" onClick={sendOtp}>Kod olish</Button> : <>
            <Input label="Kod" placeholder="4 xonali kod" value={otp} onChange={e => setOtp(e.target.value)} />
            <Button type="submit" className="w-full" loading={loading}>Kirish</Button>
          </>}
        </form>
        <div className="mt-4"><div className="relative mb-4"><div className="absolute inset-0 flex items-center"><div className="w-full border-t" /></div><div className="relative flex justify-center text-sm"><span className="bg-white px-2 text-gray-500">Yoki</span></div></div>
          <Button type="button" variant="outline" className="w-full" onClick={() => signIn("google", { callbackUrl: "/" })}>
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>Google
          </Button>
        </div>
      </div>
    </div>
  );
}
