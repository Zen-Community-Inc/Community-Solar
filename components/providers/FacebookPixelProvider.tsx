'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useUTM } from '@/hooks/useUTM';

/**
 * Facebook Pixel Provider
 *
 * Initializes Facebook Pixel and tracks page views across navigation.
 * Integrates with UTM tracking to pass attribution data with every event.
 *
 * Features:
 * - Automatic pageview tracking on route changes
 * - UTM parameter integration (utm_source, utm_medium, fbclid, etc.)
 * - First-touch and last-touch attribution data
 * - Debug mode in development environment
 *
 * Must be wrapped in Suspense boundary due to useSearchParams().
 */
export function FacebookPixelProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { utms, firstTouch, lastTouch } = useUTM();
  const [isPixelLoaded, setIsPixelLoaded] = useState(false);

  // Initialize Facebook Pixel once on mount (client-side only)
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    const pixelId = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;

    if (!pixelId) {
      console.warn('Facebook Pixel ID not configured. Set NEXT_PUBLIC_FACEBOOK_PIXEL_ID in .env');
      return;
    }

    // Dynamically import ReactPixel to avoid SSR issues
    import('react-facebook-pixel').then((module) => {
      const ReactPixel = module.default;

      // Initialize pixel with options
      ReactPixel.init(pixelId, undefined, {
        autoConfig: true, // Automatic configuration
        debug: process.env.NODE_ENV === 'development', // Debug mode in development
      });

      // Track initial page view
      ReactPixel.pageView();

      setIsPixelLoaded(true);

      console.log('Facebook Pixel initialized:', pixelId);
    }).catch((error) => {
      console.error('Failed to load Facebook Pixel:', error);
    });
  }, []);

  // Track page views on navigation (App Router compatible)
  useEffect(() => {
    // Only track if pixel is loaded and we're on client side
    if (!isPixelLoaded || !pathname || typeof window === 'undefined') return;

    const pixelId = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;
    if (!pixelId) return;

    // Dynamically import ReactPixel for tracking
    import('react-facebook-pixel').then((module) => {
      const ReactPixel = module.default;

      // Prepare custom data with UTM parameters
      const customData: Record<string, string | null> = {};

      // Add UTM parameters as custom data
      if (utms.utm_source) customData.utm_source = utms.utm_source;
      if (utms.utm_medium) customData.utm_medium = utms.utm_medium;
      if (utms.utm_campaign) customData.utm_campaign = utms.utm_campaign;
      if (utms.utm_term) customData.utm_term = utms.utm_term;
      if (utms.utm_content) customData.utm_content = utms.utm_content;
      if (utms.utm_id) customData.utm_id = utms.utm_id;
      if (utms.fbclid) customData.fbclid = utms.fbclid;
      if (utms.gclid) customData.gclid = utms.gclid;
      if (utms.ref) customData.ref = utms.ref;

      // Add attribution data
      if (firstTouch) {
        // Handle both old format (direct params) and new format (params wrapper)
        const params = firstTouch.params || firstTouch;
        customData.first_touch_source = params.utm_source || null;
        customData.first_touch_medium = params.utm_medium || null;
        customData.first_touch_campaign = params.utm_campaign || null;
        customData.first_touch_timestamp = firstTouch.timestamp;
      }
      if (lastTouch) {
        // Handle both old format (direct params) and new format (params wrapper)
        const params = lastTouch.params || lastTouch;
        customData.last_touch_source = params.utm_source || null;
        customData.last_touch_medium = params.utm_medium || null;
        customData.last_touch_campaign = params.utm_campaign || null;
        customData.last_touch_timestamp = lastTouch.timestamp;
      }

      // Track standard PageView event
      ReactPixel.pageView();

      // Track custom event with UTM data for better attribution
      if (Object.keys(customData).length > 0) {
        ReactPixel.trackCustom('PageViewWithUTM', customData);

        if (process.env.NODE_ENV === 'development') {
          console.log('Facebook Pixel: PageView tracked with UTM data', customData);
        }
      }
    }).catch((error) => {
      console.error('Failed to track page view:', error);
    });
  }, [isPixelLoaded, pathname, searchParams, utms, firstTouch, lastTouch]);

  return <>{children}</>;
}
