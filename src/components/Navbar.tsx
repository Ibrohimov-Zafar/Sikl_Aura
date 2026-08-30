import React, { useState, useRef, useEffect } from 'react';
import { Hexagon, Menu, X, Globe, Check } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import type { Language } from '../i18n/types';

interface NavbarProps {
  onOpenOrderModal?: () => void;
}

const LANGUAGES: Array<{ code: Language; label: string; short: string }> = [
  { code: 'uz', label: "O'zbekcha", short: 'UZ' },
  { code: 'ru', label: 'Русский', short: 'RU' },
  { code: 'en', label: 'English', short: 'EN' },
];

export const Navbar: React.FC<NavbarProps> = ({ onOpenOrderModal }) => {
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { label: t.navbar.links.products, href: '#collection', badge: '5' },
    { label: t.navbar.links.about, href: '#materials' },
    { label: t.navbar.links.reviews, href: '#reviews' },
    { label: t.navbar.links.faq, href: '#faq' },
    { label: t.navbar.links.contact, href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setMobileMenuOpen(false);
    if (href.startsWith('#')) {
      const el = document.querySelector(href);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleSelectLanguage = (lang: Language) => {
    setLanguage(lang);
    setLangDropdownOpen(false);
  };

  return (
    <header className="fixed top-0 sm:top-3 md:top-4 left-0 right-0 z-50 w-full sm:max-w-6xl lg:max-w-7xl sm:mx-auto sm:px-4 md:px-6 transition-all duration-300 pointer-events-none">
      <div className="pointer-events-auto w-full border-b sm:border border-white/15 sm:border-white/20 bg-[#0a0a0a]/85 sm:bg-[#0a0a0a]/75 backdrop-blur-xl sm:rounded-2xl lg:rounded-full shadow-lg sm:shadow-[0_16px_40px_rgba(0,0,0,0.6)] px-4 sm:px-6 md:px-8 h-16 sm:h-[68px] flex items-center justify-between">
        {/* Left: Brand Logo */}
        <a
          href="#"
          onClick={(e) => handleNavClick(e, '#')}
          className="flex items-center gap-2.5 text-white transition-opacity duration-300 hover:opacity-85"
        >
          <Hexagon size={22} strokeWidth={1.5} className="text-white sm:w-6 sm:h-6" />
          <div className="flex flex-col">
            <span className="text-base sm:text-xl font-semibold tracking-tight uppercase">
              Silk Aura
            </span>
            <span className="text-[9px] font-mono text-white/50 tracking-widest -mt-1 hidden sm:block">
              {t.navbar.subLogo}
            </span>
          </div>
        </a>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="group relative inline-flex items-center text-xs lg:text-sm font-medium text-white/85 transition-colors duration-300 hover:text-white"
            >
              <span>{link.label}</span>
              {link.badge && (
                <span className="font-mono text-[10px] text-white/60 ml-1 transition-colors duration-300 group-hover:text-white">
                  {link.badge}
                </span>
              )}
            </a>
          ))}
        </nav>

        {/* Right: Language Switcher, Phone & CTA */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="tel:+998999689667"
            className="hidden xl:inline-flex text-xs font-mono text-white/70 hover:text-white transition-colors"
          >
            +998 (99) 968-96-67
          </a>

          {/* Globe Language Switcher Button & Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setLangDropdownOpen((prev) => !prev)}
              aria-label="Tilni tanlash / Выбор языка / Select language"
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border transition-all duration-300 ${
                langDropdownOpen
                  ? 'border-white bg-white/25 text-white shadow-md'
                  : 'border-white/20 bg-white/10 hover:bg-white/20 text-white/90 hover:text-white'
              }`}
            >
              <Globe size={18} className="stroke-[1.75]" />
            </button>

            {/* Language Selection Dropdown */}
            {langDropdownOpen && (
              <div className="absolute right-0 top-full mt-2.5 w-44 rounded-xl border border-white/20 bg-[#0a0a0a]/95 backdrop-blur-xl shadow-2xl p-1.5 z-50 flex flex-col gap-0.5 animate-in fade-in zoom-in-95 duration-150">
                {LANGUAGES.map((item) => {
                  const isActive = language === item.code;
                  return (
                    <button
                      key={item.code}
                      type="button"
                      onClick={() => handleSelectLanguage(item.code)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                        isActive
                          ? 'bg-white text-black font-semibold shadow-sm'
                          : 'text-white/80 hover:bg-white/15 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] tracking-wider uppercase opacity-75">
                          {item.short}
                        </span>
                        <span>{item.label}</span>
                      </div>
                      {isActive && <Check size={14} className="stroke-[2.5]" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Desktop Order Button (hidden on mobile, visible on desktop) */}
          <button
            type="button"
            onClick={onOpenOrderModal}
            className="hidden md:inline-flex rounded-full border border-white/25 bg-white/20 backdrop-blur-md px-3.5 py-1.5 sm:px-5 sm:py-2 text-xs sm:text-sm font-semibold text-white transition-all duration-300 hover:bg-white/30 active:scale-[0.98] shadow-sm whitespace-nowrap"
          >
            {t.navbar.orderCta}
          </button>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Menyu"
            className="md:hidden w-9 h-9 rounded-lg border border-white/20 bg-white/10 flex items-center justify-center text-white active:scale-95 transition-colors"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto md:hidden border-t border-white/15 bg-[#0a0a0a]/95 backdrop-blur-xl px-5 py-6 flex flex-col gap-4 animate-in slide-in-from-top-2 duration-200">
          {/* Mobile Language Switcher Row */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2 text-white/70 text-xs">
              <Globe size={16} />
              <span>Til / Язык / Language:</span>
            </div>
            <div className="inline-flex rounded-lg border border-white/20 bg-white/10 p-0.5">
              {LANGUAGES.map((item) => (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => handleSelectLanguage(item.code)}
                  className={`px-2.5 py-1 rounded text-xs font-mono font-medium transition-all ${
                    language === item.code
                      ? 'bg-white text-black font-semibold'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  {item.short}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="flex items-center justify-between py-2 text-base font-medium text-white/90 border-b border-white/10 active:text-white"
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="font-mono text-xs rounded-full bg-white/20 px-2 py-0.5 text-white/80">
                    {link.badge}
                  </span>
                )}
              </a>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <a
              href="tel:+998999689667"
              className="text-center font-mono text-xs text-white/70 py-2 border border-white/10 rounded-xl"
            >
              {t.navbar.callNow}
            </a>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenOrderModal?.();
              }}
              className="w-full rounded-xl bg-white py-3 text-sm font-semibold text-black transition-all hover:bg-white/85"
            >
              {t.navbar.orderCta}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
