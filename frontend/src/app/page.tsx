'use client'

import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { ChatHeader } from "@/components/chat-header";
import { ChatContent } from "@/components/chat-content";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export default function HomePage() {
  return (
    <ErrorBoundary>
      <SidebarProvider className="h-[100vh] overflow-hidden">
        <AppSidebar className="bg-sidebar" />
        <SidebarInset className="">
          {/* Header with title and actions */}
          <ChatHeader/>
          {/* Main content and chat input wrapper */}
          <div className="flex flex-col overflow-hidden rounded-t-lg">
            <div className="flex flex-col h-full">
              <ChatContent/>
            </div>
          </div>

        </SidebarInset>
      </SidebarProvider>
</ErrorBoundary>
  )
}
function useFetchRoadmapList(): { isLoading: any; error: any; } {
  throw new Error("Function not implemented.");
}

