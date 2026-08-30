import React from 'react';
import { Sparkles, ShieldCheck, Heart, Award, ArrowUpRight } from 'lucide-react';
import { Reveal } from './Reveal';
import { useLanguage } from '../i18n/LanguageContext';

const PILLAR_ICONS = [ShieldCheck, Award, Heart, Sparkles];

export const MaterialsSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="materials" className="py-16 sm:py-32 px-4 sm:px-8 md:px-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header: Centered on desktop & mobile, refined typography */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 flex flex-col items-center">
          {/* Badge */}
          <div className="hidden sm:block">
            <Reveal delay={100}>
              <div className="inline-flex items-center border-l-2 border-white bg-black/45 border border-white/20 px-3 py-1.5 backdrop-blur-md mb-4 shadow-sm">
                <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.15em] text-white font-medium">
                  {t.materials.badge}
                </span>
              </div>
            </Reveal>
          </div>

          {/* H2 Headline: Smaller and Centered */}
          <Reveal delay={200}>
            <h2 className="text-2xl sm:text-4xl lg:text-[42px] font-normal tracking-tight text-white leading-[1.18] text-center">
              {t.materials.titleLine1}<br />
              {t.materials.titleLine2}
            </h2>
          </Reveal>

          {/* Subtitle: Centered directly under the title */}
          <Reveal delay={300}>
            <p className="mt-3 sm:mt-4 max-w-2xl text-xs sm:text-base text-white/70 leading-relaxed text-center mx-auto">
              {t.materials.description}
            </p>
          </Reveal>
        </div>

        {/* Heritage Banner Card */}
        <Reveal delay={250}>
          <div className="relative rounded-2xl sm:rounded-3xl border border-white/20 bg-black/60 backdrop-blur-md overflow-hidden mb-12 sm:mb-16 grid grid-cols-1 lg:grid-cols-12 shadow-2xl">
            {/* Left Image */}
            <div className="lg:col-span-7 relative h-64 sm:h-96 lg:h-auto min-h-[260px] sm:min-h-[320px] overflow-hidden">
              <img
                src="/silk_heritage.jpg"
                alt="Silk Aura Samarqand Kattaqo'rg'on ipak ishlab chiqarish jarayoni"
                className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/80" />
              <div className="absolute bottom-3 left-3 sm:bottom-6 sm:left-6 rounded-full border border-white/20 bg-black/60 px-3 py-1 sm:px-3.5 sm:py-1.5 backdrop-blur-md">
                <span className="font-mono text-[11px] sm:text-xs text-white/90">
                  {t.materials.bannerTag}
                </span>
              </div>
            </div>

            {/* Right Text: Centered on mobile, aligned on desktop */}
            <div className="lg:col-span-5 p-5 sm:p-10 flex flex-col justify-between text-center lg:text-left items-center lg:items-start">
              <div className="w-full">
                <span className="font-mono text-[10px] sm:text-xs text-white/50 uppercase tracking-widest block mb-2 text-center lg:text-left">
                  {t.materials.bannerTag}
                </span>
                <h3 className="text-xl sm:text-3xl font-medium text-white mb-2 sm:mb-4 leading-snug text-center lg:text-left">
                  {t.materials.bannerTitle}
                </h3>
                <p className="text-xs sm:text-sm text-white/75 leading-relaxed mb-3 sm:mb-4 text-center lg:text-left max-w-md mx-auto lg:mx-0">
                  {t.materials.bannerBody.slice(0, 180)}...
                </p>
                {/* Second dense paragraph: hidden on mobile, visible on desktop */}
                <p className="hidden sm:block text-sm text-white/75 leading-relaxed">
                  {t.materials.bannerBody.slice(180)}
                </p>
              </div>

              {/* Bottom stats and CTA: centered on mobile */}
              <div className="w-full pt-4 sm:pt-6 mt-4 sm:mt-6 border-t border-white/15 flex flex-col sm:flex-row items-center justify-center lg:justify-between gap-3 sm:gap-4">
                <div className="text-center sm:text-left flex items-center gap-6">
                  {t.materials.bannerStats.slice(0, 2).map((stat) => (
                    <div key={stat.value}>
                      <div className="text-xl sm:text-2xl font-semibold text-white">{stat.value}</div>
                      <div className="text-[10px] sm:text-xs font-mono text-white/60">{stat.label}</div>
                    </div>
                  ))}
                </div>
                <a
                  href="#collection"
                  className="inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2 sm:py-2.5 text-xs font-semibold text-black transition-all hover:bg-white/85 shadow-md whitespace-nowrap cursor-pointer"
                >
                  <span>{t.materials.viewCollectionCta}</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        {/* 4 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {t.materials.pillars.map((pillar, i) => {
            const Icon = PILLAR_ICONS[i % PILLAR_ICONS.length];
            return (
              <Reveal key={pillar.title} delay={150 + i * 100}>
                <div className="group relative h-full rounded-2xl border border-white/15 bg-black/55 backdrop-blur-md p-5 sm:p-7 transition-all duration-300 hover:border-white/40 hover:bg-black/75 shadow-xl flex flex-col justify-between">
                  <div>
                    {/* Top row */}
                    <div className="flex items-center justify-between mb-4 sm:mb-5">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-110">
                        <Icon size={20} className="sm:w-6 sm:h-6" />
                      </div>
                      <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-emerald-400 font-semibold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25">
                        {pillar.step}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-medium text-white mb-2 group-hover:text-white transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
