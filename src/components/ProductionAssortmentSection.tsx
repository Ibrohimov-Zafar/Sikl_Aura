import React from 'react';
import { ChevronRight, ArrowUpRight } from 'lucide-react';
import { Reveal } from './Reveal';
import { useLanguage } from '../i18n/LanguageContext';

const ASSORTMENT_IMAGES: Record<string, string> = {
  'bedding-sets': '/assortment/bedding.jpg',
  pillowcases: '/assortment/blanket.jpg',
  pajamas: '/assortment/pyjama.png',
  robes: '/assortment/carpet.png',
  scarves: '/assortment/scarf.png',
  'sleep-masks': '/assortment/shawl.png',
  scrunchies: '/assortment/scrunchies.png',
  'gift-boxes': '/assortment/fabric.png',
};

const RAW_MATERIAL_IMAGES: Record<string, string> = {
  cocoons: '/raw_materials/cocoons.png',
  yarn: '/raw_materials/silk_thread.png',
  'raw-fabric': '/raw_materials/raw_silk.png',
  'atlas-adras': '/raw_materials/silk_floss.png',
};

interface ProductionAssortmentSectionProps {
  onSelectItem?: (name: string) => void;
}

export const ProductionAssortmentSection: React.FC<ProductionAssortmentSectionProps> = ({
  onSelectItem,
}) => {
  const { t } = useLanguage();

  return (
    <div className="relative py-16 sm:py-28 px-4 sm:px-8 md:px-12">
      <div className="max-w-7xl mx-auto space-y-20 sm:space-y-32">
        {/* ========================================================= */}
        {/* SECTION 1: Ishlab chiqarishning keng assortimenti         */}
        {/* ========================================================= */}
        <section id="assortment">
          {/* Header: Centered on all devices, refined typography */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 flex flex-col items-center">
            {/* Desktop Badge */}
            <div className="hidden sm:block">
              <Reveal delay={100}>
                <div className="inline-flex items-center border-l-2 border-white bg-black/45 border border-white/20 px-3 py-1.5 backdrop-blur-md mb-4 shadow-sm">
                  <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.15em] text-white font-medium">
                    {t.assortment.badge}
                  </span>
                </div>
              </Reveal>
            </div>

            {/* H2 Headline: Smaller and Centered */}
            <Reveal delay={200}>
              <h2 className="text-2xl sm:text-4xl lg:text-[42px] font-normal tracking-tight text-white leading-[1.18] text-center">
                {t.assortment.title}
              </h2>
            </Reveal>

            {/* Subtitle: Centered directly under title on desktop */}
            <div className="hidden sm:block">
              <Reveal delay={300}>
                <p className="mt-3 sm:mt-4 max-w-2xl text-xs sm:text-base text-white/70 leading-relaxed text-center mx-auto">
                  {t.assortment.description}
                </p>
              </Reveal>
            </div>
          </div>

          {/* 8-Item Grid (4 columns x 2 rows) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {t.assortment.items.map((item, idx) => {
              const image = ASSORTMENT_IMAGES[item.id] || '/assortment/bedding.jpg';
              return (
                <Reveal key={item.id} delay={100 + idx * 60}>
                  <div
                    onClick={() => onSelectItem?.(item.title)}
                    className="group relative cursor-pointer rounded-2xl border border-white/15 bg-black/55 backdrop-blur-md overflow-hidden transition-all duration-500 hover:border-white/40 hover:bg-black/75 shadow-xl flex flex-col justify-between"
                  >
                    {/* Image Frame */}
                    <div className="relative aspect-square w-full overflow-hidden bg-[#141414]">
                      <img
                        src={image}
                        alt={item.title}
                        className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                      {/* Quick action button on image hover */}
                      <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white/70 group-hover:text-white group-hover:bg-white group-hover:text-black transition-all shadow-md">
                        <ArrowUpRight size={15} />
                      </div>
                    </div>

                    {/* Text Container: centered on mobile, left on desktop */}
                    <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 text-center sm:text-left">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-mono text-[9px] uppercase tracking-wider text-emerald-400 font-medium">
                            {item.badge}
                          </span>
                          <span className="font-mono text-[9px] text-white/50">
                            {item.tag}
                          </span>
                        </div>
                        <h3 className="text-base sm:text-lg font-medium text-white group-hover:text-white transition-colors">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-xs text-white/65 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-center sm:justify-between text-xs font-semibold text-white/90 group-hover:text-white gap-1">
                        <span>{t.assortment.orderCta}</span>
                        <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 2: Yarim tayyor mahsulotlar (Полуфабрикаты)       */}
        {/* ========================================================= */}
        <section id="raw-materials">
          {/* Header: Centered on mobile, split on desktop */}
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-16">
            {/* Desktop Badge: visible only on desktop */}
            <div className="hidden sm:block">
              <Reveal delay={100}>
                <div className="inline-flex items-center border-l-2 border-white bg-black/45 border border-white/20 px-3 py-1.5 backdrop-blur-md mb-4 shadow-sm">
                  <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.15em] text-white font-medium">
                    Silk Aura
                  </span>
                </div>
              </Reveal>
            </div>

            {/* H2 Headline: centered on mobile and desktop */}
            <Reveal delay={200}>
              <h2 className="text-3xl sm:text-5xl font-normal tracking-tight text-white leading-tight text-center">
                {t.assortment.rawTitle}
              </h2>
            </Reveal>

            {/* Desktop Subtitle: hidden on mobile */}
            <div className="hidden sm:block">
              <Reveal delay={300}>
                <p className="mt-3 text-sm sm:text-base text-white/70 leading-relaxed">
                  {t.assortment.rawDescription}
                </p>
              </Reveal>
            </div>
          </div>

          {/* 4-Item Grid with isolated PNGs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8">
            {t.assortment.rawMaterials.map((raw, idx) => {
              const image = RAW_MATERIAL_IMAGES[raw.id] || '/raw_materials/cocoons.png';
              return (
                <Reveal key={raw.id} delay={150 + idx * 80}>
                  <div
                    onClick={() => onSelectItem?.(raw.title)}
                    className="group relative cursor-pointer rounded-2xl sm:rounded-3xl border border-white/15 bg-black/55 backdrop-blur-md p-5 sm:p-7 text-center transition-all duration-500 hover:border-white/40 hover:bg-black/75 shadow-xl flex flex-col items-center justify-between"
                  >
                    {/* Visual Circle / Image Frame */}
                    <div className="relative w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center mb-3 sm:mb-4 transition-transform duration-500 group-hover:scale-110">
                      <img
                        src={image}
                        alt={raw.title}
                        className="max-h-full max-w-full object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]"
                      />
                    </div>

                    {/* Title & Names */}
                    <div>
                      <span className="font-mono text-[10px] text-emerald-400 block mb-1">
                        {raw.spec}
                      </span>
                      <h3 className="text-lg sm:text-xl font-medium text-white mb-2 group-hover:text-white transition-colors">
                        {raw.title}
                      </h3>
                      <p className="text-xs text-white/70 leading-relaxed">
                        {raw.desc}
                      </p>
                    </div>

                    {/* Action Pill */}
                    <div className="mt-4 sm:mt-5 w-full pt-3 border-t border-white/10 flex items-center justify-center">
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-white/80 group-hover:text-white">
                        <span>{t.assortment.orderCta}</span>
                        <ChevronRight size={13} />
                      </span>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};
