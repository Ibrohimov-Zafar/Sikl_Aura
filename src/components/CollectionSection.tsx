import React, { useState } from 'react';
import { ShoppingBag, Star, Check } from 'lucide-react';
import { Reveal } from './Reveal';
import { useLanguage } from '../i18n/LanguageContext';

export interface ProductItem {
  id: string;
  name: string;
  category: 'bedding' | 'gifts';
  tag: string;
  image: string;
  description: string;
  features: string[];
}

const PRODUCT_IMAGES: Record<string, string> = {
  'royal-emerald': '/product_royal_bedding.jpg',
  'pearl-white': '/product_double_bedding.jpg',
  'champagne-gold': '/assortment/bedding.jpg',
  'midnight-navy': '/product_silk_pillow.jpg',
  'duo-pillow-set': '/v2_start.jpg',
  'silk-heritage-box': '/silk_heritage.jpg',
};

interface CollectionSectionProps {
  onSelectProduct?: (product: ProductItem) => void;
}

export const CollectionSection: React.FC<CollectionSectionProps> = ({ onSelectProduct }) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'all' | 'bedding' | 'gifts'>('all');

  const products: ProductItem[] = t.collection.products.map((item) => ({
    ...item,
    image: PRODUCT_IMAGES[item.id] || '/product_royal_bedding.jpg',
  }));

  const filtered = products.filter((item) => {
    if (activeTab === 'all') return true;
    return item.category === activeTab;
  });

  return (
    <section id="collection" className="py-20 sm:py-28 px-4 sm:px-8 md:px-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header: Centered on all devices, refined typography */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 flex flex-col items-center">
          {/* Badge */}
          <div className="hidden sm:block">
            <Reveal delay={100}>
              <div className="inline-flex items-center border-l-2 border-white bg-black/45 border border-white/20 px-3 py-1.5 backdrop-blur-md mb-4 shadow-sm">
                <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.15em] text-white font-medium">
                  {t.collection.badge}
                </span>
              </div>
            </Reveal>
          </div>

          {/* H2 Headline: Smaller and Centered */}
          <Reveal delay={200}>
            <h2 className="text-2xl sm:text-4xl lg:text-[42px] font-normal tracking-tight text-white leading-[1.18] text-center">
              {t.collection.title}
            </h2>
          </Reveal>

          {/* Filter Pills: Centered directly below title */}
          <div className="mt-5 sm:mt-6 flex justify-center">
            <Reveal delay={300}>
              <div className="flex flex-wrap justify-center inline-flex rounded-xl sm:rounded-full border border-white/20 bg-black/55 p-1 sm:p-1.5 backdrop-blur-md gap-1">
                <button
                  type="button"
                  onClick={() => setActiveTab('all')}
                  className={`rounded-lg sm:rounded-full px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition-all duration-300 ${
                    activeTab === 'all'
                      ? 'bg-white text-black shadow-md'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  {t.collection.filterAll}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('bedding')}
                  className={`rounded-lg sm:rounded-full px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition-all duration-300 ${
                    activeTab === 'bedding'
                      ? 'bg-white text-black shadow-md'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  {t.collection.filterBedding}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('gifts')}
                  className={`rounded-lg sm:rounded-full px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition-all duration-300 ${
                    activeTab === 'gifts'
                      ? 'bg-white text-black shadow-md'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  {t.collection.filterGifts}
                </button>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Products Grid — No Prices, Pure Luxury Presentation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filtered.map((product, idx) => (
            <Reveal key={product.id} delay={150 + idx * 80}>
              <div className="group relative rounded-2xl sm:rounded-3xl border border-white/15 bg-black/55 backdrop-blur-md overflow-hidden transition-all duration-500 hover:border-white/40 hover:bg-black/75 shadow-2xl flex flex-col justify-between">
                {/* Product Image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-900">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                  {/* Badge Tag */}
                  {product.tag && (
                    <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 rounded-full border border-white/20 bg-black/65 px-3 py-1 text-[11px] font-medium text-white backdrop-blur-md shadow-sm">
                      {product.tag}
                    </div>
                  )}

                  {/* 5 Stars Indicator */}
                  <div className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 backdrop-blur-md">
                    <Star size={12} className="fill-amber-400 text-amber-400" />
                    <span className="text-[11px] font-mono font-medium text-white">5.0</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 sm:p-7 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-lg sm:text-xl font-medium text-white mb-2 leading-snug group-hover:text-white transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/70 leading-relaxed mb-4">
                      {product.description}
                    </p>

                    {/* Features list */}
                    <div className="space-y-1.5 pt-3 border-t border-white/10 mb-6">
                      {product.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-white/75">
                          <Check size={13} className="text-emerald-400 shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Action Area — Price removed */}
                  <div className="pt-4 border-t border-white/15 flex items-center justify-between gap-3">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-white/50">
                        {t.collection.atelierTag}
                      </span>
                      <span className="text-xs font-medium text-emerald-400">
                        Mulberry 6A
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => onSelectProduct?.(product)}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-black transition-all duration-300 hover:bg-white/85 active:scale-[0.98] shadow-md cursor-pointer whitespace-nowrap"
                    >
                      <ShoppingBag size={14} />
                      <span>{t.collection.orderCta}</span>
                    </button>
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
