"use client";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import React from "react";
import Assets from "../../../public/assets/assets";
import LocationCard from "@/components/locationCard/locationCard";
import AreaChartComponent from "@/components/ChartComponent/ChartComponent";
import { DataTable } from "@/components/mainTable/dataTable";
import { columns, Payment } from "@/components/mainTable/columns";
import StatCard from "@/components/StatCard/StatCard";
const page = () => {
 

   const data: Payment[] = [
      {
        id: "1",
        status: "Online",
        phoneID: "PHN001",
        name: "Galaxy A14",
        IPAddress: "192.168.1.101",
        LastActivity: "2025-01-13 10:45:12",
        locations: ["San Diego, CA"],
      },
      {
        id: "2",
        status: "Online",
        phoneID: "PHN002",
        name: "Galaxy A14",
        IPAddress: "192.168.1.101",
        LastActivity: "2025-01-13 10:45:12",
        locations: ["Angola"],
  
  
      },
      {
        id: "3",
        status: "Online",
        phoneID: "PHN003",
        name: "Galaxy A14",
        IPAddress: "192.168.1.101",
        LastActivity: "2025-01-13 10:45:12",
        locations: ["San Diego, CA"]
  
  
      },
      {
        id: "4",
        status: "Online",
        phoneID: "PHN004",
        name: "Galaxy A14",
        IPAddress: "192.168.1.101",
        LastActivity: "2025-01-13 10:45:12",
        locations: ["Angola"],
  
  
      },
      {
        id: "5",
        status: "Online",
        phoneID: "PHN005",
        name: "Galaxy A14",
        IPAddress: "192.168.1.101",
        LastActivity: "2025-01-13 10:45:12",
        locations: ["Angola"],
  
  
  
      },
      {
        id: "4",
        status: "Online",
        phoneID: "PHN006",
        name: "Galaxy A14",
        IPAddress: "192.168.1.101",
        LastActivity: "2025-01-13 10:45:12",
        locations: ["San Diego, CA"]
  
  
      },
      {
        id: "6",
        status: "Offline",
        phoneID: "PHN007",
        name: "Galaxy A14",
        IPAddress: "192.168.1.101",
        LastActivity: "2025-01-13 10:45:12",
        locations: ["St. Louis, MO"]
  
  
  
      },
      {
        id: "7",
        status: "Offline",
        phoneID: "PHN008",
        name: "Galaxy A14",
        IPAddress: "192.168.1.101",
        LastActivity: "2025-01-13 10:45:12",
        locations: ["Chicago, IL"]
  
      },
      {
        id: "8",
        status: "Online",
        phoneID: "PHN009",
        name: "Galaxy A14",
        IPAddress: "192.168.1.101",
        LastActivity: "2025-01-13 10:45:12",
        locations: ["New York, NY"]
  
  
  
      },
      {
        id: "9",
        status: "Online",
        phoneID: "PHN010",
        name: "Galaxy A14",
        IPAddress: "192.168.1.101",
        LastActivity: "2025-01-13 10:45:12",
        locations: ["San Diego, CA"]
  
  
  
      },
      {
        id: "10",
        status: "Online",
        phoneID: "PHN011",
        name: "Galaxy A14",
        IPAddress: "192.168.1.101",
        LastActivity: "2025-01-13 10:45:12",
        locations: ["San Diego, CA"]
  
      },
    ];


  return (
    <div className="Inter p-10 w-full max-w-[1160px] mx-auto">
      <h1 className="text-zinc-400 font-normal text-xs">Groups / <span className="text-zinc-200 font-medium"> High Speed</span></h1>
      <div className="flex items-center justify-between max-w-[1160px] mx-auto mt-7 pb-10">

        <div className="flex items-center gap-3">
          <p className="text-zinc-200 text-[28px] font-semibold">High Speed</p>
          <div className="bg-zinc-800 px-4 py-[6px] rounded-full items-center">
            <p className="text-xs text-zinc-300 font-semibold">#Priority</p>
          </div>
        </div>
        <Button variant="outline" className="bg-transparent border Inter font-medium border-neutral-800 text-zinc-300" size="sm">
          <div dangerouslySetInnerHTML={{ __html: Assets.EditIcon }} /> Edit Group
        </Button>
      </div>
      <StatCard
        totalPhones={"2,394"}
        activePhones={573}
        offlinePhones={"2,350"}
        percentageChange="20"

      />
      <div className="flex items-center justify-between gap-4 max-w-[1160px] mt-4">
        <LocationCard
          city="IP ADDRESS"
          devices={2384}
          uniqueIps={1620}
          overlappingIps={774}
          IP="All IPs"
          size="small"
        />
        <AreaChartComponent />

      </div>
      <DataTable columns={columns} data={data} />


    </div>
  );
};

export default page;
