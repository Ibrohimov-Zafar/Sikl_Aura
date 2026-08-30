import React, { useEffect, useState } from 'react';
import { Hexagon } from 'lucide-react';
import { useLoading } from '../i18n/LoadingContext';

interface PageLoaderProps {
  onComplete?: () => void;
}

export const PageLoader: React.FC<PageLoaderProps> = ({ onComplete }) => {
  const [isFading, setIsFading] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const { state } = useLoading();

  const { totalFrames, loadedFrames, isFullyLoaded } = state;
  const progress = totalFrames > 0 ? Math.round((loadedFrames / totalFrames) * 100) : 0;

  useEffect(() => {
    if (!isFullyLoaded) return;

    // Once fully loaded, start fade out after a tiny delay so user sees 100%
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 400);

    const hideTimer = setTimeout(() => {
      setIsHidden(true);
      onComplete?.();
    }, 1100); // 400ms pause + 700ms fade

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, [isFullyLoaded, onComplete]);

  if (isHidden) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0a0a] transition-opacity duration-700 select-none ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center justify-center gap-6">
        {/* Circular progress loader */}
        <div className="relative w-16 h-16">
          <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="3"
              fill="none"
            />
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="white"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 28}`}
              strokeDashoffset={`${2 * Math.PI * 28 * (1 - progress / 100)}`}
              className="transition-all duration-300"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center font-mono text-[11px] font-medium text-white/90">
            {progress}%
          </span>
        </div>

        {/* Logo */}
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
