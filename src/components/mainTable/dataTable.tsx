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
import { Input } from "@/components/ui/input"
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
import { ChevronDown, ChevronLeft, ChevronRight, RefreshCw, RotateCcw } from 'lucide-react';
import CustomRadioButton from "./cutomRadioButton";
import Assets from "../../../public/assets/assets"


interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData extends { status: string }, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    // Move useState hooks inside the function component
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})
    const [filterStatus, setFilterStatus] = React.useState<'All' | 'Online' | 'Offline'>('All')

    const filteredData = React.useMemo(() => {
        if (filterStatus === 'All') return data
        return data.filter((item) => item.status === filterStatus)
    }, [filterStatus, data])

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
        { id: "online", label: "Online", value: "Online" },
        { id: "offline", label: "Offline", value: "Offline" },
    ];

    return (
        <div>
            <div className="flex items-center py-5 justify-between max-w-[1360px]">
                <Input
                    placeholder="Search Phones"
                    value={(table.getColumn("phoneID")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("phoneID")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm border-neutral-800 text-neutral-400"

                />
                <div className="gap-3 flex">
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
                                        <TableHead className="text-neutral-400 Inter font-medium" key={header.id}>
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
                                        <TableCell className="text-neutral-50 Inter font-medium text-sm" key={cell.id}>
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
