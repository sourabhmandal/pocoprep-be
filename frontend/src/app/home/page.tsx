import { ChatList } from "@/components/ChatList";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { CreateRoadmap } from "@/components/CreateRoadmap";

export default function Home() {
  return (
    <div className="max-w-screen-lg mx-auto">
      <h1 className="text-center m-4 text-4xl font-extrabold uppercase">
        Poco Prep
      </h1>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="default" className="w-full">Create New Roadmap</Button>
        </DialogTrigger>
        <CreateRoadmap />
      </Dialog>
      <Separator />

      <main className="w-full">
        {/* Card of Various interview topics like DSA, Javascript, etc */}
        <ChatList />
      </main>
    </div>
  );
}