import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://trabaf-construction.tn';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin/'
    },
    sitemap: `${baseUrl}/sitemap.xml`
  };
}
