import React from 'react';
import { Hexagon, Phone, Mail, MapPin, Send, ArrowUpRight } from 'lucide-react';
import { Reveal } from './Reveal';
import { useLanguage } from '../i18n/LanguageContext';

interface FooterProps {
  onOpenOrderModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenOrderModal }) => {
  const { t } = useLanguage();

  return (
    <footer id="contact" className="border-t border-white/15 bg-[#0a0a0a] pt-16 pb-12 px-4 sm:px-8 md:px-12 relative z-20 overflow-hidden">
      {/* Pattern background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `url('/pattern.svg')`,
          backgroundRepeat: 'repeat',
          backgroundSize: '130px 130px',
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.08),transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Col 1: Brand info */}
          <Reveal delay={100}>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2.5 text-white">
                <Hexagon size={24} strokeWidth={1.5} className="text-white" />
                <div className="flex flex-col">
                  <span className="text-xl font-semibold tracking-tight uppercase">
                    Silk Aura
                  </span>
                  <span className="text-[10px] font-mono text-white/50 tracking-widest -mt-1">
                    SAMARKAND · 1999
                  </span>
                </div>
              </div>
              <p className="text-sm text-white/70 leading-relaxed">
                {t.footer.brandDesc}
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-mono text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {t.footer.organicBadge}
                </span>
              </div>
            </div>
          </Reveal>

          {/* Col 2: Navigation */}
          <Reveal delay={200}>
            <div className="flex flex-col gap-3">
              <span className="font-mono text-xs uppercase tracking-wider text-white/50 mb-2">
                {t.footer.sectionsTitle}
              </span>
              <a href="#collection" className="text-sm text-white/70 hover:text-white transition-colors">
                {t.footer.catalogLink}
              </a>
              <a href="#materials" className="text-sm text-white/70 hover:text-white transition-colors">
                {t.footer.aboutLink}
              </a>
              <a href="#reviews" className="text-sm text-white/70 hover:text-white transition-colors">
                {t.footer.reviewsLink}
              </a>
              <a href="#faq" className="text-sm text-white/70 hover:text-white transition-colors">
                {t.footer.faqLink}
              </a>
              <button
                type="button"
                onClick={onOpenOrderModal}
                className="text-left text-sm text-white font-medium hover:underline pt-2 flex items-center gap-1"
              >
                <span>{t.footer.personalOrderCta}</span>
                <ArrowUpRight size={14} />
              </button>
            </div>
          </Reveal>

          {/* Col 3: Contacts */}
          <Reveal delay={300}>
            <div className="flex flex-col gap-3.5">
              <span className="font-mono text-xs uppercase tracking-wider text-white/50 mb-2">
                {t.footer.contactTitle}
              </span>
              <div className="flex items-start gap-2.5 text-sm text-white/80">
                <MapPin size={16} className="text-white/50 shrink-0 mt-1" />
                <div>
                  <div className="font-medium text-white">{t.footer.showroomLabel}</div>
                  <div>{t.footer.showroomAddress}</div>
                  <div className="text-xs text-white/50 mt-1">{t.footer.factoryLabel}</div>
                </div>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-white/80">
                <Phone size={16} className="text-white/50 shrink-0" />
                <div className="flex flex-col">
                  <a href="tel:+998999689667" className="hover:text-white transition-colors">
                    +998 (99) 968-96-67
                  </a>
                  <a href="tel:+998979256919" className="hover:text-white transition-colors text-xs text-white/60">
                    +998 (97) 925-69-19 / +998 (97) 288-88-01
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-white/80">
                <Mail size={16} className="text-white/50 shrink-0" />
                <a href="mailto:info@silkaura.uz" className="hover:text-white transition-colors">
                  info@silkaura.uz
                </a>
              </div>
            </div>
          </Reveal>

          {/* Col 4: Quick consultation box */}
          <Reveal delay={400}>
            <div className="flex flex-col gap-4 rounded-2xl border border-white/15 bg-black/60 backdrop-blur-md p-5 shadow-xl">
              <span className="font-mono text-xs uppercase tracking-wider text-white/60">
                {t.footer.socialTitle}
              </span>
              <p className="text-xs text-white/70 leading-relaxed">
                {t.footer.socialDesc}
              </p>
              <button
                type="button"
                onClick={onOpenOrderModal}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-white py-2.5 text-xs font-semibold text-black transition-all hover:bg-white/85"
              >
                <Send size={13} />
                <span>{t.footer.personalOrderCta}</span>
              </button>
            </div>
          </Reveal>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/50">
          <div>
            &copy; {new Date().getFullYear()} Silk Aura UZ. {t.footer.rights}
          </div>
          <div className="flex items-center gap-6">
            <span>{t.footer.handmadeTag}</span>
            <span>100% Mulberry Silk</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
