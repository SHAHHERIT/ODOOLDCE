interface RoutePathProps {
  className?: string;
  animate?: boolean;
}

/**
 * The signature motif of GlobeTrotter: a dashed flight-route line with a
 * small plane/pin marker, echoing a route drawn across a paper map. Used as
 * a connector between timeline stops and as a section divider.
 */
export default function RoutePath({ className = "", animate = true }: RoutePathProps) {
  return (
    <svg
      className={className}
      width="2"
      height="100%"
      viewBox="0 0 2 200"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      <line
        x1="1"
        y1="0"
        x2="1"
        y2="200"
        stroke="#C9A227"
        strokeWidth="2"
        strokeDasharray="3 9"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  );
}
