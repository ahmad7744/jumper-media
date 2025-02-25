"use client";

import { useEffect, useState } from "react";
import { getDevices } from "@/api/userServices";
import AreaChartComponent from "@/components/ChartComponent/ChartComponent";
import LocationCard from "@/components/locationCard/locationCard";
import { TableData } from "@/components/mainTable/columns";
import { DataTable } from "@/components/mainTable/dataTable";
import StatCard from "@/components/StatCard/StatCard";
import { Button } from "@/components/ui/button";
import Assets from "../../../public/assets/assets";
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
    <div className="Inter py-10 px-4 lg:px-6 xl:px-8 2xl:px-10 w-full mx-auto">
      <h1 className="text-zinc-400 font-normal text-xs">
        Groups / <span className="text-zinc-200 font-medium">High Speed</span>
      </h1>

      <div className="flex items-center justify-between mx-auto mt-7 pb-10">
        <div className="flex items-center gap-3">
          <p className="text-zinc-200 text-[28px] font-semibold">High Speed</p>
          <div className="bg-zinc-800 px-4 py-[6px] rounded-full items-center">
            <p className="text-xs text-zinc-300 font-semibold">#Priority</p>
          </div>
        </div>
        <Button
          variant="outline"
          className="bg-transparent border Inter font-medium border-neutral-800 text-zinc-300"
          size="sm"
        >
          <div dangerouslySetInnerHTML={{ __html: Assets.EditIcon }} /> Edit Group
        </Button>
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

          <div className="flex justify-between gap-4 mt-4">
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
