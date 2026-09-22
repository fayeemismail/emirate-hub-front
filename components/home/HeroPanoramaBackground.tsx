"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface HeroPanoramaBackgroundProps {
  imageSrc?: string;
}

export default function HeroPanoramaBackground({
  imageSrc = "/images/hero-panorama.jpg",
}: HeroPanoramaBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const firstImgRef = useRef<HTMLImageElement>(null);

  const stateRef = useRef({
    currentX: 0,
    targetX: 0,
    imageWidth: 1400,
    isDragging: false,
    startX: 0,
    lastX: 0,
    velocityX: 0,
    lastTime: 0,
    idleTimer: 0,
    userHasInteracted: false,
    lastScrollY: 0,
    isInitialized: false,
  });

  const [hasInteracted, setHasInteracted] = useState(false);

  // Calculate single image width based on container height and natural image aspect ratio
  const measureImage = useCallback(() => {
    if (!containerRef.current) return;
    const containerHeight = containerRef.current.clientHeight || window.innerHeight;

    let width = 0;
    if (firstImgRef.current && firstImgRef.current.naturalWidth > 0) {
      const aspect = firstImgRef.current.naturalWidth / firstImgRef.current.naturalHeight;
      width = Math.round(containerHeight * aspect);
    } else {
      // Default aspect ratio of ~1.694
      width = Math.round(containerHeight * 1.694);
    }

    stateRef.current.imageWidth = Math.max(width, 700);

    // Center the best part of the skyline (Burj Khalifa & sunset) on first load
    if (!stateRef.current.isInitialized) {
      stateRef.current.isInitialized = true;
      const initialOffset = -Math.round(stateRef.current.imageWidth * 0.35);
      stateRef.current.targetX = initialOffset;
      stateRef.current.currentX = initialOffset;
      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${initialOffset}px, 0, 0)`;
      }
    }
  }, []);

  useEffect(() => {
    measureImage();
    window.addEventListener("resize", measureImage);
    return () => window.removeEventListener("resize", measureImage);
  }, [measureImage]);

  // Main 60-120fps animation loop
  useEffect(() => {
    let animationFrameId: number;
    const state = stateRef.current;
    state.lastScrollY = window.scrollY;

    const animate = () => {
      const now = performance.now();
      const imgW = state.imageWidth;

      // Ambient slow cinematic glide when user is idle
      if (!state.isDragging && now - state.idleTimer > 1500) {
        state.targetX -= 0.35;
      }

      // Smooth lerp damping
      const lerp = state.isDragging ? 0.28 : 0.08;
      state.currentX += (state.targetX - state.currentX) * lerp;

      // Infinite loop wrap: keep targetX and currentX within [-imgW, 0]
      if (imgW > 0) {
        while (state.currentX <= -imgW) {
          state.currentX += imgW;
          state.targetX += imgW;
        }
        while (state.currentX > 0) {
          state.currentX -= imgW;
          state.targetX -= imgW;
        }
      }

      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${state.currentX.toFixed(2)}px, 0, 0)`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    // Scroll-driven horizontal parallax
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const deltaY = scrollY - state.lastScrollY;
      state.lastScrollY = scrollY;

      if (scrollY <= window.innerHeight * 1.5) {
        state.targetX -= deltaY * 0.55;
        state.idleTimer = performance.now();
        if (!state.userHasInteracted) {
          state.userHasInteracted = true;
          setHasInteracted(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Pointer event handlers for touch swipe & mouse drag
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;

    const state = stateRef.current;
    state.isDragging = true;
    state.startX = e.clientX;
    state.lastX = e.clientX;
    state.velocityX = 0;
    state.lastTime = performance.now();
    state.idleTimer = performance.now();

    if (!state.userHasInteracted) {
      state.userHasInteracted = true;
      setHasInteracted(true);
    }

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // Ignore
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const state = stateRef.current;
    if (!state.isDragging) return;

    const now = performance.now();
    const dx = e.clientX - state.lastX;
    state.lastX = e.clientX;

    state.targetX += dx * 1.25;
    state.currentX += dx * 0.8;

    const dt = Math.max(now - state.lastTime, 8);
    state.velocityX = (dx / dt) * 16;
    state.lastTime = now;
    state.idleTimer = now;
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const state = stateRef.current;
    if (!state.isDragging) return;
    state.isDragging = false;

    // Apply inertia
    const momentum = Math.max(Math.min(state.velocityX * 16, 450), -450);
    state.targetX += momentum;
    state.idleTimer = performance.now();

    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {
      // Ignore
    }
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const state = stateRef.current;
    if (Math.abs(e.deltaX) > 2) {
      state.targetX -= e.deltaX * 1.1;
      state.idleTimer = performance.now();
      if (!state.userHasInteracted) {
        state.userHasInteracted = true;
        setHasInteracted(true);
      }
    }
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onWheel={handleWheel}
      className="absolute inset-0 select-none overflow-hidden touch-pan-y cursor-grab active:cursor-grabbing z-0"
      style={{ touchAction: "pan-y" }}
      aria-label="Interactive Dubai Panorama Background"
    >
      {/* Repeating 4-tile track for seamless infinite horizontal loop */}
      <div
        ref={trackRef}
        className="absolute inset-y-0 left-0 flex h-full will-change-transform"
        style={{ transform: "translate3d(0, 0, 0)" }}
      >
        {[0, 1, 2, 3].map((idx) => (
          <img
            key={idx}
            ref={idx === 0 ? firstImgRef : undefined}
            src={imageSrc}
            alt=""
            onLoad={idx === 0 ? measureImage : undefined}
            draggable={false}
            className="h-full w-auto max-w-none select-none pointer-events-none object-cover"
          />
        ))}
      </div>

      {/* Balanced Cinematic Overlays:
          - Overall subtle dark overlay to make lights & reflections glow
          - Left-side gradient for razor-sharp text contrast
          - Top & bottom edge fades for smooth blending */}
      <div className="absolute inset-0 bg-black/45 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/70 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/85 to-transparent pointer-events-none" />

      {/* Interactive Engagement Hint */}
      <div
        className={`absolute bottom-6 right-6 md:bottom-8 md:right-10 z-20 pointer-events-none transition-all duration-700 ease-out hidden sm:flex items-center gap-2.5 px-4 py-2 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white/90 shadow-xl ${
          hasInteracted ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
        }`}
      >
        <span className="flex items-center gap-1 text-[#E02126] font-bold text-xs tracking-widest animate-pulse">
          <span>◀</span>
          <span>▶</span>
        </span>
        <span className="text-xs font-medium tracking-wide">
          Swipe or scroll to explore Dubai
        </span>
      </div>
    </div>
  );
}
