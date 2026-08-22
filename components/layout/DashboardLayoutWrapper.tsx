"use client";

import { useState, ReactNode } from "react";
import { NavbarDashboard } from "@/components/layout/NavbarDashboard";
import { TopbarHero } from "@/components/layout/TopbarHero";
import { Sidebar } from "@/components/layout/Sidebar";
import { X } from "lucide-react";

interface DashboardLayoutWrapperProps {
  children: ReactNode;
}

export function DashboardLayoutWrapper({
  children,
}: DashboardLayoutWrapperProps) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-[#F1F3F6] overflow-hidden">
      <NavbarDashboard
        onToggleMobileSidebar={() => setIsMobileSidebarOpen(true)}
      />

      <TopbarHero />

      <div className="flex flex-1 overflow-hidden relative">
        <div className="hidden md:block shrink-0 h-full">
          <Sidebar />
        </div>

        {isMobileSidebarOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex">
            <div
              className="fixed inset-0 bg-black/50 transition-opacity animate-in fade-in"
              onClick={() => setIsMobileSidebarOpen(false)}
            />

            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white z-10 shadow-2xl animate-in slide-in-from-left duration-200">
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <span className="font-bold text-gray-800 text-sm">
                  Menu LSPP
                </span>
                <button
                  type="button"
                  onClick={() => setIsMobileSidebarOpen(false)}
                  className="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                >
                  <X size={18} />
                </button>
              </div>
              <Sidebar
                onItemClick={() => setIsMobileSidebarOpen(false)}
                className="w-full border-r-0"
              />
            </div>
          </div>
        )}

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
          <div className="max-w-7xl mx-auto w-full">{children}</div>
        </main>
      </div>
    </div>
  );
}
