import { handleApiErrorNotify } from "@/lib/api/handle-api-error-notify";

export async function apiFetcher<T>(url: string, options?: RequestInit): Promise<T> {
    let response: Response | undefined;
    try {
        response = await fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options?.headers,
            },
        });
    } catch (error) {
        handleApiErrorNotify(error, 'Network error occurred');
        throw error;
    }

    if (!response || !response.ok) {
        const errorText = response
            ? await response.json().catch(() => 'Unknown error')
            : 'No response received';
        throw new Error(
            `HTTP error! status: ${response ? response.status : 'unknown'}, message: ${errorText}`
        );
    }

    return response.json() as Promise<T>;
}