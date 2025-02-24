"use client";

import { useState } from "react";
import { Copy, Trash2, Plus, ClipboardCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import IpHistoryTable from "./IpHistoryTable"; 

const ChangeIp = () => {
  const [urls, setUrls] = useState<string[]>([
    "https://fi.fxdx.in/api-rt/changeip/5FK5oho4w/xMC4V68NBPXWW494SEEY",
    "https://fi.fxdx.in/api-rt/changeip/jF5Koho4w/xMC4V68NBPXWW494SEEY",
  ]);

  const [history] = useState([
    { updatedIp: "192.168.1.101", previousIp: "192.168.1.101", activityTime: "12 Jan, 2024 - 09:00am" },
    { updatedIp: "192.168.1.102", previousIp: "192.168.1.101", activityTime: "12 Jan, 2024 - 10:00am" },
    { updatedIp: "192.168.1.103", previousIp: "192.168.1.102", activityTime: "12 Jan, 2024 - 11:00am" },
  ]);

  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = (url: string, index: number) => {
    navigator.clipboard.writeText(url);
    setCopiedIndex(index);

    setTimeout(() => {
      setCopiedIndex(null);
    }, 1500);
  };

  const deleteUrl = (index: number) => {
    setUrls(urls.filter((_, i) => i !== index));
  };

  const addNewUrl = () => {
    setUrls([...urls, "https://fi.fxdx.in/api-rt/changeip/newURL"]);
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex justify-between items-center mb-2">
          <p className="text-white text-sm font-medium">URL for IP Address Change</p>
          <Button
            variant="outline"
            className="bg-blue-700 border-none text-white hover:text-zinc-700"
            size="sm"
            onClick={addNewUrl}
          >
            <Plus className="w-4 h-4 mr-1" /> New URL
          </Button>
        </div>

        <div className="rounded-lg overflow-hidden">
          {urls.map((url, index) => (
            <div
              key={index}
              className={`flex items-center justify-between bg-zinc-800 p-3 ${
                index !== urls.length - 1 ? "border-b border-zinc-700" : ""
              }`}
            >
              <p className="text-xs text-zinc-300 truncate">{url}</p>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-zinc-400 hover:text-zinc-700"
                  onClick={() => copyToClipboard(url, index)}
                >
                  {copiedIndex === index ? (
                    <ClipboardCheck className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-400 hover:text-red-500"
                  onClick={() => deleteUrl(index)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-left">
        <p className="text-white text-md font-medium mb-2">IP Rotation History</p>
        <IpHistoryTable history={history} />
      </div>
    </div>
  );
};

export default ChangeIp;
