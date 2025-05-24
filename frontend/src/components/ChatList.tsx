"use client"
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Link from "next/link"

interface InterviewPreparation {
  id: number;
  topic: string;
  interviewer: string;
  created_at: string; // Or Date if you plan to convert it to a Date object
}

type InterviewPreparationArray = InterviewPreparation[];


export function ChatList() {
  const [roadmaps, setRoadmaps] = useState<InterviewPreparationArray>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoadmaps = async () => {
      try {
        setLoading(true);
        // *** IMPORTANT CHANGE HERE ***
        // Fetch from your Next.js API route instead of the direct backend
        const response = await fetch("/api/roadmap/all"); 

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Explicitly cast the data to your defined type
        const data: InterviewPreparationArray = await response.json();
        setRoadmaps(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmaps();
  }, []); // Empty dependency array means this effect runs once after the initial render

  if (loading) {
    return <div>Loading roadmaps...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


  return (
    <Table>
      <TableCaption></TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px] text-center"></TableHead>
          <TableHead colSpan={3}>Title</TableHead>
          <TableHead className="text-right">Persona</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {roadmaps.map((topic) => (
          <TableRow key={topic.id} className="hover:cursor-pointer">
            <Link href={`/${topic.id}`} className="contents">
              <TableCell className="font-medium text-center">{topic.id}</TableCell>
              <TableCell colSpan={3}>{topic.topic}</TableCell>
              <TableCell className="text-right">{topic.interviewer}</TableCell>
            </Link>
          </TableRow>
        ))}
      </TableBody>
      {/* <TableFooter>
        <TableRow className="bg-blue-50">
          <TableCell colSpan={1}></TableCell>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter> */}
    </Table>
  )
}
