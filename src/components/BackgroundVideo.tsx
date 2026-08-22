import { useState, useRef, useEffect } from "react";

interface BackgroundVideoProps {
  src: string;
  poster?: string;
  overlay?: "hero" | "subtle";
  children?: React.ReactNode;
  className?: string;
}

/**
 * Full-bleed cinematic video background with a dark gradient overlay so
 * foreground text stays readable. Falls back to a static gradient if the
 * video can't load (slow network, unsupported format, reduced-data mode).
 */
export default function BackgroundVideo({
  src,
  overlay = "hero",
  children,
  className = "",
}: BackgroundVideoProps) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion && videoRef.current) {
      videoRef.current.pause();
    }
  }, []);

  return (
    <div className={`relative w-full overflow-hidden bg-navy-deep ${className}`}>
      {!failed ? (
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onCanPlay={() => setLoaded(true)}
          onError={() => setFailed(true)}
        >
          <source src={src} type="video/mp4" />
        </video>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-navy-800 via-navy-deep to-navy" />
      )}

      {/* Fallback / loading base so there's never a flash of unstyled bg */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-navy-800 via-navy-deep to-navy transition-opacity duration-700 ${
          loaded && !failed ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Dark overlay so text stays legible over any footage */}
      {overlay === "hero" ? (
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/70 to-navy-deep/40" />
      ) : (
        <div className="absolute inset-0 bg-navy-deep/60" />
      )}
      <div className="absolute inset-0 bg-grid-fade" />

      <div className="relative z-10">{children}</div>
    </div>
  );
}
