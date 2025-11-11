/**
 * Design System
 *
 * Visual design tokens that work in conjunction with site-config.ts for maximum modularity.
 *
 * ARCHITECTURE:
 * - site-config.ts = Content, branding, business logic (what to say, contact info, URLs)
 * - design-system.ts = Visual design tokens (how it looks, colors, spacing, typography)
 *
 * This separation allows you to:
 * 1. Rebrand content by editing site-config.ts
 * 2. Restyle visuals by editing design-system.ts
 * 3. Keep them independent for easy rebranding and maintenance
 *
 * Usage:
 * import { designSystem } from '@/lib/design-system';
 * import { siteConfig } from '@/lib/site-config';
 *
 * Example:
 * <div className={designSystem.spacing.section.lg}>
 *   <div className={designSystem.spacing.container.full}>
 *     <h1>{siteConfig.company.name}</h1>
 *   </div>
 * </div>
 */

export const designSystem = {
  /**
   * Color System
   *
   * Standardized color palette for consistency across the application.
   * Primary yellow is the main brand color (#FBBF24 / yellow-400).
   */
  colors: {
    // Primary Yellow Brand Colors
    primary: {
      // Main buttons, primary CTAs
      main: "bg-yellow-400",
      mainText: "text-yellow-400",
      mainBorder: "border-yellow-400",

      // Hover states for buttons
      hover: "bg-yellow-500",
      hoverText: "text-yellow-500",
      hoverBorder: "border-yellow-500",

      // Light variants for subtle backgrounds
      light: "bg-yellow-300",
      lightText: "text-yellow-300",

      // Very light tints for backgrounds
      subtle: "bg-yellow-400/10",
      subtleMedium: "bg-yellow-400/20",

      // Darker shade for contrast
      dark: "bg-yellow-600",
      darkText: "text-yellow-600",
    },

    // Text Colors
    text: {
      // Primary text (headings, body)
      primary: "text-gray-900",

      // Secondary text (descriptions, captions)
      secondary: "text-gray-700",

      // Muted text (labels, hints)
      muted: "text-gray-600",

      // Link colors
      link: "text-yellow-500",
      linkHover: "text-yellow-600",

      // Stats and highlights
      highlight: "text-yellow-400",

      // On colored backgrounds
      inverse: "text-white",
      onYellow: "text-gray-900",
    },

    // Background Colors
    background: {
      // Page backgrounds
      primary: "bg-white",
      secondary: "bg-gray-50",

      // Section backgrounds
      subtle: "bg-yellow-50",
      subtleAlt: "bg-yellow-400/5",

      // Card backgrounds
      card: "bg-white",
      cardHover: "bg-gray-50",

      // Gradients
      gradientLight: "bg-gradient-to-br from-yellow-50/80 via-white to-yellow-50/50",
      gradientDark: "bg-gradient-to-br from-white/90 via-white/80 to-white/60",
    },

    // Border Colors
    border: {
      default: "border-gray-200",
      input: "border-gray-300",
      focus: "border-yellow-400",
      hover: "border-yellow-400",
    },

    // Icon Colors
    icon: {
      // Icon backgrounds
      bg: "bg-yellow-300/20",
      bgAlt: "bg-yellow-400/10",

      // Icon text colors
      text: "text-yellow-600",
      textAlt: "text-yellow-400",
    },
  },

  /**
   * Spacing System
   *
   * Consistent spacing tokens for layout and positioning.
   */
  spacing: {
    // Section Vertical Padding
    section: {
      // Small sections (minor content blocks)
      sm: "py-8 sm:py-12",

      // Medium sections (standard content)
      md: "py-12 sm:py-16",

      // Large sections (major content blocks, heroes)
      lg: "py-16 sm:py-20",

      // Extra large sections (special features)
      xl: "py-20 sm:py-24",
    },

    // Container Max Widths
    container: {
      // Text-heavy content (FAQs, blog posts, terms)
      prose: "max-w-3xl",

      // Standard content (CTAs, centered content)
      content: "max-w-4xl",

      // Feature showcases, mission statements
      feature: "max-w-5xl",

      // Grid layouts, multi-column content
      grid: "max-w-6xl",

      // Full-width sections (most common)
      full: "max-w-7xl",
    },

    // Horizontal Padding (standard across all containers)
    horizontal: "px-4 sm:px-6 lg:px-8",

    // Element Gaps
    gap: {
      // Cards in grids
      card: "gap-6 md:gap-8",

      // Between sections
      section: "space-y-16 sm:space-y-20",

      // Small gaps (buttons, inline elements)
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-6",
    },
  },

  /**
   * Border Radius Scale
   *
   * Consistent rounding for different element types.
   */
  borderRadius: {
    // Small elements (badges, pills, small buttons)
    sm: "rounded-md",

    // Standard elements (buttons, inputs, small cards)
    md: "rounded-lg",

    // Cards, dialogs, modals
    lg: "rounded-xl",

    // Large sections, feature images
    xl: "rounded-2xl",

    // Extra large (hero images, special sections)
    "2xl": "rounded-3xl",

    // Circular elements (avatars, icon backgrounds, badges)
    full: "rounded-full",
  },

  /**
   * Typography Scale
   *
   * Responsive heading and text sizes with consistent scaling.
   */
  typography: {
    // Headings
    h1: "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight",
    h2: "text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight",
    h3: "text-xl sm:text-2xl font-semibold",
    h4: "text-lg sm:text-xl font-semibold",
    h5: "text-base sm:text-lg font-semibold",
    h6: "text-sm sm:text-base font-semibold",

    // Body text
    bodyLg: "text-base sm:text-lg leading-relaxed",
    body: "text-sm sm:text-base leading-normal",
    bodySm: "text-xs sm:text-sm leading-normal",

    // Special text
    lead: "text-lg sm:text-xl text-gray-700 leading-relaxed", // Subtitle text
    caption: "text-sm text-gray-600",
    label: "text-sm font-medium text-gray-700",
  },

  /**
   * Shadows
   *
   * Elevation system for depth and hierarchy.
   */
  shadows: {
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
    xl: "shadow-xl",

    // Special shadows
    button: "shadow-md hover:shadow-lg",
    card: "shadow-lg hover:shadow-xl",
  },

  /**
   * Transitions
   *
   * Consistent animation timing for interactions.
   */
  transitions: {
    // Fast transitions (text color changes, small interactions)
    fast: "transition-colors duration-200",

    // Normal transitions (cards, buttons)
    normal: "transition-all duration-300",

    // Smooth transitions (large movements, page transitions)
    smooth: "transition-all duration-500 ease-out",

    // Transform-only transitions (hover effects, scaling)
    transform: "transition-transform duration-300",
  },

  /**
   * Icon Sizes
   *
   * Consistent icon sizing with background containers.
   */
  icons: {
    // Small icons (inline, feature cards)
    sm: {
      container: "w-10 h-10",
      icon: "w-5 h-5",
      rounded: "rounded-lg",
    },

    // Medium icons (feature sections)
    md: {
      container: "w-12 h-12",
      icon: "w-6 h-6",
      rounded: "rounded-full",
    },

    // Large icons (hero sections, major features)
    lg: {
      container: "w-14 h-14",
      icon: "w-7 h-7",
      rounded: "rounded-full",
    },

    // Extra large icons (special sections)
    xl: {
      container: "w-16 h-16",
      icon: "w-8 h-8",
      rounded: "rounded-full",
    },
  },

  /**
   * Component-Specific Tokens
   *
   * Pre-configured styling for common component patterns.
   */
  components: {
    // Trust badges / pills
    badge: "bg-yellow-300/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium",

    // CTA Buttons (pre-configured)
    button: {
      primary: "bg-yellow-400 text-gray-900 font-semibold hover:bg-yellow-500 shadow-md hover:shadow-lg transition-all",
      secondary: "border-2 border-gray-300 bg-white text-gray-900 hover:bg-yellow-50 hover:border-yellow-400 shadow-sm transition-all",
    },

    // Cards
    card: {
      default: "border-0 rounded-xl shadow-md bg-white",
      hover: "border-0 rounded-xl shadow-lg hover:shadow-xl bg-white transition-all hover:-translate-y-1",
      elevated: "border-0 rounded-xl shadow-xl bg-white",
    },

    // Links
    link: "text-yellow-500 hover:text-yellow-600 transition-colors font-medium",
  },
} as const;

/**
 * Type-safe helper to access design tokens
 *
 * Example:
 * const primary = designSystem.colors.primary.main; // "bg-yellow-400"
 */
export type DesignSystem = typeof designSystem;
