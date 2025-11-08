import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Zen Community Solar',
    short_name: 'Zen Solar',
    description: 'Join thousands of Illinois residents saving 10-20% on electricity with community solar. No rooftop installation required.',
    start_url: '/',
    display: 'standalone',
    background_color: '#fafafa',
    theme_color: '#f7c948',
    orientation: 'portrait-primary',
    scope: '/',
    icons: [
      {
        src: '/assets/go-zen-logo.jpg',
        sizes: '192x192',
        type: 'image/jpeg',
        purpose: 'maskable',
      },
      {
        src: '/assets/go-zen-logo.jpg',
        sizes: '512x512',
        type: 'image/jpeg',
        purpose: 'maskable',
      },
    ],
    categories: ['utilities', 'business', 'energy'],
    lang: 'en-US',
    dir: 'ltr',
  };
}
