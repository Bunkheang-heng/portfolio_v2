import { NextRequest, NextResponse } from 'next/server';

// Define valid response types
type ResponseType = 'greeting' | 'skills' | 'experience' | 'projects' | 'education' | 'contact' | 'default';

// Simple responses for different query types
const responses: Record<ResponseType, string> = {
  greeting: "Hello! I'm Bunkheang's AI assistant. How can I help you today?",
  skills: "Bunkheang is skilled in JavaScript, TypeScript, React, Node.js, Next.js, HTML, CSS, Tailwind CSS, MongoDB, PostgreSQL, AWS, Docker, Git, and has a strong foundation in cybersecurity principles.",
  experience: "Bunkheang has experience in web development, full-stack development, database design, cloud infrastructure, and cybersecurity analysis.",
  projects: "Some of Bunkheang's notable projects include this portfolio website with AI assistant, various web applications, mobile apps, and security tools.",
  education: "Bunkheang has a background in Computer Science and continues to expand his knowledge through certifications and self-learning.",
  contact: "You can reach Bunkheang through the Contact page on this website.",
  default: "I'm Bunkheang's AI assistant. I can tell you about his skills, experience, projects, education, or how to contact him. What would you like to know?"
};

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();
    
    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Convert message to lowercase for easier matching
    const query = message.toLowerCase();
    
    // Simple pattern matching
    let responseType: ResponseType = 'default';
    
    if (query.includes('hello') || query.includes('hi') || query.includes('hey')) {
      responseType = 'greeting';
    } else if (query.includes('skill') || query.includes('know') || query.includes('tech')) {
      responseType = 'skills';
    } else if (query.includes('experience') || query.includes('work') || query.includes('job')) {
      responseType = 'experience';
    } else if (query.includes('project') || query.includes('portfolio') || query.includes('create')) {
      responseType = 'projects';
    } else if (query.includes('education') || query.includes('study') || query.includes('degree')) {
      responseType = 'education';
    } else if (query.includes('contact') || query.includes('email') || query.includes('reach')) {
      responseType = 'contact';
    }
    
    return NextResponse.json({ response: responses[responseType] });
  } catch (error) {
    console.error('Error generating response:', error);
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    );
  }
} 