"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import Modal from "../ModalComponent/ModalComponent";
import { AddedProxysTable } from "../AddProxyModalTable/ProxyTable";

type DeviceSettingsModalProps = {
  onClose: () => void;
  proxyData: any[];
};

const DeviceSettingsModal: React.FC<DeviceSettingsModalProps> = ({
  onClose,
  proxyData,
}) => {
  const [activeTab, setActiveTab] = useState<"proxy" | "change-ip">("proxy");

  return (
    <Modal title="Device Settings" onClose={onClose}>
      <div className="flex border-b border-zinc-700 mt-4 mb-4">
        <button
          onClick={() => setActiveTab("proxy")}
          className={cn(
            "pb-3 mr-4 text-sm",
            activeTab === "proxy"
              ? "text-white border-b-2 border-white"
              : "text-zinc-500"
          )}
        >
          Proxy Settings
        </button>
        <button
          onClick={() => setActiveTab("change-ip")}
          className={cn(
            "pb-3 text-sm",
            activeTab === "change-ip"
              ? "text-white border-b-2 border-white"
              : "text-zinc-500"
          )}
        >
          Change IP
        </button>
      </div>

      {activeTab === "proxy" ? (
        <AddedProxysTable data={proxyData} />
      ) : (
        <div className="text-zinc-300 text-lg text-center py-10">
          Change your IP here
        </div>
      )}
    </Modal>
  );
};

export default DeviceSettingsModal;
