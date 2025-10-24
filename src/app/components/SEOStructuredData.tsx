import React from 'react';

interface SEOStructuredDataProps {
  type: 'Person' | 'Organization' | 'WebSite' | 'WebPage' | 'SoftwareApplication';
  data: any;
}

export default function SEOStructuredData({ type, data }: SEOStructuredDataProps) {
  const getStructuredData = () => {
    const baseData = {
      "@context": "https://schema.org",
      "@type": type,
      ...data
    };

    return baseData;
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(getStructuredData()) }}
    />
  );
}

// Predefined structured data for different page types
export const personStructuredData = {
  name: "HENG Bunkheang",
  jobTitle: "Full Stack Developer & Cybersecurity Expert",
  description: "Full Stack Developer specializing in React, Next.js, Node.js, and cybersecurity. Experienced in building web applications, AI-powered solutions, and secure systems.",
  url: "https://kheang-portfolio.vercel.app",
  image: "https://kheang-portfolio.vercel.app/me.png",
  sameAs: [
    "https://github.com/Bunkheang-heng",
    "https://linkedin.com/in/bunkheangheng",
    "https://twitter.com/bunkheangheng"
  ],
  knowsAbout: [
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
  hasOccupation: {
    "@type": "Occupation",
    name: "Full Stack Developer",
    description: "Develops web applications using modern JavaScript frameworks and cloud technologies"
  }
};

export const websiteStructuredData = {
  name: "HENG Bunkheang Portfolio",
  description: "Full Stack Developer Portfolio showcasing web applications, AI-powered solutions, and cybersecurity projects.",
  url: "https://kheang-portfolio.vercel.app",
  author: {
    "@type": "Person",
    name: "HENG Bunkheang"
  },
  potentialAction: {
    "@type": "SearchAction",
    target: "https://kheang-portfolio.vercel.app/ask?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

export const softwareApplicationStructuredData = {
  name: "HENG Bunkheang Portfolio",
  description: "Interactive portfolio website showcasing full-stack development projects and cybersecurity expertise.",
  url: "https://kheang-portfolio.vercel.app",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web Browser",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD"
  },
  author: {
    "@type": "Person",
    name: "HENG Bunkheang"
  }
};
