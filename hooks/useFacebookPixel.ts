'use client';

import { useUTM } from '@/hooks/useUTM';

/**
 * Facebook Pixel Hook
 *
 * Provides utility functions to track conversion events with UTM attribution data.
 * All events automatically include UTM parameters, fbclid, gclid, and first/last touch data.
 *
 * Standard Events Used:
 * - Lead: User submits lead/onboarding form (initiated or partial)
 * - Contact: User submits contact form
 * - CompleteRegistration: User completes full onboarding
 *
 * Example usage:
 *
 * ```tsx
 * import { useFacebookPixel } from '@/hooks/useFacebookPixel';
 *
 * function MyForm() {
 *   const { trackLead, trackContact } = useFacebookPixel();
 *
 *   const handleSubmit = () => {
 *     // Track conversion with optional value
 *     trackLead({ value: 100, currency: 'USD', status: 'completed' });
 *   };
 * }
 * ```
 */
export function useFacebookPixel() {
  const { utms, firstTouch, lastTouch } = useUTM();

  /**
   * Build custom data object with UTM parameters and attribution data
   */
  const buildCustomData = (additionalData?: Record<string, string | number | undefined>) => {
    const customData: Record<string, string | number | null | undefined> = {
      ...additionalData,
    };

    // Add UTM parameters
    if (utms.utm_source) customData.utm_source = utms.utm_source;
    if (utms.utm_medium) customData.utm_medium = utms.utm_medium;
    if (utms.utm_campaign) customData.utm_campaign = utms.utm_campaign;
    if (utms.utm_term) customData.utm_term = utms.utm_term;
    if (utms.utm_content) customData.utm_content = utms.utm_content;
    if (utms.utm_id) customData.utm_id = utms.utm_id;
    if (utms.fbclid) customData.fbclid = utms.fbclid;
    if (utms.gclid) customData.gclid = utms.gclid;
    if (utms.ref) customData.ref = utms.ref;

    // Add first-touch attribution
    if (firstTouch) {
      customData.first_touch_source = firstTouch.params.utm_source || null;
      customData.first_touch_medium = firstTouch.params.utm_medium || null;
      customData.first_touch_campaign = firstTouch.params.utm_campaign || null;
      customData.first_touch_timestamp = firstTouch.timestamp;
    }

    // Add last-touch attribution
    if (lastTouch) {
      customData.last_touch_source = lastTouch.params.utm_source || null;
      customData.last_touch_medium = lastTouch.params.utm_medium || null;
      customData.last_touch_campaign = lastTouch.params.utm_campaign || null;
      customData.last_touch_timestamp = lastTouch.timestamp;
    }

    return customData;
  };

  /**
   * Track Lead event
   *
   * Use this for:
   * - User lands on onboarding page (status: 'initiated')
   * - User submits partial onboarding data (status: 'partial')
   *
   * @param data - Optional event data (value, currency, content_name, status)
   */
  const trackLead = async (data?: {
    value?: number;
    currency?: string;
    content_name?: string;
    status?: 'initiated' | 'partial' | 'completed';
  }) => {
    if (typeof window === 'undefined') return;

    const customData = buildCustomData(data);

    try {
      const { default: ReactPixel } = await import('react-facebook-pixel');
      ReactPixel.track('Lead', customData);

      if (process.env.NODE_ENV === 'development') {
        console.log('Facebook Pixel: Lead tracked', customData);
      }
    } catch (error) {
      console.error('Failed to track Lead event:', error);
    }
  };

  /**
   * Track Contact event
   *
   * Use this for contact form submissions.
   *
   * @param data - Optional event data (content_name, etc.)
   */
  const trackContact = async (data?: { content_name?: string }) => {
    if (typeof window === 'undefined') return;

    const customData = buildCustomData(data);

    try {
      const { default: ReactPixel } = await import('react-facebook-pixel');
      ReactPixel.track('Contact', customData);

      if (process.env.NODE_ENV === 'development') {
        console.log('Facebook Pixel: Contact tracked', customData);
      }
    } catch (error) {
      console.error('Failed to track Contact event:', error);
    }
  };

  /**
   * Track CompleteRegistration event
   *
   * Use this when user completes full onboarding.
   *
   * @param data - Optional event data (value, currency, content_name, status)
   */
  const trackCompleteRegistration = async (data?: {
    value?: number;
    currency?: string;
    content_name?: string;
    status?: string;
  }) => {
    if (typeof window === 'undefined') return;

    const customData = buildCustomData(data);

    try {
      const { default: ReactPixel } = await import('react-facebook-pixel');
      ReactPixel.track('CompleteRegistration', customData);

      if (process.env.NODE_ENV === 'development') {
        console.log('Facebook Pixel: CompleteRegistration tracked', customData);
      }
    } catch (error) {
      console.error('Failed to track CompleteRegistration event:', error);
    }
  };

  /**
   * Track custom event
   *
   * Use this for any custom tracking needs beyond standard events.
   *
   * @param eventName - Name of the custom event
   * @param data - Optional event data
   */
  const trackCustomEvent = async (eventName: string, data?: Record<string, string | number | undefined>) => {
    if (typeof window === 'undefined') return;

    const customData = buildCustomData(data);

    try {
      const { default: ReactPixel } = await import('react-facebook-pixel');
      ReactPixel.trackCustom(eventName, customData);

      if (process.env.NODE_ENV === 'development') {
        console.log(`Facebook Pixel: ${eventName} tracked`, customData);
      }
    } catch (error) {
      console.error(`Failed to track ${eventName} event:`, error);
    }
  };

  return {
    trackLead,
    trackContact,
    trackCompleteRegistration,
    trackCustomEvent,
  };
}
