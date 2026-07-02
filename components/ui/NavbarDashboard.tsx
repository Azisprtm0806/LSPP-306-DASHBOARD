import Image from "next/image";
import { Settings, ChevronDown } from "lucide-react";

export function NavbarDashboard() {
  return (
    <nav className="h-16 bg-white border-b flex items-center justify-between px-6">
      <Image
        src="/images/logo-nav.png"
        alt="Logo"
        width={150}
        height={30}
        className="h-8 w-auto"
      />
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-7 h-7 rounded-full bg-gray-200 overflow-hidden">
            <img
              src="/images/avatar.jpg"
              alt="Ahmad"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-semibold text-gray-700 text-xs">Ahmad</span>
          <ChevronDown size={14} className="text-gray-500" />
        </div>
        <Settings size={18} className="text-gray-500 cursor-pointer" />
      </div>
    </nav>
  );
}
