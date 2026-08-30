import React, { useEffect, useState, useMemo } from 'react';
import { Hexagon } from 'lucide-react';
import { useLoading } from '../i18n/LoadingContext';
import { useLanguage } from '../i18n/LanguageContext';

interface PageLoaderProps {
  onComplete?: () => void;
}

/** Company info snippets that cycle while loading */
const CYCLE_TEXTS: Record<string, string[]> = {
  uz: [
    '1999-yildan buyon Samarqandda tabiiy ipak ishlab chiqaramiz',
    '100% Mulberry 6A — eng oliy ipak toifasi',
    "Pilladan to tayyor san'atgacha — to'liq ishlab chiqarish sikli",
    "Kattaqo'rg'on — qadimiy Ipak Yo'lining dilidagi fabrika",
    'Bepul yetkazib berish — butun O\'zbekiston bo\'ylab',
    'Antiallergen va teriga foydali tabiiy tolalar',
    'Eksklyuziv sovg\'a qadoqlash — atlas lenta va mualliflik qutisi',
  ],
  ru: [
    'Производим натуральный шёлк в Самарканде с 1999 года',
    '100% Mulberry 6A — высшая категория шёлка',
    'От кокона до произведения искусства — полный цикл',
    'Каттакурган — фабрика на древнем Шёлковом пути',
    'Бесплатная доставка по всему Узбекистану',
    'Гипоаллергенные натуральные волокна, полезные для кожи',
    'Эксклюзивная подарочная упаковка с атласными лентами',
  ],
  en: [
    'Crafting natural silk in Samarkand since 1999',
    '100% Mulberry 6A — the highest silk grade',
    'From cocoon to masterpiece — full production cycle',
    'Kattakurgan — heritage factory on the Silk Road',
    'Free delivery across all of Uzbekistan',
    'Hypoallergenic natural fibers, beneficial for skin',
    'Exclusive gift packaging with signature satin ribbons',
  ],
};

export const PageLoader: React.FC<PageLoaderProps> = ({ onComplete }) => {
  const [isFading, setIsFading] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isSliding, setIsSliding] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const [textOpacity, setTextOpacity] = useState(0);

  const { state } = useLoading();
  const { language } = useLanguage();

  const { totalFrames, loadedFrames, isFullyLoaded } = state;
  const progress = totalFrames > 0 ? Math.round((loadedFrames / totalFrames) * 100) : 0;

  const cycleTexts = useMemo(() => CYCLE_TEXTS[language] || CYCLE_TEXTS.uz, [language]);

  // Cycle through company info texts
  useEffect(() => {
    if (isFullyLoaded) return;

    // Fade in first text immediately
    setTextOpacity(1);

    const interval = setInterval(() => {
      // Fade out
      setTextOpacity(0);
      // After fade out, swap text and fade in
      setTimeout(() => {
        setTextIndex((prev) => (prev + 1) % cycleTexts.length);
        setTextOpacity(1);
      }, 400);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, [isFullyLoaded, cycleTexts.length]);

  // When fully loaded → show 100% briefly, then slide up
  useEffect(() => {
    if (!isFullyLoaded) return;

    // 1. Wait 600ms so user sees 100%
    const slideTimer = setTimeout(() => {
      setIsSliding(true);
    }, 600);

    // 2. After slide animation (600ms), fade out and hide
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 1200);

    const hideTimer = setTimeout(() => {
      setIsHidden(true);
      onComplete?.();
    }, 1800); // 600ms pause + 600ms slide + 600ms fade

    return () => {
      clearTimeout(slideTimer);
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, [isFullyLoaded, onComplete]);

  if (isHidden) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0a0a] select-none transition-opacity ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{ transitionDuration: '600ms' }}
    >
      <div
        className={`flex flex-col items-center justify-center gap-5 transition-transform ease-in-out ${
          isSliding ? '-translate-y-[60vh]' : 'translate-y-0'
        }`}
        style={{ transitionDuration: '600ms' }}
      >
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

        {/* Cycling company info text */}
        <div className="h-5 flex items-center justify-center overflow-hidden">
          <p
            className="text-[11px] sm:text-xs text-white/50 tracking-wide text-center max-w-xs transition-opacity"
            style={{ opacity: textOpacity, transitionDuration: '400ms' }}
          >
            {cycleTexts[textIndex]}
          </p>
        </div>
      </div>
    </div>
  );
};
