import { ChatList } from "@/components/ChatList";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div className="w-full h-screen mx-auto p-2">
      <main className="w-full h-full flex gap-2">
        {/* Card of Various interview topics like DSA, Javascript, etc */}
        <div className="w-1/3 h-full rounded-lg bg-slate-100 p-4 overflow-auto">
          <h1 className="text-2xl font-bold">Interview Topics</h1>
        </div>   
        <div className="w-2/3 h-full rounded-lg bg-slate-100 p-4 overflow-auto">
          <h1 className="text-2xl font-bold">Interview Topics</h1>
        </div>        
      </main>
    </div>
  );
}
