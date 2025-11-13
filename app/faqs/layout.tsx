import { generatePageMetadata, pageMetadata } from "@/lib/seo-config";

export const metadata = generatePageMetadata(pageMetadata.faqs);

export default function FAQsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
