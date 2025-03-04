  "use client";

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
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
  import React, { Dispatch, SetStateAction, useState } from "react";
  import {
    Check,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    CopyCheck,
    Plus,
    RotateCcw,
  } from "lucide-react";
  import CustomRadioButton from "./cutomRadioButton";
  import Assets from "../../../public/assets/assets";
  import { Checkbox, CheckboxIndicator } from "@radix-ui/react-checkbox";
  import InputField from "../inputField/inputField";
  import DeviceSettingsModal from "../DeviceSettingModal/DeviceSettingsModal";
  import { getColumns, TableData } from "./columns";
  import DeviceCard from "../DeviceCard/DeviceCard";
  import DeviceCardsContainer from "../DeviceCard/DeviceCardsContainer";
  import { useIsTablet } from "@/hooks/use-tablet";
  import Image from "next/image";
  import Modal from "../ModalComponent/ModalComponent";
  import AddDeviceModal from "../AddDeviceModal/AddDeviceModal";

  interface DataTableProps {
    data: TableData[];
    pageIndex: number;
    totalPages: number;
    onPageChange: (newPageIndex: number) => void;
    showAddDevice?: boolean;

  }

  export function DataTable<
    TData extends { status: string; locations: string[] },
    TValue
  >({ data, pageIndex, totalPages, onPageChange, showAddDevice }: DataTableProps) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
      []
    );
    const [columnVisibility, setColumnVisibility] =
      React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState<
      Record<string, boolean>
    >({});
    const [filterStatus, setFilterStatus] = React.useState<
      "All" | "Active" | "Offline"
    >("All");
    const [selectedLocations, setSelectedLocations] = React.useState<string[]>(
      []
    );
    const [showTable, setShowTable] = useState(true);
    const [showDeviceSettingsModal, setShowDeviceSettingsModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState<TableData | null>(null);
    const [showAddDeviceModal, setShowAddDeviceModal] = useState<boolean>(false);
    const [deviceKey] = useState<string>("kjsfhdsjehfgieuorjoi10924380130");
    const isTablet = useIsTablet();

    

    React.useEffect(() => {
      if (!isTablet) {
        setShowTable(true);
      }
    }, [isTablet]);

    const toggleDeviceSettingsModal = (row?: TableData) => {
      setSelectedRow(row || null);
      setShowDeviceSettingsModal((prev) => !prev);
    };

    const toggleAddDeviceModal = () => {
      setShowAddDeviceModal((prev) => !prev);
    };
    
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

    const columns = getColumns(toggleDeviceSettingsModal);

    const table = useReactTable({
      data: filteredData,
      columns,
      getRowId: (row) => row.id,
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
      manualPagination: true,
      pageCount: totalPages,
      initialState: {
        pagination: {
          pageIndex,
          pageSize: 4,
        },
      },
      onPaginationChange: (updater) => {
        const newPageIndex =
          typeof updater === "function"
            ? updater({ pageIndex, pageSize: 3 }).pageIndex
            : updater.pageIndex;
        onPageChange(newPageIndex);
      },
    });

    const options = [
      { id: "all", label: "All", value: "All" },
      { id: "online", label: "Active", value: "Active" },
      { id: "offline", label: "Offline", value: "Offline" },
    ];

    const proxyData = [
      {
        id: "1",
        type: "http",
        ip: "192.168.1.101",
        port: "17292",
        login: "smokysnow172651",
        password: "CmAM1VoJraXf",
      },
      {
        id: "2",
        type: "http",
        ip: "192.168.1.102",
        port: "17293",
        login: "shadowuser123",
        password: "XyZpQr123Abc",
      },
      {
        id: "3",
        type: "https",
        ip: "192.168.1.103",
        port: "17294",
        login: "proxyadmin",
        password: "SecurePass987",
      },
    ];

    return (
      <div>
        <div className="flex flex-col-reverse md:flex-row xl:flex-row flex-wrap gap-4 py-5  justify-between">
          <div className="flex flex-col-reverse md:flex-row gap-3 flex-1">
            <InputField
              id="search"
              placeholder="Search Phones"
              icon={true}
              backgroundColor="dark"
              size={isTablet ? "large" : "small"}
              value={
                (table.getColumn("phoneID")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("phoneID")?.setFilterValue(event.target.value)
              }
            />
            <div className="flex flex-row gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className=" bg-zinc-900 border Inter  border-zinc-800 text-zinc-300 rounded-lg"
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
                      className={`flex items-center space-x-2 p-2 ${
                        isSelected ? "bg-zinc-800 rounded-[2px]" : ""
                      }`}
                    >
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedLocations((prev) => [...prev, location]);
                          } else {
                            setSelectedLocations((prev) =>
                              prev.filter((loc) => loc !== location)
                            );
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
                <Button
                  variant="outline"
                  className=" bg-zinc-900 border Inter  border-zinc-800 text-zinc-300  rounded-lg" 
                  size={"sm"}
                >
                  Status: {filterStatus} <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="bg-[#0A0A0A] border border-neutral-800 mt-3 rounded-md shadow-lg w-[198px] p-1"
                align="start"
              >
                <CustomRadioButton
                  options={options}
                  selectedValue={filterStatus}
                  onChange={setFilterStatus}
                />
              </DropdownMenuContent>
            </DropdownMenu>
            </div>
          </div>
          <div className="flex flex-col  md:flex-row gap-2 ">
            <div className="flex flex-row flex-wrap gap-2">
            <Button
              variant="outline"
              className="bg-zinc-900 border Inter font-medium border-zinc-800 text-xs text-zinc-300 rounded-lg"
              size="sm"
            >
              <RotateCcw /> Refresh
            </Button>
            {showAddDevice && (
              <Button
              variant="outline"
              className="bg-zinc-900 border Inter font-medium border-zinc-800 text-xs text-zinc-300 rounded-lg"
              size="sm"
              onClick={toggleAddDeviceModal}
            >
              <Plus /> Add Device
            </Button>
            )}
            
            <Button
              variant="outline"
              className={`border border-none text-xs ${
                Object.keys(rowSelection).length > 0
                  ? "bg-[#3F621280] text-lime-400 Inter "
                  : "bg-blue-600 border border-blue-500 text-zinc-300 Inter "
              } hover:text-zinc-900 hover:bg-white rounded-lg`}
              size="sm"
            >
              <div dangerouslySetInnerHTML={{ __html: Assets.BulkRotate }} />
              Bulk Rotate IP
            </Button>
            <div className="lg:hidden flex items-center gap-2">
              <Checkbox
                checked={!showTable}
                onCheckedChange={() => setShowTable((prev) => !prev)}
                id={"showTable"}
                className="border border-zinc-500 w-4 h-4 rounded-sm data-[state=checked]:bg-zinc-300 data-[state=checked]:border-zinc-300"
              >
                <CheckboxIndicator className="text-zinc-950">
                  <Check className="w-4 h-4" />
                </CheckboxIndicator>
              </Checkbox>
              <label
                className="text-sm text-neutral-200 cursor-pointer select-none"
                htmlFor="showTable"
              >
                Show Cards
              </label>
            </div>
            </div>
          </div>
        </div>
        {showTable ? (
          <>
            <div className="rounded-md border border-neutral-800">
              <Table>
                <TableHeader className="border-neutral-950 border">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow
                      className="border-neutral-800 border"
                      key={headerGroup.id}
                    >
                      {headerGroup.headers.map((header) => {
                        return (
                          <TableHead
                            className="text-neutral-400 text-[10px] Inter font-medium"
                            key={header.id}
                          >
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                          </TableHead>
                        );
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
                        data-state={rowSelection[row.id] && "selected"}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell
                            className="text-neutral-50 Inter font-medium text-[10px]"
                            key={cell.id}
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
            <div className="flex items-center justify-between pb-10 mt-6 ">
              <div className="flex text-sm text-muted-foreground Inter text-neutral-400 font-medium">
                {table.getFilteredSelectedRowModel().rows.length} of{" "}
                {table.getFilteredRowModel().rows.length} row(s) selected.
              </div>
              <div className="flex flex-wrap gap-2 items-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onPageChange(pageIndex - 1)}
                  disabled={pageIndex === 0}
                  className="bg-transparent text-neutral-400 font-medium border-neutral-800 border-[1px] rounded-md px-4 py-[6px]"
                >
                  <ChevronLeft />
                </Button>

                {Array.from({ length: totalPages }, (_, index) => (
                  <Button
                    variant="outline"
                    size="sm"
                    key={index}
                    onClick={() => onPageChange(index)}
                    className={`rounded-md px-4 py-[6px] font-medium text-sm ${
                      pageIndex === index
                        ? "gradient border hover:text-zinc-300 border-[#1F1F21] text-zinc-300"
                        : "bg-transparent border border-[#1F1F21] text-neutral-400"
                    }`}
                  >
                    {index + 1}
                  </Button>
                ))}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onPageChange(pageIndex + 1)}
                  disabled={pageIndex === totalPages - 1}
                  className="bg-transparent text-neutral-400 font-medium border-neutral-800 border-[1px] rounded-md px-4 py-[6px]"
                >
                  <ChevronRight />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-wrap gap-4">
            <DeviceCardsContainer
              data={filteredData}
              rowSelection={rowSelection}
              setRowSelection={setRowSelection}
            />
          </div>
        )}

        {showDeviceSettingsModal && selectedRow && (
          <DeviceSettingsModal
            onClose={() => toggleDeviceSettingsModal?.()}
            proxyData={proxyData}
          />
        )}
        {showAddDeviceModal && (
          <AddDeviceModal onClose={toggleAddDeviceModal} deviceKey={deviceKey} />
        )}
      </div>
    );
  }
