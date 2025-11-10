import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * InfoCard Component
 *
 * Displays informational content with an icon and text.
 * Commonly used for contact information, addresses, hours, etc.
 *
 * @example
 * ```tsx
 * <InfoCard
 *   icon={Mail}
 *   title="Email"
 *   value="hello@example.com"
 *   href="mailto:hello@example.com"
 * />
 * ```
 */

interface InfoCardProps {
  /** Icon component */
  icon: LucideIcon;
  /** Card title/label */
  title: string;
  /** Main content value */
  value: string | ReactNode;
  /** Optional link href */
  href?: string;
  /** Icon background color */
  iconBgColor?: string;
  /** Icon color */
  iconColor?: string;
  /** Additional CSS classes */
  className?: string;
}

export default function InfoCard({
  icon: Icon,
  title,
  value,
  href,
  iconBgColor = "bg-yellow-300/20",
  iconColor = "text-yellow-600",
  className,
}: InfoCardProps) {
  const content = (
    <Card
      className={cn(
        "border-0 shadow-md hover:shadow-lg transition-all",
        href && "cursor-pointer hover:-translate-y-0.5",
        className
      )}
    >
      <CardContent className="pt-6">
        {/* Icon */}
        <div
          className={cn(
            "flex items-center justify-center w-12 h-12 rounded-lg mb-4",
            iconBgColor
          )}
        >
          <Icon className={cn("h-6 w-6", iconColor)} />
        </div>

        {/* Title */}
        <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>

        {/* Value */}
        {typeof value === "string" ? (
          <p className="text-base font-semibold text-gray-900">{value}</p>
        ) : (
          <div className="text-base font-semibold text-gray-900">{value}</div>
        )}
      </CardContent>
    </Card>
  );

  if (href) {
    return (
      <a href={href} className="block">
        {content}
      </a>
    );
  }

  return content;
}
