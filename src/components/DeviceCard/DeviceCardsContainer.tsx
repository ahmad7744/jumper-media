import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import DeviceCard from "./DeviceCard";

interface DeviceCardsContainerProps {
  rowSelection: Record<string, boolean>;
  setRowSelection: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
  data: {
    id: string;
    phoneID: string;
    status: string;
    name: string;
    IPAddress: string;
    LastActivity: string;
    locations: string[];
  }[];
}

const DeviceCardsContainer: React.FC<DeviceCardsContainerProps> = ({
  data,
  rowSelection,
  setRowSelection,
}) => {
    const toggleSelection = (id: string) => {
        setRowSelection((prev) => ({
          ...prev,
          [id]: !prev[id],
        }));
      };
      

      const toggleSelectAll = () => {
        const allSelected = Object.keys(rowSelection).length === data.length;
        setRowSelection(
          allSelected
            ? {}
            : Object.fromEntries(data.map((d) => [d.id, true])) 
        );
      };
      

  return (
    <div className="flex flex-col gap-4 mb-4">
      <div className="flex items-center gap-2 justify-end px-3">
        <Checkbox
          className="w-4 h-4 border border-neutral-500"
          checked={
            Object.keys(rowSelection).length === data.length && data.length > 0
          }
          onCheckedChange={toggleSelectAll}
        />
        <span className="text-sm text-neutral-200">Select All</span>
      </div>

      <div className="flex flex-wrap gap-4">
        {data.map((device) => (
          <DeviceCard
            key={device.id}
            device={device}
            isSelected={!!rowSelection[device.id]}
            toggleSelection={toggleSelection}
          />
        ))}
      </div>

      <div className="text-neutral-200 text-sm">
        {Object.keys(rowSelection).length} device
        {Object.keys(rowSelection).length !== 1 ? "s" : ""} selected
      </div>
    </div>
  );
};

export default DeviceCardsContainer;
