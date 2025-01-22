"use client";
import React, { useState } from "react";
import Sidebar from "@/components/sideBar/Sidebar";
import Assets from "../../../public/assets/assets";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [selectedItem, setSelectedItem] = useState<string>("DashBoard");

  const sidebarItems = [
    { label: "DashBoard", icon: Assets.Dashboard },
    { label: "Settings", icon: Assets.Setting },
    { label: "Download App", icon: Assets.Download },
  ];

  const handleItemClick = (label: string) => {
    setSelectedItem(label);
    console.log(`Selected Item: ${label}`);
  };

  return (
    <div className="flex w-full h-screen mx-auto">
      <Sidebar
        items={sidebarItems}
        onItemClick={handleItemClick}
        selectedItem={selectedItem}
      />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
