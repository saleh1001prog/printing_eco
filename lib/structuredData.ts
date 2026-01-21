// Structured Data / Schema.org helpers for SEO

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Softera-DZ',
    alternateName: 'سوفتيرا الجزائر',
    url: 'https://softera-dz.com',
    logo: 'https://softera-dz.com/logo.png',
    description: 'شركة متخصصة في تطوير البرمجيات والحلول التقنية للشركات في الجزائر',
    email: 'info@softera-dz.com',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'DZ',
      addressLocality: 'Algeria',
    },
    sameAs: [
      // Add your social media links
      // 'https://facebook.com/softeradz',
      // 'https://linkedin.com/company/softera-dz',
    ],
  }
}

export function generateSoftwareApplicationSchema(product: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: product.name,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Windows 10, Windows 11',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'DZD',
      availability: 'https://schema.org/InStock',
      description: product.shortDescription,
    },
    description: product.description,
    softwareVersion: product.version || '1.0.0',
    fileSize: product.fileSize || 'N/A',
    downloadUrl: product.downloadUrl,
    author: {
      '@type': 'Organization',
      name: 'Softera-DZ',
      url: 'https://softera-dz.com',
    },
    screenshot: product.screenshots?.map((s: any) => s.url) || [],
    aggregateRating: product.rating ? {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      ratingCount: product.ratingCount || 1,
    } : undefined,
  }
}

export function generateWebPageSchema(page: {
  title: string
  description: string
  url: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.title,
    description: page.description,
    url: page.url,
    inLanguage: 'ar-DZ',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Softera-DZ',
      url: 'https://softera-dz.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Softera-DZ',
      logo: {
        '@type': 'ImageObject',
        url: 'https://softera-dz.com/logo.png',
      },
    },
  }
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function generateProductSchema(product: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.screenshots?.map((s: any) => s.url) || [],
    brand: {
      '@type': 'Brand',
      name: 'Softera-DZ',
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'DZD',
      availability: 'https://schema.org/InStock',
      url: `https://softera-dz.com/products/${product.slug}`,
    },
    aggregateRating: product.rating ? {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      ratingCount: product.ratingCount || 1,
      bestRating: 5,
      worstRating: 1,
    } : undefined,
  }
}

export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}
