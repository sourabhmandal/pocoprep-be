"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { ArrowUp } from "lucide-react"
import { ChevronDownIcon } from "lucide-react"
import { PaperclipIcon } from "lucide-react"

import { useState } from "react"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";


export function ChatInput({ className = "" }: { className?: string }) {
    const [input, setInput] = useState("");
    const sendMessage = () => { };
    const [inputRows, setInputRows] = useState(1)
    return (
        <div className={className}>
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
                  <PopoverContent className="w-96 p-0 px-2 rounded-lg shadow-lg" side="top" align="start">
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
    )
}