import React, { useEffect, useRef, useState } from 'react';

const VIDEO_1_SRC = '/1.mp4';
const VIDEO_2_SRC = '/2.mp4';
const POSTER_1 = '/v1_start.jpg';
const POSTER_2 = '/v2_start.jpg';

export const ScrollVideo: React.FC = () => {
  const [hasV1Frame, setHasV1Frame] = useState(false);
  const [hasV2Frame, setHasV2Frame] = useState(false);
  const [isFrameCacheReady, setIsFrameCacheReady] = useState(false);

  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frames1Ref = useRef<ImageBitmap[]>([]);
  const frames2Ref = useRef<ImageBitmap[]>([]);
  const targetProgressRef = useRef(0);
  const smoothedProgressRef = useRef(0);

  // Handle scroll progress
  useEffect(() => {
    const calculateProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const innerHeight = window.innerHeight;
      const maxScroll = scrollHeight - innerHeight;
      const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      targetProgressRef.current = Math.min(1, Math.max(0, progress));
    };

    calculateProgress();
    window.addEventListener('scroll', calculateProgress, { passive: true });
    window.addEventListener('resize', calculateProgress, { passive: true });

    return () => {
      window.removeEventListener('scroll', calculateProgress);
      window.removeEventListener('resize', calculateProgress);
    };
  }, []);

  // Frame extraction helper for a given video
  const extractFrames = async (
    videoUrl: string,
    onCancelCheck: () => boolean
  ): Promise<ImageBitmap[]> => {
    const offVideo = document.createElement('video');
    offVideo.muted = true;
    offVideo.playsInline = true;
    offVideo.crossOrigin = 'anonymous';
    offVideo.preload = 'auto';
    offVideo.src = videoUrl;

    await new Promise<void>((resolve, reject) => {
      offVideo.onloadedmetadata = () => resolve();
      offVideo.onerror = (e) => reject(e);
      offVideo.load();
    });

    if (onCancelCheck()) return [];

    const duration = offVideo.duration || 10;
    const numFrames = 48; // Crisp 48 frames per video
    const extracted: ImageBitmap[] = [];

    const videoWidth = offVideo.videoWidth || 1280;
    const videoHeight = offVideo.videoHeight || 720;
    const maxWidth = 960;
    const scale = Math.min(1, maxWidth / videoWidth);
    const targetW = Math.round(videoWidth * scale);
    const targetH = Math.round(videoHeight * scale);

    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = targetW;
    tempCanvas.height = targetH;
    const tempCtx = tempCanvas.getContext('2d', { alpha: false });

    if (!tempCtx) throw new Error('Could not get 2d context');

    for (let i = 0; i < numFrames; i++) {
      if (onCancelCheck()) return [];
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
      extracted.push(bitmap);
    }

    return extracted;
  };

  // Frame extraction routine for both videos
  useEffect(() => {
    let isCancelled = false;
    let extractionTimeout: ReturnType<typeof setTimeout>;

    const startExtraction = () => {
      // 300ms yield before starting background frame extraction
      extractionTimeout = setTimeout(async () => {
        if (isCancelled) return;

        try {
          // Extract Video 1 frames
          const f1 = await extractFrames(VIDEO_1_SRC, () => isCancelled);
          if (isCancelled) return;
          frames1Ref.current = f1;

          // Extract Video 2 frames
          const f2 = await extractFrames(VIDEO_2_SRC, () => isCancelled);
          if (isCancelled) return;
          frames2Ref.current = f2;

          if (!isCancelled && f1.length > 0 && f2.length > 0) {
            setIsFrameCacheReady(true);
          }
        } catch (err) {
          console.warn('Frame cache extraction error, using real-time video fallback:', err);
        }
      }, 300);
    };

    if (hasV1Frame && hasV2Frame) {
      startExtraction();
    }

    return () => {
      isCancelled = true;
      clearTimeout(extractionTimeout);
      frames1Ref.current.forEach((b) => b.close?.());
      frames2Ref.current.forEach((b) => b.close?.());
      frames1Ref.current = [];
      frames2Ref.current = [];
    };
  }, [hasV1Frame, hasV2Frame]);

  // Main rendering & lerp loop
  useEffect(() => {
    let animId: number;

    const render = () => {
      const smoothed =
        smoothedProgressRef.current +
        (targetProgressRef.current - smoothedProgressRef.current) * 0.12;
      smoothedProgressRef.current = smoothed;

      // Section 1 active range: 0.0 to 0.28
      // Spacer & Section 2 active range: 0.30 to 1.0
      const p1 = Math.min(1, Math.max(0, smoothed / 0.28));
      const p2 = Math.min(1, Math.max(0, (smoothed - 0.32) / 0.68));

      // Seamless crossfade in the spacer zone (0.24 to 0.38)
      let crossfade = 0;
      if (smoothed <= 0.24) {
        crossfade = 0;
      } else if (smoothed >= 0.38) {
        crossfade = 1;
      } else {
        const rawT = (smoothed - 0.24) / 0.14;
        // Smoothstep curve for seamless blending
        crossfade = rawT * rawT * (3 - 2 * rawT);
      }

      const canvas = canvasRef.current;
      const f1 = frames1Ref.current;
      const f2 = frames2Ref.current;

      if (isFrameCacheReady && canvas && f1.length > 0 && f2.length > 0) {
        const ctx = canvas.getContext('2d', { alpha: false });
        if (ctx) {
          const dpr = Math.min(window.devicePixelRatio || 1, 2);
          const displayW = window.innerWidth;
          const displayH = window.innerHeight;

          if (canvas.width !== Math.round(displayW * dpr) || canvas.height !== Math.round(displayH * dpr)) {
            canvas.width = Math.round(displayW * dpr);
            canvas.height = Math.round(displayH * dpr);
          }

          const cw = canvas.width;
          const ch = canvas.height;

          const idx1 = Math.min(f1.length - 1, Math.max(0, Math.floor(p1 * f1.length)));
          const idx2 = Math.min(f2.length - 1, Math.max(0, Math.floor(p2 * f2.length)));
          const frame1 = f1[idx1];
          const frame2 = f2[idx2];

          // Draw Frame 1
          if (crossfade < 1 && frame1) {
            const scale1 = Math.max(cw / frame1.width, ch / frame1.height);
            const dw1 = frame1.width * scale1;
            const dh1 = frame1.height * scale1;
            const dx1 = (cw - dw1) / 2;
            const dy1 = (ch - dh1) / 2;

            ctx.globalAlpha = 1.0;
            ctx.drawImage(frame1, dx1, dy1, dw1, dh1);
          }

          // Draw Frame 2 crossfaded on top
          if (crossfade > 0 && frame2) {
            const scale2 = Math.max(cw / frame2.width, ch / frame2.height);
            const dw2 = frame2.width * scale2;
            const dh2 = frame2.height * scale2;
            const dx2 = (cw - dw2) / 2;
            const dy2 = (ch - dh2) / 2;

            ctx.globalAlpha = crossfade;
            ctx.drawImage(frame2, dx2, dy2, dw2, dh2);
            ctx.globalAlpha = 1.0;
          }
        }
      } else {
        // Fallback: seek HTML video elements
        const v1 = video1Ref.current;
        const v2 = video2Ref.current;

        if (v1 && v1.duration) {
          const targetTime1 = p1 * Math.max(0.1, v1.duration - 0.05);
          if (Math.abs(v1.currentTime - targetTime1) > 0.04) {
            v1.currentTime = targetTime1;
          }
          v1.style.opacity = String((1 - crossfade) * (hasV1Frame ? 1 : 0));
        }

        if (v2 && v2.duration) {
          const targetTime2 = p2 * Math.max(0.1, v2.duration - 0.05);
          if (Math.abs(v2.currentTime - targetTime2) > 0.04) {
            v2.currentTime = targetTime2;
          }
          v2.style.opacity = String(crossfade * (hasV2Frame ? 1 : 0));
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [isFrameCacheReady, hasV1Frame, hasV2Frame]);

  return (
    <div className="fixed inset-0 z-0 bg-[#0a0a0a] overflow-hidden pointer-events-none">
      {/* Poster 1 */}
      <img
        src={POSTER_1}
        alt=""
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          hasV1Frame || isFrameCacheReady ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Poster 2 */}
      <img
        src={POSTER_2}
        alt=""
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          hasV2Frame || isFrameCacheReady ? 'opacity-0' : 'opacity-0'
        }`}
      />

      {/* Video 1 element (Fallback & frame source) */}
      <video
        ref={video1Ref}
        src={VIDEO_1_SRC}
        muted
        playsInline
        preload="auto"
        onLoadedData={() => {
          setHasV1Frame(true);
          if (video1Ref.current) {
            video1Ref.current.currentTime = 0.01;
          }
        }}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          isFrameCacheReady ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Video 2 element (Fallback & frame source) */}
      <video
        ref={video2Ref}
        src={VIDEO_2_SRC}
        muted
        playsInline
        preload="auto"
        onLoadedData={() => {
          setHasV2Frame(true);
          if (video2Ref.current) {
            video2Ref.current.currentTime = 0.01;
          }
        }}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          isFrameCacheReady ? 'opacity-0' : 'opacity-0'
        }`}
      />

      {/* High-performance canvas scrubbing surface */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          isFrameCacheReady ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Cinematic contrast overlay to guarantee all text is crystal clear */}
      <div className="absolute inset-0 bg-black/45 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#0a0a0a]/80 pointer-events-none" />
    </div>
  );
};
