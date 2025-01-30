import MetricCard from "@/components/Card/Card";
import { columns, Payment } from "@/components/mainTable/columns";
import { DataTable } from "@/components/mainTable/dataTable";
import Assets from "../../../public/assets/assets";

const Page = () => {

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
    <div className="w-full h-screen  mx-auto">
      <div className=" p-10 w-full  max-w-[1440px] mx-auto ">
        <h1 className="text-neutral-50 Inter font-bold text-3xl">Dashboard</h1>
        <div className="grid grid-cols-3 gap-6 mt-8 max-w-[1360px]">
          <MetricCard
            valuePercent="+20% from last month"
            title="Total Phones"
            value="2,394"
            icon={Assets.MobileIcon}
            className="border border-gray-700"
          />
          <MetricCard
            title="Active"
            value="573"
            valuePercent="+20% from last month"
            icon={Assets.OnlineIcon}
            className="border border-gray-700"
          />
          <MetricCard
            title="Offline"
            value="2,350"
            valuePercent="+20% from last month"
            icon={Assets.OfflineIcon}
            className="border border-gray-700"
          />
          {/* <LocationsGrid /> */}
        </div>
        <p className="text-zinc-200 mt-10 Inter text-xl">All Phones</p>
        <DataTable columns={columns} data={data} />

      </div>
    </div>
  );
};

export default Page;
