"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface Particle3D {
  x: number;
  y: number;
  z: number;
  radius: number;
  speed: number;
  axis: { x: number; y: number; z: number };
  isRed: boolean;
  baseAlpha: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

export default function Hero3DCanvas({
  sectionRef,
}: {
  sectionRef?: React.RefObject<HTMLElement | null>;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Rotation angles (radians)
  const rotX = useRef<number>(0.2);
  const rotY = useRef<number>(0);
  const targetRotX = useRef<number>(0.2);
  const targetRotY = useRef<number>(0);
  const velX = useRef<number>(0);
  const velY = useRef<number>(0);

  // Drag interaction tracking
  const isDragging = useRef<boolean>(false);
  const lastTouchPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Scroll tracking
  const scrollYRef = useRef<number>(0);

  // Active ripples
  const ripples = useRef<Ripple[]>([]);

  // Performance / visibility
  const isVisible = useRef<boolean>(true);
  const animFrameId = useRef<number | null>(null);

  // Photon angle along ring
  const photonAngle = useRef<number>(0);

  // Pre-generate static 3D geometry
  const ring1Points = useRef<Point3D[]>([]);
  const ring2Points = useRef<Point3D[]>([]);
  const ring3Points = useRef<Point3D[]>([]);
  const coreVertices = useRef<Point3D[]>([]);
  const particles = useRef<Particle3D[]>([]);

  // Tilt constants for rings
  const TILT1 = { x: 1.05, y: 0.25 };
  const TILT2 = { x: -0.65, y: 0.85 };
  const TILT3 = { x: 0.35, y: -0.95 };

  const buildGeometry = useCallback((isMobile: boolean) => {
    const segments = isMobile ? 48 : 64;
    const r1 = isMobile ? 115 : 180;
    const r2 = isMobile ? 95 : 150;
    const r3 = isMobile ? 75 : 120;
    const coreSize = isMobile ? 36 : 54;

    // Helper to generate a circle pre-tilted
    const makeRing = (r: number, tilt: { x: number; y: number }) => {
      const pts: Point3D[] = [];
      const cosX = Math.cos(tilt.x);
      const sinX = Math.sin(tilt.x);
      const cosY = Math.cos(tilt.y);
      const sinY = Math.sin(tilt.y);

      for (let i = 0; i < segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        const x0 = r * Math.cos(theta);
        const y0 = r * Math.sin(theta);
        const z0 = 0;

        // Rotate X
        const y1 = y0 * cosX - z0 * sinX;
        const z1 = y0 * sinX + z0 * cosX;

        // Rotate Y
        const x2 = x0 * cosY + z1 * sinY;
        const z2 = -x0 * sinY + z1 * cosY;

        pts.push({ x: x2, y: y1, z: z2 });
      }
      return pts;
    };

    ring1Points.current = makeRing(r1, TILT1);
    ring2Points.current = makeRing(r2, TILT2);
    ring3Points.current = makeRing(r3, TILT3);

    // Octahedron 6 vertices
    coreVertices.current = [
      { x: 0, y: -coreSize, z: 0 },
      { x: 0, y: coreSize, z: 0 },
      { x: coreSize, y: 0, z: 0 },
      { x: -coreSize, y: 0, z: 0 },
      { x: 0, y: 0, z: coreSize },
      { x: 0, y: 0, z: -coreSize },
    ];

    // Constellation particles
    const count = isMobile ? 22 : 38;
    const newParticles: Particle3D[] = [];
    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const dist = (isMobile ? 70 : 100) + Math.random() * (isMobile ? 90 : 150);

      const sinPhi = Math.sin(phi);
      newParticles.push({
        x: dist * sinPhi * Math.cos(theta),
        y: dist * sinPhi * Math.sin(theta),
        z: dist * Math.cos(phi),
        radius: Math.random() * 1.5 + 0.8,
        speed: (Math.random() * 0.006 + 0.003) * (Math.random() > 0.5 ? 1 : -1),
        axis: {
          x: Math.random() - 0.5,
          y: Math.random() - 0.5,
          z: Math.random() - 0.5,
        },
        isRed: Math.random() < 0.25,
        baseAlpha: Math.random() * 0.5 + 0.35,
      });
    }
    particles.current = newParticles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let isMobile = false;

    const handleResize = () => {
      const rect = containerRef.current?.getBoundingClientRect();
      width = rect?.width || window.innerWidth;
      height = rect?.height || window.innerHeight;
      isMobile = width < 1024;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      buildGeometry(isMobile);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // IntersectionObserver to pause loop offscreen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible.current = entry.isIntersecting;
        if (entry.isIntersecting && !animFrameId.current) {
          lastTime = performance.now();
          animFrameId.current = requestAnimationFrame(render);
        }
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // 3D Projection math
    const project = (
      p: Point3D,
      rX: number,
      rY: number,
      cx: number,
      cy: number,
      fov: number,
      scale: number
    ) => {
      const cosY = Math.cos(rY);
      const sinY = Math.sin(rY);
      const x1 = p.x * cosY + p.z * sinY;
      const z1 = -p.x * sinY + p.z * cosY;

      const cosX = Math.cos(rX);
      const sinX = Math.sin(rX);
      const y2 = p.y * cosX - z1 * sinX;
      const z2 = p.y * sinX + z1 * cosX;

      const x3 = x1 * scale;
      const y3 = y2 * scale;
      const z3 = z2 * scale;

      const dist = fov + z3;
      if (dist <= 10) return null;

      const pScale = fov / dist;
      return {
        x: cx + x3 * pScale,
        y: cy + y3 * pScale,
        z: z3,
        scale: pScale,
        depthAlpha: Math.min(Math.max((z3 + fov * 0.7) / (fov * 1.4), 0.15), 1),
      };
    };

    let lastTime = performance.now();

    const render = (time: number) => {
      if (!isVisible.current) {
        animFrameId.current = null;
        return;
      }

      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // Auto-rotation when not dragging
      if (!isDragging.current) {
        targetRotY.current += 0.35 * dt;
        velX.current *= 0.94;
        velY.current *= 0.94;
        targetRotX.current += velX.current;
        targetRotY.current += velY.current;
      }

      // Smooth damping (lerp)
      rotX.current += (targetRotX.current - rotX.current) * 0.07;
      rotY.current += (targetRotY.current - rotY.current) * 0.07;

      // Photon travel
      photonAngle.current = (photonAngle.current + 1.2 * dt) % (Math.PI * 2);

      // Scroll Parallax offset
      const scrollOffset = scrollYRef.current * 0.28;
      const scrollAlphaFade = Math.max(1 - scrollYRef.current / (height * 0.85), 0);

      // Center calculation:
      // Mobile: centered or slightly raised in upper-mid
      // Desktop: positioned at 72% X, 50% Y
      const cx = isMobile ? width * 0.5 : width * 0.72;
      const baseCy = isMobile ? Math.min(height * 0.36, 280) : height * 0.5;
      const cy = baseCy + scrollOffset;

      const fov = isMobile ? 320 : 440;
      const modelScale = isMobile ? 0.95 : 1.0;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      if (scrollAlphaFade <= 0.01) {
        animFrameId.current = requestAnimationFrame(render);
        return;
      }

      ctx.save();
      ctx.globalAlpha = scrollAlphaFade;

      // 1. Ambient central radial glow (Brand Red #E02126)
      const pulse = 1 + Math.sin(time * 0.002) * 0.08;
      const glowR = (isMobile ? 120 : 190) * pulse;
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, glowR);
      grad.addColorStop(0, "rgba(224, 33, 38, 0.22)");
      grad.addColorStop(0.5, "rgba(224, 33, 38, 0.06)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, glowR, 0, Math.PI * 2);
      ctx.fill();

      // 2. Interactive Ripples
      for (let i = ripples.current.length - 1; i >= 0; i--) {
        const r = ripples.current[i];
        r.radius += 180 * dt;
        r.alpha -= 0.6 * dt;

        if (r.alpha <= 0 || r.radius >= r.maxRadius) {
          ripples.current.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(r.x ?? cx, r.y ?? cy, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(224, 33, 38, ${r.alpha * 0.45})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      // 3. Draw Constellation Particles & Proximity Lines
      const projParticles = particles.current.map((p) => {
        // Rotate particle slowly around its axis
        const cA = Math.cos(p.speed);
        const sA = Math.sin(p.speed);
        const nx = p.x * cA - p.z * sA;
        const nz = p.x * sA + p.z * cA;
        p.x = nx;
        p.z = nz;

        return {
          proj: project(p, rotX.current, rotY.current, cx, cy, fov, modelScale),
          isRed: p.isRed,
          radius: p.radius,
          baseAlpha: p.baseAlpha,
        };
      });

      // Connecting micro-lines
      const maxDist = isMobile ? 65 : 85;
      for (let i = 0; i < projParticles.length; i++) {
        const p1 = projParticles[i];
        if (!p1.proj) continue;

        for (let j = i + 1; j < projParticles.length; j++) {
          const p2 = projParticles[j];
          if (!p2.proj) continue;

          const dx = p1.proj.x - p2.proj.x;
          const dy = p1.proj.y - p2.proj.y;
          const d = Math.hypot(dx, dy);

          if (d < maxDist) {
            const lineAlpha = (1 - d / maxDist) * 0.22 * Math.min(p1.proj.depthAlpha, p2.proj.depthAlpha);
            ctx.beginPath();
            ctx.moveTo(p1.proj.x, p1.proj.y);
            ctx.lineTo(p2.proj.x, p2.proj.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${lineAlpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // Draw particle dots
      for (let i = 0; i < projParticles.length; i++) {
        const item = projParticles[i];
        if (!item.proj) continue;
        const p = item.proj;
        const r = item.radius * p.scale;
        const alpha = item.baseAlpha * p.depthAlpha;

        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(r, 0.5), 0, Math.PI * 2);
        if (item.isRed) {
          ctx.fillStyle = `rgba(224, 33, 38, ${alpha})`;
          ctx.shadowColor = "#E02126";
          ctx.shadowBlur = 6 * p.scale;
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.shadowBlur = 0;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Helper to draw 3D Ring with depth-segmented stroke
      const drawRing = (
        pts: Point3D[],
        strokeColor: string,
        frontWidth: number,
        backWidth: number,
        dash?: number[]
      ) => {
        const projs = pts.map((p) =>
          project(p, rotX.current, rotY.current, cx, cy, fov, modelScale)
        );

        ctx.save();
        if (dash) ctx.setLineDash(dash);

        // Draw in segments to give depth variation
        for (let i = 0; i < projs.length; i++) {
          const curr = projs[i];
          const next = projs[(i + 1) % projs.length];
          if (!curr || !next) continue;

          const avgZ = (curr.z + next.z) * 0.5;
          const isFront = avgZ > 0;

          ctx.beginPath();
          ctx.moveTo(curr.x, curr.y);
          ctx.lineTo(next.x, next.y);
          ctx.lineWidth = isFront ? frontWidth : backWidth;

          // Adjust alpha based on depth
          const depthAlpha = Math.min(Math.max((avgZ + fov * 0.6) / (fov * 1.2), 0.12), 0.95);
          ctx.strokeStyle = strokeColor.replace("__ALPHA__", depthAlpha.toFixed(2));
          ctx.stroke();
        }
        ctx.restore();
      };

      // Ring 3: Inner Orbital Ring (Dashed, White)
      drawRing(
        ring3Points.current,
        "rgba(255, 255, 255, __ALPHA__)",
        1.1,
        0.5,
        [4, 6]
      );

      // Ring 2: Intermediate Gyroscopic Ring (Brand Red + Silver nodes)
      drawRing(
        ring2Points.current,
        "rgba(224, 33, 38, __ALPHA__)",
        1.3,
        0.6
      );

      // Ring 1: Primary Equator Ring (Crisp High-Precision Platinum)
      drawRing(
        ring1Points.current,
        "rgba(255, 255, 255, __ALPHA__)",
        1.6,
        0.7
      );

      // 4. Central Octahedron Core (The Hub)
      const coreProj = coreVertices.current.map((v) =>
        project(v, rotX.current * 1.2, rotY.current * 1.4, cx, cy, fov, modelScale)
      );

      // Edges of Octahedron:
      // Index 0: Top, 1: Bottom, 2: Right, 3: Left, 4: Front, 5: Back
      const coreEdges = [
        [0, 2], [0, 3], [0, 4], [0, 5],
        [1, 2], [1, 3], [1, 4], [1, 5],
        [2, 4], [4, 3], [3, 5], [5, 2],
      ];

      ctx.save();
      for (const [i1, i2] of coreEdges) {
        const p1 = coreProj[i1];
        const p2 = coreProj[i2];
        if (!p1 || !p2) continue;

        const avgZ = (p1.z + p2.z) * 0.5;
        const depthAlpha = Math.min(Math.max((avgZ + fov * 0.6) / (fov * 1.2), 0.15), 0.9);

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = `rgba(255, 255, 255, ${(depthAlpha * 0.6).toFixed(2)})`;
        ctx.lineWidth = 0.9;
        ctx.stroke();
      }

      // Small Red Ruby Diamond at the core center
      const centerProj = project(
        { x: 0, y: 0, z: 0 },
        rotX.current,
        rotY.current,
        cx,
        cy,
        fov,
        modelScale
      );
      if (centerProj) {
        ctx.beginPath();
        ctx.arc(centerProj.x, centerProj.y, 3.5 * centerProj.scale, 0, Math.PI * 2);
        ctx.fillStyle = "#E02126";
        ctx.shadowColor = "#E02126";
        ctx.shadowBlur = 14 * centerProj.scale;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      ctx.restore();

      // 5. Traveling Photon Beam along Ring 1
      const r1Radius = isMobile ? 115 : 180;
      const cosX = Math.cos(TILT1.x);
      const sinX = Math.sin(TILT1.x);
      const cosY = Math.cos(TILT1.y);
      const sinY = Math.sin(TILT1.y);

      // Current photon position
      const pX0 = r1Radius * Math.cos(photonAngle.current);
      const pY0 = r1Radius * Math.sin(photonAngle.current);
      const pY1 = pY0 * cosX;
      const pZ1 = pY0 * sinX;
      const pX2 = pX0 * cosY + pZ1 * sinY;
      const pZ2 = -pX0 * sinY + pZ1 * cosY;

      const photonProj = project(
        { x: pX2, y: pY1, z: pZ2 },
        rotX.current,
        rotY.current,
        cx,
        cy,
        fov,
        modelScale
      );

      if (photonProj) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(photonProj.x, photonProj.y, 4 * photonProj.scale, 0, Math.PI * 2);
        ctx.fillStyle = "#FFFFFF";
        ctx.shadowColor = "#E02126";
        ctx.shadowBlur = 16 * photonProj.scale;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(photonProj.x, photonProj.y, 2 * photonProj.scale, 0, Math.PI * 2);
        ctx.fillStyle = "#E02126";
        ctx.fill();
        ctx.restore();
      }

      ctx.restore();

      animFrameId.current = requestAnimationFrame(render);
    };

    animFrameId.current = requestAnimationFrame(render);

    const targetEl = sectionRef?.current || containerRef.current;

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging.current = true;
        const rect = containerRef.current?.getBoundingClientRect();
        const clientX = e.touches[0].clientX;
        const clientY = e.touches[0].clientY;
        lastTouchPos.current = { x: clientX, y: clientY };
        if (rect) {
          ripples.current.push({
            x: clientX - rect.left,
            y: clientY - rect.top,
            radius: 10,
            maxRadius: isMobile ? 130 : 170,
            alpha: 0.8,
          });
        }
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging.current || e.touches.length !== 1) return;
      const clientX = e.touches[0].clientX;
      const clientY = e.touches[0].clientY;
      const deltaX = clientX - lastTouchPos.current.x;
      const deltaY = clientY - lastTouchPos.current.y;

      targetRotY.current += deltaX * 0.007;
      targetRotX.current = Math.max(
        Math.min(targetRotX.current - deltaY * 0.006, 0.9),
        -0.6
      );

      velX.current = -deltaY * 0.0025;
      velY.current = deltaX * 0.0035;

      lastTouchPos.current = { x: clientX, y: clientY };
    };

    const onTouchEnd = () => {
      isDragging.current = false;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 1024) return;
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const normX = (e.clientX - rect.left) / rect.width - 0.5;
      const normY = (e.clientY - rect.top) / rect.height - 0.5;
      targetRotY.current += normX * 0.015;
      targetRotX.current = Math.max(Math.min(0.2 - normY * 0.35, 0.8), -0.5);
    };

    if (targetEl) {
      targetEl.addEventListener("touchstart", onTouchStart, { passive: true });
      targetEl.addEventListener("touchmove", onTouchMove, { passive: true });
      targetEl.addEventListener("touchend", onTouchEnd, { passive: true });
      targetEl.addEventListener("mousemove", onMouseMove, { passive: true });
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      if (targetEl) {
        targetEl.removeEventListener("touchstart", onTouchStart);
        targetEl.removeEventListener("touchmove", onTouchMove);
        targetEl.removeEventListener("touchend", onTouchEnd);
        targetEl.removeEventListener("mousemove", onMouseMove);
      }
      observer.disconnect();
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
    };
  }, [buildGeometry, sectionRef]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-5 overflow-hidden pointer-events-auto select-none touch-pan-y"
      style={{ touchAction: "pan-y" }}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block opacity-90 transition-opacity duration-700"
      />
    </div>
  );
}
