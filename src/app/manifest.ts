import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'HENG Bunkheang (Kheang) - Full Stack Developer Portfolio',
    short_name: 'Bunkheang Heng',
    description: 'HENG Bunkheang (Kheang) - Full Stack Developer specializing in React, Next.js, Node.js, and cybersecurity. Experienced in building web applications, AI-powered solutions, and secure systems.',
    start_url: '/',
    display: 'standalone',
    background_color: '#1a1a2e',
    theme_color: '#00d4ff',
    orientation: 'portrait',
    icons: [
      {
        src: '/me.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: '/me.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable'
      }
    ],
    categories: ['developer', 'portfolio', 'technology', 'software-engineer', 'cambodia'],
    lang: 'en',
    scope: '/',
    id: 'bunkheangheng-portfolio'
  }
}
