import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects - HENG Bunkheang',
  description: 'Explore my portfolio of web applications, AI-powered solutions, and cybersecurity projects. Built with React, Next.js, Node.js, Python, and modern technologies.',
  keywords: [
    'Web Development Projects',
    'React Projects',
    'Next.js Projects',
    'AI Applications',
    'Cybersecurity Projects',
    'Full Stack Development',
    'Portfolio Projects',
    'JavaScript Projects',
    'Python Projects',
    'Machine Learning'
  ],
  openGraph: {
    title: 'Projects - HENG Bunkheang',
    description: 'Explore my portfolio of web applications, AI-powered solutions, and cybersecurity projects.',
    type: 'website',
    url: 'https://kheang-portfolio.vercel.app/project',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects - HENG Bunkheang',
    description: 'Explore my portfolio of web applications, AI-powered solutions, and cybersecurity projects.',
  },
}

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
