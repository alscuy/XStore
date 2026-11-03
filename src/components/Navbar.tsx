import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';

export const Navbar = ({ totalCartCount }: { totalCartCount: number }) => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/products', label: 'Products' },
    { path: '/cart', label: 'Cart', icon: <ShoppingBag className="w-4 h-4" />, badge: totalCartCount }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group cursor-pointer">
          <span className="font-bold text-xl tracking-tight text-zinc-900">XStore<span className="text-emerald-600">.</span></span>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          {navItems.map((item) => {
            const isActive = item.path === '/' ? location.pathname === '/' : location.pathname.startsWith(item.path);
            return (
              <Link 
                key={item.path}
                to={item.path}
                className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-colors ${
                  isActive ? 'text-emerald-600 bg-emerald-50/70 font-semibold' : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="bg-emerald-600 text-white text-[11px] font-bold px-1.5 py-0.2 rounded-full min-w-[20px] text-center shadow-xs">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
};