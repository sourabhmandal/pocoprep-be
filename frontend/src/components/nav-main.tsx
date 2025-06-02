"use client"

import { ChevronRight, CommandIcon, PlusIcon, type LucideIcon } from "lucide-react"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useFetchRoadmapList } from "@/hook/api/useRoadmapApi";
import { useRoadmapStore } from "@/hook/store/useRoadmapStore";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { CreateRoadmap } from "@/components/CreateRoadmap";

export function NavMain() {

  const { isLoading, error } = useFetchRoadmapList()
  const roadmaps = useRoadmapStore((state) => state.roadmaps)

  if (error) return <p>Failed to load roadmaps.</p>

  if (isLoading) {
    return <div>Loading roadmaps...</div>;
  }

  if (error) {
    toast.error(error)
    return <div>Failed to load roadmaps</div>;
  }

  return (
    <SidebarGroup>
      <Dialog>
        <DialogTrigger asChild>
          <Button size="icon" className="w-full">
            <PlusIcon /> Add New
          </Button>
        </DialogTrigger>
        <CreateRoadmap />
      </Dialog>
      <SidebarGroupLabel>Pinned</SidebarGroupLabel>

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
