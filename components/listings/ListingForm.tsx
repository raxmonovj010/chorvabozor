"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { CATEGORIES, REGIONS } from "@/lib/utils";

export default function ListingForm() {
  const [step, setStep] = useState(0);
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<any>({ defaultValues: { count: 1 } });

  const uploadImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    setUploading(true);
    for (let i = 0; i < files.length; i++) {
      const fd = new FormData();
      fd.append("file", files[i]!);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const d = await res.json();
      setImages(p => [...p, d.url]);
    }
    setUploading(false);
  };

  const onSubmit = async (data: any) => {
    if (images.length === 0) { toast.error("Kamida 1 rasm"); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data, images,
          animal: { breed: data.breed, age: data.ageValue ? { value: Number(data.ageValue), unit: data.ageUnit || "yil" } : undefined, gender: data.gender, weight: data.weight ? Number(data.weight) : undefined, count: Number(data.count) || 1, isVaccinated: !!data.isVaccinated, withDocuments: !!data.withDocuments },
          location: { region: data.region, district: data.district },
        }),
      });
      if (!res.ok) throw Error();
      toast.success("Elon qo'shildi!");
      router.push("/"); router.refresh();
    } catch { toast.error("Xatolik"); } finally { setLoading(false); }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto">
      <div className="flex gap-1 mb-8 items-center">
        {["Kategoriya", "Ma'lumot", "Narx & Joy", "Rasmlar"].map((s, i) => (
          <div key={i} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${i <= step ? "bg-primary text-white" : "bg-gray-200 text-gray-500"}`}>{i + 1}</div>
            {i < 3 && <div className={`w-8 h-1 mx-1 ${i < step ? "bg-primary" : "bg-gray-200"}`} />}
          </div>
        ))}
      </div>

      {step === 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-4">Kategoriya</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {CATEGORIES.map(cat => (
              <button type="button" key={cat.id} onClick={() => { setValue("category", cat.id); setStep(1); }}
                className="p-4 rounded-xl border-2 border-gray-200 hover:border-primary text-center transition-all">
                <span className="text-3xl block mb-1">{cat.emoji}</span>
                <span className="font-medium text-sm">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-3">
          <h2 className="text-lg font-semibold mb-4">Hayvon haqida</h2>
          <Input label="Zoti" placeholder="Mas: Qorabosh" {...register("breed")} />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Yoshi" type="number" {...register("ageValue")} />
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Birlik</label>
              <select {...register("ageUnit")} className="w-full px-4 py-2.5 border rounded-lg text-sm"><option value="kun">Kun</option><option value="oy">Oy</option><option value="yil">Yil</option></select></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Jinsi</label>
              <select {...register("gender")} className="w-full px-4 py-2.5 border rounded-lg text-sm"><option value="">Tanlang</option><option value="erkak">Erkak</option><option value="urg'ocha">Urg'ochi</option></select></div>
            <Input label="Vazn (kg)" type="number" {...register("weight")} />
          </div>
          <Input label="Soni" type="number" {...register("count")} />
          <div className="flex gap-4">
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" {...register("isVaccinated")} className="w-4 h-4" /> Vaksina qilingan</label>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" {...register("withDocuments")} className="w-4 h-4" /> Hujjatli</label>
          </div>
          <div className="flex gap-3 pt-3">
            <Button type="button" variant="outline" onClick={() => setStep(0)}>Orqaga</Button>
            <Button type="button" onClick={() => setStep(2)}>Davom</Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-3">
          <h2 className="text-lg font-semibold mb-4">Narx va joy</h2>
          <Input label="Narx (so'm)" type="number" {...register("price", { required: true })} />
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" {...register("priceNegotiable")} className="w-4 h-4" /> Narx kelishiladi</label>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Viloyat</label>
            <select {...register("region", { required: true })} className="w-full px-4 py-2.5 border rounded-lg text-sm"><option value="">Tanlang</option>{REGIONS.map(r => <option key={r} value={r}>{r}</option>)}</select></div>
          <Input label="Tuman" {...register("district")} />
          <Input label="Telefon" {...register("phone", { required: true })} />
          <div className="flex gap-3 pt-3">
            <Button type="button" variant="outline" onClick={() => setStep(1)}>Orqaga</Button>
            <Button type="button" onClick={() => setStep(3)}>Davom</Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-3">
          <h2 className="text-lg font-semibold mb-4">Rasmlar</h2>
          <div className="grid grid-cols-4 gap-2">
            {images.map((url, i) => (
              <div key={i} className="relative h-20 bg-gray-100 rounded-lg overflow-hidden">
                <img src={url} alt="" className="w-full h-full object-cover" />
                <button type="button" onClick={() => setImages(p => p.filter((_, j) => j !== i))} className="absolute top-0.5 right-0.5 bg-red-500 text-white w-5 h-5 rounded-full text-xs">x</button>
              </div>
            ))}
            {images.length < 8 && <label className="h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-primary"><span className="text-2xl text-gray-400">{uploading ? "..." : "+"}</span><input type="file" accept="image/*" multiple className="hidden" onChange={uploadImg} /></label>}
          </div>
          <p className="text-xs text-gray-400">{images.length}/8 rasm</p>
          <div className="flex gap-3 pt-3">
            <Button type="button" variant="outline" onClick={() => setStep(2)}>Orqaga</Button>
            <Button type="submit" loading={loading}>Elon qo'shish</Button>
          </div>
        </div>
      )}
    </form>
  );
}
