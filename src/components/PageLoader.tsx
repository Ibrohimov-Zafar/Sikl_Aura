import React, { useEffect, useState } from 'react';
import { Hexagon } from 'lucide-react';

interface PageLoaderProps {
  onComplete?: () => void;
}

export const PageLoader: React.FC<PageLoaderProps> = ({ onComplete }) => {
  const [isFading, setIsFading] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    // Exactly 3 seconds (3000ms)
    const timer = setTimeout(() => {
      setIsFading(true);
      setTimeout(() => {
        setIsHidden(true);
        onComplete?.();
      }, 700); // 700ms smooth fade out
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (isHidden) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0a0a] transition-opacity duration-700 select-none ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center justify-center gap-6">
        {/* Minimalist circular loader above the logo */}
        <div className="w-12 h-12 rounded-full border-2 border-white/15 border-t-white animate-spin" />

        {/* Minimalist Logo */}
        <div className="flex items-center gap-2.5 text-white">
          <Hexagon size={28} strokeWidth={1.5} className="text-white" />
          <span className="text-xl sm:text-2xl font-semibold tracking-[0.2em] uppercase">
            Silk Aura
          </span>
        </div>
      </div>
    </div>
  );
};
