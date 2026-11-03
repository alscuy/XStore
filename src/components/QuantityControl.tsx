import React from 'react';
import { Plus, Minus } from 'lucide-react';

interface QuantityControlProps {
  qty: number;
  onIncrement: () => void;
  onDecrement: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const QuantityControl: React.FC<QuantityControlProps> = ({ 
  qty, onIncrement, onDecrement, className = "", size = 'md' 
}) => {
  const isSm = size === 'sm';
  const isLg = size === 'lg';

  return (
    <div className={`flex items-center justify-between bg-zinc-100/80 rounded-xl p-1 border border-zinc-200/70 transition-all ${className}`}>
      <button onClick={onDecrement} className={`${isSm ? 'w-7 h-7' : isLg ? 'w-10 h-10' : 'w-8 h-8'} rounded-lg bg-white text-zinc-700 hover:bg-zinc-200/70 active:scale-95 flex items-center justify-center transition-all shadow-xs border border-zinc-200/50`}>
        <Minus className={isSm ? "w-3 h-3" : isLg ? "w-4 h-4" : "w-3.5 h-3.5"} />
      </button>
      <span className={`font-bold text-zinc-800 px-2 text-center select-none ${isSm ? 'text-xs min-w-[20px]' : isLg ? 'text-base min-w-[32px]' : 'text-sm min-w-[24px]'}`}>
        {qty}
      </span>
      <button onClick={onIncrement} className={`${isSm ? 'w-7 h-7' : isLg ? 'w-10 h-10' : 'w-8 h-8'} rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 active:scale-95 flex items-center justify-center transition-all shadow-xs`}>
        <Plus className={isSm ? "w-3 h-3" : isLg ? "w-4 h-4" : "w-3.5 h-3.5"} />
      </button>
    </div>
  );
};