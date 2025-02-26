"use client";

import { useState } from "react";
import Modal from "../ModalComponent/ModalComponent";
import Image from "next/image";
import { CopyCheck } from "lucide-react";

type DeviceSettingsModalProps = {
  onClose: () => void;
  deviceKey: string;
};

const AddDeviceModal: React.FC<DeviceSettingsModalProps> = ({
  onClose, deviceKey
}) => {
  
    const [copied, setCopied] = useState<boolean>(false);
  
  
const handleCopy = () => {
    navigator.clipboard.writeText(deviceKey).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <Modal onClose={onClose} title="Add New Device">
          <h3 className="mb-4 text-zinc-200 text-lg font-medium">Device Key</h3>

          <div className="flex items-center lg:space-x-2 bg-zinc-800 rounded-lg border-[1px] border-[#FFFFFF0F]">
            <div className="w-full bg-zinc-800 text-zinc-300 rounded-md px-1 pl-2 py-3 lg:px-6 lg:py-4 text-xs lg:text-sm">
              {deviceKey}
            </div>

            <div
              onClick={handleCopy}
              className="flex items-center justify-center w-20 md:w-44 text-zinc-300 min-h-full border-l-[1px] px-1 py-3 lg:py-4 lg:px-6 border-[#323238] cursor-pointer"
            >
              {copied ? (
                <>
                  <CopyCheck
                    className="lg:mr-2 hover:text-zinc-200"
                    size={22}
                  />
                  <span className="text-xs hidden md:block text-zinc-300">
                    {" "}
                    Copied!
                  </span>
                </>
              ) : (
                <>
                  <Image
                    src={"/copy.svg"}
                    alt="Copy key"
                    width={22}
                    height={22}
                    className="lg:mr-2"
                  />
                  <span className="text-xs text-zinc-300 hidden md:block">
                    Copy Key
                  </span>
                </>
              )}
            </div>
          </div>

          <div className="text-gray-300 mt-8">
            <h3 className="mb-4 text-zinc-200 text-sm font-medium">
              HOW TO ADD A DEVICE
            </h3>
            <ul className="bg-[#FFFFFF0F] rounded-lg list-disc list-inside p-6 text-zinc-300 text-sm space-y-3 border-[1px] border-[#FFFFFF0F]">
              <li className="text-left">Copy the device key above</li>
              <li className="text-left">Paste the key in the __ app</li>
              <li className="text-left">
                Follow the remaining instructions in the app
              </li>
            </ul>
          </div>
        </Modal>
  );
};

export default AddDeviceModal;
