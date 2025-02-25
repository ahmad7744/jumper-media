"use client";
import React, { useEffect, useState } from "react";
import Assets from "../../../public/assets/assets";
import Sidebar from "./Sidebar";
import { usePathname } from "next/navigation";

export default function SidebarWithState({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [selectedItem, setSelectedItem] = useState<string>("");

  const sidebarItems = [
    { label: "Dashboard", icon: Assets.Dashboard, path: "/" },
    { label: "Locations", icon: Assets.Locations, path: "/locations" },
    { label: "Groups", icon: Assets.Groups, path: "/groups" },
    { label: "Settings", icon: Assets.Setting, path: "/settings" },
  ];

  

  useEffect(() => {
    if (pathname.startsWith("/groups") || pathname.startsWith("/groupOpened")) {
      setSelectedItem("Groups");
    } else if (pathname.startsWith("/locations") || pathname.startsWith("/locationOpened")) {
      setSelectedItem("Locations");
    } else {
      const currentItem = sidebarItems.find((item) => pathname.startsWith(item.path));
      setSelectedItem(currentItem?.label || "");
    }
  }, [pathname]);

  if (pathname === "/login"  || pathname === "/auth/signup") {
    return children;
  }

  const handleItemClick = (label: string) => {
    setSelectedItem(label);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="sticky top-0 h-screen">
        <Sidebar items={sidebarItems} onItemClick={handleItemClick} selectedItem={selectedItem} />
      </div>

      {/* Main content area */}
      <main className="flex-1 overflow-y-auto max-w-full relative">
        <div className="min-h-full w-full relative">
          
          {children}
        </div>
      </main>
    </div>
  );
}
