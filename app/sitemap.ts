import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // You can fetch dynamic data from an API/Database here
  // const posts = await getPosts()
  
  return [
    {
      url: 'https://irish-lotto-results.ie',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    // {
    //   url: 'https://irish-lotto-results.ie/about',
    //   lastModified: new Date(),
    //   changeFrequency: 'monthly',
    //   priority: 0.8,
    // },
  ]
}