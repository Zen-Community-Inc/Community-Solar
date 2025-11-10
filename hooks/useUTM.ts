/**
 * useUTM Hook
 *
 * Convenient re-export of the useUTM hook from UTMProvider.
 * Use this hook in any component to access UTM parameter data.
 *
 * Example usage:
 *
 * ```tsx
 * import { useUTM } from '@/hooks/useUTM';
 *
 * function MyComponent() {
 *   const { utms, appendUTMsToUrl, getUTMObject } = useUTM();
 *
 *   // Access UTM parameters
 *   console.log(utms.utm_source); // e.g., "google"
 *
 *   // Append UTMs to a URL
 *   const linkWithUTMs = appendUTMsToUrl('/contact');
 *
 *   // Get UTM object for form submission
 *   const utmData = getUTMObject();
 * }
 * ```
 */

export { useUTM } from '@/components/providers/UTMProvider';
export type { UTMParams, UTMAttribution, UTMContextValue } from '@/components/providers/UTMProvider';
