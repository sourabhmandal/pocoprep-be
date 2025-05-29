"use client";
import { AppSidebar } from "@/components/app-sidebar"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { NavActions } from "@/components/nav-actions"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { ArrowUp } from "lucide-react"
import { ChevronDownIcon } from "lucide-react"
import { PaperclipIcon } from "lucide-react"

import { useRef, useState } from "react"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

export default function Home() {
  const [input, setInput] = useState("");
  const sendMessage = () => { };
  const [inputRows, setInputRows] = useState(1)
  return (
    <SidebarProvider className="bg-black">
      <AppSidebar className="bg-black" />
      <SidebarInset className="bg-black">
        <header className="flex h-12 shrink-0 items-center gap-2 bg-black">
          <div className="flex items-center gap-2 px-4 bg-black">
            <SidebarTrigger className="-ml-1 bg-black" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <h1 className="text-md">Building Your Application</h1>
          </div>
          <div className="ml-auto px-3">
            <NavActions />
          </div>
        </header>

        {/* Main content and chat input wrapper */}
        <div className="flex flex-col h-[calc(100vh-4rem)] overflow-hidden bg-muted/80 rounded-lg">

          {/* Messages area */}
          <div className="flex-1 overflow-auto p-4">
            {/* Messages go here */}
            <div className="flex flex-col gap-4 items-end">
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

          {/* Chat Input — sticky at bottom */}
          <div className="border-8 rounded-lg border-b-0 w-full">
            <div className="flex flex-col gap-2">
              <Textarea
                value={input}
                onChange={(e) => {
                  setInput(e.target.value)
                  setInputRows(e.target.value.split("\n").length)
                  if (e.target.value.startsWith("/")) {
                  const command = e.target.value.split(" ")[0].substring(1); // get command without '/'
                    console.log("Detected command:", command);
                    // You can now open a command palette, suggestions list, or handle it
                  }
                }}
                placeholder="Type your message..."
                onFocus={() => setInputRows(1)}
                className="outline-none focus:outline-none focus:ring-0 focus-visible:ring-0 resize-none bg-transparent border-none w-full text-base leading-6 text-foreground placeholder:text-secondary-foreground/60 disabled:opacity-0"
                rows={inputRows}
              />


              <div className="flex justify-between items-center p-3">
                <Popover>
                  <PopoverTrigger className="flex gap-1 items-center text-sm font-semibold text-muted-foreground">
                    Chat Settings <ChevronDownIcon className="h-4 w-4" />
                  </PopoverTrigger>
                  <PopoverContent className="w-96 w-96 p-0 px-2 rounded-lg shadow-lg" side="top" align="start">
                    <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
                      <AccordionItem value="item-1">
                        <AccordionTrigger>Golang Fundamentals</AccordionTrigger>
                        <AccordionContent>
                          {["Basic Syntax and Data Types (int, string, bool, etc.)", "Control Flow (if/else, for, switch)", "Functions (including multiple return values, named return values)", "Pointers", "Structs and Methods"].map((item, index) => (
                            <div key={index} className="w-full text-left p-2 hover:bg-muted rounded-md cursor-pointer">
                              {item}
                            </div>))}
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-2">
                        <AccordionTrigger>Standard Libraries</AccordionTrigger>
                        <AccordionContent>
                          {["Basic Syntax and Data Types (int, string, bool, etc.)", "Control Flow (if/else, for, switch)", "Functions (including multiple return values, named return values)", "Pointers", "Structs and Methods"].map((item, index) => (
                            <div key={index} className="w-full text-left p-2 hover:bg-muted rounded-md cursor-pointer">
                              {item}
                            </div>))}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </PopoverContent>
                </Popover>

                <div className="flex gap-2">
                  <Button size="icon" variant={"ghost"} onClick={sendMessage}>
                    <PaperclipIcon className="h-4 w-4" />
                  </Button>
                  <Button size="icon" onClick={sendMessage} disabled={!input.trim()}>
                    <ArrowUp className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
