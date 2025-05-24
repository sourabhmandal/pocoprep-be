"use client"
import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";


interface Chat {
  id: number
  subtopic: number
  user_message: string
  llm_response: string
  timestamp: string
}
type ChatArray = Chat[];

interface InterviewPreparationSubTopic {
  id: number
  title: string
}

export function ChatTerminal({ subTopic }: { subTopic: InterviewPreparationSubTopic }) {
  const [chatList, setChatList] = useState<ChatArray>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentMessage, setCurrentMessage] = useState<string>(""); // State for the textarea input
  const [isSending, setIsSending] = useState<boolean>(false); // State for sending message

  useEffect(() => {
    if (!subTopic || !subTopic.id) return;

    const fetchChats = async () => { // Renamed from fetchRoadmaps to fetchChats for clarity
      try {
        setLoading(true);
        console.log("Fetching chat data for ID:", subTopic.id);
        const response = await fetch(`/api/roadmap/discuss/${subTopic.id}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: ChatArray = await response.json();
        setChatList(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, [subTopic]);

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return; // Don't send empty messages
    if (!subTopic || !subTopic.id) {
      setError("Subtopic not selected.");
      return;
    }

    setIsSending(true);
    setError(null); // Clear previous errors

    try {
      // Optimistically add the user's message to the chat list
      const newUserMessage: Chat = {
        id: Date.now(), // Temporary ID
        subtopic: subTopic.id,
        user_message: currentMessage,
        llm_response: "Thinking...", // Placeholder for LLM response
        timestamp: new Date().toISOString(),
      };
      setChatList(prevChats => [...prevChats, newUserMessage]);
      setCurrentMessage(""); // Clear the input field

      const response = await fetch(`/api/roadmap/discuss`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subtopic: subTopic.id,
          user_message: currentMessage,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to send message: ${response.statusText}`);
      }

      const responseData: Chat = await response.json();

      // Replace the placeholder or add the new complete chat entry
      setChatList(prevChats =>
        prevChats.map(chat =>
          chat.id === newUserMessage.id ? responseData : chat
        )
      );

    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred while sending message.");
      }
      // Revert optimistic update if sending failed
      // setChatList(prevChats => prevChats.filter(chat => chat.id !== newUserMessage.id));

    } finally {
      setIsSending(false);
    }
  };


  if (loading) {
    return <div>Loading chats...</div>;
  }

  if (error && !isSending) { // Display error unless actively sending and error might be transient
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col h-full"> {/* Use flex-col and h-full for layout */}
      <div className="overflow-auto flex-grow p-4"> {/* Chat display area, takes available space */}
        {chatList.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">Start a conversation!</div>
        ) : (
          chatList.map((chat) => (
            <div key={chat.id} className="mb-4"> {/* Added margin-bottom for spacing */}
              <div className="flex justify-end mb-2"> {/* User message on the right */}
                <div className="bg-blue-500 text-white p-3 rounded-lg max-w-md break-words">
                  <div className="text-md">
                    <ReactMarkdown>{chat.user_message}</ReactMarkdown>
                  </div>
                  <div className="text-xs text-gray-300 mt-1 text-right">{new Date(chat.timestamp).toLocaleString()}</div>
                </div>
              </div>
              <div className="flex justify-start"> {/* LLM response on the left */}
                <div className="bg-gray-200 p-3 rounded-lg max-w-md break-words">
                  <div className="text-md">
                    <ReactMarkdown>{chat.llm_response}</ReactMarkdown></div>
                  <div className="text-xs text-gray-600 mt-1">{new Date(chat.timestamp).toLocaleString()}</div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="p-4 border-t border-gray-200 bg-white sticky bottom-0"> {/* Input area at the bottom */}
        <div className="flex items-center space-x-2">
          <Textarea
            placeholder="Type your message here..."
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter" && !e.shiftKey) { // Send on Enter, allow Shift+Enter for new line
                e.preventDefault();
                handleSendMessage();
              }
            }}
            rows={3} // Adjust number of rows as needed
            className="flex-grow resize-none" // Allow it to grow, but prevent manual resize
            disabled={isSending} // Disable while sending
          />
          <Button onClick={handleSendMessage} disabled={isSending || !currentMessage.trim()}>
            {isSending ? "Sending..." : "Send"}
          </Button>
        </div>
        {error && isSending && ( // Display error only when sending and an error occurs
          <p className="text-red-500 text-sm mt-2">{error}</p>
        )}
      </div>
    </div>
  )
}