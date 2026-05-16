"use client";
import React, { useEffect, useRef, useState, useMemo } from "react";
import { createTimeline, stagger } from "animejs";

interface HackerTextProps {
  text: string;
  className?: string;
}

/**
 * HackerText (Loid Code Effect)
 * Optimized version:
 * - Pre-splits text to avoid re-renders during animation.
 * - Uses a cleaner timeline management to prevent lag.
 * - Transitions to green monospace font on hover as requested.
 */
export const HackerText: React.FC<HackerTextProps> = ({ text, className }) => {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  // Memoize character splits to prevent expensive re-calculations
  const letters = useMemo(() => text.split(""), [text]);
  const hoverLetters = useMemo(() => text.toUpperCase().split(""), [text]);

  useEffect(() => {
    if (!containerRef.current) return;

    const baseChars = containerRef.current.querySelectorAll(".base-char");
    const hoverChars = containerRef.current.querySelectorAll(".hover-char");

    const tl = createTimeline({
      easing: "easeOutExpo",
      duration: 600,
    });

    if (isHovered) {
      tl.add({
        targets: baseChars,
        opacity: [1, 0],
        translateY: [0, -8],
        delay: stagger(20),
      }).add(
        {
          targets: hoverChars,
          opacity: [0, 1],
          translateY: [8, 0],
          color: "#84a98c", // sage primary green
          delay: stagger(20),
        },
        "-=500",
      );
    } else {
      tl.add({
        targets: hoverChars,
        opacity: [1, 0],
        translateY: [0, 8],
        delay: stagger(10),
      }).add(
        {
          targets: baseChars,
          opacity: [0, 1],
          translateY: [-8, 0],
          delay: stagger(10),
        },
        "-=400",
      );
    }

    return () => {
      // No explicit cleanup needed for anime timelines on simple hovers,
      // but we could call tl.pause() if needed.
    };
  }, [isHovered]);

  return (
    <span
      ref={containerRef}
      className={`relative inline-block select-none cursor-default ${className || ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Ghost text for layout stability */}
      <span className="invisible whitespace-pre" aria-hidden="true">
        {text.toUpperCase()}
      </span>

      {/* Base Layer (Sans-serif) */}
      <span className="absolute inset-0 flex items-center justify-center overflow-hidden">
        {letters.map((c, i) => (
          <span key={i} className="base-char inline-block whitespace-pre will-change-transform">
            {c}
          </span>
        ))}
      </span>

      {/* Hover Layer (Monospace Code Style) */}
      <span
        className="absolute inset-0 flex items-center justify-center font-mono font-bold"
        style={{ fontFamily: "var(--font-mono, monospace)" }}
        aria-hidden="true"
      >
        {hoverLetters.map((c, i) => (
          <span
            key={i}
            className="hover-char inline-block whitespace-pre opacity-0 will-change-transform"
          >
            {c}
          </span>
        ))}
      </span>
    </span>
  );
};
