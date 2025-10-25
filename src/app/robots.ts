import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/testing/'],
    },
    sitemap: 'https://bunkheangheng.site/sitemap.xml',
  }
}
