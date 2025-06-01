import { RoadmapDetailDataProvider, useRoadmapDetailApiData } from "@/context/RoadmapDetail";
import { Marked } from 'marked';
import { useEffect } from "react";
import markedCodePreview from 'marked-code-preview';


interface ChatHistoryProps {
    className?: string;
}
export function ChatHistory({ className }: ChatHistoryProps) {
    const { selectedSubtopic } = useRoadmapDetailApiData();
    const marked = new Marked();

    useEffect(() => {
        marked.use({
            pedantic: false,
            gfm: true,
            breaks: false
        });

    }, [marked]);

    return (
        <div className={className}>
            <div className="flex flex-col gap-4 items-end">
                {/* {selectedSubtopic?.topics.map((topic, index) => (
                <></>
            ))} */}

                <div className="max-w-2xl bg-white/10 p-4 rounded-lg">
                    Explain me python memory management in detail.
                </div>

                <article className="markdown-body w-full p-4 rounded-lg" dangerouslySetInnerHTML={{
                    __html: marked.use(markedCodePreview()).parse(`Sure — let’s break down Python memory management clearly, without code:

---

## 📌 Python Memory Management — Plain Explanation:

1. **Automatic Memory Management**
   Python handles most memory allocation and deallocation automatically, so developers don’t manually free memory like in C/C++.

2. **Private Heap Space**
   All Python objects and data structures are stored in a private heap — a dedicated memory area managed by the Python interpreter.

3. **Memory Manager**
   Python has an internal memory manager that handles object allocation, memory blocks, and caching mechanisms.

4. **Garbage Collection (GC)**
   Python uses a garbage collector to automatically reclaim memory by identifying and cleaning up unused objects.

   * It uses **reference counting** (keeping track of how many references point to an object)
   * And handles **cyclic references** (objects referring to each other) using a cyclic garbage collector.

5. **Reference Counting**
   Every object has a count of how many variables reference it. When this count drops to zero, the memory can be freed.

6. **Object-specific Allocators**
   For different object types (like integers, strings, lists), Python has specialized memory allocators to optimize memory use.

7. **Memory Pools (Pymalloc)**
   Python internally manages small memory requests using a system called **pymalloc**, which reduces system calls and fragmentation by allocating memory in chunks.

---

## 📌 Summary:

Python memory management = **automatic allocation + garbage collection** + **private heap + pymalloc**.
It’s designed to be efficient, safe, and transparent so developers can focus on logic, not memory cleanup.

---

Would you like a visual analogy for this too?`)
                }} />
            </div>
        </div>
    );
}