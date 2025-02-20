"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ColumnDef } from "@tanstack/react-table"
import { RefreshCw, Settings } from "lucide-react"
import Assets from "../../../public/assets/assets"



export type Payment = {
    id: string;
    phoneID: string;
    status: "Active" | "Offline" | "Online"; 
    name: string;
    IPAddress: string;
    LastActivity: string;
    locations: string[];
  };
  

export const columns: ColumnDef<Payment>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
                className="border border-neutral-50"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="border border-neutral-50"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "phoneID",
        header: "PHONE",
    },
    {
        accessorKey: "name",
        header: "NAME",
    },
    {
        accessorKey: "status",
        header: "STATUS",
        cell: ({ row }) => {
            const status = row.getValue("status") as string;
            return (
                <div className="flex items-center">
                    <div
                        className={`w-2 h-2 rounded-full ${status === "Active" ? "bg-green-500" : "bg-red-500"
                            }`}
                    />
                    <span className="ml-2">{status}</span>
                </div>
            );
        },
    },

    {
        accessorKey: "IPAddress",
        header: "CURRENT IP ADDRESS",
    },
    {
        accessorKey: "locations",
        header: "LOCATIONS",
        cell: ({ row }) => row.original.locations.join(", "),
    },
    {
        accessorKey: "LastActivity",
        header: "LAST ACTIVITY",
    },

    {
        id: "actions",
        header: "ACTIONS",
        cell: ({ }) => (
            <div className="flex gap-2 items-center">
                <Button variant="outline" size="sm" className="bg-zinc-900 border text-xs border-zinc-800 hover:text-zinc-900">
                    <div
                        
                        dangerouslySetInnerHTML={{ __html: Assets.BulkRotate }}
                    /> Rotate IP
                </Button>
                <Button variant="outline" size="sm" className="bg-zinc-900 border border-zinc-800">
                    <Settings />
                </Button>
            </div>
        ),
    }
]
