import { NavActions } from "@/components/nav-actions"
import { Separator } from "@/components/ui/separator"
import {
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { useRoadmapStore } from "@/hook/store/useRoadmapStore"


export function ChatHeader() {
  const selectedRoadmap = useRoadmapStore((state) => state.selectedRoadmap)
    return (
        <header className="flex h-12 shrink-0 items-center gap-2">
            <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <h1 className="text-md">{selectedRoadmap?.topic}</h1>
            </div>
            <div className="ml-auto px-3">
                <NavActions />
            </div>
        </header>
    )
}