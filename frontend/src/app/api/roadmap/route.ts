import { NextRequest, NextResponse } from 'next/server';

interface Chat {
    id: number
    subtopic: number
    user_message: string
    llm_response: string
    timestamp: string
}

export async function POST(req: NextRequest) {
    const { designation, topic, yoe, timeframe } = await req.json();
    if (!designation) {
        return NextResponse.json({ error: 'Designation is required.' }, { status: 400 });
    }
    if (!topic) {
        return NextResponse.json({ error: 'Topic ID is required.' }, { status: 400 });
    }
    if (!yoe) {
        return NextResponse.json({ error: 'YoE ID is required.' }, { status: 400 });
    }
    if (!timeframe) {
        return NextResponse.json({ error: 'Timeframe ID is required.' }, { status: 400 });
    }

    const backendUrl = `${process.env.BACKEND_BASE_URL}/roadmap/`; // Your backend endpoint

    try {
        const backendResponse = await fetch(backendUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Crucial to specify content type for JSON body
            },
            body: JSON.stringify({
                designation,
                topic,
                yoe,
                timeframe
            }),
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