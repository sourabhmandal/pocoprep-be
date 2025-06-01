import {toast } from 'sonner'

export const handleApiErrorNotify = (err: unknown, fallback= 'Something went wrong') => {
    const message = extractErrorMessage(err, fallback)
    toast.error(message)
}

function extractErrorMessage(err: unknown, fallback: string): string {
    if (err instanceof Error) {
        return err.message || fallback
    } else if (typeof err === 'string') {
        return err || fallback
    }
    else if (err && typeof err === 'object' && 'message' in err) {
        return (err as { message: string }).message || fallback
    } else {
        return fallback
    }
}