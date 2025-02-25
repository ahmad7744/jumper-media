"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type IpHistoryTableProps = {
  history: { updatedIp: string; previousIp: string; activityTime: string }[];
};

const IpHistoryTable: React.FC<IpHistoryTableProps> = ({ history }) => {
  return (
    <div className="custom-scrollbar rounded-lg border bg-zinc-800 border-[#323238] overflow-y-auto max-h-[calc(100vh-400px)]">
      <Table>
        <TableHeader>
          <TableRow className="border-neutral-800 border">
            <TableHead className="text-zinc-500 text-xs font-medium">
              UPDATED IP
            </TableHead>
            <TableHead className="text-zinc-500 text-xs font-medium">
              PREVIOUS IP
            </TableHead>
            <TableHead className="text-zinc-500 text-xs font-medium">
              ACTIVITY TIME
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {history.map((entry, index) => (
            <TableRow key={index} className="border border-none">
              <TableCell className="text-zinc-300 font-medium text-xs">
                {entry.updatedIp}
              </TableCell>
              <TableCell className="text-zinc-300 font-medium text-xs">
                {entry.previousIp}
              </TableCell>
              <TableCell className="text-zinc-300 font-medium text-xs">
                {entry.activityTime}
              </TableCell>
            </TableRow>
          ))}
          {history.length === 0 && (
            <TableRow>
              <TableCell colSpan={3} className="h-24 text-center text-zinc-400">
                No history found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default IpHistoryTable;
