import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Plus } from 'lucide-react';
import { products } from '../data/products';
import { Button } from '../components/ui/button';
import { QuantityControl } from '../components/QuantityControl';
import { CartState } from '../types';

const focus: Record<number, string> = { 1: 'object-right' };
const display = "font-['Bricolage_Grotesque',sans-serif]";
const brand = "bg-[#123524] text-white hover:bg-[#1c4a33]";
const ALL = 'Semua';

export const Products = ({
  cart, onAddToCart, onRemoveFromCart
}: {
  cart: CartState; onAddToCart: (id: number) => void; onRemoveFromCart: (id: number) => void;
}) => {
  const navigate = useNavigate();
  const [active, setActive] = useState(ALL);
  const categories = [ALL, ...Array.from(new Set(products.map((p) => p.category)))];
  const visible = active === ALL ? products : products.filter((p) => p.category === active);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className={`${display} text-4xl font-extrabold tracking-tight text-[#123524]`}>Produk</h1>
          <p className="mt-1 text-sm text-zinc-500">{visible.length} produk tersedia</p>
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter kategori">
          {categories.map((c) => (
            <Button
              key={c}
              size="sm"
              variant={active === c ? 'brand' : 'outline'}
              onClick={() => setActive(c)}
              aria-pressed={active === c}
              className={`rounded-full ${active === c ? brand : ''}`}
            >
              {c}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((product) => {
          const qty = cart[product.id] || 0;
          return (
            <article key={product.id} className="flex flex-col">
              <button
                onClick={() => navigate(`/products/${product.id}`)}
                className="block aspect-square w-full overflow-hidden rounded-xl bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#123524]"
                aria-label={`Lihat detail ${product.name}`}
              >
                <img src={product.image} alt={product.name} className={`h-full w-full object-cover ${focus[product.id] ?? ''}`} />
              </button>
              <div className="mt-4 flex items-baseline justify-between gap-3">
                <h3 className="font-semibold text-zinc-900">{product.name}</h3>
                <p className="shrink-0 font-bold text-[#123524]">Rp {product.price.toLocaleString('id-ID')}</p>
              </div>
              <p className="mt-0.5 text-sm text-zinc-500">{product.category}</p>
              <div className="mt-4 flex items-center gap-3">
                <Button variant="outline" className="w-1/2" onClick={() => navigate(`/products/${product.id}`)}>
                  <Eye className="h-3.5 w-3.5" /> Detail
                </Button>
                <div className="w-1/2">
                  {qty > 0 ? (
                    <QuantityControl qty={qty} onIncrement={() => onAddToCart(product.id)} onDecrement={() => onRemoveFromCart(product.id)} className="w-full" />
                  ) : (
                    <Button variant="brand" className={`w-full ${brand}`} onClick={() => onAddToCart(product.id)}>
                      <Plus className="h-3.5 w-3.5" /> Tambah
                    </Button>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};