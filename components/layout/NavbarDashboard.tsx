"use client";

import Image from "next/image";
import Link from "next/link";
import { Settings, Menu } from "lucide-react";
import { UserDropdown } from "@/components/common/UserDropdown";

interface NavbarDashboardProps {
  onToggleMobileSidebar?: () => void;
}

export function NavbarDashboard({
  onToggleMobileSidebar,
}: NavbarDashboardProps) {
  return (
    <nav className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 shrink-0 z-30">
      <div className="flex items-center gap-3">
        {onToggleMobileSidebar && (
          <button
            type="button"
            onClick={onToggleMobileSidebar}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:outline-none"
            aria-label="Toggle Navigation"
          >
            <Menu size={20} />
          </button>
        )}

        <Link href="/dashboard" className="flex items-center gap-2">
          <Image
            src="/images/logo-nav.png"
            alt="LSPP 306 Logo"
            width={150}
            height={32}
            className="h-8 w-auto object-contain"
            style={{ width: "auto" }}
            priority
          />
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <UserDropdown />
        <Link
          href="/dashboard/settings"
          className="p-1.5 rounded-lg text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors"
          title="Pengaturan"
        >
          <Settings size={18} />
        </Link>
      </div>
    </nav>
  );
}
