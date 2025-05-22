import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Return static model information with the correct model name
    return NextResponse.json({ 
      models: [
        {
          name: "gemini-2.0-flash",
          displayName: "Gemini 2.0 Flash",
          description: "Google's Gemini 2.0 Flash large language model",
          supportedGenerationMethods: ["generateContent"]
        }
      ]
    });
  } catch (error) {
    console.error('Error listing Gemini models:', error);
    return NextResponse.json(
      { error: 'Failed to list models: ' + (error instanceof Error ? error.message : String(error)) },
      { status: 500 }
    );
  }
}