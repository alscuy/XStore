import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'danger' | 'emerald' | 'brand' | 'accent'   ;
  size?: 'sm' | 'md' | 'lg' | 'icon';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'emerald',
  size = 'md',
  className = '',
  children,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer select-none";
  
  const variants = {
    emerald: "bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm shadow-emerald-600/20",
    outline: "border border-zinc-200 bg-white hover:bg-zinc-50 hover:border-zinc-300 text-zinc-800",
    ghost: "hover:bg-zinc-100 text-zinc-600 hover:text-zinc-900",
    danger: "bg-red-50 text-red-600 hover:bg-red-100 border border-red-100",
    default: "bg-zinc-900 text-white hover:bg-zinc-800 shadow-sm",
    brand: "bg-brand text-white hover:bg-brand-hover",
    accent: "bg-accent text-brand hover:bg-accent-hover",
  };

  const sizes = {
    sm: "h-9 px-3 text-xs gap-1.5",
    md: "h-10 px-4 text-sm gap-2",
    lg: "h-12 px-6 text-base gap-2.5 rounded-2xl",
    icon: "h-9 w-9 p-0 rounded-xl",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
};