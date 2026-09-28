"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";

interface HeroPanoramaBackgroundProps {
  imageSrc?: string;
  images?: string[];
}

export default function HeroPanoramaBackground({
  imageSrc = "/images/hero-panorama.jpg",
  images,
}: HeroPanoramaBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const tracksRef = useRef<(HTMLDivElement | null)[]>([]);
  const firstImgRef = useRef<HTMLImageElement>(null);

  // Normalize images list
  const imageList = useMemo(() => {
    if (images && images.length > 0) {
      return images;
    }
    return [imageSrc];
  }, [images, imageSrc]);

  // Preload all images so transitions are instant and seamless
  useEffect(() => {
    imageList.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [imageList]);

  // Active image index
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentIndexRef = useRef(0);
  currentIndexRef.current = currentIndex;

  // Detect large screen (width >= 1024px)
  const [isLgScreen, setIsLgScreen] = useState(false);

  useEffect(() => {
    const checkIsLg = () => {
      setIsLgScreen(window.innerWidth >= 1024);
    };
    checkIsLg();
    window.addEventListener("resize", checkIsLg);
    return () => window.removeEventListener("resize", checkIsLg);
  }, []);

  // Per-image pan positions for mobile so outgoing images don't snap
  const panPositionsRef = useRef<number[]>([0, 0, 0, 0]);

  const stateRef = useRef({
    targetX: 0,
    imageWidth: 1400,
    containerWidth: 400,
    isDragging: false,
    startX: 0,
    lastX: 0,
    velocityX: 0,
    lastTime: 0,
    idleTimer: 0,
    userHasInteracted: false,
  });

  const [hasInteracted, setHasInteracted] = useState(false);

  // 5-second rotation timer: only switches when timer arrives (and not actively dragging)
  useEffect(() => {
    if (imageList.length <= 1) return;

    const timer = setInterval(() => {
      if (stateRef.current.isDragging) return;
      setCurrentIndex((prev) => (prev + 1) % imageList.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [imageList.length]);

  // When active image changes on mobile, reset targetX to start of new image
  useEffect(() => {
    stateRef.current.targetX = 0;
    stateRef.current.idleTimer = performance.now();
  }, [currentIndex]);

  // Measure single image width based on container height & natural aspect ratio
  const measureImage = useCallback(() => {
    if (!containerRef.current) return;
    const containerHeight =
      containerRef.current.clientHeight || window.innerHeight;
    const containerWidth =
      containerRef.current.clientWidth || window.innerWidth;

    stateRef.current.containerWidth = containerWidth;

    let width = 0;
    if (firstImgRef.current && firstImgRef.current.naturalWidth > 0) {
      const aspect =
        firstImgRef.current.naturalWidth / firstImgRef.current.naturalHeight;
      width = Math.round(containerHeight * aspect);
    } else {
      width = Math.round(containerHeight * 1.694);
    }

    stateRef.current.imageWidth = Math.max(width, containerWidth);
  }, []);

  useEffect(() => {
    measureImage();
    window.addEventListener("resize", measureImage);
    return () => window.removeEventListener("resize", measureImage);
  }, [measureImage]);

  // Animation loop (runs only on screens < lg)
  useEffect(() => {
    let animationFrameId: number;
    const state = stateRef.current;

    const animate = () => {
      // On large screens (>= 1024px), the image is completely still (NOT moving)
      if (window.innerWidth >= 1024) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      const now = performance.now();
      const activeIdx = currentIndexRef.current;
      const maxPan = Math.max(0, state.imageWidth - state.containerWidth);

      // Slow, subtle auto-swipe when user is idle
      if (!state.isDragging && now - state.idleTimer > 1200) {
        // Once completely swiped to the end (-maxPan), do NOT move further!
        if (state.targetX > -maxPan) {
          state.targetX -= 0.42; // Smooth, moderate cinematic auto-glide
          if (state.targetX < -maxPan) {
            state.targetX = -maxPan;
          }
        }
      }

      // Smooth lerp damping
      const currentVal = panPositionsRef.current[activeIdx] ?? 0;
      const lerp = state.isDragging ? 0.25 : 0.08;
      let nextVal = currentVal + (state.targetX - currentVal) * lerp;

      // Strictly clamp within [ -maxPan, 0 ] so image never exposes black edges or seams
      nextVal = Math.max(-maxPan, Math.min(0, nextVal));
      panPositionsRef.current[activeIdx] = nextVal;

      const track = tracksRef.current[activeIdx];
      if (track) {
        track.style.transform = `translate3d(${nextVal.toFixed(2)}px, 0, 0)`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Pointer event handlers for touch swipe & mouse drag (disabled on lg screen)
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (window.innerWidth >= 1024) return;
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
    if (window.innerWidth >= 1024) return;
    const state = stateRef.current;
    if (!state.isDragging) return;

    const now = performance.now();
    const dx = e.clientX - state.lastX;
    state.lastX = e.clientX;

    const maxPan = Math.max(0, state.imageWidth - state.containerWidth);
    // Move targetX clamped within [ -maxPan, 0 ]
    state.targetX = Math.max(-maxPan, Math.min(0, state.targetX + dx * 1.15));

    const dt = Math.max(now - state.lastTime, 8);
    state.velocityX = (dx / dt) * 16;
    state.lastTime = now;
    state.idleTimer = now;
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (window.innerWidth >= 1024) return;
    const state = stateRef.current;
    if (!state.isDragging) return;
    state.isDragging = false;

    const maxPan = Math.max(0, state.imageWidth - state.containerWidth);
    // Apply inertia within bounds
    const momentum = Math.max(Math.min(state.velocityX * 10, 250), -250);
    state.targetX = Math.max(-maxPan, Math.min(0, state.targetX + momentum));
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
    if (window.innerWidth >= 1024) return;
    const state = stateRef.current;
    const maxPan = Math.max(0, state.imageWidth - state.containerWidth);
    if (Math.abs(e.deltaX) > 2) {
      state.targetX = Math.max(
        -maxPan,
        Math.min(0, state.targetX - e.deltaX * 0.9)
      );
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
      className="absolute inset-0 select-none overflow-hidden touch-pan-y cursor-grab active:cursor-grabbing lg:cursor-default z-0"
      style={{ touchAction: isLgScreen ? "auto" : "pan-y" }}
      aria-label="Interactive UAE Panorama Background"
    >
      {/* 1. Large screens (>= 1024px): completely stationary, NOT moving, with 5s timer and smooth 1.8s crossfade */}
      <div className="hidden lg:block absolute inset-0">
        {imageList.map((src, imgIdx) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-[1800ms] ease-in-out ${
              imgIdx === currentIndex
                ? "opacity-100 z-10"
                : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            <img
              src={src}
              alt=""
              draggable={false}
              className="w-full h-full object-cover object-center select-none pointer-events-none"
            />
          </div>
        ))}
      </div>

      {/* 2. Mobile & Tablet screens (< 1024px): single-image clamped pan with slow auto-swipe, NO seams, transitions only on timer */}
      <div className="block lg:hidden absolute inset-0">
        {imageList.map((src, imgIdx) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              imgIdx === currentIndex
                ? "opacity-100 z-10"
                : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            <div
              ref={(el) => {
                tracksRef.current[imgIdx] = el;
              }}
              className="absolute inset-y-0 left-0 h-full flex will-change-transform"
              style={{
                transform: `translate3d(${(panPositionsRef.current[imgIdx] ?? 0).toFixed(2)}px, 0, 0)`,
              }}
            >
              <img
                ref={imgIdx === 0 ? firstImgRef : undefined}
                src={src}
                alt=""
                onLoad={imgIdx === 0 ? measureImage : undefined}
                draggable={false}
                className="h-full w-auto max-w-none select-none pointer-events-none object-cover"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Balanced Cinematic Overlays (Preserved exactly as previously and positioned above images with z-20) */}
      <div className="absolute inset-0 bg-black/45 pointer-events-none z-20" />
      <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-transparent pointer-events-none z-20" />
      <div className="absolute inset-x-0 top-0 h-28 bg-linear-to-b from-black/70 to-transparent pointer-events-none z-20" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-black/85 to-transparent pointer-events-none z-20" />

      {/* Interactive Engagement Hint: hidden on lg screens */}
      <div
        className={`absolute bottom-6 right-6 md:bottom-8 md:right-10 z-30 pointer-events-none transition-all duration-700 ease-out hidden sm:flex lg:hidden items-center gap-2.5 px-4 py-2 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white/90 shadow-xl ${
          hasInteracted ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
        }`}
      >
        <span className="flex items-center gap-1 text-[#E02126] font-bold text-xs tracking-widest animate-pulse">
          <span>◀</span>
          <span>▶</span>
        </span>
        <span className="text-xs font-medium tracking-wide">
          Swipe to explore UAE
        </span>
      </div>
    </div>
  );
}
