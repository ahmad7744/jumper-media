"use client";

import { useEffect, useState } from "react";
import { getDevices } from "@/api/userServices";
import { Button } from "@/components/ui/button";
import Assets from "../../../public/assets/assets";
import LocationCard from "@/components/locationCard/locationCard";
import AreaChartComponent from "@/components/ChartComponent/ChartComponent";
import { DataTable } from "@/components/mainTable/dataTable";
import { TableData } from "@/components/mainTable/columns";
import StatusBadge from "@/components/StatusBadge/StatusBadge";
import StatCard from "@/components/StatCard/StatCard";
import LoadingIndicator from "@/components/LoadingIndicator/LoadingIndicator";

const Page = () => {
  const [data, setData] = useState<TableData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [totalDevices, setTotalDevices] = useState<number>(0);
  const [activeDevices, setActiveDevices] = useState<number>(0);
  const [inactiveDevices, setInactiveDevices] = useState<number>(0);

  const devicesPerPage = 4;

  const fetchDevices = async (pageIndex: number) => {
    try {
      setLoading(true);
      const offset = pageIndex * devicesPerPage;
      const response = await getDevices(offset, devicesPerPage);

      const transformedData: TableData[] = response.devices.map((device) => ({
        id: device.id,
        phoneID: device.model,
        status: device.status === "active" ? "Active" : "Offline",
        name: device.name,
        IPAddress: device.ip_address,
        LastActivity: device.updated_at,
        locations: Array.isArray(device.city) ? device.city : [device.city],
      }));

      setData(transformedData);
      setTotalDevices(response.total);
      setActiveDevices(response.active);
      setInactiveDevices(response.inactive);
    } catch (err: any) {
      console.error("Error fetching devices:", err.message);
      setError("Failed to fetch devices");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDevices(pageIndex);
  }, [pageIndex]);

  const handlePageChange = (newPageIndex: number) => {
    setPageIndex(newPageIndex);
  };

  return (
    <div className="Inter py-10 px-4 lg:px-6 xl:px-8 2xl:px-10 w-full  mx-auto">
      <h1 className="text-zinc-400 font-normal text-xs">
        Locations / <span className="text-zinc-200 font-medium">New York, NY</span>
      </h1>

      <div className="items-center  mx-auto mt-7 pb-10">
        <div className="flex items-center gap-3">
          <p className="text-zinc-200 text-[28px] font-semibold">Las Vegas, CA</p>
          <StatusBadge status="Excellent" />
        </div>
        <p className="text-zinc-400 text-xs font-normal mt-[2px]">Last Activity: 2 days ago</p>
      </div>

      {loading ? (
        <LoadingIndicator message="Loading Devices..." />
      ) : (
        <>
          <StatCard
            totalPhones={totalDevices.toString()}
            activePhones={activeDevices.toString()}
            offlinePhones={inactiveDevices.toString()}
            percentageChange="20"
          />

          <div className="flex   md:flex-none justify-between gap-4 mt-4">
            <LocationCard
              city="IP ADDRESS"
              devices={totalDevices}
              uniqueIps={1620}
              overlappingIps={774}
              IP="All IPs"
              size="small"
            />
            <AreaChartComponent />
          </div>

          {error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <DataTable
              data={data}
              pageIndex={pageIndex}
              totalPages={Math.ceil(totalDevices / devicesPerPage)}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Page;
