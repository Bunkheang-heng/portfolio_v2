import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

// Initialize the Google Generative AI with the API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Function to load aboutme.json data
async function loadAboutMeData() {
  try {
    const filePath = path.join(process.cwd(), 'public/data/aboutme.json');
    const jsonData = await fs.readFile(filePath, 'utf8');
    return JSON.parse(jsonData);
  } catch (error) {
    console.error('Error loading aboutme.json:', error);
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();
    
    // Make sure we have a message to send
    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    try {
      // Load aboutme.json data
      const aboutMeData = await loadAboutMeData();
      
      // Use the gemini-2.0-flash model as shown in the working example
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
      
      // Build comprehensive system prompt with aboutme.json data
      let systemPrompt = `You are an AI assistant for Bunkheang's portfolio website. 
      Answer questions about Bunkheang's skills, experience, projects, education, and other professional information.`;
      
      // Add aboutme.json data to the system prompt if available
      if (aboutMeData) {
        systemPrompt += `\n\nHere is detailed information about Bunkheang:\n${JSON.stringify(aboutMeData, null, 2)}`;
      } else {
        // Fallback to basic information if aboutme.json couldn't be loaded
        systemPrompt += `\n\nKey information about Bunkheang:
        - Skilled in web development technologies including JavaScript, TypeScript, React, Node.js
        - Has experience with database technologies and cloud platforms
        - Has a strong foundation in cybersecurity principles`;
      }

      // Generate content with the correct format for the Gemini API
      const result = await model.generateContent({
        contents: [
          {
            role: "user",
            parts: [
              { text: `${systemPrompt}\n\nUser question: ${message}` }
            ]
          }
        ]
      });
      
      const response = result.response;
      const text = response.text();

      return NextResponse.json({ response: text });
    } catch (error) {
      console.log('Gemini API error:', error);
      
      // Fallback to static response
      return NextResponse.json({ 
        response: "I'm having trouble connecting to my AI service right now. Here's what I know about Bunkheang: He's skilled in web development technologies including JavaScript, TypeScript, React, and Node.js. He has experience with database technologies, cloud platforms, and a strong foundation in cybersecurity principles."
      });
    }
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
} 