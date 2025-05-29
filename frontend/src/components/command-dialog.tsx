import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog"
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const commandList = [
    "/list",
    "/commands",
]

export function CommandDialog() {
    return (
        <DialogContent className="max-w-[800px]">
            <DialogHeader>
                <DialogTitle>Command List</DialogTitle>
            </DialogHeader>
            <DialogDescription className="flex flex-col gap-4">
                {commandList.map((item, index) => (
                <div key={index} className="flex flex-col items-start sm:items-center sm:flex-row gap-1">
                    <div className="min-w-32"><Badge className="my-auto items-start" variant="secondary">{item}</Badge></div>
                    <h6 className="col-span-3">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetur adipisicing elit.</h6>
                </div>))}
            </DialogDescription>
        </DialogContent>
    )

}