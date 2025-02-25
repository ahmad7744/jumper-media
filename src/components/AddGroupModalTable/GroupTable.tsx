"use client";

import React, { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import InputField from "../inputField/inputField";
import { ChevronDown } from "lucide-react";
import CustomRadioButton from "../mainTable/cutomRadioButton";
import { getColumns } from "./columns";
import { Phone } from "./columns";

interface GroupsTableProps {
  title?: string;
  data: Phone[];
}

export function GroupsTable({ title, data }: GroupsTableProps) {
  const [selectedPhones, setSelectedPhones] = useState<string[]>([]);
  const [filterStatus, setFilterStatus] = useState<
    "All" | "Online" | "Offline"
  >("All");
  const [nameFilter, setNameFilter] = useState<string>("id");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const togglePhoneSelection = (id: string) => {
    setSelectedPhones((prev) =>
      prev.includes(id)
        ? prev.filter((phoneId) => phoneId !== id)
        : [...prev, id]
    );
  };

  const filteredData = useMemo(() => {
    return data
      .filter(
        (phone) => filterStatus === "All" || phone.status === filterStatus
      )
      .filter((phone) =>
        phone.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
  }, [filterStatus, searchQuery, data]);

  const sortOptions = [
    { id: "id", label: "ID", value: "id" },
    { id: "name", label: "Name", value: "name" },
    { id: "status", label: "Status", value: "status" },
    { id: "ip", label: "IP Address", value: "ip" },
    { id: "location", label: "Location", value: "location" },
  ];

  const columns = useMemo(
    () => getColumns(selectedPhones, togglePhoneSelection),
    [selectedPhones]
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div>
      <p className="text-zinc-200 mt-6 Inter text-md">Add Phones</p>
      <div className="flex items-center justify-between py-4">
        <InputField
          id="search"
          placeholder="Search Locations"
          icon={true}
          backgroundColor="light"
          size="small"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />

        <div className="flex gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="ml-auto bg-transparent border Inter font-medium bg-zinc-800 border-neutral-800 text-zinc-300"
                size={"sm"}
              >
                Sort By: {nameFilter} <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="bg-[#0A0A0A] border border-neutral-800 mt-3 rounded-md shadow-lg w-[198px] p-1"
              align="start"
            >
              <CustomRadioButton
                options={sortOptions}
                selectedValue={nameFilter}
                onChange={setNameFilter}
              />
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="ml-auto bg-transparent border Inter font-medium bg-zinc-800 border-neutral-800 text-zinc-300"
                size={"sm"}
              >
                Status: {filterStatus} <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="bg-[#0A0A0A] border border-neutral-800 mt-3 rounded-md shadow-lg w-[198px] p-1"
              align="end"
            >
              <CustomRadioButton
                options={[
                  { id: "all", label: "All", value: "All" },
                  { id: "online", label: "Online", value: "Online" },
                  { id: "offline", label: "Offline", value: "Offline" },
                ]}
                selectedValue={filterStatus}
                onChange={setFilterStatus}
              />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="custom-scrollbar rounded-lg border bg-zinc-800 border-[#323238] overflow-y-auto max-h-[calc(100vh-400px)] ">
        <Table>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="border border-none">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="text-neutral-50 Inter font-medium text-[10px]"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between items-center py-4">
        <span className="text-sm text-neutral-400">
          {selectedPhones.length} Phones Added
        </span>
      </div>
    </div>
  );
}
