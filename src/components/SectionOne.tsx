import React from 'react';
import { ChevronRight, ArrowDown } from 'lucide-react';
import { Reveal } from './Reveal';
import { SectionScrubVideo } from './SectionScrubVideo';
import { useLanguage } from '../i18n/LanguageContext';

const MITHA_PORTRAIT_URL =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260728_050334_5b076e26-0ce7-4898-b432-d764190e448f.png&w=1280&q=85';

interface SectionOneProps {
  onOpenOrderModal?: () => void;
  progress: number;
  onNextSection?: () => void;
}

export const SectionOne: React.FC<SectionOneProps> = ({
  onOpenOrderModal,
  progress,
  onNextSection,
}) => {
  const { t } = useLanguage();
  const isCompleted = progress >= 0.99;

  return (
    <section
      id="section-hero"
      className="relative h-screen supports-[height:100svh]:h-[100svh] min-h-[580px] w-full overflow-hidden flex flex-col justify-between pt-20 sm:pt-28 pb-12 sm:pb-14 px-4 sm:px-8 md:px-12"
    >
      {/* Controlled 1.mp4 video background */}
      <SectionScrubVideo
        videoSrc="/1.mp4"
        posterSrc="/v1_start.jpg"
        progress={progress}
        overlayClassName="bg-black/40"
      />

      {/* Foreground Content Shell */}
      <div className="relative z-10 flex flex-col justify-between h-full w-full pointer-events-auto">
        {/* Top spacer */}
        <div className="w-full" />

        {/* Center prompt when video reaches 100% */}
        {isCompleted && (
          <div className="my-auto py-2 flex justify-center animate-bounce z-20">
            <button
              type="button"
              onClick={onNextSection}
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/75 px-4 sm:px-5 py-2 sm:py-2.5 text-xs font-semibold text-white backdrop-blur-md hover:bg-white hover:text-black transition-all shadow-2xl cursor-pointer"
            >
              <span>{t.hero.nextSection}</span>
              <ArrowDown size={14} />
            </button>
          </div>
        )}

        {/* Bottom row */}
        <div className="mt-auto pt-4 sm:pt-6 flex flex-col items-center sm:items-start md:items-end gap-5 sm:gap-8 md:flex-row justify-between w-full">
          {/* Left column: Badge, Title and Subtitle placed directly under Title */}
          <div className="max-w-2xl text-center sm:text-left flex flex-col items-center sm:items-start w-full sm:w-auto">
            {/* Desktop Badge: visible only on desktop */}
            <div className="hidden sm:block">
              <Reveal delay={150}>
                <div className="mb-4 sm:mb-5 inline-flex items-center border-l-2 border-white bg-black/50 border border-white/20 px-3 py-1.5 backdrop-blur-md shadow-lg">
                  <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-white font-medium">
                    {t.hero.badge}
                  </span>
                </div>
              </Reveal>
            </div>

            {/* H1 Headline */}
            <Reveal delay={280}>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-normal leading-[1.08] tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)] text-center sm:text-left">
                {t.hero.titleLine1}<br />
                {t.hero.titleLine2}
              </h1>
            </Reveal>

            {/* Subtitle placed directly under the Title on both desktop and mobile */}
            <div className="mt-2.5 sm:mt-4 mb-2 max-w-sm sm:max-w-xl text-center sm:text-left">
              <Reveal delay={350}>
                <p className="text-xs sm:text-base lg:text-lg leading-relaxed text-white/85 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] font-normal text-center sm:text-left">
                  {t.hero.description}
                </p>
              </Reveal>
            </div>
          </div>

          {/* Mobile Only: Glass contact card stays at bottom on mobile */}
          <div className="sm:hidden self-center">
            <Reveal delay={420}>
              <div className="flex items-center gap-3 rounded-xl bg-black/60 border border-white/20 p-2.5 backdrop-blur-md shadow-2xl">
                <img
                  src={MITHA_PORTRAIT_URL}
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src !== window.location.origin + '/mitha.webp') {
                      target.src = '/mitha.webp';
                    }
                  }}
                  alt="Maftuna, Silk Aura bosh maslahatchisi"
                  className="h-16 w-14 rounded-lg object-cover shadow-inner border border-white/20"
                />
                <div className="flex flex-col gap-1 pr-1">
                  <span className="text-xs font-medium text-white drop-shadow-sm">
                    {t.hero.consultationTitle}
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-white/70">
                    {t.hero.consultationRole}
                  </span>
                  <button
                    type="button"
                    onClick={onOpenOrderModal}
                    className="mt-1 inline-flex items-center justify-center gap-1 rounded-full bg-white px-3.5 py-1.5 text-[11px] font-semibold text-black transition-colors duration-300 hover:bg-white/85 active:scale-[0.98] shadow-md cursor-pointer whitespace-nowrap"
                  >
                    <span>{t.hero.consultationCta}</span>
                    <ChevronRight size={13} className="stroke-[2.5]" />
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};
