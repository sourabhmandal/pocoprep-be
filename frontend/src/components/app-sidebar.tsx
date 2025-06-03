"use client"

import * as React from "react"
import {
  BookOpen,
  Bot,
  Command,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
} from "lucide-react"
import Link from "next/link"
import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { AppSwitcher } from "@/components/AppSwitcher"
import { useSession } from "@/lib/auth/auth-client"

const data = {
  apps: [
    {name: "Interview Preparation", logo: Bot, plan: "Free"},
    {name: "Resume Builder & Career Coaching", logo: Frame, plan: "Pro"},
    {name: "Mock Interviews", logo: Send, plan: "Pro"},
    // {name: "Job Search", logo: Map, plan: "Free"},
    // {name: "Analytics", logo: PieChart, plan: "Pro"},
    {name: "Settings", logo: Settings2, plan: "Free"},
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <AppSwitcher teams={data.apps} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
