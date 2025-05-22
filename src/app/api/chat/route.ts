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

// Knowledge base about Bunkheang
// This is a fallback if aboutme.json can't be loaded
const fallbackKnowledge = {
  skills: [
    'JavaScript', 'TypeScript', 'React', 'Node.js', 'Next.js',
    'HTML', 'CSS', 'Tailwind CSS', 'MongoDB', 'PostgreSQL',
    'AWS', 'Docker', 'Git', 'RESTful APIs', 'GraphQL',
    'Cybersecurity principles', 'Network security', 'Authentication systems'
  ],
  experience: [
    'Web development',
    'Full-stack development',
    'Database design and optimization',
    'Cloud infrastructure',
    'Cybersecurity analysis',
    'Project management'
  ],
  projects: [
    'Portfolio website with AI assistant',
    'Web applications',
    'Mobile apps',
    'Security tools',
    'Database systems'
  ],
  education: [
    'Computer Science background',
    'Cybersecurity certifications',
    'Web development courses',
    'Self-taught in various technologies'
  ],
  contact: 'You can reach Bunkheang through the Contact page on this website.'
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

    // Load aboutme.json data
    const aboutMeData = await loadAboutMeData();
    
    // Extract skills from aboutme.json if available, otherwise use fallback
    const knowledge = fallbackKnowledge;
    
    if (aboutMeData) {
      // Extract skills from aboutme.json
      if (aboutMeData.skills) {
        knowledge.skills = Object.values(aboutMeData.skills)
          .flatMap(items => Array.isArray(items) ? items.map(item => item.name) : []);
      }
      
      // Extract projects
      if (aboutMeData.projects) {
        knowledge.projects = aboutMeData.projects.map((project: { title: string }) => project.title);
      }
      
      // Extract experience
      if (aboutMeData.experience) {
        knowledge.experience = aboutMeData.experience.map((exp: { role: string, company: string }) => 
          `${exp.role} at ${exp.company}`
        );
      }
      
      // Extract education
      if (aboutMeData.education) {
        knowledge.education = aboutMeData.education.map((edu: { degree: string, institution: string }) => 
          `${edu.degree} from ${edu.institution}`
        );
      }
    }

    // Convert message to lowercase for easier matching
    const query = message.toLowerCase();
    
    // Generate response based on query content
    let response = '';
    
    // Check for greetings
    if (containsAny(query, ['hi', 'hello', 'hey', 'greetings'])) {
      response = "Hello! I'm Bunkheang's AI assistant. How can I help you today?";
    }
    // Check for questions about skills
    else if (containsAny(query, ['skills', 'technologies', 'tech stack', 'programming', 'languages', 'frameworks'])) {
      response = `Bunkheang is skilled in various technologies including: ${randomItems(knowledge.skills, 5).join(', ')}. He continues to expand his knowledge in web development, databases, and cybersecurity.`;
    }
    // Check for questions about experience
    else if (containsAny(query, ['experience', 'work', 'job', 'career', 'professional'])) {
      response = `Bunkheang has experience in ${randomItems(knowledge.experience, 3).join(', ')}. His background includes both technical development and project management roles.`;
    }
    // Check for questions about projects
    else if (containsAny(query, ['projects', 'portfolio', 'work', 'built', 'created', 'developed'])) {
      response = `Some of Bunkheang's notable projects include ${randomItems(knowledge.projects, 3).join(', ')}. You can find more details in the Projects section of this website.`;
    }
    // Check for questions about education
    else if (containsAny(query, ['education', 'degree', 'university', 'college', 'study', 'learn'])) {
      response = `Regarding education, Bunkheang has ${randomItems(knowledge.education, 2).join(' and ')}. He believes in continuous learning and keeping up with the latest technologies.`;
    }
    // Check for questions about contact
    else if (containsAny(query, ['contact', 'email', 'reach', 'connect', 'hire', 'message'])) {
      response = knowledge.contact;
    }
    // Fallback response
    else {
      response = "I'm Bunkheang's AI assistant. I can tell you about his skills, experience, projects, education, or how to contact him. What would you like to know?";
    }
    
    return NextResponse.json({ response });
  } catch (error) {
    console.error('Error generating response:', error);
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    );
  }
}

// Helper function to check if a string contains any of the given keywords
function containsAny(text: string, keywords: string[]): boolean {
  return keywords.some(keyword => text.includes(keyword));
}

// Helper function to get random items from an array
function randomItems(array: string[], count: number): string[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, array.length));
} 