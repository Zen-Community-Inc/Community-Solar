import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * CTASection Component
 *
 * Reusable call-to-action section with title, subtitle, and configurable buttons.
 * Supports primary and secondary actions.
 *
 * @example
 * ```tsx
 * <CTASection
 *   title="Ready to Get Started?"
 *   subtitle="Join thousands of happy customers"
 *   primaryButton={{ text: "Sign Up", onClick: () => {} }}
 *   secondaryButton={{ text: "Learn More", href: "/about" }}
 * />
 * ```
 */

interface ButtonConfig {
  /** Button text */
  text: string;
  /** Optional click handler */
  onClick?: () => void;
  /** Optional link href (for secondary button) */
  href?: string;
}

interface CTASectionProps {
  /** Main heading */
  title: string | ReactNode;
  /** Subtitle/description */
  subtitle?: string | ReactNode;
  /** Primary button configuration */
  primaryButton?: ButtonConfig;
  /** Secondary button configuration */
  secondaryButton?: ButtonConfig;
  /** Background variant */
  variant?: "white" | "gradient" | "yellow";
  /** Additional CSS classes */
  className?: string;
}

export default function CTASection({
  title,
  subtitle,
  primaryButton,
  secondaryButton,
  variant = "white",
  className,
}: CTASectionProps) {
  const variantClasses = {
    white: "bg-white",
    gradient: "bg-gradient-to-br from-yellow-50/80 via-white to-yellow-50/50",
    yellow: "bg-yellow-50",
  };

  return (
    <section
      className={cn(
        "py-16 sm:py-20",
        variantClasses[variant],
        className
      )}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Title */}
        {typeof title === "string" ? (
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
        ) : (
          title
        )}

        {/* Subtitle */}
        {subtitle && (
          <div className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            {typeof subtitle === "string" ? <p>{subtitle}</p> : subtitle}
          </div>
        )}

        {/* Buttons */}
        {(primaryButton || secondaryButton) && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* Primary Button */}
            {primaryButton && (
              <Button
                size="lg"
                onClick={primaryButton.onClick}
                className="rounded-md shadow-lg h-14 text-base px-8 text-accent-foreground bg-yellow-300 hover:bg-yellow-400"
              >
                {primaryButton.text}
              </Button>
            )}

            {/* Secondary Button */}
            {secondaryButton && (
              <>
                {secondaryButton.href ? (
                  <Link href={secondaryButton.href}>
                    <Button
                      size="lg"
                      variant="outline"
                      className="rounded-md h-14 text-base px-8 border-2 hover:bg-gray-50"
                    >
                      {secondaryButton.text}
                    </Button>
                  </Link>
                ) : (
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={secondaryButton.onClick}
                    className="rounded-md h-14 text-base px-8 border-2 hover:bg-gray-50"
                  >
                    {secondaryButton.text}
                  </Button>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
