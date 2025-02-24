"use client";
import React, { useMemo, useState, useEffect } from "react";
import InputField from "@/components/inputField/inputField";
import LocationCard from "@/components/locationCard/locationCard";
import DropdownFilter from "@/components/DropdownFilter/DropdownFilter";
import { useRouter } from "next/navigation";
import { getLocationStats } from "@/api/userServices";
import { LocationStats } from "@/api/types";
import LoadingIndicator from "@/components/LoadingIndicator/LoadingIndicator";

interface ExtendedLocationStats extends LocationStats {
  status: string;
}

const Page = () => {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [locations, setLocations] = useState<ExtendedLocationStats[]>([]);
  const [loading, setLoading] = useState(true);

  const determineStatus = (uniqueIps: number, overlappingIps: number): string => {
    if (overlappingIps > uniqueIps) return "Needs Attention";
    if (uniqueIps > 3) return "Excellent";
    if (uniqueIps > 1) return "Good";
    return "Fair";
  };

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await getLocationStats();
        console.log("Fetched Locations:", response);

        if (Array.isArray(response)) {
          const processedLocations = response.map((location) => ({
            ...location,
            city: location.state || "Unknown",
            status: determineStatus(location.unique_ips, location.overlapping_ips),
            devices: location.total_devices,
            uniqueIps: location.unique_ips,
            overlappingIps: location.overlapping_ips,
            downloadSpeed: location.cumulative_download_speed || "0",
            uploadSpeed: location.cumulative_upload_speed || "0",
            lastActivity: location.last_ip_rotation || "N/A",
          }));

          setLocations(processedLocations);
        } else {
          setLocations([]);
        }
      } catch (error) {
        console.error("Error fetching location stats:", error);
        setLocations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);



  const statusOptions = [
    { id: "all", label: "All", value: "All" },
    { id: "excellent", label: "Excellent", value: "Excellent" },
    { id: "good", label: "Good", value: "Good" },
    { id: "fair", label: "Fair", value: "Fair" },
    { id: "need_attention", label: "Need Attention", value: "Need Attention" },
  ];

  const locationOptions = locations.map(location => ({
    id: location.state,
    label: location.state,
    value: location.state,
  }));

  const filteredLocations = useMemo(() => {
    let result = locations.filter(location => {
      const matchesSearch =
        location.state.toLowerCase().includes(search.toLowerCase()) ||
        location.total_devices.toString().includes(search) ||
        location.unique_ips.toString().includes(search) ||
        location.overlapping_ips.toString().includes(search) ||
        location.cumulative_download_speed.toString().includes(search) ||
        location.cumulative_upload_speed.toString().includes(search);

      const matchesStatus = filterStatus === "All" || location.status === filterStatus;

      return matchesSearch && matchesStatus;
    });

    if (selectedLocations.length > 0) {
      result = result.filter(location => selectedLocations.includes(location.state));
    }

    return result;
  }, [locations, search, filterStatus, selectedLocations]);

  const router = useRouter();

  const handleLocation = () => {
    router.push('/locationOpened');
  };

  return (
    <div className="w-full p-10 min-h-screen mx-auto flex flex-col">
      {loading ? (
        <LoadingIndicator message="Loading Locations..." />

      ) : (
        <>
          <div className="w-full max-w-[1160px] mx-auto">
            <h1 className="text-neutral-50 Inter font-bold text-3xl">Locations</h1>
            <div className="flex items-center py-5 justify-between max-w-[1160px]">
              <InputField
                id="search"
                placeholder="Search Locations"
                size="small"
                icon
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="gap-3 flex">
                <DropdownFilter
                  title="Sort by"
                  options={locationOptions}
                  selectedValue={selectedLocations}
                  onChange={(value) =>
                    setSelectedLocations(Array.isArray(value) ? value : [value])
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
              </div>
            </div>
          </div>

          <div className="mx-auto w-full max-w-[1160px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 py-10">
            {filteredLocations.length > 0 ? (
              filteredLocations.map((location, index) => (
                <LocationCard onPress={handleLocation} IP="Devices" key={index} {...location} />
              ))
            ) : (
              <p className="text-neutral-50 Inter font-medium text-xl">No data found</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Page;
