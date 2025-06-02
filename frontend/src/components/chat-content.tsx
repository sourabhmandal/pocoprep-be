import { ChatHistory } from "@/components/chat-history";
import { ChatInput } from "@/components/chat-input";

export function ChatContent() {
    return (
        <>
            {/* Messages area */}
            <div className="flex-1 overflow-y-auto p-4">
                <ChatHistory className="max-w-3xl mx-auto" />
            </div>
            {/* Chat Input at bottom */}
            <div className="border-8 rounded-t-lg border-b-0 w-full max-w-3xl mx-auto">
                <ChatInput />
            </div>
        </>
    )
}