import React from "react";
import Assets from "../../../public/assets/assets";

const Sidebar = ({
  items,
  onItemClick,
  selectedItem,
}: {
  items: { label: string; icon: string }[];
  onItemClick: (label: string) => void;
  selectedItem: string;
}) => {
  return (
    <div className="w-[268px] bg-neutral-950 py-6 px-5 text-white flex flex-col mx-auto">
      <div dangerouslySetInnerHTML={{ __html: Assets.MainLogo }} />
      <div className="flex-1 mt-10">
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li key={index}>
              <button
                className={`w-full flex items-center space-x-4 rounded-[8px] px-4 py-2 transition ${
                  selectedItem === item.label
                    ? "bg-zinc-800 text-zinc-200"
                    : "hover:bg-zinc-800 text-zinc-500 hover:text-zinc-200"
                }`}
                onClick={() => onItemClick(item.label)}
              >
                <div dangerouslySetInnerHTML={{ __html: item.icon }} />
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <div className="flex items-center gap-4">
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
