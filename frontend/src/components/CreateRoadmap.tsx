"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react";
import { toast } from "sonner"

export function CreateRoadmap() {
  const [loading, setLoading] = useState(false);
  const placeholder = {
    designation: "Software Engineer",
    topic: "Golang, Backend Development",
    yoe: "3 years 2 months",
    timeframe: "1 month",
  }
  const [formState, setFormState] = useState({
    designation: "",
    topic: "",
    yoe: "",
    timeframe: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you can handle the form submission, e.g., send data to an API
    setLoading(true);
    // fetch api call
    fetch('/api/roadmap', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formState),
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          toast.error(data.error);
          return;
        }
        toast.success('Successfully toasted!')
      }).then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        toast.error('An error occurred while submitting the form.');
        setLoading(false);
      }).finally(() => {
        setFormState({
          designation: "",
          topic: "",
          yoe: "",
          timeframe: "1 month",
        });
      });
    console.log("Form submitted with data:", formState);
    // Reset form state after submission

    // You can use a state to control the dialog visibility
  };
  return (

    <DialogContent className="sm:max-w-[800px]">
      <DialogHeader>
        <DialogTitle>Lets Start Preparing</DialogTitle>
        <DialogDescription>
          Provide the required details for generating custom roadmap for you.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="designation" className="text-right">
            Designation
          </Label>
          <Input id="designation" value={formState.designation} placeholder={placeholder.designation} className="col-span-3" onChange={handleInputChange} />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="topic" className="text-right">
            Topics to cover
          </Label>
          <Input id="topic" value={formState.topic} placeholder={placeholder.topic} className="col-span-3" onChange={handleInputChange} />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="yoe" className="text-right">
            Your Year of Experience
          </Label>
          <Input id="yoe" value={formState.yoe} placeholder={placeholder.yoe} className="col-span-3" onChange={handleInputChange} />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="timeframe" className="text-right">
            Timeframe
          </Label>
          <Input id="timeframe" value={formState.timeframe} placeholder={placeholder.timeframe} className="col-span-3" onChange={handleInputChange} />
        </div>
      </div>
      <DialogFooter>
        <Button className="w-full" onClick={handleSubmit} disabled={loading}>{loading ? "..." : "Create Roadmap"}</Button>
      </DialogFooter>
    </DialogContent>
  )
}
