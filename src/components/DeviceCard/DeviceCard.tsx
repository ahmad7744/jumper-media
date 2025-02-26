import { RefreshCcw } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

interface DeviceCardProps {
  device: {
    id: string;
    phoneID: string;
    status: string;
    name: string;
    IPAddress: string;
    LastActivity: string;
    locations: string[];
  };
  isSelected: boolean;
  toggleSelection: (id: string) => void;
}

const DeviceCard: React.FC<DeviceCardProps> = ({ device, isSelected, toggleSelection }) => {
  return (
    <div className="bg-[#0A0A0A] border border-neutral-800 rounded-md p-4 w-72 flex flex-col gap-2 relative">
      <div className="border-b border-neutral-800 pb-3">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-neutral-100">{device.phoneID}</h2>
          <Checkbox
            className="w-4 h-4 border border-neutral-700"
            checked={isSelected}
            onCheckedChange={() => toggleSelection(device.id)}
          />
        </div>
        <p className="text-neutral-400 text-sm">{device.id}</p>
      </div>

      <div className="mt-3 flex justify-between items-center">
        <p className="text-neutral-400 text-xs">Status</p>
        <div className="flex items-center gap-1">
          <span className={`w-2 h-2 rounded-full ${device.status === "Active" ? "bg-green-500" : "bg-red-500"}`} />
          <span className="text-sm text-neutral-200">{device.status}</span>
        </div>
      </div>

      <div className="mt-3 flex justify-between items-center">
        <p className="text-neutral-400 text-xs">IP Address</p>
        <p className="text-sm text-neutral-200">{device.IPAddress}</p>
      </div>

      <div className="mt-3 flex justify-between items-center">
        <p className="text-neutral-400 text-xs">Last Activity</p>
        <p className="text-sm text-neutral-200">{device.LastActivity}</p>
      </div>

      <div className="flex justify-end mt-2">
        <RefreshCcw className="text-white cursor-pointer" size={16} />
      </div>
    </div>
  );
};

export default DeviceCard;
