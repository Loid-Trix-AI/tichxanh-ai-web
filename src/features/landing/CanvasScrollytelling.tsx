"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * CanvasScrollytelling
 * -------------------------------------------------------------------------
 * Renders an image sequence to a <canvas> driven by GSAP ScrollTrigger.
 *
 * Why <canvas> instead of <video>?
 *   <video> elements stall, frame-skip, and show black flashes on iOS Safari
 *   when their currentTime is scrubbed by scroll. A pre-decoded image
 *   sequence drawn to a 2D canvas gives perfectly smooth, deterministic
 *   scroll-linked playback on every device.
 *
 * Inputs:
 *   - frames:        URLs of frame_0001.webp ... frame_NNNN.webp
 *   - pinTargetRef:  the section element to pin while scrubbing
 *   - onProgress:    optional progress callback (0..1) for parent overlays
 */
export type CanvasScrollytellingProps = {
  frames: string[];
  pinTargetRef: React.RefObject<HTMLElement | null>;
  scrollDistance?: string; // e.g. "+=300%"
  onProgress?: (p: number) => void;
  className?: string;
};

export default function CanvasScrollytelling({
  frames,
  pinTargetRef,
  scrollDistance = "+=300%",
  onProgress,
  className,
}: CanvasScrollytellingProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const canvas = canvasRef.current;
    const pinTarget = pinTargetRef.current;
    if (!canvas || !pinTarget || frames.length === 0) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const images: HTMLImageElement[] = [];
    const state = { frame: 0, progress: 0, ticking: false };
    let raf = 0;
    let mounted = true;

    function resize() {
      if (!canvas) return;
      const { clientWidth: w, clientHeight: h } = canvas;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      render(state.progress);
    }

    function drawCover(img: HTMLImageElement, cw: number, ch: number) {
      const ir = img.width / img.height;
      const cr = cw / ch;
      let dw = cw,
        dh = ch,
        dx = 0,
        dy = 0;
      if (ir > cr) {
        dh = ch;
        dw = Math.floor(ch * ir);
        dx = Math.floor((cw - dw) / 2);
      } else {
        dw = cw;
        dh = Math.floor(cw / ir);
        dy = Math.floor((ch - dh) / 2);
      }
      ctx!.drawImage(img, dx, dy, dw, dh);
    }

    function render(progress?: number) {
      if (!ctx || !canvas) return;
      const cw = canvas.width;
      const ch = canvas.height;

      if (progress === undefined) {
        const img = images[state.frame];
        if (!img || !img.complete) return;
        ctx.clearRect(0, 0, cw, ch);
        ctx.globalAlpha = 1;
        drawCover(img, cw, ch);
        return;
      }

      // Smooth Frame Blending for low-fps sequences
      const exactFrame = progress * (frames.length - 1);
      const frame1 = Math.floor(exactFrame);
      const frame2 = Math.min(frames.length - 1, frame1 + 1);
      const alpha = exactFrame - frame1;

      const img1 = images[frame1];
      const img2 = images[frame2];

      if (!img1 || !img1.complete) return;

      ctx.clearRect(0, 0, cw, ch);
      
      // Draw base frame
      ctx.globalAlpha = 1;
      drawCover(img1, cw, ch);

      // Blend next frame on top
      if (alpha > 0.01 && img2 && img2.complete && frame1 !== frame2) {
        ctx.globalAlpha = alpha;
        drawCover(img2, cw, ch);
      }
      
      ctx.globalAlpha = 1;
    }

    // Preload + decode in parallel; decode() avoids first-paint jank.
    const preload = frames.map((src) => {
      const im = new Image();
      im.decoding = "async";
      im.src = src;
      return im
        .decode()
        .catch(() => undefined)
        .then(() => im);
    });

    Promise.all(preload).then((loaded) => {
      if (!mounted) return;
      loaded.forEach((im, i) => (images[i] = im));
      render();
    });

    // Initial best-effort render with whatever decoded first.
    images[0] = new Image();
    images[0].src = frames[0];
    images[0].onload = render;

    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(resize);
    };
    window.addEventListener("resize", onResize);
    resize();

    const trigger = ScrollTrigger.create({
      trigger: pinTarget,
      start: "top top",
      end: scrollDistance,
      pin: true,
      scrub: 1.5,
      onUpdate: (self) => {
        state.progress = self.progress;
        if (!state.ticking) {
          state.ticking = true;
          raf = requestAnimationFrame(() => {
            render(state.progress);
            state.ticking = false;
          });
        }
        if (onProgress) onProgress(self.progress);
      },
    });

    return () => {
      mounted = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      trigger.kill();
    };
  }, [frames, pinTargetRef, scrollDistance, onProgress]);

  return <canvas ref={canvasRef} className={className} />;
}
