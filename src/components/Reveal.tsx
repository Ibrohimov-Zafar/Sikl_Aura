import React, { useEffect, useRef, useState } from 'react';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export const Reveal: React.FC<RevealProps> = ({ children, delay = 0, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentEl = domRef.current;
    if (!currentEl) {
      setIsVisible(true);
      return;
    }

    // 1. Immediate bounding rect check (if already on screen, show it!)
    const rect = currentEl.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setIsVisible(true);
    }

    // 2. IntersectionObserver for elements entering viewport on scroll
    let observer: IntersectionObserver | null = null;
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (domRef.current && observer) {
              observer.unobserve(domRef.current);
            }
          }
        },
        {
          threshold: 0.05,
          rootMargin: '0px 0px 100px 0px',
        }
      );
      observer.observe(currentEl);
    } else {
      setIsVisible(true);
    }

    // 3. Fail-safe timeout: never leave text invisible permanently
    const fallbackTimer = setTimeout(() => {
      setIsVisible(true);
    }, 600 + delay);

    return () => {
      clearTimeout(fallbackTimer);
      if (observer && currentEl) {
        observer.unobserve(currentEl);
      }
    };
  }, [delay]);

  return (
    <div
      ref={domRef}
      style={{
        transitionDuration: '600ms',
        transitionDelay: `${delay}ms`,
      }}
      className={`transition-all duration-600 ease-out will-change-transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      } ${className}`}
    >
      {children}
    </div>
  );
};
