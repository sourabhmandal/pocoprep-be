'use client'

import { AppSidebar } from "@/components/app-sidebar"
import { NavActions } from "@/components/nav-actions"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { ChatHistory } from "@/components/chat-history";
import { ChatInput } from "@/components/chat-input"

export default function HomePage() {
  return (
    <SidebarProvider className="dark:bg-black bg-white/80 h-[100vh] overflow-hidden">
      <AppSidebar className="dark:bg-black bg-white/80" />
      <SidebarInset className="dark:bg-muted/50 bg-white">
        <header className="flex h-12 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <h1 className="text-md">Building Your Application</h1>
          </div>
          <div className="ml-auto px-3">
            <NavActions />
          </div>
        </header>

        {/* Main content and chat input wrapper */}
        <div className="flex flex-col overflow-hidden rounded-t-lg">
          <div className="flex flex-col  h-full">
            {/* Messages area */}
            <div className="flex-1 overflow-y-auto p-4">
              <ChatHistory className="max-w-3xl mx-auto" />
            </div>
            {/* Chat Input at bottom */}
            <div className="border-8 rounded-t-lg border-b-0 w-full max-w-3xl mx-auto">
              <ChatInput className=""/>
            </div>
          </div>
        </div>

      </SidebarInset>
    </SidebarProvider>
  )
}
