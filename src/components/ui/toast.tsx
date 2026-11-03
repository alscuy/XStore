import { CheckCircle2 } from 'lucide-react';

export const Toast = ({ message }: { message: string | null }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 bg-zinc-900 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center space-x-2 text-sm font-medium animate-in fade-in slide-in-from-bottom-3 duration-200">
      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
      <span>{message}</span>
    </div>
  );
};