// app/components/SEO/StructuredData.tsx
import React from 'react';

type SchemaType =
  | 'Person'
  | 'Organization'
  | 'WebSite'
  | 'WebPage'
  | 'SoftwareApplication'
  | 'BreadcrumbList';

interface SEOStructuredDataProps<T = Record<string, any>> {
  type: SchemaType;
  data: T;
}

/**
 * Renders a single JSON-LD script tag.
 * Tip: Use one <SEOStructuredData /> per schema block to keep them focused (Person, WebSite, WebPage, etc.)
 */
export default function SEOStructuredData<T>({ type, data }: SEOStructuredDataProps<T>) {
  const payload = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  };
  return (
    <script
      type="application/ld+json"
      // We stringify without spacing to keep payload small; it's fine.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}

/* =========================
   PREBUILT DATA BUILDERS
   ========================= */

const SITE = 'https://bunkheangheng.site'; // use your custom domain everywhere
const PERSON_ID = `${SITE}/#person`;
const ORG_ID = `${SITE}/#organization`;
const SITE_ID = `${SITE}/#website`;
const WEBPAGE_ID = (path = '/') => `${SITE}${path}#webpage`;
const IMAGE_URL = `${SITE}/me.png`; // ensure this exists and is accessible

/** Person */
export const personStructuredData = {
  '@id': PERSON_ID,
  url: SITE,
  name: 'HENG Bunkheang',
  alternateName: [
    'Bunkheang Heng',
    'Heng Bunkheang',
    'Bunkheang',
    'Kheang',
    'bunkheangheng',
    'hengbunkheang',
  ],
  givenName: 'Bunkheang',
  familyName: 'HENG',
  image: {
    '@type': 'ImageObject',
    url: IMAGE_URL,
    width: 1200,
    height: 630,
  },
  jobTitle: 'Full Stack Developer & Cybersecurity Expert',
  description:
    'Full Stack Developer specializing in React, Next.js, Node.js, and cybersecurity. Experienced in building web applications, AI-powered solutions, and secure systems.',
  email: 'contact@bunkheangheng.site',
  nationality: {
    '@type': 'Country',
    name: 'Cambodia',
  },
  sameAs: [
    'https://github.com/Bunkheang-heng',
    'https://linkedin.com/in/bunkheangheng',
    'https://twitter.com/bunkheangheng',
    'https://bunkheangheng.site',
  ],
  knowsAbout: [
    'JavaScript',
    'TypeScript',
    'React',
    'Next.js',
    'Node.js',
    'Python',
    'Cybersecurity',
    'Web Development',
    'MongoDB',
    'PostgreSQL',
    'AWS',
    'Docker',
  ],
  knowsLanguage: [
    {
      '@type': 'Language',
      name: 'English',
    },
    {
      '@type': 'Language',
      name: 'Khmer',
    },
  ],
};

/** Organization (optional but nice as publisher for WebSite/WebPage) */
export const organizationStructuredData = {
  '@id': ORG_ID,
  name: 'HENG Bunkheang',
  url: SITE,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE}/icon.png`, // make sure it exists (512x512+)
  },
  sameAs: [
    'https://github.com/Bunkheang-heng',
    'https://linkedin.com/in/bunkheangheng',
    'https://twitter.com/bunkheangheng',
  ],
};

/** WebSite */
export const websiteStructuredData = {
  '@id': SITE_ID,
  url: SITE,
  name: 'HENG Bunkheang Portfolio',
  inLanguage: 'en',
  description:
    'Full Stack Developer Portfolio showcasing web applications, AI-powered solutions, and cybersecurity projects.',
  publisher: { '@id': ORG_ID },
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE}/ask?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

/** WebPage — call this per page with its path, title, and description */
export function buildWebPageStructuredData(opts: {
  path?: string; // e.g. '/project'
  title: string;
  description: string;
}) {
  const path = opts.path ?? '/';
  const url = `${SITE}${path}`;
  return {
    '@id': WEBPAGE_ID(path),
    url,
    name: opts.title,
    headline: opts.title,
    description: opts.description,
    isPartOf: { '@id': SITE_ID },
    mainEntityOfPage: url,
    inLanguage: 'en',
    author: { '@id': PERSON_ID },
    publisher: { '@id': ORG_ID },
  };
}

/** SoftwareApplication */
export const softwareApplicationStructuredData = {
  name: 'HENG Bunkheang Portfolio',
  description:
    'Interactive portfolio website showcasing full-stack development projects and cybersecurity expertise.',
  url: SITE,
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web', // "Web" is clearer than "Web Browser"
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  author: { '@id': PERSON_ID },
};

/** Breadcrumbs (highly recommended on inner pages) */
export function buildBreadcrumbStructuredData(crumbs: Array<{ name: string; item: string }>) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: c.item,
    })),
  };
}
