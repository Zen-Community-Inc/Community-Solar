'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useSearchParams } from 'next/navigation';
import { getCookie } from 'cookies-next/client';

/**
 * UTM Context Provider
 *
 * Provides UTM parameter data throughout the application via React Context.
 * Reads UTM cookies set by proxy.ts and makes them accessible to all components.
 *
 * Features:
 * - Access to all UTM parameters (source, medium, campaign, etc.)
 * - First-touch and last-touch attribution data
 * - Helper functions for appending UTMs to URLs
 * - Automatic synchronization with cookie data
 */

// UTM parameter types
export interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  utm_id?: string;
  gclid?: string;
  fbclid?: string;
  ref?: string;
}

export interface UTMAttribution {
  params: UTMParams;
  timestamp: string;
}

export interface UTMContextValue {
  utms: UTMParams;
  firstTouch: UTMAttribution | null;
  lastTouch: UTMAttribution | null;
  appendUTMsToUrl: (url: string) => string;
  getUTMObject: () => UTMParams;
}

const UTMContext = createContext<UTMContextValue>({
  utms: {},
  firstTouch: null,
  lastTouch: null,
  appendUTMsToUrl: (url) => url,
  getUTMObject: () => ({}),
});

// List of UTM parameters to track
const UTM_PARAM_KEYS: (keyof UTMParams)[] = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'utm_id',
  'gclid',
  'fbclid',
  'ref',
];

export function UTMProvider({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams();
  const [utms, setUtms] = useState<UTMParams>({});
  const [firstTouch, setFirstTouch] = useState<UTMAttribution | null>(null);
  const [lastTouch, setLastTouch] = useState<UTMAttribution | null>(null);

  // Read UTM cookies and update state
  useEffect(() => {
    const readUTMCookies = () => {
      const utmData: UTMParams = {};

      // Read individual UTM cookies
      UTM_PARAM_KEYS.forEach((key) => {
        const value = getCookie(key);
        if (value && typeof value === 'string') {
          utmData[key] = value;
        }
      });

      setUtms(utmData);

      // Read first-touch attribution
      const firstTouchCookie = getCookie('utm_first_touch');
      if (firstTouchCookie && typeof firstTouchCookie === 'string') {
        try {
          setFirstTouch(JSON.parse(firstTouchCookie));
        } catch (e) {
          console.error('Failed to parse utm_first_touch cookie:', e);
        }
      }

      // Read last-touch attribution
      const lastTouchCookie = getCookie('utm_last_touch');
      if (lastTouchCookie && typeof lastTouchCookie === 'string') {
        try {
          setLastTouch(JSON.parse(lastTouchCookie));
        } catch (e) {
          console.error('Failed to parse utm_last_touch cookie:', e);
        }
      }
    };

    readUTMCookies();

    // Re-read cookies when search params change (user navigated with new UTMs)
    const timer = setTimeout(readUTMCookies, 100);
    return () => clearTimeout(timer);
  }, [searchParams]);

  // Helper function to append UTMs to a URL
  const appendUTMsToUrl = (url: string): string => {
    // Don't append to external URLs
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }

    // Only append if we have UTM data
    if (Object.keys(utms).length === 0) {
      return url;
    }

    try {
      const urlObj = new URL(url, window.location.origin);

      // Append each UTM parameter
      Object.entries(utms).forEach(([key, value]) => {
        if (value && !urlObj.searchParams.has(key)) {
          urlObj.searchParams.set(key, value);
        }
      });

      return urlObj.pathname + urlObj.search;
    } catch (e) {
      console.error('Failed to append UTMs to URL:', e);
      return url;
    }
  };

  // Helper function to get UTM object for form submissions
  const getUTMObject = (): UTMParams => {
    return { ...utms };
  };

  const value: UTMContextValue = {
    utms,
    firstTouch,
    lastTouch,
    appendUTMsToUrl,
    getUTMObject,
  };

  return <UTMContext.Provider value={value}>{children}</UTMContext.Provider>;
}

// Custom hook to access UTM context
export function useUTM() {
  const context = useContext(UTMContext);
  if (!context) {
    throw new Error('useUTM must be used within UTMProvider');
  }
  return context;
}
