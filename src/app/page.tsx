"use client";

import { getDevices } from "@/api/userServices";
import MetricCard from "@/components/Card/Card";
import { TableData } from "@/components/mainTable/columns";
import { DataTable } from "@/components/mainTable/dataTable";
import { useEffect, useState } from "react";
import Assets from "../../public/assets/assets";
import LoadingIndicator from "@/components/LoadingIndicator/LoadingIndicator";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ModalComponent/ModalComponent";
import { CopyCheck, CopyIcon, Plus } from "lucide-react";
import Image from "next/image";

const Page = () => {
  const [data, setData] = useState<TableData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [totalDevices, setTotalDevices] = useState<number>(0);
  const [activeDevices, setActiveDevices] = useState<number>(0);
  const [inactiveDevices, setInactiveDevices] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [deviceKey] = useState<string>("kjsfhdsjehfgieuorjoi10924380130");
  const [copied, setCopied] = useState<boolean>(false);
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

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(deviceKey).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="max-w-full h-screen flex justify-center items-center ">
      {loading ? (
        <LoadingIndicator message="Loading Devices..." />
      ) : (
        <div className="py-10 px-4 lg:px-6 xl:px-8 2xl:px-10 w-full h-full max-w-full mx-auto">
          <h1 className="text-neutral-50 Inter font-bold text-3xl">
            Dashboard
          </h1>
          <div className="flex flex-col md:flex-row flex-wrap justify-between gap-6 xl:gap-8 mt-4">
            <MetricCard
              valuePercent="+20% from last month"
              title="TOTAL PHONES"
              value={totalDevices.toString()}
              icon={Assets.MobileIcon}
              className="max-w-96 border lg:border-gray-700 md:flex-1"
            />
            <MetricCard
              title="ACTIVE PHONES"
              value={activeDevices.toString()}
              valuePercent="+20% from last month"
              icon={Assets.OnlineIcon}
              className="max-w-96 border lg:border-gray-700 flex-1"
            />
            <MetricCard
              title="OFFLINE PHONES"
              value={inactiveDevices.toString()}
              valuePercent="+20% from last month"
              icon={Assets.OfflineIcon}
              className="max-w-96 border lg:border-gray-700 flex-1"
            />
          </div>

          <div className="flex justify-between items-center mt-10">
            <p className="text-zinc-200 Inter text-xl">All Phones</p>
            <Button
              variant="outline"
              className="border border-none bg-blue-700 border-neutral-800 text-zinc-300 Inter hover:text-zinc-900 hover:bg-white"
              size="sm"
              onClick={toggleModal}
            >
              <Plus /> Add Device
            </Button>
          </div>

          {error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <DataTable<TableData, unknown>
              data={data}
              pageIndex={pageIndex}
              totalPages={Math.ceil(totalDevices / devicesPerPage)}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      )}

      {isModalOpen && (
        <Modal onClose={toggleModal} title="Add New Device">
          <h3 className="mb-4 text-zinc-200 text-lg font-medium">Device Key</h3>

          <div className="flex items-center space-x-2 bg-zinc-800 rounded-lg  text-sm border-[1px] border-[#FFFFFF0F]">
            <div className="w-full bg-zinc-800 text-zinc-300 rounded-md px-6 py-4 text-sm">
              {deviceKey}
            </div>

            <div
              onClick={handleCopy}
              className="flex items-center justify-center w-44 text-zinc-300 min-h-full border-l-[1px] py-4 px-6 border-[#323238] cursor-pointer"
            >
              {copied ? (
                <>
                  <CopyCheck className="mr-2 hover:text-zinc-200" size={22} />
                  <span className="text-xs text-zinc-300"> Copied!</span>
                </>
              ) : (
                <>
                  <Image
                    src={"/copy.svg"}
                    alt="Copy key"
                    width={22}
                    height={22}
                    className="mr-2"
                  />
                  <span className="text-xs text-zinc-300 ">Copy Key</span>
                </>
              )}
            </div>
          </div>

          <div className="text-gray-300 mt-8">
            <h3 className="mb-4 text-zinc-200 text-sm font-medium">
              HOW TO ADD A DEVICE
            </h3>
            <ul className="bg-[#FFFFFF0F] rounded-lg list-disc list-inside p-6 text-zinc-300 text-sm space-y-3 border-[1px] border-[#FFFFFF0F]">
              <li>Copy the device key above</li>
              <li>Paste the key in the __ app</li>
              <li>Follow the remaining instructions in the app</li>
            </ul>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Page;
