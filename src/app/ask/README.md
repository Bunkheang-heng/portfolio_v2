# Ask AI - Gemini-Powered AI Assistant

This page provides an AI assistant for your portfolio website powered by Google's Gemini AI. Visitors can ask questions about your skills, experience, projects, and more.

## Setup Instructions

1. **Get a Gemini API Key**:
   - Go to [Google AI Studio](https://ai.google.dev/)
   - Create an account or sign in
   - Generate an API key

2. **Set up Environment Variables**:
   - Create a `.env.local` file in the root directory of your project
   - Add your Gemini API key:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```

3. **Restart your development server** to apply the changes

## How It Works

- The assistant uses the Gemini Pro model to generate responses
- User questions are sent to our API endpoint at `/api/gemini`
- The API endpoint forwards the request to Gemini with a system prompt that provides context about you
- Responses are displayed in the chat interface

## Customization

To customize the AI assistant:
- Edit the system prompt in `src/app/api/gemini/route.ts` to provide more specific information about yourself
- Modify the UI styles in `src/app/ask/page.tsx` to match your portfolio's design
- Add more sections to the information panel at the bottom of the page

## Troubleshooting

If you encounter issues:
- Check that your API key is correctly set in the `.env.local` file
- Make sure the API key has not expired
- Check browser console for any errors
- Verify that your Next.js application can access environment variables 