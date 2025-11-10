import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * StatsGrid Component
 *
 * Displays statistics in a responsive grid layout.
 * Supports icons, custom colors, and different column configurations.
 *
 * @example
 * ```tsx
 * <StatsGrid
 *   stats={[
 *     { label: "Subscribers", value: "10,000+", icon: Users },
 *     { label: "Savings", value: "10-20%", color: "yellow" }
 *   ]}
 *   columns={4}
 * />
 * ```
 */

export interface Stat {
  /** Label for the statistic */
  label: string;
  /** Value to display */
  value: string | number;
  /** Optional suffix text (e.g., "tons", "%") */
  suffix?: string;
  /** Optional icon component */
  icon?: LucideIcon;
  /** Highlight color for value */
  color?: "default" | "yellow" | "green" | "blue";
}

interface StatsGridProps {
  /** Array of statistics to display */
  stats: Stat[];
  /** Number of columns in the grid */
  columns?: 2 | 3 | 4;
  /** Visual variant */
  variant?: "default" | "shadow" | "elevated";
  /** Additional CSS classes */
  className?: string;
}

export default function StatsGrid({
  stats,
  columns = 4,
  variant = "shadow",
  className,
}: StatsGridProps) {
  const columnClasses = {
    2: "grid-cols-2",
    3: "grid-cols-2 md:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-4",
  };

  const variantClasses = {
    default: "shadow-md",
    shadow: "shadow-lg hover:shadow-xl transition-all hover:-translate-y-1",
    elevated: "shadow-xl",
  };

  const colorClasses = {
    default: "text-gray-900",
    yellow: "text-yellow-400",
    green: "text-green-600",
    blue: "text-blue-600",
  };

  return (
    <div className={cn("grid gap-4 sm:gap-6", columnClasses[columns], className)}>
      {stats.map((stat, index) => (
        <Card
          key={index}
          className={cn("border-0", variantClasses[variant])}
        >
          <CardContent className="pt-6 text-center">
            {/* Icon */}
            {stat.icon && (
              <stat.icon className="h-8 w-8 mx-auto mb-3 text-yellow-400" />
            )}

            {/* Value */}
            <div
              className={cn(
                "text-2xl sm:text-3xl font-bold mb-1",
                colorClasses[stat.color || "default"]
              )}
            >
              {stat.value}
              {stat.suffix && (
                <span className="text-sm sm:text-base text-gray-600 ml-1">
                  {stat.suffix}
                </span>
              )}
            </div>

            {/* Label */}
            <div className="text-sm text-gray-600">{stat.label}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
