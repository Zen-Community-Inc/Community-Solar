import { generatePageMetadata, pageMetadata } from "@/lib/seo-config";

export const metadata = generatePageMetadata(pageMetadata.about);

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
