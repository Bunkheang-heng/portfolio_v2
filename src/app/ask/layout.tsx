import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ask AI - HENG Bunkheang',
  description: 'Chat with my AI assistant to learn more about my skills, experience, and projects. Get instant answers about my technical expertise, career background, and development capabilities.',
  keywords: [
    'AI Assistant',
    'Chat Bot',
    'Developer AI',
    'Portfolio Chat',
    'Technical Questions',
    'Developer Information',
    'AI Chat',
    'Interactive Portfolio',
    'Developer Assistant',
    'Technical Chat'
  ],
  openGraph: {
    title: 'Ask AI - HENG Bunkheang',
    description: 'Chat with my AI assistant to learn more about my skills, experience, and projects.',
    type: 'website',
    url: 'https://kheang-portfolio.vercel.app/ask',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ask AI - HENG Bunkheang',
    description: 'Chat with my AI assistant to learn more about my skills, experience, and projects.',
  },
}

export default function AskLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
