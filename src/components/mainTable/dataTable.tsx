"use client"

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    ColumnFiltersState,
    getFilteredRowModel,
    SortingState,
    getSortedRowModel,
    VisibilityState,
} from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import React from "react"
import { Check, ChevronDown, ChevronLeft, ChevronRight, RefreshCw, RotateCcw } from 'lucide-react';
import CustomRadioButton from "./cutomRadioButton";
import Assets from "../../../public/assets/assets"
import { Checkbox, CheckboxIndicator } from "@radix-ui/react-checkbox"
import InputField from "../inputField/inputField"


interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData extends { status: string, locations: string[] }, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
 
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})
    const [filterStatus, setFilterStatus] = React.useState<'All' | 'Active' | 'Offline'>('All')
    const [selectedLocations, setSelectedLocations] = React.useState<string[]>([]);


    const allLocations = React.useMemo(() => {
        const locations = data.flatMap((item) => item.locations);
        return ["All", ...Array.from(new Set(locations))];
    }, [data]);


    const filteredData = React.useMemo(() => {
        let filtered = data;

        if (filterStatus !== "All") {
            filtered = filtered.filter((item) => item.status === filterStatus);
        }

        if (selectedLocations.length > 0 && !selectedLocations.includes("All")) {
            filtered = filtered.filter((item) => {
                const locations = item.locations;
                return locations.some((loc) => selectedLocations.includes(loc));
            });
        }

        return filtered;
    }, [filterStatus, selectedLocations, data]);


    const table = useReactTable({
        data: filteredData,
        columns,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    const options = [
        { id: "all", label: "All", value: "All" },
        { id: "online", label: "Active", value: "Active" },
        { id: "offline", label: "Offline", value: "Offline" },
    ];

    return (
        <div>
            <div className="flex items-center py-5 justify-between max-w-[1360px]">
            
                <InputField
                    id="search"
                    placeholder="Search Phones"
                    icon={true}
                    size="small"
                    value={(table.getColumn("phoneID")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("phoneID")?.setFilterValue(event.target.value)
                    }

                />
                <div className="gap-3 flex">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                className="ml-auto bg-transparent border Inter font-medium border-neutral-800 text-neutral-50"
                                size="sm"
                            >
                                Locations:{" "}
                                {selectedLocations.length === 0
                                    ? "All"
                                    : selectedLocations.length === 1
                                        ? selectedLocations[0]
                                        : `${selectedLocations[0]}, ...`}{" "}
                                <ChevronDown />
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent
                            className="bg-[#0A0A0A] border border-neutral-800 mt-3 rounded-md shadow-lg w-[198px] p-1 absolute z-50"
                            align="start"
                        >
                            {allLocations.map((location) => {
                                const isSelected = selectedLocations.includes(location);
                                return (
                                    <div
                                        key={location}
                                        className={`flex items-center space-x-2 p-2 ${isSelected ? 'bg-zinc-800 rounded-[2px]' : ''}`}
                                    >
                                        <Checkbox
                                            checked={isSelected}
                                            onCheckedChange={(checked) => {
                                                if (checked) {
                                                    setSelectedLocations((prev) => [...prev, location]);
                                                } else {
                                                    setSelectedLocations((prev) => prev.filter((loc) => loc !== location));
                                                }
                                            }}
                                            id={location}
                                            className="border border-zinc-500 w-4 h-4 rounded-sm data-[state=checked]:bg-zinc-300 data-[state=checked]:border-zinc-300"
                                        >
                                            <CheckboxIndicator className="text-zinc-950">
                                                <Check className="w-4 h-4" />
                                            </CheckboxIndicator>
                                        </Checkbox>

                                        <label
                                            htmlFor={location}
                                            className="text-sm text-zinc-200 Inter font-normal leading-none cursor-pointer peer-disabled:opacity-70 ml-2"
                                        >
                                            {location}
                                        </label>
                                    </div>
                                );
                            })}
                        </DropdownMenuContent>
                    </DropdownMenu>


                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="ml-auto bg-transparent border Inter font-medium border-neutral-800 text-neutral-50" size={"sm"}>
                                Status: {filterStatus} <ChevronDown />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-[#0A0A0A] border border-neutral-800 mt-3 rounded-md shadow-lg w-[198px] p-1" align="start">

                            <CustomRadioButton
                                options={options}
                                selectedValue={filterStatus}
                                onChange={setFilterStatus}
                            />

                        </DropdownMenuContent>



                    </DropdownMenu>
                    <Button variant="outline" className="bg-transparent border Inter font-medium border-neutral-800 text-neutral-50" size="sm">
                        <RotateCcw /> Refresh
                    </Button>
                    <Button
                        variant="outline"
                        className={`border border-none ${Object.keys(rowSelection).length > 0
                            ? "bg-[#3F621280] text-lime-400 Inter font-medium"
                            : "bg-blue-700 border border-neutral-800 text-zinc-300 Inter font-medium"
                            } hover:text-zinc-900 hover:bg-white`}
                        size="sm"
                    >
                        <div
                            dangerouslySetInnerHTML={{ __html: Assets.BulkRotate }}
                        />
                        Bulk Rotate IP
                    </Button>


                </div>
            </div>
            <div className="rounded-md border border-neutral-800">
                <Table>
                    <TableHeader className="border-neutral-950 border">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow className="border-neutral-800 border" key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead className="text-neutral-400 text-[10px] Inter font-medium" key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    className={"border border-none"}


                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}

                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell className="text-neutral-50 Inter font-medium text-xs" key={cell.id}>
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
            <div className="flex items-center justify-between mt-6 max-w-[1360px]">
                <div className="flex text-sm text-muted-foreground Inter text-neutral-400 font-medium">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="flex gap-2 items-center">
                    {/* Previous Button */}
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="bg-transparent text-neutral-400 font-medium border-neutral-800 border-[1px] rounded-md px-4 py-[6px]"
                    >
                        <ChevronLeft />
                    </Button>

                    {/* Page Numbers */}
                    {Array.from({ length: table.getPageCount() }, (_, index) => (
                        <Button
                            variant="outline"
                            size="sm"
                            key={index}
                            onClick={() => table.setPageIndex(index)}
                            className={`rounded-md px-4 py-[6px] font-medium text-sm ${table.getState().pagination.pageIndex === index
                                ? " gradient border hover:text-zinc-300 border-[#1F1F21] text-zinc-300"
                                : "bg-transparent border border-[#1F1F21] text-neutral-400"
                                }`}
                        >
                            {index + 1}
                        </Button>
                    ))}

                    {/* Next Button */}
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="bg-transparent text-neutral-400 font-medium border-neutral-800 border-[1px] rounded-md px-4 py-[6px]"
                    >
                        <ChevronRight />
                    </Button>
                </div>



            </div>


        </div>
    )
}
