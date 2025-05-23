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

const invoices = [
  {
    chatid: "asduyoq",
    emoji: "💻",
    title: "Golang Interview Questions",
    percent: 80,
  },
  {
    chatid: "asduyoq",
    emoji: "💻",
    title: "ReactJS Interview Questions",
    percent: 80,
  },
  {
    chatid: "asduyoq",
    emoji: "💻",
    title: "NextJS Interview Questions",
    percent: 80,
  },
]

export function ChatList() {
  return (
    <Table>
      <TableCaption></TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px] text-center"></TableHead>
          <TableHead colSpan={3}>Title</TableHead>
          <TableHead className="text-right">Completed</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((topic) => (
          <TableRow key={topic.emoji} className="hover:cursor-pointer">
          <Link href={`/${topic.chatid}`} className="contents">
            <TableCell className="font-medium text-center">{topic.emoji}</TableCell>
            <TableCell colSpan={3}>{topic.title}</TableCell>
            <TableCell className="text-right">{topic.percent}</TableCell>
            </Link>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow className="bg-blue-50">
          <TableCell colSpan={1}></TableCell>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
