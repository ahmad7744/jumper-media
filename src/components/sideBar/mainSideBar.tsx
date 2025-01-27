"use client";

import React, { useEffect, useState } from "react";
import Assets from "../../../public/assets/assets";
import Sidebar from "./Sidebar";
import { usePathname } from "next/navigation";

export default function SidebarWithState({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [selectedItem, setSelectedItem] = useState<string>("");


  const sidebarItems = [
    { label: "Dashboard", icon: Assets.Dashboard, path: "/dashboard" },
    { label: "Locations", icon: Assets.Locations, path: "/locations" },
    { label: "Groups", icon: Assets.Groups, path: "/groups" },
    { label: "Settings", icon: Assets.Setting, path: "/settings" },
  ];

  
  useEffect(() => {
    const currentItem = sidebarItems.find((item) => item.path === pathname);
    if (currentItem) {
      setSelectedItem(currentItem.label);
    }
  }, [pathname]);

  if (pathname === "/auth/login" || pathname === "/" || pathname === "/auth/signup") {
    return children;
  }

  const handleItemClick = (label: string) => {
    setSelectedItem(label);
  };

  return (
    <div className="flex">
      <Sidebar
        items={sidebarItems}
        onItemClick={handleItemClick}
        selectedItem={selectedItem}
      />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
