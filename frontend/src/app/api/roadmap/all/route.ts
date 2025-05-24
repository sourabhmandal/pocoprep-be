import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server';

interface InterviewPreparation {
  id: number;
  topic: string;
  interviewer: string;
  created_at: string;
}

type InterviewPreparationArray = InterviewPreparation[];

// This function handles GET requests to your API route for the App Router
export async function GET(request: NextApiRequest, response: NextApiResponse) {
  const backendUrl = `${process.env.BACKEND_BASE_URL}/roadmap/all`;

  try {
    const backendResponse = await fetch(backendUrl);

    if (!backendResponse.ok) {
      NextResponse.json({
        error: `Backend error: ${backendResponse.statusText || 'Failed to fetch data from backend'}`,
      }, { status: backendResponse.status, headers: { 'Content-Type': 'application/json' } });
    }

    const data: InterviewPreparationArray = await backendResponse.json();
    return NextResponse.json(data, { status: backendResponse.status, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error('Error fetching data from backend:', error);
    return NextResponse.json({ error: 'Internal Server Error: Could not retrieve roadmaps.' }, { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
