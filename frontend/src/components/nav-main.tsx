"use client"

import { ChevronRight, CommandIcon, type LucideIcon } from "lucide-react"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useRoadmapListApiData } from "@/context/RoadmapList";



export function NavMain() {
  const { roadmaps, selectedRoadmap, loading, error } = useRoadmapListApiData()

  if (loading) {
    return <div>Loading roadmaps...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
      <SidebarGroup>
        <SidebarGroupLabel>Favourites</SidebarGroupLabel>

        <SidebarGroupLabel>Roadmap</SidebarGroupLabel>
        <SidebarMenu>
          {roadmaps.map((item) => (
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip={item.topic}>
                <a href={item.topic.toLowerCase().replace(/\s+/g, "-")}>
                  <CommandIcon />
                  <span>{item.topic}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>
  )
}
