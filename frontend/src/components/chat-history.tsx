"use client"
import { Marked } from 'marked';
import { useEffect, useMemo } from "react";
import markedCodePreview from 'marked-code-preview';
import { useRoadmapStore } from '@/hook/store/useRoadmapStore';
import { useFetchChatHistoryList } from '@/hook/api/useRoadmapApi';


interface ChatHistoryProps {
    className?: string;
}
export function ChatHistory({ className }: ChatHistoryProps) {
    const marked = useMemo(() => {
        const instance = new Marked();
        instance.use({
            pedantic: false,
            gfm: true,
            breaks: false
        });
        instance.use(markedCodePreview()); // Apply the extension here
        return instance;
    }, []);
    const { error, isLoading } = useFetchChatHistoryList(3);
    const chatHistory = useRoadmapStore((state) => state.chatHistory)

    if (isLoading) {
        return <div className="text-gray-500">Loading chat history...</div>;
    }
    if (error) {
        return <div className="text-red-500">Error loading chat history: {error.message}</div>;
    }

    return (
        <div className={className}>
            <div className="flex flex-col gap-4 items-end">

                {chatHistory && chatHistory?.results.map((item) => (
                    <>
                        <div className="max-w-2/3 p-4 rounded-lg dark:bg-white/10 bg-black/10" dangerouslySetInnerHTML={{
                            __html: marked.use(markedCodePreview()).parse(item.user_message)
                        }} />
                        <article className="markdown-body w-full p-4 rounded-lg" dangerouslySetInnerHTML={{
                            __html: marked.use(markedCodePreview()).parse(item.llm_response)
                        }} />
                    </>
                ))}
            </div>
        </div>
    );
}