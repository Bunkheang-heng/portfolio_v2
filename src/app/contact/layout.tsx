import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact - HENG Bunkheang',
  description: 'Get in touch with HENG Bunkheang for freelance projects, full-time opportunities, or collaboration. Available for web development, cybersecurity consulting, and AI solutions.',
  keywords: [
    'Contact Developer',
    'Hire Developer',
    'Freelance Developer',
    'Web Development Services',
    'Cybersecurity Consulting',
    'Full Stack Developer Contact',
    'React Developer Hire',
    'Next.js Developer',
    'AI Solutions',
    'Software Development'
  ],
  openGraph: {
    title: 'Contact - HENG Bunkheang',
    description: 'Get in touch for freelance projects, full-time opportunities, or collaboration. Available for web development, cybersecurity consulting, and AI solutions.',
    type: 'website',
    url: 'https://kheang-portfolio.vercel.app/contact',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact - HENG Bunkheang',
    description: 'Get in touch for freelance projects, full-time opportunities, or collaboration.',
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
