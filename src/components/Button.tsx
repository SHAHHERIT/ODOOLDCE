import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  icon?: ReactNode;
  children: ReactNode;
}

const variants = {
  primary:
    "bg-brass text-navy-deep hover:bg-brass-light shadow-glow hover:shadow-[0_0_50px_rgba(201,162,39,0.25)]",
  secondary:
    "bg-white/[0.06] text-ivory border border-white/[0.14] hover:bg-white/[0.1] hover:border-white/25",
  ghost: "text-muted hover:text-ivory",
};

export default function Button({
  variant = "primary",
  icon,
  children,
  className = "",
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-300 ease-out active:scale-[0.97] ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
      {icon && (
        <span className="transition-transform duration-300 group-hover:translate-x-0.5">
          {icon}
        </span>
      )}
    </button>
  );
}
