"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import Modal from "../ModalComponent/ModalComponent";
import { AddedProxysTable } from "../AddProxyModalTable/ProxyTable";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { AddProxyForm } from "./AddProxyForm";
import ChangeIp from "./ChangeIp";

type DeviceSettingsModalProps = {
  onClose: () => void;
  proxyData: any[];
};

const DeviceSettingsModal: React.FC<DeviceSettingsModalProps> = ({
  onClose,
  proxyData,
}) => {
  const [activeTab, setActiveTab] = useState<"proxy" | "change-ip">("proxy");
  const [view, setView] = useState<"list" | "add">("list");

  return (
    <Modal
      title={`${view === "add" ? "Add Proxy" : "Device Settings"}`}
      onClose={onClose}
      showBackArrow={view === "add" ? true : false}
      onBack={() => setView("list")}
    >
      {view === "list" ? (
        <>
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
            <AddedProxysTable
              data={proxyData}
              onAddProxy={() => setView("add")}
            />
          ) : (
            <div className="text-zinc-300 text-lg text-center pb-10">
              <ChangeIp />
            </div>
          )}
        </>
      ) : (
        <AddProxyForm onBack={() => setView("list")} />
      )}
    </Modal>
  );
};

export default DeviceSettingsModal;
