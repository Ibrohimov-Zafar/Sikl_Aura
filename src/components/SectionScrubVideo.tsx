import React, { useEffect, useRef, useState } from 'react';
import { useLoading } from '../i18n/LoadingContext';

interface SectionScrubVideoProps {
  videoSrc: string; // e.g. '/1.mp4' or '/2.mp4'
  posterSrc?: string;
  progress: number; // 0.0 to 1.0 controlled progress
  totalFrames?: number; // default 32 for fast loading
  overlayClassName?: string;
  showProgressBar?: boolean;
}

const DEFAULT_FRAME_COUNT = 32;
const MAX_WIDTH = 800;

export const SectionScrubVideo: React.FC<SectionScrubVideoProps> = ({
  videoSrc,
  posterSrc,
  progress,
  totalFrames = DEFAULT_FRAME_COUNT,
  overlayClassName = 'bg-black/45',
  showProgressBar = true,
}) => {
  const [isFrameCacheReady, setIsFrameCacheReady] = useState(false);
  const [isFirstFrameDrawn, setIsFirstFrameDrawn] = useState(false);
  const [displayPercent, setDisplayPercent] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<ImageBitmap[]>([]);
  const smoothedProgressRef = useRef(progress);
  const lastDrawnIndexRef = useRef<number>(-1);
  const sectionIdRef = useRef<number | null>(null);
  const reportedIndicesRef = useRef<Set<number>>(new Set());

  const { registerSection, reportLoaded, markSectionDone } = useLoading();
  const numFrames = totalFrames;

  // Extract frames from video
  useEffect(() => {
    let isCancelled = false;

    if (sectionIdRef.current === null) {
      sectionIdRef.current = registerSection(numFrames);
    }

    const extractFrames = async () => {
      const offVideo = document.createElement('video');
      offVideo.muted = true;
      offVideo.playsInline = true;
      offVideo.crossOrigin = 'anonymous';
      offVideo.preload = 'auto';
      offVideo.src = videoSrc;

      try {
        await new Promise<void>((resolve, reject) => {
          offVideo.onloadedmetadata = () => resolve();
          offVideo.onerror = (e) => reject(e);
          offVideo.load();
        });
      } catch {
        if (!isCancelled && sectionIdRef.current !== null) {
          markSectionDone(sectionIdRef.current);
        }
        return;
      }

      if (isCancelled) return;

      const duration = offVideo.duration || 10;
      const videoW = offVideo.videoWidth || 1280;
      const videoH = offVideo.videoHeight || 720;
      const scale = Math.min(1, MAX_WIDTH / videoW);
      const targetW = Math.round(videoW * scale);
      const targetH = Math.round(videoH * scale);

      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = targetW;
      tempCanvas.height = targetH;
      const tempCtx = tempCanvas.getContext('2d', { alpha: false });
      if (!tempCtx) {
        if (sectionIdRef.current !== null) markSectionDone(sectionIdRef.current);
        return;
      }

      for (let i = 0; i < numFrames; i++) {
        if (isCancelled) return;

        const targetTime = (i / (numFrames - 1)) * Math.max(0.1, duration - 0.05);

        await new Promise<void>((resolve) => {
          const onSeeked = () => {
            offVideo.removeEventListener('seeked', onSeeked);
            resolve();
          };
          offVideo.addEventListener('seeked', onSeeked);
          offVideo.currentTime = targetTime;
        });

        tempCtx.drawImage(offVideo, 0, 0, targetW, targetH);
        const bitmap = await createImageBitmap(tempCanvas);
        framesRef.current.push(bitmap);

        // Report to global loading context (only once per frame)
        if (!reportedIndicesRef.current.has(i)) {
          reportedIndicesRef.current.add(i);
          reportLoaded(1);
        }

        // Draw first frame immediately
        if (i === 0 && canvasRef.current) {
          const ctx = canvasRef.current.getContext('2d', { alpha: false });
          if (ctx) {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            const displayW = canvasRef.current.parentElement?.clientWidth || window.innerWidth;
            const displayH = canvasRef.current.parentElement?.clientHeight || window.innerHeight;
            const cw = Math.round(displayW * dpr);
            const ch = Math.round(displayH * dpr);
            if (canvasRef.current.width !== cw || canvasRef.current.height !== ch) {
              canvasRef.current.width = cw;
              canvasRef.current.height = ch;
            }
            const s = Math.max(cw / targetW, ch / targetH);
            ctx.drawImage(bitmap, (cw - targetW * s) / 2, (ch - targetH * s) / 2, targetW * s, targetH * s);
            setIsFirstFrameDrawn(true);
          }
        }
      }

      if (!isCancelled) {
        setIsFrameCacheReady(true);
        if (sectionIdRef.current !== null) {
          markSectionDone(sectionIdRef.current);
        }
      }
    };

    const timer = setTimeout(extractFrames, 100);

    return () => {
      isCancelled = true;
      clearTimeout(timer);
      framesRef.current.forEach((b) => b.close?.());
      framesRef.current = [];
    };
  }, [videoSrc, numFrames, registerSection, reportLoaded, markSectionDone]);

  // Render loop
  useEffect(() => {
    let animId: number;
    let lastPercent = -1;

    const render = () => {
      const smoothed = smoothedProgressRef.current + (progress - smoothedProgressRef.current) * 0.25;
      smoothedProgressRef.current = smoothed;

      const currentPct = Math.round(smoothed * 100);
      if (currentPct !== lastPercent) {
        lastPercent = currentPct;
        setDisplayPercent(Math.min(100, Math.max(0, currentPct)));
      }

      const f = framesRef.current;
      if (isFrameCacheReady && canvasRef.current && f.length > 0) {
        const ctx = canvasRef.current.getContext('2d', { alpha: false });
        if (ctx) {
          const dpr = Math.min(window.devicePixelRatio || 1, 2);
          const displayW = window.innerWidth;
          const displayH = window.innerHeight;
          const cw = Math.round(displayW * dpr);
          const ch = Math.round(displayH * dpr);

          if (canvasRef.current.width !== cw || canvasRef.current.height !== ch) {
            canvasRef.current.width = cw;
            canvasRef.current.height = ch;
          }

          const idx = Math.min(f.length - 1, Math.max(0, Math.round(smoothed * (f.length - 1))));
          const frame = f[idx];

          if (frame && lastDrawnIndexRef.current !== idx) {
            const s = Math.max(cw / frame.width, ch / frame.height);
            const dw = frame.width * s;
            const dh = frame.height * s;
            ctx.drawImage(frame, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
            lastDrawnIndexRef.current = idx;
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [progress, isFrameCacheReady]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      const f = framesRef.current;
      const idx = lastDrawnIndexRef.current;
      if (f.length > 0 && idx >= 0 && idx < f.length && canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d', { alpha: false });
        if (ctx) {
          const dpr = Math.min(window.devicePixelRatio || 1, 2);
          const cw = Math.round(window.innerWidth * dpr);
          const ch = Math.round(window.innerHeight * dpr);
          canvasRef.current.width = cw;
          canvasRef.current.height = ch;
          const frame = f[idx];
          const s = Math.max(cw / frame.width, ch / frame.height);
          ctx.drawImage(frame, (cw - frame.width * s) / 2, (ch - frame.height * s) / 2, frame.width * s, frame.height * s);
        }
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none bg-black">
      {/* Static poster image shown until first frame draws */}
      {posterSrc && (
        <img
          src={posterSrc}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            isFirstFrameDrawn ? 'opacity-0' : 'opacity-100'
          }`}
        />
      )}

      {/* Hardware-accelerated smooth canvas */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
          isFirstFrameDrawn ? 'opacity-100' : 'opacity-0'
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
