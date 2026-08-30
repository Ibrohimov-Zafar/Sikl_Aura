import React, { useEffect, useRef, useState } from 'react';
import { Navbar } from './components/Navbar';
import { SectionOne } from './components/SectionOne';
import { SectionTwo } from './components/SectionTwo';
import { MaterialsSection } from './components/MaterialsSection';
import { ProductionAssortmentSection } from './components/ProductionAssortmentSection';
import { CollectionSection } from './components/CollectionSection';
import type { ProductItem } from './components/CollectionSection';
import { ReviewsSection } from './components/ReviewsSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { OrderModal } from './components/OrderModal';
import { PageLoader } from './components/PageLoader';
import { LanguageProvider } from './i18n/LanguageContext';
import { LoadingProvider } from './i18n/LoadingContext';

export const AppContent: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [selectedItemName, setSelectedItemName] = useState<string | null>(null);

  // Controlled progress for Section 1 and Section 2
  const [v1Progress, setV1Progress] = useState(0);
  const [v2Progress, setV2Progress] = useState(0);

  const v1TargetRef = useRef(0);
  const v2TargetRef = useRef(0);
  const isTransitioningRef = useRef(false);
  const touchStartYRef = useRef(0);

  // Scroll lock & video scrubbing orchestrator
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const heroEl = document.getElementById('section-hero');
      const giftEl = document.getElementById('section-gift');
      const restEl = document.getElementById('rest-of-page');

      if (!heroEl || !giftEl || !restEl) return;

      const giftRect = giftEl.getBoundingClientRect();
      const restRect = restEl.getBoundingClientRect();

      // Sensitivity factor for desktop mouse wheel
      const step = Math.abs(e.deltaY) * 0.0011;

      // ZONE 1: Section 1 (Hero)
      if (giftRect.top > 80) {
        if (e.deltaY > 0) {
          if (v1TargetRef.current < 0.98) {
            e.preventDefault();
            v1TargetRef.current = Math.min(1, v1TargetRef.current + step);
            setV1Progress(v1TargetRef.current);
          } else {
            e.preventDefault();
            if (!isTransitioningRef.current) {
              isTransitioningRef.current = true;
              giftEl.scrollIntoView({ behavior: 'smooth' });
              setTimeout(() => {
                isTransitioningRef.current = false;
              }, 700);
            }
          }
        } else if (e.deltaY < 0) {
          if (v1TargetRef.current > 0) {
            e.preventDefault();
            v1TargetRef.current = Math.max(0, v1TargetRef.current - step);
            setV1Progress(v1TargetRef.current);
          }
        }
        return;
      }

      // ZONE 2: Section 2 (Gift Box)
      if (giftRect.top <= 80 && restRect.top > 80) {
        if (e.deltaY > 0) {
          if (v2TargetRef.current < 0.98) {
            e.preventDefault();
            v2TargetRef.current = Math.min(1, v2TargetRef.current + step);
            setV2Progress(v2TargetRef.current);
          } else {
            e.preventDefault();
            if (!isTransitioningRef.current) {
              isTransitioningRef.current = true;
              restEl.scrollIntoView({ behavior: 'smooth' });
              setTimeout(() => {
                isTransitioningRef.current = false;
              }, 700);
            }
          }
        } else if (e.deltaY < 0) {
          if (v2TargetRef.current > 0) {
            e.preventDefault();
            v2TargetRef.current = Math.max(0, v2TargetRef.current - step);
            setV2Progress(v2TargetRef.current);
          } else {
            e.preventDefault();
            if (!isTransitioningRef.current) {
              isTransitioningRef.current = true;
              heroEl.scrollIntoView({ behavior: 'smooth' });
              setTimeout(() => {
                isTransitioningRef.current = false;
              }, 700);
            }
          }
        }
        return;
      }

      // ZONE 3: Rest of page
      if (restRect.top >= -20 && e.deltaY < 0) {
        if (window.scrollY <= restEl.offsetTop + 10) {
          e.preventDefault();
          if (!isTransitioningRef.current) {
            isTransitioningRef.current = true;
            giftEl.scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => {
              isTransitioningRef.current = false;
            }, 700);
          }
        }
      }
    };

    // Touch support for mobile devices
    const handleTouchStart = (e: TouchEvent) => {
      touchStartYRef.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const heroEl = document.getElementById('section-hero');
      const giftEl = document.getElementById('section-gift');
      const restEl = document.getElementById('rest-of-page');

      if (!heroEl || !giftEl || !restEl) return;

      const currentY = e.touches[0].clientY;
      const deltaY = touchStartYRef.current - currentY;
      touchStartYRef.current = currentY;

      const giftRect = giftEl.getBoundingClientRect();
      const restRect = restEl.getBoundingClientRect();

      // Mobile touch sensitivity: responsive ~3-4 finger drags to complete
      const step = Math.abs(deltaY) * 0.005;

      // ZONE 1: Section 1 (Hero)
      if (giftRect.top > 80) {
        if (deltaY > 0) {
          if (v1TargetRef.current < 0.98) {
            if (e.cancelable) e.preventDefault();
            v1TargetRef.current = Math.min(1, v1TargetRef.current + step);
            setV1Progress(v1TargetRef.current);
          } else {
            if (e.cancelable) e.preventDefault();
            if (!isTransitioningRef.current) {
              isTransitioningRef.current = true;
              giftEl.scrollIntoView({ behavior: 'smooth' });
              setTimeout(() => {
                isTransitioningRef.current = false;
              }, 700);
            }
          }
        } else if (deltaY < 0) {
          if (v1TargetRef.current > 0) {
            if (e.cancelable) e.preventDefault();
            v1TargetRef.current = Math.max(0, v1TargetRef.current - step);
            setV1Progress(v1TargetRef.current);
          }
        }
        return;
      }

      // ZONE 2: Section 2 (Gift Box)
      if (giftRect.top <= 80 && restRect.top > 80) {
        if (deltaY > 0) {
          if (v2TargetRef.current < 0.98) {
            if (e.cancelable) e.preventDefault();
            v2TargetRef.current = Math.min(1, v2TargetRef.current + step);
            setV2Progress(v2TargetRef.current);
          } else {
            if (e.cancelable) e.preventDefault();
            if (!isTransitioningRef.current) {
              isTransitioningRef.current = true;
              restEl.scrollIntoView({ behavior: 'smooth' });
              setTimeout(() => {
                isTransitioningRef.current = false;
              }, 700);
            }
          }
        } else if (deltaY < 0) {
          if (v2TargetRef.current > 0) {
            if (e.cancelable) e.preventDefault();
            v2TargetRef.current = Math.max(0, v2TargetRef.current - step);
            setV2Progress(v2TargetRef.current);
          } else {
            if (e.cancelable) e.preventDefault();
            if (!isTransitioningRef.current) {
              isTransitioningRef.current = true;
              heroEl.scrollIntoView({ behavior: 'smooth' });
              setTimeout(() => {
                isTransitioningRef.current = false;
              }, 700);
            }
          }
        }
        return;
      }

      // ZONE 3: Rest of page — allow native scrolling
      if (restRect.top >= -20 && deltaY < -15) {
        if (window.scrollY <= restEl.offsetTop + 10) {
          if (e.cancelable) e.preventDefault();
          if (!isTransitioningRef.current) {
            isTransitioningRef.current = true;
            giftEl.scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => {
              isTransitioningRef.current = false;
            }, 700);
          }
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  const handleOpenModal = (product?: ProductItem, itemName?: string) => {
    if (product) {
      setSelectedProduct(product);
      setSelectedItemName(product.name);
    } else if (itemName) {
      setSelectedProduct(null);
      setSelectedItemName(itemName);
    } else {
      setSelectedProduct(null);
      setSelectedItemName(null);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    setSelectedItemName(null);
  };

  const scrollToSectionTwo = () => {
    v1TargetRef.current = 1;
    setV1Progress(1);
    const giftEl = document.getElementById('section-gift');
    if (giftEl) {
      const top = giftEl.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const scrollToRestOfPage = () => {
    v2TargetRef.current = 1;
    setV2Progress(1);
    const restEl = document.getElementById('rest-of-page');
    if (restEl) {
      const top = restEl.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-white selection:bg-white/20 antialiased overflow-x-hidden">
      {/* 3-Second Center Splash Loader */}
      <PageLoader />

      {/* Fixed top navigation */}
      <Navbar onOpenOrderModal={() => handleOpenModal()} />

      <main className="relative flex flex-col">
        {/* Section 1: Hero — Video 1 to'liq tugamaguncha Section 2 ga o'tmaydi */}
        <SectionOne
          progress={v1Progress}
          onNextSection={scrollToSectionTwo}
          onOpenOrderModal={() => handleOpenModal()}
        />

        {/* Section 2: Eksklyuziv Qadoqlash — Video 2 to'liq tugamaguncha keyingi qismga o'tmaydi */}
        <SectionTwo
          progress={v2Progress}
          onNextSection={scrollToRestOfPage}
          onOpenOrderModal={() => handleOpenModal()}
        />

        {/* Qolgan bo'limlar: Hashamatli milliy islimiy ipak naqshi va ambient nur foni ustida */}
        <div id="rest-of-page" className="relative z-20 bg-[#0a0a0a] overflow-hidden">
          {/* Seamless luxury silk damask pattern layer */}
          <div
            className="absolute inset-0 pointer-events-none opacity-45"
            style={{
              backgroundImage: `url('/pattern.svg')`,
              backgroundRepeat: 'repeat',
              backgroundSize: '130px 130px',
            }}
          />

          {/* Royal emerald & warm champagne ambient glow highlights */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(16,185,129,0.1),transparent_45%),radial-gradient(circle_at_85%_45%,rgba(217,119,6,0.08),transparent_50%),radial-gradient(circle_at_25%_80%,rgba(16,185,129,0.07),transparent_50%)] pointer-events-none" />

          {/* Seamless top transition fade from Section 2 */}
          <div className="absolute top-0 inset-x-0 h-36 bg-gradient-to-b from-[#0a0a0a] to-transparent pointer-events-none" />

          {/* Sections Content */}
          <div className="relative z-10">
            {/* 1. Tarix va 4 ta asosiy ustun */}
            <MaterialsSection />

            {/* 2. Yangi: Ishlab chiqarishning keng assortimenti (8 ta mahsulot) & Yarim tayyor mahsulotlar (4 ta xomashyo) */}
            <ProductionAssortmentSection
              onSelectItem={(name) => handleOpenModal(undefined, name)}
            />

            {/* 3. Shohona to'plamlar (narxlarsiz, toza atelye buyurtmasi) */}
            <CollectionSection
              onSelectProduct={(p) => handleOpenModal(p)}
            />

            {/* 4. Mijozlar fikrlari */}
            <ReviewsSection />

            {/* 5. Savol-javoblar */}
            <FaqSection />
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer onOpenOrderModal={() => handleOpenModal()} />

      {/* Interactive Order & Consultation Modal */}
      <OrderModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        selectedProduct={selectedProduct}
        selectedItemName={selectedItemName}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <LoadingProvider>
        <AppContent />
      </LoadingProvider>
    </LanguageProvider>
  );
};

export default App;
