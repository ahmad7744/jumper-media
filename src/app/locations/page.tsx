"use client"
import React, { useMemo, useState } from "react";
import InputField from "@/components/inputField/inputField";
import LocationCard from "@/components/locationCard/locationCard";
import DropdownFilter from "@/components/DropdownFilter/DropdownFilter";

const Page = () => {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

  const locations = [
    {
      city: "New York, NY",
      lastActivity: "2 days ago",
      status: "Excellent", devices: 2384,
      uniqueIps: 1620,
      overlappingIps: 774
      , downloadSpeed: "12.1",
      uploadSpeed: "5.1"
    },
    {
      city: "Los Angeles, CA",
      lastActivity: "1 day ago",
      status: "Good",
      devices: 1500,
      uniqueIps: 1200,
      overlappingIps: 300,
      downloadSpeed: "10.5",
      uploadSpeed: "4.2"
    },
    {
      city: "Chicago, IL",
      lastActivity: "3 days ago"
      , status: "Fair", devices: 2000,
      uniqueIps: 1400,
      overlappingIps: 600
      , downloadSpeed: "8.0",
      uploadSpeed: "3.5"
    },
    {
      city: "Miami, FL",
      lastActivity: "5 days ago",
      status: "Need Attention",
      devices: 1800,
      uniqueIps: 1300,
      overlappingIps: 500,
      downloadSpeed: "6.5",
      uploadSpeed: "2.9"
    },
    {
      city: "San Francisco, CA",
      lastActivity: "7 hours ago",
      status: "Excellent",
      devices: 2200,
      uniqueIps: 1600,
      overlappingIps: 600,
      downloadSpeed: "15.2",
      uploadSpeed: "7.3"
    },
    {
      city: "Dallas, TX",
      lastActivity: "2 days ago",
      status: "Good",
      devices: 1900,
      uniqueIps: 1450,
      overlappingIps: 450,
      downloadSpeed: "11.0",
      uploadSpeed: "4.8"
    },
   
  ];

  const statusOptions = [
    { id: "all", label: "All", value: "All" },
    { id: "excellent", label: "Excellent", value: "Excellent" },
    { id: "good", label: "Good", value: "Good" },
    { id: "fair", label: "Fair", value: "Fair" },
    { id: "need_attention", label: "Need Attention", value: "Need Attention" },
  ];

  const locationOptions = locations.map((location) => ({
    id: location.city,
    label: location.city,
    value: location.city,
  }));

  const filteredLocations = useMemo(() => {
    let result = locations.filter((location) => {
      const matchesSearch =
        location.city.toLowerCase().includes(search.toLowerCase()) ||
        location.lastActivity.toLowerCase().includes(search.toLowerCase()) ||
        location.status.toLowerCase().includes(search.toLowerCase()) ||
        location.devices.toString().includes(search) ||
        location.uniqueIps.toString().includes(search) ||
        location.overlappingIps.toString().includes(search) ||
        location.downloadSpeed.toString().includes(search) ||
        location.uploadSpeed.toString().includes(search);

      const matchesStatus = filterStatus === "All" || location.status === filterStatus;

      return matchesSearch && matchesStatus;
    });

    if (selectedLocations.length > 0) {
      result = result.filter((location) => selectedLocations.includes(location.city));
    }

    return result;
  }, [locations, search, filterStatus, selectedLocations]);

  return (
    <div className="w-full p-10 h-screen mx-auto">
      <div className="w-full max-w-[1160px] mx-auto">
        <h1 className="text-neutral-50 Inter font-bold text-3xl">Locations</h1>
        <div className="flex items-center py-5 justify-between max-w-[1160px]">
          <InputField id="search" placeholder="Search Locations" size="small" icon value={search} onChange={(e) => setSearch(e.target.value)} />
          <div className="gap-3 flex">
            <DropdownFilter
              title="Sort by"
              options={locationOptions}
              selectedValue={selectedLocations}
              onChange={(value) => setSelectedLocations(Array.isArray(value) ? value : [value])}
              isMultiSelect

            />
            <DropdownFilter
              title="Status"
              options={statusOptions}
              selectedValue={filterStatus}
              onChange={(value) => setFilterStatus(Array.isArray(value) ? value[0] : value)}
              align="end"
            />
          </div>
        </div>
      </div>
      <div className="mx-auto w-full max-w-[1160px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 py-10">
        {filteredLocations.length > 0 ?
          filteredLocations.map((location, index) =>
            <LocationCard key={index} {...location} />)
          :
          <p className="text-neutral-50 Inter font-medium text-xl">No data found</p>
        }
      </div>
    </div>
  );
};

export default Page;
