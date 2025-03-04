"use client";
import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import InputField from "@/components/inputField/inputField";
import DropdownFilter from "@/components/DropdownFilter/DropdownFilter";
import GroupCard from "@/components/GroupCard/GroupCard";
import Assets from "../../../public/assets/assets";
import { useRouter } from "next/navigation";
import Modal from "@/components/ModalComponent/ModalComponent";
import TagSelector from "@/components/TagSelector/TagSelector";
import { GroupsTable } from "@/components/AddGroupModalTable/GroupTable";
const GroupPage = () => {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>("Low Speed");

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

  const NameOptions = Array.from(
    new Set(Groups.map((group) => group.title))
  ).map((title) => ({
    id: title,
    label: title,
    value: title,
  }));

  const samplePhones = [
    {
      id: "PHN001",
      name: "GALAXY A14",
      model: "Galaxy A14",
      status: "Online",
      ip: "192.168.1.101",
      location: "San Diego, CA",
    },
    {
      id: "PHN002",
      name: "GALAXY A14",
      model: "iPhone 12",
      status: "Offline",
      ip: "192.168.1.102",
      location: "New York, NY",
    },
    {
      id: "PHN003",
      name: "GALAXY A14",
      model: "Pixel 6",
      status: "Online",
      ip: "192.168.1.103",
      location: "Los Angeles, CA",
    },
    {
      id: "PHN004",
      name: "GALAXY A14",
      model: "Pixel 6",
      status: "Online",
      ip: "192.168.1.103",
      location: "Los Angeles, CA",
    },
    {
      id: "PHN005",
      name: "GALAXY A14",
      model: "Pixel 6",
      status: "Online",
      ip: "192.168.1.103",
      location: "Los Angeles, CA",
    },
    {
      id: "PHN006",
      name: "GALAXY A14",
      model: "Pixel 6",
      status: "Online",
      ip: "192.168.1.103",
      location: "Los Angeles, CA",
    },
  ];

  const filteredGroups = useMemo(() => {
    let result = Groups.filter((group) => {
      const matchesSearch =
        group.title.toLowerCase().includes(search.toLowerCase()) ||
        group.totalDevices.toString().includes(search) ||
        group.activeDevices.toString().includes(search) ||
        group.inactiveDevices.toString().includes(search) ||
        group.downloadSpeed.toString().includes(search) ||
        group.uploadSpeed.toString().includes(search);

      const matchesStatus =
        filterStatus === "All" || group.priorityLabel === filterStatus;

      return matchesSearch && matchesStatus;
    });

    if (selectedGroups.length > 0) {
      result = result.filter((group) => selectedGroups.includes(group.title));
    }

    return result;
  }, [Groups, search, filterStatus, selectedGroups]);
  const router = useRouter();
  const handleGroupClick = () => {
    router.push(`/groupOpened`);
  };

  return (
    <div className="w-full py-10 px-4 lg:px-6 xl:px-8 2xl:px-10 h-screen mx-auto">
      <div className="w-full mx-auto">
        <h1 className="text-neutral-50 Inter font-bold text-3xl">Groups</h1>
        <div className="flex flex-col md:flex-row lg:items-center py-5 justify-between gap-2  ">
          <InputField
            id="search"
            placeholder="Search Groups"
            icon={true}
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="gap-3 flex flex-wrap ">
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
              onChange={(value) =>
                setFilterStatus(Array.isArray(value) ? value[0] : value)
              }
              align="end"
            />

            <Button
              variant="outline"
              className="border border-none 
                      bg-blue-700  text-zinc-300 Inter font-medium"
              size="sm"
              onClick={() => setShowModal(true)}
            >
              <div dangerouslySetInnerHTML={{ __html: Assets.AddIcon }} />
              New Group
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full  flex flex-wrap gap-4 py-10">
        {filteredGroups.length > 0 ? (
          filteredGroups.map((group, index) => (
            <GroupCard onPress={handleGroupClick} key={index} {...group} />
          ))
        ) : (
          <p className="text-neutral-50 Inter font-medium text-xl">
            No data found
          </p>
        )}
      </div>
      {showModal && (
        <Modal title="Create Group" onClose={() => setShowModal(false)}>
          <div>
            <InputField
              id="search"
              placeholder="Type name here..."
              icon={false}
              size="large"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              title="Group Name"
            />
          </div>
          <div className="mt-4">
            <TagSelector
              title={"Select Tag"}
              selectedTag={selectedTag}
              onSelect={setSelectedTag}
            />
          </div>
          <div>
            <GroupsTable data={samplePhones} title="Add Phones" />
          </div>
          <div className="flex">
            <Button
              className="bg-blue-600 text-white w-full"
              onClick={() => setShowModal(false)}
            >
              Create Group
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default GroupPage;
