"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import BouncingDotsLoader from "./BouncingDotsLoader";

export default function PageLoader() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const isInitialMount = useRef(true);
  const isBackNav = useRef(false);

  // Detect browser Back / Forward history navigation
  useEffect(() => {
    const handlePopState = () => {
      isBackNav.current = true;
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const visitedKey = `visited_page_${pathname}`;

    // 1. Initial Page Mount (First load or Reload)
    if (isInitialMount.current) {
      isInitialMount.current = false;

      const navEntries = performance.getEntriesByType("navigation");
      const navType = (navEntries[0] as PerformanceNavigationTiming | undefined)?.type;

      // If user specifically pressed Reload (F5), clear cache for this page so fresh loading can show if needed
      if (navType === "reload") {
        try {
          sessionStorage.removeItem(visitedKey);
        } catch {}
      }

      // If navigation is back/forward history, never show loading
      if (navType === "back_forward") {
        return;
      }

      let alreadyVisited = false;
      try {
        alreadyVisited = Boolean(sessionStorage.getItem(visitedKey));
      } catch {}

      // If already visited and no reload, do not show unnecessary loading
      if (alreadyVisited) {
        return;
      }

      // Only show loading if resources are actually still loading
      const isDocumentLoading = document.readyState !== "complete";

      if (isDocumentLoading) {
        setIsLoading(true);

        const handleLoad = () => {
          try {
            sessionStorage.setItem(visitedKey, "true");
          } catch {}
          setIsLoading(false);
        };

        window.addEventListener("load", handleLoad, { once: true });
        const fallback = setTimeout(handleLoad, 2000);

        return () => {
          window.removeEventListener("load", handleLoad);
          clearTimeout(fallback);
        };
      } else {
        try {
          sessionStorage.setItem(visitedKey, "true");
        } catch {}
      }

      return;
    }

    // 2. Client-side Navigation (pathname changed)

    // If user clicked the browser Back/Forward button, skip loading
    if (isBackNav.current) {
      isBackNav.current = false;
      return;
    }

    let alreadyVisited = false;
    try {
      alreadyVisited = Boolean(sessionStorage.getItem(visitedKey));
    } catch {}

    // When going back to an already visited page, skip loading completely
    if (alreadyVisited) {
      return;
    }

    // For a brand new page, check if any images/assets are actively loading
    const images = Array.from(document.images);
    const pendingImages = images.filter((img) => !img.complete && img.src);

    if (pendingImages.length > 0) {
      setIsLoading(true);

      let loadedCount = 0;
      const totalPending = pendingImages.length;

      const onImageFinish = () => {
        loadedCount++;
        if (loadedCount >= totalPending) {
          try {
            sessionStorage.setItem(visitedKey, "true");
          } catch {}
          setIsLoading(false);
        }
      };

      pendingImages.forEach((img) => {
        img.addEventListener("load", onImageFinish, { once: true });
        img.addEventListener("error", onImageFinish, { once: true });
      });

      const safetyTimer = setTimeout(() => {
        try {
          sessionStorage.setItem(visitedKey, "true");
        } catch {}
        setIsLoading(false);
      }, 1200);

      return () => {
        clearTimeout(safetyTimer);
        pendingImages.forEach((img) => {
          img.removeEventListener("load", onImageFinish);
          img.removeEventListener("error", onImageFinish);
        });
      };
    } else {
      // Content already available: no unnecessary loading
      try {
        sessionStorage.setItem(visitedKey, "true");
      } catch {}
    }
  }, [pathname]);

  return (
    <>
      <noscript>
        <style>{`#global-page-loader { display: none !important; }`}</style>
      </noscript>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            id="global-page-loader"
            key="page-loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-white pointer-events-auto touch-none"
            aria-live="polite"
            aria-busy="true"
          >
            <BouncingDotsLoader />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
