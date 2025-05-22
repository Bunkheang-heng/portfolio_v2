import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

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
    
    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    // Load aboutme.json data
    const aboutMeData = await loadAboutMeData();

    // Build comprehensive system prompt with aboutme.json data
    let systemPrompt = `You are an AI assistant for Bunkheang's portfolio website. 
    Answer questions about Bunkheang's skills, experience, projects, education, and other professional information.
    Keep responses concise, friendly, and helpful.`;
    
    // Add aboutme.json data to the system prompt if available
    if (aboutMeData) {
      systemPrompt += `\n\nHere is detailed information about Bunkheang:\n${JSON.stringify(aboutMeData, null, 2)}`;
    } else {
      // Fallback to basic information if aboutme.json couldn't be loaded
      systemPrompt += `\n\nKey information about Bunkheang:
      - Skilled in web development technologies including JavaScript, TypeScript, React, Node.js
      - Has experience with database technologies and cloud platforms
      - Has a strong foundation in cybersecurity principles
      - Has worked on several projects including web applications and mobile apps
      - Has participated in hackathons and has volunteer experience
      - Has a background in Computer Science
      - Can be contacted through the Contact page on the website`;
    }

    // Make a direct API call to Gemini
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: systemPrompt + "\n\nUser question: " + message }
              ]
            }
          ]
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Gemini API error:', errorData);
      
      // Fall back to our simple API if Gemini fails
      return NextResponse.json({ 
        response: "I'm having trouble connecting to my AI service right now. Here's what I know about Bunkheang: He's skilled in web development technologies including JavaScript, TypeScript, React, and Node.js. He has experience with database technologies, cloud platforms, and a strong foundation in cybersecurity principles."
      });
    }

    const data = await response.json();
    
    // Log the response for debugging
    console.log('Gemini response:', JSON.stringify(data, null, 2));
    
    // Extract response text from Gemini's response format
    const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || 
      "I'm sorry, I couldn't generate a proper response. Please try again.";

    return NextResponse.json({ response: responseText });
  } catch (error) {
    console.error('Error in direct Gemini API call:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
} 