"use client";
import { use, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ChatTerminal } from "@/components/ChatTerminal";

interface InterviewPreparationSubTopic {
  id: number
  title: string
}
interface InterviewPreparationTopic {
  id: number
  title: string
  importance_score: number
  subtopics: Array<InterviewPreparationSubTopic>
}

interface InterviewPreparation {
  id: number
  interviewer: string
  topic: string
  llm_response: string
  created_at: string
  topics: Array<InterviewPreparationTopic>
}


export default function Home({ params }: { params: Promise<{ id: string }> }) {
  const [roadmap, setRoadmap] = useState<InterviewPreparation>({} as InterviewPreparation);
  const [selectedTopic, setSelectedTopic] = useState<InterviewPreparationTopic>({} as InterviewPreparationTopic);
  const [selectedSubTopic, setSelectedSubTopic] = useState<InterviewPreparationSubTopic>({} as InterviewPreparationSubTopic);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        const { id } = await params
        setLoading(true);
        // *** IMPORTANT CHANGE HERE ***
        // Fetch from your Next.js API route instead of the direct backend
        const response = await fetch(`/api/roadmap/${id}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Explicitly cast the data to your defined type
        const data: InterviewPreparation = await response.json();
        setRoadmap(data);
        setSelectedTopic(data.topics[0]);
        setSelectedSubTopic(data.topics[0].subtopics[0]);
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

    fetchRoadmap();
  }, []); // Empty dependency array means this effect runs once after the initial render


  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="w-full h-screen mx-auto p-2">
      <main className="w-full h-full flex gap-2">
        {/* Card of Various interview topics like DSA, Javascript, etc */}
        <div className="w-1/3 h-full rounded-lg bg-slate-100 overflow-auto">
          {loading ? <div>Loading Chats...</div> : <h1 className="text-md font-bold p-4 bg-slate-300">{roadmap?.topic.length > 40 ? roadmap?.topic.substring(0, 40) + '...' : roadmap?.topic}</h1>}
          {!loading &&
            <Accordion type="single" collapsible className="w-full px-2">

              {roadmap?.topics.map((topic, index) => (<AccordionItem value={`item-${topic.title.replaceAll(" ", "-")}-${index}`} key={`item-${topic.title.replaceAll(" ", "-")}-${index}`}>
                <AccordionTrigger className="w-full justify-between">
                  <h3 className="w-full">{topic.title}</h3>
                  <span className="flex-none text-tertiary w-20">
                    <span className="text-yellow-400">
                      {"★".repeat(Math.round(Math.ceil(topic.importance_score)))}
                    </span>
                    {"☆".repeat(5 - Math.round(Math.ceil(topic.importance_score)))}
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  {topic.subtopics.map((subtopic, subIndex) => (
                    <Button
                      size={"sm"}
                      key={`subtopic-${subtopic.title.replaceAll(" ", "-")}-${subIndex}`}
                      className="text-sm w-full flex justify-between text-blue-500 hover:underline"
                      variant={"ghost"}
                      onClick={() => {
                        setSelectedSubTopic(subtopic);
                        setSelectedTopic(topic);
                      }}
                    >
                      {subtopic.title.length > 40 ? subtopic.title.substring(0, 40) + '...' : subtopic.title}
                    </Button>

                  ))}
                </AccordionContent>
              </AccordionItem>))}
            </Accordion>}
        </div>
        <div className="w-2/3 h-full rounded-lg bg-slate-100 overflow-auto">
          {loading ? <div>Loading Topics...</div> : <h1 className="text-md font-bold p-4 bg-slate-300">{selectedSubTopic?.title && selectedSubTopic?.title.length > 100 ? selectedSubTopic.title.substring(0, 100) + '...' : selectedSubTopic?.title}</h1>}
          <ChatTerminal subTopic={selectedSubTopic} />
        </div>
      </main>
    </div>
  );
}
