import React, { useEffect, useRef, useState } from 'react';

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
  const [hasVideoFrame, setHasVideoFrame] = useState(false);
  const [isFrameCacheReady, setIsFrameCacheReady] = useState(false);
  const [displayPercent, setDisplayPercent] = useState(0);

  const visibleVideoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<ImageBitmap[]>([]);
  const smoothedProgressRef = useRef(0);

  // Frame extraction
  useEffect(() => {
    let isCancelled = false;
    let timer: ReturnType<typeof setTimeout>;

    const extractFrames = async () => {
      timer = setTimeout(async () => {
        if (isCancelled) return;

        try {
          const offVideo = document.createElement('video');
          offVideo.muted = true;
          offVideo.playsInline = true;
          offVideo.crossOrigin = 'anonymous';
          offVideo.preload = 'auto';
          offVideo.src = videoSrc;

          await new Promise<void>((resolve, reject) => {
            offVideo.onloadedmetadata = () => resolve();
            offVideo.onerror = (e) => reject(e);
            offVideo.load();
          });

          if (isCancelled) return;

          const duration = offVideo.duration || 10;
          const numFrames = 48;
          const extracted: ImageBitmap[] = [];

          const vw = offVideo.videoWidth || 1280;
          const vh = offVideo.videoHeight || 720;
          const maxWidth = 960;
          const scale = Math.min(1, maxWidth / vw);
          const targetW = Math.round(vw * scale);
          const targetH = Math.round(vh * scale);

          const tempCanvas = document.createElement('canvas');
          tempCanvas.width = targetW;
          tempCanvas.height = targetH;
          const tempCtx = tempCanvas.getContext('2d', { alpha: false });

          if (!tempCtx) throw new Error('Could not create temp context');

          for (let i = 0; i < numFrames; i++) {
            if (isCancelled) return;
            const time = (i / (numFrames - 1)) * Math.max(0.1, duration - 0.05);

            await new Promise<void>((resolve) => {
              const onSeeked = () => {
                offVideo.removeEventListener('seeked', onSeeked);
                resolve();
              };
              offVideo.addEventListener('seeked', onSeeked);
              offVideo.currentTime = time;
            });

            tempCtx.drawImage(offVideo, 0, 0, targetW, targetH);
            const bitmap = await createImageBitmap(tempCanvas);
            extracted.push(bitmap);
          }

          if (!isCancelled && extracted.length > 0) {
            framesRef.current = extracted;
            setIsFrameCacheReady(true);
          }
        } catch (err) {
          console.warn(`Frame cache extraction failed for ${videoSrc}, falling back to video seek:`, err);
        }
      }, 200);
    };

    if (hasVideoFrame) {
      extractFrames();
    }

    return () => {
      isCancelled = true;
      clearTimeout(timer);
      framesRef.current.forEach((b) => b.close?.());
      framesRef.current = [];
    };
  }, [hasVideoFrame, videoSrc]);

  // Render & lerp loop
  useEffect(() => {
    let animId: number;
    let lastPercent = -1;

    const render = () => {
      // Responsive lerp to controlled progress (0.18 for immediate tracking)
      const smoothed =
        smoothedProgressRef.current +
        (progress - smoothedProgressRef.current) * 0.18;
      smoothedProgressRef.current = smoothed;

      const currentPct = Math.round(smoothed * 100);
      if (currentPct !== lastPercent) {
        lastPercent = currentPct;
        setDisplayPercent(Math.min(100, Math.max(0, currentPct)));
      }

      const canvas = canvasRef.current;
      const video = visibleVideoRef.current;
      const frames = framesRef.current;

      if (isFrameCacheReady && canvas && frames.length > 0) {
        const ctx = canvas.getContext('2d', { alpha: false });
        if (ctx) {
          const dpr = Math.min(window.devicePixelRatio || 1, 2);
          const displayW = canvas.parentElement?.clientWidth || window.innerWidth;
          const displayH = canvas.parentElement?.clientHeight || window.innerHeight;

          if (canvas.width !== Math.round(displayW * dpr) || canvas.height !== Math.round(displayH * dpr)) {
            canvas.width = Math.round(displayW * dpr);
            canvas.height = Math.round(displayH * dpr);
          }

          const frameIdx = Math.min(
            frames.length - 1,
            Math.max(0, Math.floor(smoothed * frames.length))
          );
          const frame = frames[frameIdx];

          if (frame) {
            const cw = canvas.width;
            const ch = canvas.height;
            const fw = frame.width;
            const fh = frame.height;
            const coverScale = Math.max(cw / fw, ch / fh);
            const dw = fw * coverScale;
            const dh = fh * coverScale;
            const dx = (cw - dw) / 2;
            const dy = (ch - dh) / 2;

            ctx.drawImage(frame, dx, dy, dw, dh);
          }
        }
      } else if (video && video.duration) {
        const targetTime = smoothed * Math.max(0.1, video.duration - 0.05);
        if (Math.abs(video.currentTime - targetTime) > 0.03) {
          video.currentTime = targetTime;
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [progress, isFrameCacheReady]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
      {/* Poster image */}
      <img
        src={posterSrc}
        alt=""
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          hasVideoFrame || isFrameCacheReady ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Visible video fallback */}
      <video
        ref={visibleVideoRef}
        src={videoSrc}
        muted
        playsInline
        preload="auto"
        onLoadedData={() => {
          setHasVideoFrame(true);
          if (visibleVideoRef.current) {
            visibleVideoRef.current.currentTime = 0.01;
          }
        }}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          hasVideoFrame && !isFrameCacheReady ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Smooth canvas surface */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          isFrameCacheReady ? 'opacity-100' : 'opacity-0'
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
