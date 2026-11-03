import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { products } from '../data/products';

const focus: Record<number, string> = { 1: 'object-right' };
const display = "font-['Bricolage_Grotesque',sans-serif]";

export const Home = () => {
  const picks = products.slice(0, 4);
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20 grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
      <div>
        <h1 className={`${display} text-5xl sm:text-7xl font-extrabold tracking-tight leading-[1.02] text-[#123524]`}>
          Produk pilihan, harga yang jelas.
        </h1>
        <p className="mt-6 max-w-md text-lg leading-relaxed text-zinc-600">
          XStore menyajikan koleksi 2026. Pilih yang kamu suka, masukkan ke keranjang, selesai.
        </p>
        <Link
          to="/products"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#123524] px-6 py-3.5 font-semibold text-white transition-colors hover:bg-[#1c4a33] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#123524]"
        >
          Lihat semua produk <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {picks.map((p, i) => (
          <Link
            key={p.id}
            to={`/products/${p.id}`}
            className={`relative block overflow-hidden rounded-xl bg-zinc-100 aspect-square ${i % 2 === 1 ? 'mt-10' : ''}`}
          >
            <img src={p.image} alt={p.name} className={`h-full w-full object-cover ${focus[p.id] ?? ''}`} />
            <span className="absolute bottom-3 left-3 rounded-md bg-[#F2B632] px-2.5 py-1 text-sm font-bold text-[#123524]">
              Rp {p.price.toLocaleString('id-ID')}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};