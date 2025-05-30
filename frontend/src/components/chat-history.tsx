import { RoadmapDetailDataProvider, useRoadmapDetailApiData } from "@/context/RoadmapDetail";

interface ChatHistoryProps {
    className?: string;
}
export function ChatHistory({ className }: ChatHistoryProps) {
        const { selectedSubtopic } = useRoadmapDetailApiData();

    return (
        <div className={className}>
                        <div className="flex flex-col gap-4 items-end">
            {/* {selectedSubtopic?.topics.map((topic, index) => (
                <></>
            ))} */}
 
            <div className="max-w-2xl bg-white/10 p-4 rounded-lg">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt molestias necessitatibus,
                    excepturi fugiat voluptatibus ipsum totam, iusto maiores itaque est repellendus voluptate.
                    Cupiditate veniam perferendis eveniet, explicabo accusamus impedit harum culpa voluptatem
                    necessitatibus fugiat deserunt corporis, vitae sint ducimus error?
                </div>
                
                <div className="w-full p-4 rounded-lg">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt molestias necessitatibus,
                    excepturi fugiat voluptatibus ipsum totam, iusto maiores itaque est repellendus voluptate.
                    Cupiditate veniam perferendis eveniet, explicabo accusamus impedit harum culpa voluptatem
                    necessitatibus fugiat deserunt corporis, vitae sint ducimus error?
                </div>
                <div className="max-w-2xl bg-white/10 p-4 rounded-lg">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt molestias necessitatibus,
                    excepturi fugiat voluptatibus ipsum totam, iusto maiores itaque est repellendus voluptate.
                    Cupiditate veniam perferendis eveniet, explicabo accusamus impedit harum culpa voluptatem
                    necessitatibus fugiat deserunt corporis, vitae sint ducimus error?
                </div>
                <div className="w-full p-4 rounded-lg">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt molestias necessitatibus,
                    excepturi fugiat voluptatibus ipsum totam, iusto maiores itaque est repellendus voluptate.
                    Cupiditate veniam perferendis eveniet, explicabo accusamus impedit harum culpa voluptatem
                    necessitatibus fugiat deserunt corporis, vitae sint ducimus error?
                </div>
            </div>
        </div>
    );
}