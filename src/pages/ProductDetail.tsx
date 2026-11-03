import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Plus } from 'lucide-react';
import { products } from '../data/products';
import { Button } from '../components/ui/button';
import { QuantityControl } from '../components/QuantityControl';
import { CartState } from '../types';

const focus: Record<number, string> = { 1: 'object-right' };

const display = "font-['Bricolage_Grotesque',sans-serif]";

export const ProductDetail = ({
  cart, onAddToCart, onRemoveFromCart
}: {
  cart: CartState; onAddToCart: (id: number) => void; onRemoveFromCart: (id: number) => void;
}) => {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center">
        <h2 className={`${display} text-2xl font-bold text-zinc-900`}>Produk tidak ditemukan</h2>
        <p className="mt-2 text-sm text-zinc-500">Produk ini mungkin sudah dihapus atau tautannya salah.</p>
        <Link to="/products"><Button variant="outline" className="mt-5">Kembali ke produk</Button></Link>
      </div>
    );
  }

  const qty = cart[product.id] || 0;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <nav className="mb-6 flex items-center gap-1.5 text-sm text-zinc-500" aria-label="Breadcrumb">
        <Link to="/products" className="hover:text-zinc-900">Produk</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-zinc-900">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <div className="aspect-square w-full overflow-hidden rounded-xl bg-zinc-100">
          <img src={product.image} alt={product.name} className={`h-full w-full object-cover ${focus[product.id] ?? ''}`} />
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-sm font-medium text-zinc-500">{product.category}</p>
          <h1 className={`${display} mt-1 text-4xl font-extrabold tracking-tight text-[#123524]`}>{product.name}</h1>
          <p className="mt-4 inline-block w-fit rounded-md bg-[#F2B632] px-3 py-1 text-xl font-bold text-[#123524]">
            Rp {product.price.toLocaleString('id-ID')}
          </p>
          <p className="mt-6 max-w-prose text-base leading-relaxed text-zinc-600">{product.description}</p>

          <div className="mt-8 border-t border-zinc-200 pt-6">
            {qty > 0 ? (
              <div className="flex items-center gap-4">
                <QuantityControl qty={qty} onIncrement={() => onAddToCart(product.id)} onDecrement={() => onRemoveFromCart(product.id)} size="lg" className="flex-1" />
                <Link to="/cart" className="font-semibold text-[#123524] underline underline-offset-4">Buka keranjang</Link>
              </div>
            ) : (
              <button
                onClick={() => onAddToCart(product.id)}
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#123524] font-semibold text-white transition-colors hover:bg-[#1c4a33] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#123524]"
              >
                <Plus className="h-4 w-4" /> Tambah ke keranjang
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};