import React from 'react';
import { ChevronRight, ArrowDown } from 'lucide-react';
import { Reveal } from './Reveal';
import { SectionScrubVideo } from './SectionScrubVideo';
import { useLanguage } from '../i18n/LanguageContext';

interface SectionTwoProps {
  onOpenOrderModal?: () => void;
  progress: number;
  onNextSection?: () => void;
}

export const SectionTwo: React.FC<SectionTwoProps> = ({
  onOpenOrderModal,
  progress,
  onNextSection,
}) => {
  const { t } = useLanguage();
  const isCompleted = progress >= 0.99;

  return (
    <section
      id="section-gift"
      className="relative h-screen supports-[height:100svh]:h-[100svh] min-h-[580px] w-full overflow-hidden flex flex-col justify-between pt-20 sm:pt-28 pb-12 sm:pb-12 px-4 sm:px-8 md:px-12"
    >
      {/* Video scrub sequence from 2.mp4 */}
      <SectionScrubVideo
        videoSrc="/2.mp4"
        posterSrc="/v2_start.jpg"
        progress={progress}
        overlayClassName="bg-black/50"
      />

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col justify-between h-full pointer-events-auto">
        {/* Top row: Capability card moved to the top-right on desktop */}
        <div className="flex items-start justify-end w-full">
          {/* Desktop Right — Frosted capability panel brought up to the top-right */}
          <div className="hidden md:block w-full max-w-md rounded-2xl border border-white/20 bg-black/55 backdrop-blur-md px-4 sm:px-6 shadow-2xl">
            {t.sectionTwo.capabilities.map((item, i) => (
              <Reveal key={item.id} delay={150 + i * 80}>
                <div
                  className={`group flex gap-3.5 sm:gap-4 py-3 sm:py-3.5 cursor-pointer ${
                    i !== t.sectionTwo.capabilities.length - 1 ? 'border-b border-white/15' : ''
                  }`}
                >
                  <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.15em] text-white/70 pt-0.5 select-none font-semibold">
                    {item.id}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm sm:text-base font-medium text-white transition-colors duration-300 group-hover:text-white drop-shadow-sm">
                        {item.title}
                      </span>
                      <ChevronRight
                        size={14}
                        className="text-white/50 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-white"
                      />
                    </div>
                    <p className="mt-0.5 text-xs leading-relaxed text-white/80 font-normal">
                      {item.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Bottom area: Title & CTAs on the left, clear view on the right */}
        <div className="mt-auto pt-4 sm:pt-8 flex-1 flex flex-col justify-end">
          <div className="flex flex-col items-center sm:items-start md:items-end gap-5 md:flex-row justify-between w-full">
            {/* Left column: Centered on mobile, stretched on desktop */}
            <div className="max-w-2xl lg:max-w-3xl text-center sm:text-left flex flex-col items-center sm:items-start w-full">
              {/* H2 Headline: stretched out nicely on desktop */}
              <Reveal delay={150}>
                <h2 className="text-3xl sm:text-5xl lg:text-6xl xl:text-[68px] font-normal leading-[1.1] tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)] text-center sm:text-left">
                  {t.sectionTwo.titleLine1} <span className="block sm:inline lg:block xl:inline">{t.sectionTwo.titleLine2}</span>
                </h2>
              </Reveal>

              {/* Subtitle Body */}
              <Reveal delay={250}>
                <p className="mt-3 sm:mt-5 max-w-md lg:max-w-xl text-xs sm:text-sm md:text-base text-white/90 drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)] leading-relaxed text-center sm:text-left mx-auto sm:mx-0">
                  {t.sectionTwo.description}
                </p>
              </Reveal>

              {/* Dual CTAs: centered on mobile, left on desktop */}
              <Reveal delay={350}>
                <div className="mt-3.5 sm:mt-8 flex flex-wrap items-center justify-center sm:justify-start gap-2.5 sm:gap-3">
                  <a
                    href="#collection"
                    className="inline-flex items-center justify-center gap-1.5 rounded-full bg-white px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-semibold text-black transition-all duration-300 hover:bg-white/85 active:scale-[0.98] shadow-md cursor-pointer whitespace-nowrap"
                  >
                    <span>{t.sectionTwo.catalogCta}</span>
                    <ChevronRight size={14} className="stroke-[2.5]" />
                  </a>

                  <button
                    type="button"
                    onClick={onOpenOrderModal}
                    className="inline-flex items-center justify-center rounded-full border border-white/30 bg-black/45 backdrop-blur-md px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-medium text-white transition-all duration-300 hover:bg-white/20 active:scale-[0.98] shadow-sm cursor-pointer whitespace-nowrap"
                  >
                    {t.sectionTwo.deliveryCta}
                  </button>

                  {/* Indicator when completed */}
                  {isCompleted && (
                    <button
                      type="button"
                      onClick={onNextSection}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/40 bg-white/25 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md hover:bg-white hover:text-black transition-all shadow-xl cursor-pointer animate-pulse whitespace-nowrap"
                    >
                      <span>{t.sectionTwo.collectionCta}</span>
                      <ArrowDown size={14} />
                    </button>
                  )}
                </div>
              </Reveal>

              {/* Mobile Only: 3 Sleek Capability Micro-Chips (centered) */}
              <div className="md:hidden mt-3.5 flex items-center justify-center gap-2 overflow-x-auto pb-1 w-full">
                {t.sectionTwo.capabilities.map((item) => (
                  <div
                    key={item.id}
                    className="shrink-0 flex items-center gap-1.5 rounded-lg bg-black/60 border border-white/20 px-2.5 py-1.5 backdrop-blur-md shadow-sm"
                  >
                    <span className="font-mono text-[9px] text-white/55 font-semibold">{item.id}</span>
                    <span className="text-[11px] font-medium text-white/95">{item.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
