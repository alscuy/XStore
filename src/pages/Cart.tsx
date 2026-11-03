import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2 } from 'lucide-react';
import { products } from '../data/products';
import { Button } from '../components/ui/button';
import { QuantityControl } from '../components/QuantityControl';
import { CartState } from '../types';

const display = "font-['Bricolage_Grotesque',sans-serif]";

export const Cart = ({
  cart, onAddToCart, onRemoveFromCart, onClearItem, onCheckout
}: {
  cart: CartState; onAddToCart: (id: number) => void; onRemoveFromCart: (id: number) => void; onClearItem: (id: number) => void; onCheckout: () => void;
}) => {
  const navigate = useNavigate();
  const cartItems = products.filter((p) => (cart[p.id] || 0) > 0).map((p) => ({ ...p, quantity: cart[p.id] }));
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalQty = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-20 text-center">
        <ShoppingBag className="mx-auto h-10 w-10 text-zinc-300" />
        <h1 className={`${display} mt-5 text-3xl font-extrabold text-[#123524]`}>Keranjang kosong</h1>
        <p className="mx-auto mt-2 max-w-sm text-sm text-zinc-500">Tambahkan produk dari katalog, lalu kembali ke sini untuk checkout.</p>
        <Link
          to="/products"
          className="mt-6 inline-flex items-center rounded-lg bg-[#123524] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#1c4a33]"
        >
          Lihat produk
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <h1 className={`${display} text-4xl font-extrabold tracking-tight text-[#123524]`}>Keranjang</h1>
      <p className="mt-1 text-sm text-zinc-500">{totalQty} barang dari {cartItems.length} produk</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px] lg:items-start">
        <ul className="divide-y divide-zinc-200 border-y border-zinc-200">
          {cartItems.map((item) => (
            <li key={item.id} className="flex items-center gap-4 py-5">
              <Link to={`/products/${item.id}`} className="shrink-0">
                <img src={item.image} alt={item.name} className="h-20 w-20 rounded-lg bg-zinc-100 object-cover" />
              </Link>
              <div className="min-w-0 flex-1">
                <Link to={`/products/${item.id}`} className="block truncate font-semibold text-zinc-900 hover:underline">{item.name}</Link>
                <p className="mt-0.5 text-sm text-zinc-500">Rp {item.price.toLocaleString('id-ID')} per item</p>
                <p className="mt-1 font-bold text-[#123524]">Rp {(item.price * item.quantity).toLocaleString('id-ID')}</p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-2 sm:flex-row sm:items-center sm:gap-3">
                <QuantityControl qty={item.quantity} onIncrement={() => onAddToCart(item.id)} onDecrement={() => onRemoveFromCart(item.id)} size="sm" />
                <Button variant="danger" size="icon" onClick={() => onClearItem(item.id)} aria-label={`Hapus ${item.name}`}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </li>
          ))}
        </ul>

        <aside className="rounded-xl bg-[#123524] p-6 text-white lg:sticky lg:top-24">
          <h2 className={`${display} text-lg font-bold`}>Ringkasan</h2>
          <dl className="mt-4 space-y-2 text-sm text-white/75">
            <div className="flex justify-between"><dt>Jumlah barang</dt><dd>{totalQty}</dd></div>
          </dl>
          <div className="mt-4 border-t border-white/20 pt-4">
            <p className="text-sm text-white/75">Total pembayaran</p>
            <p className={`${display} mt-1 text-3xl font-extrabold`}>Rp {totalPrice.toLocaleString('id-ID')}</p>
          </div>
          <button
            onClick={() => { onCheckout(); navigate('/'); }}
            className="mt-6 h-12 w-full rounded-lg bg-[#F2B632] font-bold text-[#123524] transition-colors hover:bg-[#f6c555] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Bayar sekarang
          </button>
        </aside>
      </div>
    </div>
  );
};