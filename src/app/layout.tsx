import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./context/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "HENG Bunkheang - Full Stack Developer & Cybersecurity Expert",
    template: "%s | HENG Bunkheang"
  },
  description: "Full Stack Developer specializing in React, Next.js, Node.js, and cybersecurity. Experienced in building web applications, AI-powered solutions, and secure systems. Available for freelance and full-time opportunities.",
  keywords: [
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer", 
    "Node.js Developer",
    "Cybersecurity Expert",
    "Web Development",
    "JavaScript",
    "TypeScript",
    "Python",
    "MongoDB",
    "PostgreSQL",
    "AWS",
    "Docker",
    "Portfolio",
    "Software Engineer"
  ],
  authors: [{ name: "HENG Bunkheang" }],
  creator: "HENG Bunkheang",
  publisher: "HENG Bunkheang",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://kheang-portfolio.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://kheang-portfolio.vercel.app',
    title: 'HENG Bunkheang - Full Stack Developer & Cybersecurity Expert',
    description: 'Full Stack Developer specializing in React, Next.js, Node.js, and cybersecurity. Experienced in building web applications, AI-powered solutions, and secure systems.',
    siteName: 'HENG Bunkheang Portfolio',
    images: [
      {
        url: '/me.png',
        width: 1200,
        height: 630,
        alt: 'HENG Bunkheang - Full Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HENG Bunkheang - Full Stack Developer & Cybersecurity Expert',
    description: 'Full Stack Developer specializing in React, Next.js, Node.js, and cybersecurity. Available for freelance and full-time opportunities.',
    images: ['/me.png'],
    creator: '@bunkheangheng',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "HENG Bunkheang",
    "jobTitle": "Full Stack Developer & Cybersecurity Expert",
    "description": "Full Stack Developer specializing in React, Next.js, Node.js, and cybersecurity. Experienced in building web applications, AI-powered solutions, and secure systems.",
    "url": "https://kheang-portfolio.vercel.app",
    "image": "https://kheang-portfolio.vercel.app/me.png",
    "sameAs": [
      "https://github.com/Bunkheang-heng",
      "https://linkedin.com/in/bunkheangheng",
      "https://twitter.com/bunkheangheng"
    ],
    "knowsAbout": [
      "JavaScript",
      "TypeScript", 
      "React",
      "Next.js",
      "Node.js",
      "Python",
      "Cybersecurity",
      "Web Development",
      "MongoDB",
      "PostgreSQL",
      "AWS",
      "Docker"
    ],
    "hasOccupation": {
      "@type": "Occupation",
      "name": "Full Stack Developer",
      "description": "Develops web applications using modern JavaScript frameworks and cloud technologies"
    },
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "Tech University"
    }
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased transition-colors duration-300`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
