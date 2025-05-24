import { NextRequest, NextResponse } from 'next/server';

interface Chat {
  id: number
  subtopic: number
  user_message: string
  llm_response: string
  timestamp: string
}

export async function POST(req: NextRequest) {
  const { user_message, subtopic } = await req.json();
  if (!user_message) {
    return NextResponse.json({ error: 'Message is required.' }, { status: 400 });
  }
  if (!subtopic) {
    return NextResponse.json({ error: 'Subtopic ID is required.' }, { status: 400 });
  }

  const backendUrl = `${process.env.BACKEND_BASE_URL}/roadmap/discuss`; // Your backend endpoint

  try {
    const backendResponse = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Crucial to specify content type for JSON body
      },
      body: JSON.stringify({ user_message: user_message, subtopic: subtopic }), // Stringify the JSON body for the backend
    });

    if (!backendResponse.ok) {
      const errorData = await backendResponse.json().catch(() => ({})); // Try to parse error response
      const errorMessage = errorData.error || `Backend error: ${backendResponse.statusText || 'Failed to fetch data from backend'}`;
      return NextResponse.json(
        { error: errorMessage },
        { status: backendResponse.status }
      );
    }

    const data: Chat = await backendResponse.json();
    return NextResponse.json(data, { status: backendResponse.status });
  } catch (error) {
    console.error('Error in API route:', error); // Log the actual error for debugging
    return NextResponse.json(
      { error: 'Internal Server Error: Could not process request.' },
      { status: 500 }
    );
  }
}