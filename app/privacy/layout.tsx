import { generatePageMetadata, pageMetadata } from "@/lib/seo-config";

export const metadata = generatePageMetadata(pageMetadata.privacy);

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
