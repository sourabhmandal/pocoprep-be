import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server';

interface Chat {
  id: number
  subtopic: number
  user_message: string
  llm_response: string
  timestamp: string
}
type ChatArray = Chat[];

interface ErrorResponse {
    error: string;
}

// This function handles GET requests to your API route for the App Router
export async function GET(request: NextApiRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    if (!id) {
        return NextResponse.json({ error: 'ID parameter is required' }, { status: 400 });
    }
    const backendUrl = `${process.env.BACKEND_BASE_URL}/roadmap/discuss/${id}`;

    try {
        const backendResponse = await fetch(backendUrl);

        if (!backendResponse.ok) {
            const errorResponse: ErrorResponse = await backendResponse.json();

            return NextResponse.json({
                error: `Backend error: ${errorResponse.error || 'Failed to fetch data from backend'}`,
            }, {
                status: backendResponse.status,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            );
        }

        const data: ChatArray = await backendResponse.json();

        return NextResponse.json(data, {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error fetching data from backend:', error);
        return NextResponse.json({ error: 'Internal Server Error: Could not retrieve roadmaps.' },
            {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    }
}
