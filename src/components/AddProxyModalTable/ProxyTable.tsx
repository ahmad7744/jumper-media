"use client";

import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getColumns } from "./columns";
import { RotateCcw, Plus } from "lucide-react";

export type Proxy = {
  id: string;
  type: string;
  ip: string;
  port: string;
  login: string;
  password: string;
};

interface AddedProxysTableProps {
  data: Proxy[];
  onAddProxy: () => void; 
}

export function AddedProxysTable({ data, onAddProxy }: AddedProxysTableProps) {
  const columns = getColumns();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div>
      <div className="flex justify-between items-center">
        <p className="text-zinc-200 mb-2 Inter text-md">Added Proxys</p>
        <div className="flex items-center py-4 gap-2">
          <Button
            variant="default"
            className="bg-transparent border Inter font-medium border-none hover:bg-white hover:text-zinc-900"
            size="sm"
          >
            <RotateCcw /> Reset All Passwords
          </Button>
          <Button
            variant="outline"
            className="border border-none bg-blue-700 border-neutral-800 text-zinc-300 Inter hover:text-zinc-900 hover:bg-white"
            size="sm"
            onClick={onAddProxy} 
          >
            <Plus /> New Proxy
          </Button>
        </div>
      </div>
      <div className="custom-scrollbar rounded-lg border bg-zinc-800 border-[#323238] overflow-y-auto max-h-[300px]">
        <Table>
          <TableHeader className="border-neutral-950 border">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow className="border-neutral-800 border" key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    className="text-zinc-500 text-[10px] Inter font-medium"
                    key={header.id}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="border border-none">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-zinc-300 Inter font-medium text-xs">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
