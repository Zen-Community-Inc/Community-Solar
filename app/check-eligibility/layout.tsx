import { generatePageMetadata, pageMetadata } from "@/lib/seo-config";

export const metadata = generatePageMetadata(pageMetadata.checkEligibility);

export default function CheckEligibilityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
