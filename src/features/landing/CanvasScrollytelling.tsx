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
    const state = { frame: 0 };
    let raf = 0;
    let mounted = true;

    function resize() {
      if (!canvas) return;
      const { clientWidth: w, clientHeight: h } = canvas;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      render();
    }

    function render() {
      if (!ctx || !canvas) return;
      const img = images[state.frame];
      if (!img || !img.complete) return;
      const cw = canvas.width;
      const ch = canvas.height;
      ctx.clearRect(0, 0, cw, ch);
      // cover-fit
      const ir = img.width / img.height;
      const cr = cw / ch;
      let dw = cw,
        dh = ch,
        dx = 0,
        dy = 0;
      if (ir > cr) {
        dh = ch;
        dw = ch * ir;
        dx = (cw - dw) / 2;
      } else {
        dw = cw;
        dh = cw / ir;
        dy = (ch - dh) / 2;
      }
      ctx.drawImage(img, dx, dy, dw, dh);
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
      scrub: 0.5,
      onUpdate: (self) => {
        const p = self.progress;
        const next = Math.min(frames.length - 1, Math.floor(p * frames.length));
        if (next !== state.frame) {
          state.frame = next;
          render();
        }
        if (onProgress) onProgress(p);
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
