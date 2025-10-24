import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Skills & Experience - HENG Bunkheang',
  description: 'Comprehensive overview of my technical skills including JavaScript, TypeScript, React, Node.js, Python, cybersecurity, and professional experience in full-stack development.',
  keywords: [
    'Technical Skills',
    'Programming Languages',
    'Web Development Skills',
    'Cybersecurity Skills',
    'JavaScript',
    'TypeScript',
    'React',
    'Node.js',
    'Python',
    'MongoDB',
    'PostgreSQL',
    'AWS',
    'Docker',
    'Professional Experience'
  ],
  openGraph: {
    title: 'Skills & Experience - HENG Bunkheang',
    description: 'Comprehensive overview of my technical skills and professional experience in full-stack development and cybersecurity.',
    type: 'website',
    url: 'https://kheang-portfolio.vercel.app/skill',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Skills & Experience - HENG Bunkheang',
    description: 'Comprehensive overview of my technical skills and professional experience.',
  },
}

export default function SkillLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
