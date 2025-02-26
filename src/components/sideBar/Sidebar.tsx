import React from "react";
import Link from "next/link";
import Assets from "../../../public/assets/assets";

const Sidebar = ({
  items,
  onItemClick,
  selectedItem,
}: {
  items: { label: string; icon: string; path: string }[];
  onItemClick: (label: string) => void;
  selectedItem: string;
}) => {
  return (
    <div className=" bg-neutral-950 py-6 px-5 text-zinc-200 flex flex-col">
      <div dangerouslySetInnerHTML={{ __html: Assets.MainLogo }} />
      <div className="flex-1 mt-10">
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li key={index}>
              <Link href={item.path}>
                <button
                  className={`w-full flex items-center space-x-4 rounded-md px-2 py-2 transition ${
                    selectedItem === item.label
                      ? "bg-zinc-800 text-zinc-200"
                      : "hover:bg-zinc-800 text-zinc-500 hover:text-zinc-200"
                  }`}
                  onClick={() => onItemClick(item.label)}
                >
                  <div dangerouslySetInnerHTML={{ __html: item.icon }} />
                  <span>{item.label}</span>
                </button>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="absolute bottom-6">
        <div className="bg-zinc-800 p-3 rounded-xl flex items-center">
          <div className="flex items-center gap-2">
            <div className="downloadGradient p-2 rounded-lg">
              <div
                className="text-zinc-200 w-6 h-6 text-center"
                dangerouslySetInnerHTML={{ __html: Assets.Download }}
              />
            </div>
            <div>
              <p className="Inter text-zinc-200 font-bold text-base">
                Get Jumper App
              </p>
              <div className="flex items-center cursor-pointer">
                <div className="text-[10px] leading-[14px] border-b inline-block">
                  Download Now
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 mt-6">
          <p className="text-center bg-blue-700 w-[48px] py-[11px] px-[10px] rounded-[12px] items-center">
            MC
          </p>
          <div className="flex flex-col">
            <p className="text-zinc-200 Inter font-medium text-sm">
              Mike Carter
            </p>
            <p className="text-zinc-400 Inter font-normal text-xs">
              mike67@mail.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
