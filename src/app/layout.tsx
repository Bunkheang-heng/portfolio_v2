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
    // Name variations for personal brand search
    "HENG Bunkheang",
    "Bunkheang Heng",
    "Heng Bunkheang",
    "Bunkheang",
    "Kheang",
    "bunkheangheng",
    "hengbunkheang",
    // Professional skills
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
    "Software Engineer",
    "Cambodia Developer",
    "Cambodian Software Engineer"
  ],
  authors: [{ name: "HENG Bunkheang" }],
  creator: "HENG Bunkheang",
  publisher: "HENG Bunkheang",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://bunkheangheng.site'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://bunkheangheng.site',
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
    "@id": "https://bunkheangheng.site/#person",
    "name": "HENG Bunkheang",
    "alternateName": [
      "Bunkheang Heng",
      "Heng Bunkheang",
      "Bunkheang",
      "Kheang",
      "bunkheangheng",
      "hengbunkheang"
    ],
    "givenName": "Bunkheang",
    "familyName": "HENG",
    "jobTitle": "Full Stack Developer & Cybersecurity Expert",
    "description": "Full Stack Developer specializing in React, Next.js, Node.js, and cybersecurity. Experienced in building web applications, AI-powered solutions, and secure systems.",
    "url": "https://bunkheangheng.site",
    "image": {
      "@type": "ImageObject",
      "url": "https://bunkheangheng.site/me.png",
      "width": "1200",
      "height": "630"
    },
    "email": "contact@bunkheangheng.site",
    "nationality": {
      "@type": "Country",
      "name": "Cambodia"
    },
    "sameAs": [
      "https://github.com/Bunkheang-heng",
      "https://linkedin.com/in/bunkheangheng",
      "https://twitter.com/bunkheangheng",
      "https://bunkheangheng.site"
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
      "description": "Develops web applications using modern JavaScript frameworks and cloud technologies",
      "occupationalCategory": "15-1252.00"
    },
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "Tech University"
    },
    "knowsLanguage": [
      {
        "@type": "Language",
        "name": "English"
      },
      {
        "@type": "Language",
        "name": "Khmer"
      }
    ]
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <meta name="author" content="HENG Bunkheang" />
        <meta name="designer" content="HENG Bunkheang" />
        <meta name="reply-to" content="contact@bunkheangheng.site" />
        <meta name="owner" content="HENG Bunkheang" />
        <link rel="author" href="https://bunkheangheng.site/humans.txt" />
        <link rel="me" href="https://github.com/Bunkheang-heng" />
        <link rel="me" href="https://linkedin.com/in/bunkheangheng" />
        <link rel="me" href="https://twitter.com/bunkheangheng" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased transition-colors duration-300`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
