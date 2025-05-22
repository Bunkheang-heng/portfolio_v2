# Bunkheang's Portfolio Website

A modern developer portfolio website built with Next.js, React, Tailwind CSS, and Framer Motion. Features an interactive AI assistant powered by Google's Gemini API.

## Features

- Responsive design with modern UI
- Interactive animations using Framer Motion
- Dark/light mode themes
- Portfolio sections: Projects, Skills, Certificates
- AI Assistant powered by Google Gemini API

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Gemini AI Assistant Setup

The portfolio includes an AI assistant feature powered by Google's Gemini API. To use it:

1. **API Key**: The API key is already configured in the `.env.local` file.
2. **Usage**: Visit the "Ask AI" section of the portfolio to interact with the assistant.
3. **Customization**: You can customize the AI's behavior by editing the system prompt in `src/app/api/gemini/route.ts`.

## Troubleshooting

If you encounter issues with the AI assistant:

1. **Model Compatibility**: The application tries different Gemini models (1.5-pro, pro) in case some aren't available.
2. **API Limits**: Be aware of usage limits with the Gemini API.
3. **Error Messages**: Check the browser console for detailed error information.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Framer Motion](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Google Generative AI](https://ai.google.dev/)

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
