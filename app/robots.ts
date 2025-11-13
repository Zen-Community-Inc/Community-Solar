import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://zencommunitysolar.com'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/dashboard/',
          '/onboarding/',
          '/signin/',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
