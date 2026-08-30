import React from 'react';
import { Star, Quote } from 'lucide-react';
import { Reveal } from './Reveal';
import { useLanguage } from '../i18n/LanguageContext';

export const ReviewsSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="reviews" className="py-24 sm:py-32 px-5 sm:px-8 md:px-12 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header: Centered on all devices, refined typography */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 flex flex-col items-center">
          {/* Badge */}
          <div className="hidden sm:block">
            <Reveal delay={100}>
              <div className="mb-4 inline-flex items-center border-l-2 border-white bg-black/45 border border-white/20 px-3 py-1.5 backdrop-blur-md shadow-sm">
                <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.15em] text-white font-medium">
                  {t.reviews.badge}
                </span>
              </div>
            </Reveal>
          </div>

          {/* H2 Headline: Smaller and Centered */}
          <Reveal delay={200}>
            <h2 className="text-2xl sm:text-4xl lg:text-[42px] font-normal leading-[1.18] tracking-tight text-white drop-shadow-lg text-center">
              {t.reviews.title}
            </h2>
          </Reveal>

          {/* Subtitle: Centered directly under title */}
          <Reveal delay={300}>
            <p className="mt-3 sm:mt-4 max-w-2xl text-xs sm:text-base text-white/80 leading-relaxed drop-shadow-md text-center mx-auto">
              {t.reviews.description}
            </p>
          </Reveal>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.reviews.items.map((review, i) => (
            <Reveal key={review.id} delay={150 + i * 110}>
              <div className="h-full rounded-2xl border border-white/20 bg-black/55 backdrop-blur-md p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:border-white/35 hover:bg-black/65 shadow-2xl">
                <div>
                  {/* Rating Stars & Quote Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-1 text-amber-300">
                      {[...Array(review.rating)].map((_, idx) => (
                        <Star key={idx} size={15} className="fill-amber-300" />
                      ))}
                    </div>
                    <Quote size={20} className="text-white/30" />
                  </div>

                  <p className="text-sm sm:text-base leading-relaxed text-white/90 mb-8 italic">
                    "{review.quote}"
                  </p>
                </div>

                <div className="border-t border-white/15 pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-white">
                        {review.name}
                      </h4>
                      <span className="text-xs text-white/50">
                        {review.city} · {review.role}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-white/40 text-right max-w-[120px] truncate">
                      {review.product}
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
