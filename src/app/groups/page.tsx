"use client";
import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import LocationCard from "@/components/locationCard/locationCard";
import InputField from "@/components/inputField/inputField";
import DropdownFilter from "@/components/DropdownFilter/DropdownFilter";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckboxIndicator } from "@radix-ui/react-checkbox";
import CustomRadioButton from "@/components/mainTable/cutomRadioButton";
import GroupCard from "@/components/GroupCard/GroupCard";
import Assets from "../../../public/assets/assets";

const GroupPage = () => {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const Groups = [
    {
      title: "High Speed",
      priorityLabel: "Priority",
      totalDevices: 2360,
      activeDevices: 1620,
      inactiveDevices: 774,
      downloadSpeed: "12.1",
      uploadSpeed: "5.1",
    },
    {
      title: "Need Attention",
      priorityLabel: "Priority",
      totalDevices: 1000,
      activeDevices: 1620,
      inactiveDevices: 774,
      downloadSpeed: "12.1",
      uploadSpeed: "5.1",
    },
    {
      title: "Need Attention",
      priorityLabel: "Priority",
      totalDevices: 2360,
      activeDevices: 1800,
      inactiveDevices: 1500,
      downloadSpeed: "12.1",
      uploadSpeed: "5.1",
    },
    {
      title: "General",
      priorityLabel: "Danger",
      totalDevices: 2360,
      activeDevices: 1620,
      inactiveDevices: 774,
      downloadSpeed: "12.1",
      uploadSpeed: "5.1",
    },
    {
      title: "General",
      priorityLabel: "Low Speed",
      totalDevices: 2360,
      activeDevices: 1620,
      inactiveDevices: 774,
      downloadSpeed: "12.1",
      uploadSpeed: "5.1",
    },

  ];

  const statusOptions = [
    { id: "all", label: "All", value: "All" },
    { id: "Priority", label: "Priority", value: "Priority" },
    { id: "Danger", label: "Danger", value: "Danger" },
    { id: "need_attention", label: "Need Attention", value: "Need Attention" },
    { id: "low_speed", label: "Low Speed", value: "Low Speed" },
  ];

  const NameOptions = Array.from(new Set(Groups.map(group => group.title)))
    .map((title) => ({
      id: title,
      label: title,
      value: title,
    }));


  const filteredGroups = useMemo(() => {
    let result = Groups.filter((group) => {
      const matchesSearch =
        group.title.toLowerCase().includes(search.toLowerCase()) ||
        group.totalDevices.toString().includes(search) ||
        group.activeDevices.toString().includes(search) ||
        group.inactiveDevices.toString().includes(search) ||
        group.downloadSpeed.toString().includes(search) ||
        group.uploadSpeed.toString().includes(search);

      const matchesStatus = filterStatus === "All" || group.priorityLabel === filterStatus;

      return matchesSearch && matchesStatus;
    });

    if (selectedGroups.length > 0) {
      result = result.filter((group) => selectedGroups.includes(group.title));
    }

    return result;
  }, [Groups, search, filterStatus, selectedGroups]);

  return (
    <div className="w-full p-10 h-screen mx-auto">
      <div className="w-full max-w-[1160px] mx-auto">
        <h1 className="text-neutral-50 Inter font-bold text-3xl">Groups</h1>
        <div className="flex items-center py-5 justify-between max-w-[1160px]">
          <InputField
            id="search"
            placeholder="Search Groups"
            icon={true}
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="gap-3 flex">
            {/* Filter for Group Status */}
            <DropdownFilter
              title="Sort by"
              options={NameOptions}
              selectedValue={selectedGroups}
              onChange={(value) =>
                setSelectedGroups(Array.isArray(value) ? value : [value])
              }
              isMultiSelect
            />
            <DropdownFilter
              title="Status"
              options={statusOptions}
              selectedValue={filterStatus}
              onChange={(value) => setFilterStatus(Array.isArray(value) ? value[0] : value)}
              align="end"
            />

            <Button
              variant="outline"
              className="border border-none 
                      bg-blue-700  text-zinc-300 Inter font-medium"
              size="sm"
            >
              <div
                dangerouslySetInnerHTML={{ __html: Assets.AddIcon }}
              />
              New Group
            </Button>

          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1160px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 py-10">
        {filteredGroups.length > 0 ? (
          filteredGroups.map((group, index) => <GroupCard key={index} {...group} />)
        ) : (
          <p className="text-neutral-50 Inter font-medium text-xl">No data found</p>
        )}
      </div>
    </div>
  );
};

export default GroupPage;
