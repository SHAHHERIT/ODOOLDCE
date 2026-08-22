import { useState, useRef, useEffect } from "react";

interface BackgroundVideoProps {
  src: string;
  poster?: string;
  overlay?: "hero" | "subtle" | "none";
  children?: React.ReactNode;
  className?: string;
}

export default function BackgroundVideo({
  src,
  overlay = "hero",
  children,
  className = "",
}: BackgroundVideoProps) {
  const [failed, setFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setFailed(false);

    const video = videoRef.current;

    if (!video) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      video.pause();
    }
  }, [src]);

  return (
    <div
      className={`relative w-full overflow-hidden bg-[#0D1224] ${className}`}
    >
      {/* =====================================================
          BACKGROUND VIDEO
      ===================================================== */}

      {!failed && (
        <video
          ref={videoRef}
          className="absolute inset-0 z-0 h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/images/video-poster.jpg"
          onError={() => setFailed(true)}
        >
          <source src={src} type="video/mp4" />
        </video>
      )}

      {/* =====================================================
          FALLBACK
      ===================================================== */}

      {failed && (
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#11172B] via-[#0D1224] to-[#080B16]" />
      )}

      {/* =====================================================
          VIDEO OVERLAY
      ===================================================== */}

      {overlay === "hero" && (
        <>
          <div className="pointer-events-none absolute inset-0 z-10 bg-[#0D1224]/45" />

          <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-black/20 via-transparent to-[#0D1224]/80" />
        </>
      )}

      {overlay === "subtle" && (
        <div className="pointer-events-none absolute inset-0 z-10 bg-[#0D1224]/35" />
      )}

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="relative z-20">
        {children}
      </div>
    </div>
  );
}