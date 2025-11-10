import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * FeatureCard Component
 *
 * Displays a feature or benefit with an icon, title, and description.
 * Commonly used for "Why Choose Us", "Our Values", and feature lists.
 *
 * @example
 * ```tsx
 * <FeatureCard
 *   icon={Heart}
 *   title="Accessibility"
 *   description="Clean energy for everyone"
 *   variant="hover"
 * />
 * ```
 */

interface FeatureCardProps {
  /** Icon component to display */
  icon: LucideIcon;
  /** Card title */
  title: string;
  /** Description text */
  description: string | ReactNode;
  /** Visual variant */
  variant?: "default" | "hover" | "elevated";
  /** Icon background color */
  iconBgColor?: string;
  /** Icon color */
  iconColor?: string;
  /** Additional CSS classes */
  className?: string;
}

export default function FeatureCard({
  icon: Icon,
  title,
  description,
  variant = "hover",
  iconBgColor = "bg-yellow-300/20",
  iconColor = "text-yellow-600",
  className,
}: FeatureCardProps) {
  const variantClasses = {
    default: "shadow-md",
    hover: "shadow-lg hover:shadow-xl transition-all hover:-translate-y-1",
    elevated: "shadow-xl",
  };

  return (
    <Card className={cn("border-0", variantClasses[variant], className)}>
      <CardContent className="pt-6">
        {/* Icon */}
        <div
          className={cn(
            "flex items-center justify-center w-14 h-14 rounded-full mb-4",
            iconBgColor
          )}
        >
          <Icon className={cn("h-7 w-7", iconColor)} />
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>

        {/* Description */}
        {typeof description === "string" ? (
          <p className="text-gray-600 leading-relaxed">{description}</p>
        ) : (
          <div className="text-gray-600 leading-relaxed">{description}</div>
        )}
      </CardContent>
    </Card>
  );
}
