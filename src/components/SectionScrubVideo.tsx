import React, { useEffect, useRef, useState, useCallback } from 'react';

interface SectionScrubVideoProps {
  frameFolder: string; // e.g. '/frame/1' or '/frame/2'
  totalFrames?: number; // default 100
  posterSrc?: string;
  progress: number; // 0.0 to 1.0 controlled progress
  overlayClassName?: string;
  showProgressBar?: boolean;
}

export const SectionScrubVideo: React.FC<SectionScrubVideoProps> = ({
  frameFolder,
  totalFrames = 100,
  posterSrc,
  progress,
  overlayClassName = 'bg-black/45',
  showProgressBar = true,
}) => {
  const [displayPercent, setDisplayPercent] = useState(0);
  const [isFirstFrameLoaded, setIsFirstFrameLoaded] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(totalFrames).fill(null));
  const loadedIndicesRef = useRef<Set<number>>(new Set());
  const smoothedProgressRef = useRef(progress);
  const lastDrawnIndexRef = useRef<number>(-1);

  // Helper to format frame path: frame_001.jpg ... frame_100.jpg
  const getFrameSrc = useCallback(
    (index: number) => {
      const num = String(index + 1).padStart(3, '0');
      return `${frameFolder}/frame_${num}.jpg`;
    },
    [frameFolder]
  );

  // Draw a specific image to canvas using object-fit: cover
  const drawImageToCanvas = useCallback((img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const displayW = canvas.parentElement?.clientWidth || window.innerWidth;
    const displayH = canvas.parentElement?.clientHeight || window.innerHeight;

    const targetW = Math.round(displayW * dpr);
    const targetH = Math.round(displayH * dpr);

    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }

    const fw = img.naturalWidth || 1280;
    const fh = img.naturalHeight || 720;
    const scale = Math.max(canvas.width / fw, canvas.height / fh);
    const dw = fw * scale;
    const dh = fh * scale;
    const dx = (canvas.width - dw) / 2;
    const dy = (canvas.height - dh) / 2;

    ctx.drawImage(img, dx, dy, dw, dh);
  }, []);

  // Preload individual image with cache tracking
  const preloadImage = useCallback(
    (index: number): Promise<HTMLImageElement> => {
      return new Promise((resolve) => {
        if (imagesRef.current[index]) {
          resolve(imagesRef.current[index]!);
          return;
        }

        const img = new Image();
        img.src = getFrameSrc(index);
        img.onload = () => {
          imagesRef.current[index] = img;
          loadedIndicesRef.current.add(index);
          if (index === 0) {
            setIsFirstFrameLoaded(true);
            drawImageToCanvas(img);
          }
          resolve(img);
        };
        img.onerror = () => {
          resolve(img);
        };
      });
    },
    [getFrameSrc, drawImageToCanvas]
  );

  // Progressive preloader: loads frame 1 immediately, then throttled batch loading
  useEffect(() => {
    let isCancelled = false;

    // 1. Immediately load frame 0
    preloadImage(0);

    // 2. Progressive background preloader
    const loadRemainingFrames = async () => {
      // Load key frames first (every 5th frame for quick responsive scrubbing)
      for (let i = 4; i < totalFrames; i += 5) {
        if (isCancelled) return;
        await preloadImage(i);
      }

      // Load all other intermediate frames
      for (let i = 0; i < totalFrames; i++) {
        if (isCancelled) return;
        if (!loadedIndicesRef.current.has(i)) {
          await preloadImage(i);
        }
      }
    };

    // Start background load after a tiny pause to give main thread priority
    const timer = setTimeout(loadRemainingFrames, 100);

    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
  }, [totalFrames, preloadImage]);

  // Handle render loop
  useEffect(() => {
    let animId: number;
    let lastPercent = -1;

    const render = () => {
      // Lerp smoothed progress
      const smoothed =
        smoothedProgressRef.current +
        (progress - smoothedProgressRef.current) * 0.25;
      smoothedProgressRef.current = smoothed;

      const currentPct = Math.round(smoothed * 100);
      if (currentPct !== lastPercent) {
        lastPercent = currentPct;
        setDisplayPercent(Math.min(100, Math.max(0, currentPct)));
      }

      // Compute target frame index (0 to totalFrames - 1)
      const targetIndex = Math.min(
        totalFrames - 1,
        Math.max(0, Math.round(smoothed * (totalFrames - 1)))
      );

      // Draw the exact frame or the nearest loaded frame
      let frameToDraw: HTMLImageElement | null = imagesRef.current[targetIndex];

      if (!frameToDraw) {
        // Find nearest loaded frame so the canvas NEVER goes blank
        let minDiff = Infinity;
        let bestIndex = -1;
        loadedIndicesRef.current.forEach((idx) => {
          const diff = Math.abs(idx - targetIndex);
          if (diff < minDiff) {
            minDiff = diff;
            bestIndex = idx;
          }
        });

        if (bestIndex !== -1 && imagesRef.current[bestIndex]) {
          frameToDraw = imagesRef.current[bestIndex];
        }

        // Trigger priority load for targetIndex
        preloadImage(targetIndex);
      }

      if (frameToDraw && lastDrawnIndexRef.current !== targetIndex) {
        drawImageToCanvas(frameToDraw);
        lastDrawnIndexRef.current = targetIndex;
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [progress, totalFrames, drawImageToCanvas, preloadImage]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const currentFrame =
        lastDrawnIndexRef.current >= 0
          ? imagesRef.current[lastDrawnIndexRef.current] || imagesRef.current[0]
          : imagesRef.current[0];
      if (currentFrame) {
        drawImageToCanvas(currentFrame);
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [drawImageToCanvas]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none bg-black">
      {/* Static poster image shown until first frame draws */}
      {posterSrc && (
        <img
          src={posterSrc}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            isFirstFrameLoaded ? 'opacity-0' : 'opacity-100'
          }`}
        />
      )}

      {/* Hardware-accelerated smooth canvas */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
          isFirstFrameLoaded ? 'opacity-100' : 'opacity-0'
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
