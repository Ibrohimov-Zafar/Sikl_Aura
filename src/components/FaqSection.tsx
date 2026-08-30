import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Reveal } from './Reveal';
import { useLanguage } from '../i18n/LanguageContext';

export const FaqSection: React.FC = () => {
  const { t } = useLanguage();
  const [openId, setOpenId] = useState<number | null>(1);

  const toggleFaq = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-24 sm:py-32 px-5 sm:px-8 md:px-12 relative">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <Reveal delay={100}>
            <div className="mb-4 inline-flex items-center border-l-2 border-white bg-white/15 px-3 py-1.5 backdrop-blur-md">
              <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-white">
                {t.faq.badge}
              </span>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <h2 className="text-2xl sm:text-4xl lg:text-[42px] font-normal leading-[1.18] tracking-tight text-white drop-shadow-lg mb-4">
              {t.faq.title}
            </h2>
          </Reveal>

          <Reveal delay={300}>
            <p className="text-sm sm:text-base text-white/70 max-w-md mx-auto leading-relaxed">
              {t.faq.description}
            </p>
          </Reveal>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {t.faq.items.map((faq, i) => {
            const isOpen = openId === faq.id;
            return (
              <Reveal key={faq.id} delay={150 + i * 80}>
                <div className="rounded-2xl border border-white/20 bg-black/55 backdrop-blur-md overflow-hidden transition-all duration-300 hover:border-white/35 shadow-xl">
                  <button
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left gap-4"
                  >
                    <span className="text-base sm:text-lg font-medium text-white">
                      {faq.question}
                    </span>
                    <ChevronDown
                      size={18}
                      className={`text-white/70 shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-white' : ''
                      }`}
                    />
                  </button>

                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-6 pb-6 pt-1 border-t border-white/15 text-sm leading-relaxed text-white/85">
                      {faq.answer}
                    </div>
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
