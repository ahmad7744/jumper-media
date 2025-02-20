"use client"; 

import { useEffect, useState } from "react";
import MetricCard from "@/components/Card/Card";
import { columns, Payment } from "@/components/mainTable/columns";
import { DataTable } from "@/components/mainTable/dataTable";
import Assets from "../../../public/assets/assets";
import { getDevices } from "@/api/userServices";
import { Device } from "@/api/types";

const Page = () => {
  const [data, setData] = useState<Payment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const devices: Device[] = await getDevices();
        
        const transformedData: Payment[] = devices.map((device) => ({
          id: String(device.id), 
          phoneID: device.model, 
          status: device.status === "active" ? "Active" : "Offline",
          name: device.name,
          IPAddress: device.ip_address,
          LastActivity: device.updated_at,
          locations: Array.isArray(device.city) ? device.city : [device.city],
        }));
  
        setData(transformedData);
      } catch (err: any) {
        console.error("Error fetching devices:", err.message);
        setError("Failed to fetch devices");
      } finally {
        setLoading(false);
      }
    };
  
    fetchDevices();
  }, []);
  
  return (
    <div className="w-full h-screen flex justify-center items-center ">
      {loading ? (
      
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-opacity-50"></div>
          <p className="text-gray-400 mt-4">Loading devices...</p>
        </div>
      ) : (
        <div className="p-10 w-full max-w-[1440px] mx-auto">
          <h1 className="text-neutral-50 Inter font-bold text-3xl">Dashboard</h1>
          <div className="grid grid-cols-3 gap-6 mt-28 max-w-[1360px]">
            <MetricCard
              valuePercent="+20% from last month"
              title="Total Phones"
              value={data.length.toString()}
              icon={Assets.MobileIcon}
              className="border border-gray-700"
            />
            <MetricCard
              title="Active"
              value={data.filter((device) => device.status === "Active").length.toString()}
              valuePercent="+20% from last month"
              icon={Assets.OnlineIcon}
              className="border border-gray-700"
            />
            <MetricCard
              title="Offline"
              value={data.filter((device) => device.status === "Offline").length.toString()}
              valuePercent="+20% from last month"
              icon={Assets.OfflineIcon}
              className="border border-gray-700"
            />
          </div>

          <p className="text-zinc-200 mt-10 Inter text-xl">All Phones</p>

          {error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <DataTable columns={columns} data={data} />
          )}
        </div>
      )}
    </div>
  );
};

export default Page;
