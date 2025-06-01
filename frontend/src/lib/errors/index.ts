export class BadRequestError extends Error {
    status: number;

    constructor(message: string, status: number = 400) {
        super(message);
        this.name = 'BadRequestError';
        this.status = status;
    }
}

export function handleError(error: unknown): Response {
    if (error instanceof BadRequestError) {
        return new Response(
            JSON.stringify({ error: error.message }), {
            status: Number(error?.status) || 400,
        })
    }

    console.error('An unexpected error occurred:', error);
    return new Response(
        JSON.stringify({ error: 'Internal Server Error' }), {
        status: 500,
    }
    );
}