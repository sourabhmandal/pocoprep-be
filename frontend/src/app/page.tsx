import { ChatList } from "@/components/ChatList";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div className="max-w-screen-lg mx-auto">
      <h1 className="text-center m-4 text-4xl font-extrabold uppercase">
        Pocket Interview
      </h1>
      <Separator />

      <main className="w-full">
        {/* Card of Various interview topics like DSA, Javascript, etc */}
        <ChatList />
      </main>
    </div>
  );
}
