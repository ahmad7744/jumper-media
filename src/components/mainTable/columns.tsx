"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ColumnDef } from "@tanstack/react-table"
import { RefreshCw, Settings } from "lucide-react"


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
    id: string
    phoneID: string
    status: "Online" | "Offline"
    name: string
    IPAddress: string
    LastActivity: string
}

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
            // Ensure that the status is a string
            const status = row.getValue("status") as string;
            return (
                <div className="flex items-center">
                    <div
                        className={`w-2 h-2 rounded-full ${status === "Online" ? "bg-green-500" : "bg-red-500"
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
        accessorKey: "LastActivity",
        header: "LAST ACTIVITY",
    },

    {
        id: "actions",
        header: "ACTIONS",
        cell: ({ }) => (
            <div className="flex gap-2 items-center">
                <Button variant="outline" size="sm" className="bg-zinc-900 border border-zinc-800">
                    <RefreshCw /> Rotate IP
                </Button>
                <Button variant="outline" size="sm" className="bg-zinc-900 border border-zinc-800">
                    <Settings />
                </Button>
            </div>
        ),
    }
]
