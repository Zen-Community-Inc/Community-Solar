/**
 * Type definitions for react-facebook-pixel
 *
 * Provides TypeScript support for the react-facebook-pixel library.
 * Enables autocomplete and type checking for Facebook Pixel methods.
 */

declare module 'react-facebook-pixel' {
  /**
   * Options for initializing Facebook Pixel
   */
  export interface InitOptions {
    /**
     * Automatically configure pixel settings
     * @default true
     */
    autoConfig?: boolean;

    /**
     * Enable debug mode (logs events to console)
     * @default false
     */
    debug?: boolean;
  }

  /**
   * Advanced matching options for better attribution
   * https://developers.facebook.com/docs/facebook-pixel/advanced/advanced-matching
   */
  export interface AdvancedMatchingOptions {
    /** Email address */
    em?: string;
    /** First name */
    fn?: string;
    /** Last name */
    ln?: string;
    /** Phone number */
    ph?: string;
    /** City */
    ct?: string;
    /** State/Province */
    st?: string;
    /** Zip/Postal code */
    zp?: string;
    /** Country */
    country?: string;
  }

  /**
   * Event data that can be passed to track() and trackCustom()
   */
  export interface EventData {
    /** Event value */
    value?: number;
    /** Currency code (e.g., 'USD') */
    currency?: string;
    /** Content name/description */
    content_name?: string;
    /** Content category */
    content_category?: string;
    /** Content IDs */
    content_ids?: string[];
    /** Content type */
    content_type?: string;
    /** Custom status field */
    status?: string;
    /** Any other custom parameters */
    [key: string]: string | number | string[] | null | undefined;
  }

  /**
   * Facebook Pixel API
   */
  const ReactPixel: {
    /**
     * Initialize Facebook Pixel
     *
     * @param pixelId - Your Facebook Pixel ID
     * @param advancedMatching - Optional advanced matching data
     * @param options - Initialization options
     */
    init(
      pixelId: string,
      advancedMatching?: AdvancedMatchingOptions,
      options?: InitOptions
    ): void;

    /**
     * Track a page view
     */
    pageView(): void;

    /**
     * Track a standard event
     *
     * Standard events include:
     * - Lead
     * - Contact
     * - CompleteRegistration
     * - Purchase
     * - AddToCart
     * - InitiateCheckout
     * - ViewContent
     * - Search
     * - AddPaymentInfo
     * - AddToWishlist
     * - Subscribe
     * - StartTrial
     *
     * @param event - Name of the standard event
     * @param data - Optional event data
     */
    track(event: string, data?: EventData): void;

    /**
     * Track a custom event
     *
     * @param event - Name of the custom event
     * @param data - Optional event data
     */
    trackCustom(event: string, data?: EventData): void;

    /**
     * Direct access to Facebook Pixel queue (fbq)
     * Use track() and trackCustom() instead when possible
     */
    fbq(...args: unknown[]): void;
  };

  export default ReactPixel;
}
