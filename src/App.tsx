import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { products } from "./data/products";
import { CartState } from "./types/index";
import { Navbar } from "./components/Navbar";
import { Toast } from "./components/ui/toast";
import { Home } from "./pages/Home";
import { Products } from "./pages/Products";
import { ProductDetail } from "./pages/ProductDetail";
import { Cart } from "./pages/Cart";

export default function App() {
  const [cart, setCart] = useState<CartState>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2000);
  };

  const handleAddToCart = (id: number) => {
    const product = products.find((p) => p.id === id);
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    if (product) showToast(`1 item "${product.name}" ditambahkan`);
  };

  const handleRemoveFromCart = (id: number) => {
    setCart((prev) => {
      const currentQty = prev[id] || 0;
      if (currentQty <= 1) {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      }
      return { ...prev, [id]: currentQty - 1 };
    });
  };

  const handleClearItem = (id: number) => {
    setCart((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };

  const handleCheckout = () => {
    setCart({});
    showToast("Pesanan berhasil dibuat!");
  };

  const totalCartCount = Object.values(cart).reduce((sum, q) => sum + q, 0);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-zinc-50/50 text-zinc-900 flex flex-col font-sans antialiased">
        <Toast message={toastMessage} />
        <Navbar totalCartCount={totalCartCount} />
        
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products cart={cart} onAddToCart={handleAddToCart} onRemoveFromCart={handleRemoveFromCart} />} />
            <Route path="/products/:id" element={<ProductDetail cart={cart} onAddToCart={handleAddToCart} onRemoveFromCart={handleRemoveFromCart} />} />
            <Route path="/cart" element={<Cart cart={cart} onAddToCart={handleAddToCart} onRemoveFromCart={handleRemoveFromCart} onClearItem={handleClearItem} onCheckout={handleCheckout} />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}