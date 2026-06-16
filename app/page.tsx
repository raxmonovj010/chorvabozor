import Link from "next/link";
import { CATEGORIES } from "@/lib/utils";
import ClientHome from "./client-home";

export default function HomePage() {
  return (
    <>
      <section className="bg-gradient-to-br from-green-50 to-white py-16 md:py-24 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Chorva mollaringizni <span className="text-primary">soting</span>
        </h1>
        <p className="text-gray-600 mb-8 max-w-xl mx-auto">
          O'zbekiston bo'ylab chorva mollari savdo platformasi. Bepul elon qo'shing!
        </p>
        <Link href="/listings" className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors">
          Elonlarni ko'rish
        </Link>
      </section>

      <section className="py-12 max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Kategoriyalar</h2>
        <div className="grid grid-cols-4 md:grid-cols-7 gap-4">
          {CATEGORIES.map((cat) => (
            <Link key={cat.id} href={`/listings?category=${cat.id}`} className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md border-2 border-transparent hover:border-primary transition-all">
              <span className="text-3xl mb-1">{cat.emoji}</span>
              <span className="text-sm font-medium">{cat.label}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-primary text-white py-8">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-3 gap-4 text-center">
          <div><p className="text-3xl font-bold">10,000+</p><p className="text-sm opacity-80">Elonlar</p></div>
          <div><p className="text-3xl font-bold">50+</p><p className="text-sm opacity-80">Viloyatlar</p></div>
          <div><p className="text-3xl font-bold">500+</p><p className="text-sm opacity-80">Sotuvchilar</p></div>
        </div>
      </section>

      <ClientHome />
    </>
  );
}
