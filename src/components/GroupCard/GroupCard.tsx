import React from "react";
import Assets from "../../../public/assets/assets";

interface GroupCardProps {
  title: string;
  priorityLabel?: string;
  totalDevices: number;
  activeDevices: number;
  inactiveDevices: number;
  downloadSpeed: string;
  uploadSpeed: string;
  onPress: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const GroupCard: React.FC<GroupCardProps> = ({
  title,
  priorityLabel,
  totalDevices,
  activeDevices,
  inactiveDevices,
  downloadSpeed,
  uploadSpeed,
  onPress,
}) => {
  const activePercentage = ((activeDevices / totalDevices) * 100).toFixed(0);
  const inactivePercentage = ((inactiveDevices / totalDevices) * 100).toFixed(
    0
  );

  return (
    <div
      onClick={onPress}
      className="items-center cursor-pointer w-full max-w-[300px] xl:max-w-[356px] Inter bg-zinc-900 border border-[#FFFFFF0F] rounded-[8px]"
    >
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <p className="text-zinc-200 text-lg font-semibold">{title}</p>
            {priorityLabel && (
              <div className="bg-zinc-800 px-2 py-[6px] rounded-full items-center">
                <p className="text-xs text-zinc-300 font-semibold">
                  #{priorityLabel}
                </p>
              </div>
            )}
          </div>
          <div
            className="cursor-pointer"
            dangerouslySetInnerHTML={{ __html: Assets.DotIcon }}
          />
        </div>
        <p className="text-zinc-300 text-xs font-medium mt-2">
          All Phones: {totalDevices}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1 mt-6">
            <div
              className="text-green-400 bg-transparent"
              dangerouslySetInnerHTML={{ __html: Assets.OnlineIcon }}
            />
            <p className="text-green-400 text-xs font-medium">Active Phones</p>
            <p className="text-zinc-200 text-[22px] font-bold">
              {activeDevices}{" "}
              <span className="text-sm font-normal">({activePercentage}%)</span>
            </p>
          </div>
          <div className="flex flex-col gap-1 mt-6">
            <div
              className="text-red-400 bg-transparent"
              dangerouslySetInnerHTML={{ __html: Assets.OfflineIcon }}
            />
            <p className="text-red-400 text-xs font-medium">Inactive Phones</p>
            <p className="text-zinc-200 text-[22px] font-bold">
              {inactiveDevices}{" "}
              <span className="text-sm font-normal">
                ({inactivePercentage}%)
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="border-t px-6 w-full border-zinc-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="text-purple-400"
              dangerouslySetInnerHTML={{ __html: Assets.DownloadSpeed }}
            />
            <p className="text-purple-400 text-sm font-medium">
              {downloadSpeed} Mbps
            </p>
          </div>
          <div className="h-14 border-r border-zinc-800"></div>
          <div className="flex items-center gap-3">
            <div
              className="text-blue-400"
              dangerouslySetInnerHTML={{ __html: Assets.UploadSpeed }}
            />
            <p className="text-blue-400 text-sm font-medium">
              {uploadSpeed} Mbps
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupCard;
