import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Menu, X, AlignJustify } from "lucide-react";
import Sidebar from "./Sidebar";
import { usePathname } from "next/navigation";
import Assets from "../../../public/assets/assets";
import { useIsTablet } from "@/hooks/use-tablet";

export default function SidebarWithState({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [selectedItem, setSelectedItem] = useState<string>("");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const isTablet = useIsTablet();
  const sidebarItems = [
    { label: "Dashboard", icon: Assets.Dashboard, path: "/" },
    { label: "Locations", icon: Assets.Locations, path: "/locations" },
    { label: "Groups", icon: Assets.Groups, path: "/groups" },
    { label: "Settings", icon: Assets.Setting, path: "/settings" },
  ];

  useEffect(() => {
    if (pathname.startsWith("/groups") || pathname.startsWith("/groupOpened")) {
      setSelectedItem("Groups");
    } else if (
      pathname.startsWith("/locations") ||
      pathname.startsWith("/locationOpened")
    ) {
      setSelectedItem("Locations");
    } else if (pathname.startsWith("/settings")) {
      setSelectedItem("Settings");
    } else {
      const currentItem = sidebarItems.find((item) =>
        pathname.startsWith(item.path)
      );
      setSelectedItem(currentItem?.label || "");
    }
  }, [pathname]);

  if (pathname === "/login" || pathname === "/auth/signup") {
    return children;
  }

  const handleItemClick = (label: string) => {
    setSelectedItem(label);
    toggleSidebar();
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen relative">
      {!isSidebarOpen && isTablet && (
        <div
          onClick={toggleSidebar}
          aria-label="Open sidebar"
          className="absolute top-10 right-4 md:right-6  z-50 rounded-md flex  items-center cursor-pointer justify-center transition-transform hover:bg-opacity-90 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-offset-primary focus:ring-secondary"
        >
          <AlignJustify size={24} className=" text-white" />
        </div>
      )}

      {isTablet && (
        <div
          className={`absolute z-50 top-0 h-screen transition-all duration-300 ${
            isSidebarOpen ? "w-60 lg:w-72 " : "w-0 bg-zinc-900"
          } bg-neutral-950 text-zinc-200 flex flex-col`}
        >
          <div
            onClick={toggleSidebar}
            aria-label="Close sidebar"
            className="absolute top-6 right-2 w-6 h-6 z-50 rounded-md flex  items-center cursor-pointer justify-center transition-transform hover:bg-opacity-90 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-offset-primary focus:ring-secondary"
          >
            <X className="w-6 h-6 text-white" />
          </div>

          <div
            className={`sticky top-0 h-screen overflow-hidden ${
              isSidebarOpen ? "block" : "hidden"
            }`}
          >
            <Sidebar
              items={sidebarItems}
              onItemClick={handleItemClick}
              selectedItem={selectedItem}
            />
          </div>
        </div>
      )}

      {!isTablet && (
        <div
          className={` sticky top-0 h-screen w-72 bg-neutral-950  text-zinc-200 flex flex-col`}
        >
          <Sidebar
            items={sidebarItems}
            onItemClick={handleItemClick}
            selectedItem={selectedItem}
          />
        </div>
      )}

      <main
        className={`flex-1 overflow-y-auto max-w-full relative ${
          !isSidebarOpen ? "w-full" : "blur-sm flex-shrink-0 lg:blur-none"
        }`}
        onClick={() => {
          isSidebarOpen ? setIsSidebarOpen(false) : null;
        }}
      >
        <div className="min-h-full w-full relative">{children}</div>
      </main>
    </div>
  );
}
