import { generatePageMetadata, pageMetadata } from "@/lib/seo-config";

export const metadata = generatePageMetadata(pageMetadata.terms);

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
