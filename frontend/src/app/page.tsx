'use client'

import { RoadmapListDataProvider } from "@/context/RoadmapList"
import { AppSidebar } from "@/components/app-sidebar"

import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { ChatHistory } from "@/components/chat-history";
import { ChatInput } from "@/components/chat-input"
import { ChatHeader } from "@/components/chat-header";
import { RoadmapDetailDataProvider } from "@/context/RoadmapDetail";
import { ChatContent } from "@/components/chat-content";

export default function HomePage() {
  return (
    <RoadmapListDataProvider>
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
    </RoadmapListDataProvider>

  )
}
