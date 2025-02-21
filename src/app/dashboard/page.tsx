"use client";

import { getDevices } from "@/api/userServices";
import MetricCard from "@/components/Card/Card";
import { columns, TableHeader } from "@/components/mainTable/columns";
import { DataTable } from "@/components/mainTable/dataTable";
import { useEffect, useState } from "react";
import Assets from "../../../public/assets/assets";

const Page = () => {
  const [data, setData] = useState<TableHeader[]>([]);
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

      const transformedData: TableHeader[] = response.devices.map((device) => ({
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
    <div className="w-full h-screen flex justify-center items-center ">
      {loading ? (

        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-opacity-50"></div>
          <p className="text-gray-400 mt-4">Loading devices...</p>
        </div>
      ) : (
        <div className="p-10 w-full h-full max-w-[1160px] mx-auto">
          <h1 className="text-neutral-50 Inter font-bold text-3xl">Dashboard</h1>
          <div className="grid grid-cols-3 gap-6 mt-4 max-w-[1160px] mx-auto">
            <MetricCard
              valuePercent="+20% from last month"
              title="Total Phones"
              value={totalDevices.toString()}
              icon={Assets.MobileIcon}
              className="border border-gray-700"
            />
            <MetricCard
              title="Active Phones"
              value={activeDevices.toString()}
              valuePercent="+20% from last month"
              icon={Assets.OnlineIcon}
              className="border border-gray-700"
            />
            <MetricCard
              title="Offline Phones"
              value={inactiveDevices.toString()}
              valuePercent="+20% from last month"
              icon={Assets.OfflineIcon}
              className="border border-gray-700"
            />
          </div>

          <p className="text-zinc-200 mt-10 Inter text-xl">All Phones</p>

          {error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <DataTable
              columns={columns}
              data={data}
              pageIndex={pageIndex}
              totalPages={Math.ceil(totalDevices / devicesPerPage)}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Page;
