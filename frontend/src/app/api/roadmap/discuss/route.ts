import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const { user_message, subtopic } = await req.json();

  if (!user_message || !subtopic) {
    return new Response(
      JSON.stringify({ error: 'user_message and subtopic are required.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const backendUrl = `${process.env.BACKEND_BASE_URL}/roadmap/discuss`;

  try {
    const backendResponse = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_message, subtopic }),
    });

    if (!backendResponse.ok || !backendResponse.body) {
      const errorData = await backendResponse.text();
      return new Response(errorData || 'Backend error', {
        status: backendResponse.status,
        headers: { 'Content-Type': 'application/json' },
      });
    } 
    const readableStream = new ReadableStream({
      async start(controller) {
        const reader = backendResponse.body!.getReader();
        const decoder = new TextDecoder();

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          controller.enqueue(decoder.decode(value));
        }

        controller.close();
      },
    });

    return new Response(readableStream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Streaming error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal Server Error while streaming.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
