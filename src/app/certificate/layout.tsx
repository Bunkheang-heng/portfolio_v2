import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Certificates & Achievements - HENG Bunkheang',
  description: 'View my professional certificates, hackathon achievements, and educational accomplishments including cybersecurity certifications and development competitions.',
  keywords: [
    'Professional Certificates',
    'Cybersecurity Certificates',
    'Hackathon Achievements',
    'Development Certificates',
    'Educational Achievements',
    'Clean Energy Hackathon',
    'ASEAN Cyber Shield',
    'Ideathon',
    'Professional Development',
    'Technical Certifications'
  ],
  openGraph: {
    title: 'Certificates & Achievements - HENG Bunkheang',
    description: 'View my professional certificates, hackathon achievements, and educational accomplishments.',
    type: 'website',
    url: 'https://kheang-portfolio.vercel.app/certificate',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Certificates & Achievements - HENG Bunkheang',
    description: 'View my professional certificates, hackathon achievements, and educational accomplishments.',
  },
}

export default function CertificateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
