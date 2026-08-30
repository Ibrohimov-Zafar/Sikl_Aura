import React, { useEffect, useRef, useState, useCallback } from 'react';

interface SectionScrubVideoProps {
  videoSrc: string;
  posterSrc: string;
  progress: number; // 0.0 to 1.0 controlled progress
  overlayClassName?: string;
  showProgressBar?: boolean;
}

export const SectionScrubVideo: React.FC<SectionScrubVideoProps> = ({
  videoSrc,
  posterSrc,
  progress,
  overlayClassName = 'bg-black/45',
  showProgressBar = true,
}) => {
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [displayPercent, setDisplayPercent] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);
  const smoothedProgressRef = useRef(progress);
  const isPrimedRef = useRef(false);
  const isSeekingRef = useRef(false);
  const pendingTargetTimeRef = useRef<number | null>(null);

  // Prime / Unlock video for iOS Safari & Android Chrome
  const primeVideo = useCallback(() => {
    const video = videoRef.current;
    if (!video || isPrimedRef.current) return;

    video.muted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          video.pause();
          isPrimedRef.current = true;
          setIsVideoReady(true);
        })
        .catch(() => {
          // Autoplay policy may reject before user interaction; will unlock on first touch
        });
    }
  }, []);

  // Initialize and prime on mount and on first user interaction
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.load();
      primeVideo();
    }

    const handleFirstInteraction = () => {
      primeVideo();
    };

    window.addEventListener('touchstart', handleFirstInteraction, { passive: true, once: true });
    window.addEventListener('pointerdown', handleFirstInteraction, { passive: true, once: true });
    window.addEventListener('scroll', handleFirstInteraction, { passive: true, once: true });

    return () => {
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('pointerdown', handleFirstInteraction);
      window.removeEventListener('scroll', handleFirstInteraction);
    };
  }, [primeVideo, videoSrc]);

  // Actual seek operation with fastSeek support
  const doSeek = useCallback((targetTime: number) => {
    const video = videoRef.current;
    if (!video || !video.duration || isNaN(video.duration)) return;

    const clampedTime = Math.min(
      Math.max(0, targetTime),
      Math.max(0.1, video.duration - 0.05)
    );

    if (Math.abs(video.currentTime - clampedTime) < 0.02) return;

    if (video.seeking) {
      pendingTargetTimeRef.current = clampedTime;
      return;
    }

    isSeekingRef.current = true;
    try {
      if ('fastSeek' in video && typeof (video as any).fastSeek === 'function') {
        (video as any).fastSeek(clampedTime);
      } else {
        video.currentTime = clampedTime;
      }
    } catch {
      video.currentTime = clampedTime;
    }
  }, []);

  // Listen to video seeked event to drain pending targets
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleSeeked = () => {
      isSeekingRef.current = false;
      if (pendingTargetTimeRef.current !== null) {
        const nextTarget = pendingTargetTimeRef.current;
        pendingTargetTimeRef.current = null;
        doSeek(nextTarget);
      }
    };

    video.addEventListener('seeked', handleSeeked);
    return () => video.removeEventListener('seeked', handleSeeked);
  }, [doSeek]);

  // Smooth lerp animation loop (60fps)
  useEffect(() => {
    let animId: number;
    let lastPercent = -1;

    const render = () => {
      // Responsive lerp to controlled progress (0.2 for fast immediate mobile tracking)
      const smoothed =
        smoothedProgressRef.current +
        (progress - smoothedProgressRef.current) * 0.22;
      smoothedProgressRef.current = smoothed;

      const currentPct = Math.round(smoothed * 100);
      if (currentPct !== lastPercent) {
        lastPercent = currentPct;
        setDisplayPercent(Math.min(100, Math.max(0, currentPct)));
      }

      const video = videoRef.current;
      if (video && video.duration && !isNaN(video.duration)) {
        const targetTime = smoothed * Math.max(0.1, video.duration - 0.05);
        doSeek(targetTime);
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [progress, doSeek]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none bg-black">
      {/* Poster image fallback until first video frame renders */}
      <img
        src={posterSrc}
        alt=""
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
          isVideoReady ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Main hardware-accelerated video element — always in DOM and active */}
      <video
        ref={videoRef}
        src={videoSrc}
        poster={posterSrc}
        muted
        autoPlay={false}
        playsInline
        {...{
          'webkit-playsinline': 'true',
          'x5-playsinline': 'true',
        }}
        preload="auto"
        onLoadedMetadata={() => {
          setIsVideoReady(true);
          primeVideo();
        }}
        onCanPlay={() => {
          setIsVideoReady(true);
        }}
        onLoadedData={() => {
          setIsVideoReady(true);
        }}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
          isVideoReady ? 'opacity-100' : 'opacity-80'
        }`}
      />

      {/* Dark contrast overlay for crystal clear text */}
      <div className={`absolute inset-0 ${overlayClassName} pointer-events-none`} />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#0a0a0a] pointer-events-none" />

      {/* Progress pill indicator (centered at the bottom on mobile, right corner on desktop) */}
      {showProgressBar && (
        <div className="absolute bottom-2 sm:bottom-6 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:right-8 md:right-12 z-20 pointer-events-none flex items-center gap-2 sm:gap-2.5 rounded-full border border-white/20 bg-black/55 px-2.5 sm:px-3.5 py-1 sm:py-1.5 backdrop-blur-md shadow-lg whitespace-nowrap">
          <div className="h-1 sm:h-1.5 w-12 sm:w-24 rounded-full bg-white/20 overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-75"
              style={{ width: `${displayPercent}%` }}
            />
          </div>
          <span className="font-mono text-[9px] sm:text-[10px] font-semibold text-white/90 select-none">
            {displayPercent}%
          </span>
        </div>
      )}
    </div>
  );
};
