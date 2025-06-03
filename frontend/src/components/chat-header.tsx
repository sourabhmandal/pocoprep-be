import { NavActions } from "@/components/nav-actions"
import { Separator } from "@/components/ui/separator"
import {
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { useRoadmapStore } from "@/hook/store/useRoadmapStore"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronsUpDownIcon, PaperclipIcon } from "lucide-react"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"

export function ChatHeader() {
    const roadmapDetails = useRoadmapStore((state) => state.roadmapDetails)
    const [isOpen, setIsOpen] = useState(false)
    const [focusedSubTopic, setFocusedSubTopic] = useState<string>()

    useEffect(() => {
        setIsOpen(true)
    }, [])

    return (
        <header className="flex h-14 shrink-0 items-center gap-2 border-b">
            <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Popover open={isOpen} onOpenChange={setIsOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="w-full px-3 py-3 h-12"
                        >
                            <p className={`text-start ${focusedSubTopic && "text-xs"}`}>{roadmapDetails?.topic} 
                            {focusedSubTopic && (
                                <p className="text-xs text-muted-foreground">
                                   Focused <Badge variant="secondary" className="px-1 py-0">{focusedSubTopic.length > 65 ? `${focusedSubTopic.substring(0, 62)}...` : focusedSubTopic}</Badge>
                                </p>
                            )}
                            </p>
                            <ChevronsUpDownIcon className="w-4 h-4 ml-1" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent
                        align="start"
                        className="max-h-screen overflow-y-scroll w-full max-w-2/3"
                    >
                        <Accordion type="single" collapsible className="w-full" defaultValue={`topic-${roadmapDetails?.id}-${1}`}>
                            {roadmapDetails?.topics.map((topic, index) => (
                                <AccordionItem value={`topic-${topic.title.replaceAll(" ", "-")}-${index + 1}`} key={topic.title.replaceAll(" ", "-")}>
                                    <AccordionTrigger>{topic.title}</AccordionTrigger>
                                    <AccordionContent>
                                        {topic.subtopics.map((subtopic, index) => (
                                            <p onClick={() => {
                                                setFocusedSubTopic(subtopic.title)
                                                setIsOpen(false)
                                            }} key={`subtopic-${topic.title.replaceAll(" ", "-")}-${subtopic.id}-${index}`} className="w-full text-left p-2 hover:bg-muted rounded-md cursor-pointer">
                                                {subtopic.title}
                                            </p>))}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </PopoverContent>
                </Popover>
            </div>
            <div className="ml-auto px-3">
                <NavActions />
            </div>
        </header>
    )
}