import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Clipboard, ClipboardCheck, Trash2, Settings } from "lucide-react";
import { Proxy } from "./ProxyTable";
import { useState } from "react";
export const getColumns = (): ColumnDef<Proxy, any>[] => [
  {
    accessorKey: "type",
    header: "TYPE",
  },
  {
    accessorKey: "ip",
    header: "IP",
  },
  {
    accessorKey: "port",
    header: "PORT",
  },
  {
    accessorKey: "login",
    header: "LOGIN",
  },
  {
    accessorKey: "password",
    header: "PASSWORD",
  },
  {
    id: "actions",
    header: "ACTIONS",
    cell: ({ row }: { row: any }) => {
      const [copied, setCopied] = useState(false);

      const handleCopy = () => {
        navigator.clipboard.writeText(row.original.password);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      };

      return (
        <div className="flex gap-1">
          <Button
            size="icon"
            variant="ghost"
            className="text-zinc-300 border border-zinc-700"
            onClick={handleCopy}
          >
            {copied ? <ClipboardCheck size={16} /> : <Clipboard size={16} />}
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="text-zinc-300 border border-zinc-700 px-0"
          >
            <Settings size={16} />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="text-red-400 hover:text-red-400 border border-zinc-700"
          >
            <Trash2 size={16} />
          </Button>
        </div>
      );
    },
  },
];
