import { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * PageHero Component
 *
 * Reusable hero section for pages.
 * Supports different visual variants and optional badge/subtitle.
 *
 * @example
 * ```tsx
 * <PageHero
 *   badge="Trusted by 50,000+ subscribers"
 *   title="About Us"
 *   subtitle="Learn about our mission"
 *   variant="gradient"
 * />
 * ```
 */

interface PageHeroProps {
  /** Optional badge text displayed above title */
  badge?: string;
  /** Main heading (can be string or React element) */
  title: string | ReactNode;
  /** Optional subtitle below title */
  subtitle?: string | ReactNode;
  /** Visual style variant */
  variant?: "gradient" | "yellow" | "white";
  /** Additional CSS classes */
  className?: string;
  /** Optional children for custom content */
  children?: ReactNode;
}

export default function PageHero({
  badge,
  title,
  subtitle,
  variant = "gradient",
  className,
  children,
}: PageHeroProps) {
  const variantClasses = {
    gradient:
      "bg-gradient-to-br from-yellow-50/80 via-white to-yellow-50/50",
    yellow: "bg-yellow-50",
    white: "bg-white",
  };

  return (
    <section
      className={cn(
        "relative py-16 sm:py-20 lg:py-24 overflow-hidden",
        variantClasses[variant],
        className
      )}
    >
      {/* Gradient overlay for gradient variant */}
      {variant === "gradient" && (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-yellow-100/20 via-transparent to-transparent" />
      )}

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        {badge && (
          <div className="inline-flex items-center gap-2 bg-yellow-300/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <span className="text-sm font-medium text-foreground">
              {badge}
            </span>
          </div>
        )}

        {/* Title */}
        {typeof title === "string" ? (
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            {title}
          </h1>
        ) : (
          title
        )}

        {/* Subtitle */}
        {subtitle && (
          <div className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto">
            {typeof subtitle === "string" ? <p>{subtitle}</p> : subtitle}
          </div>
        )}

        {/* Custom children */}
        {children}
      </div>
    </section>
  );
}
