import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

export type Phone = {
  id: string;
  name: string;
  status: string;
  ip: string;
  location: string;
};

export const getColumns = (
  selectedPhones: string[],
  togglePhoneSelection: (id: string) => void
): ColumnDef<Phone, any>[] => [
  {
    accessorKey: "id",
    header: "PHONE ID",
  },
  {
    accessorKey: "name",
    header: "NAME",
  },
  {
    accessorKey: "status",
    header: "STATUS",
    cell: ({ row }: { row: any }) => {
      const status = row.getValue("status") as "Online" | "Offline";
      return (
        <div className="flex items-center">
          <div
            className={`w-2 h-2 rounded-full mr-2 ${
              status === "Online" ? "bg-green-500" : "bg-red-500"
            }`}
          />
          <span>{status}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "ip",
    header: "IP ADDRESS",
  },
  {
    accessorKey: "location",
    header: "LOCATION",
  },
  {
    id: "actions",
    header: "ACTIONS",
    cell: ({ row }: { row: any }) => {
      const isAdded = selectedPhones.includes(row.original.id);
      return (
        <Button
          size="sm"
          className={`w-[70px] h-8 rounded-lg border text-xs border-zinc-700 transition-all ease-in-out ${
            isAdded
              ? "bg-blue-600 border-blue-500 hover:bg-blue-700"
              : "bg-zinc-800"
          } text-white`}
          onClick={() => togglePhoneSelection(row.original.id)}
        >
          {isAdded ? "Added" : "Add"}
        </Button>
      );
    },
  },
];
