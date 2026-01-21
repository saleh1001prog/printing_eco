import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Softera-DZ - حلول برمجية احترافية',
    short_name: 'Softera-DZ',
    description: 'أنظمة إدارة المخزون ونقطة البيع للشركات الجزائرية',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#4f46e5',
    icons: [
      {
        src: '/logo.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
    lang: 'ar',
    dir: 'rtl',
  }
}
