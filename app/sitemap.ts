import { MetadataRoute } from 'next'
import connectDB from '@/lib/mongodb'
import Product from '@/models/Product'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://softera-dz.com'
  
  // Get all published products
  let products: any[] = []
  try {
    await connectDB()
    products = await Product.find({ status: 'published' }).select('slug updatedAt').lean()
  } catch (error) {
    console.error('Error fetching products for sitemap:', error)
  }

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
  ]

  // Dynamic product pages
  const productPages = products.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: product.updatedAt || new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [...staticPages, ...productPages]
}
