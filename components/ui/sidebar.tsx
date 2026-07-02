"use client";
import { useState } from "react";
import { ChevronDown, ChevronRight, Home, FileText } from "lucide-react";

const menuItems = [
  { name: "FR.APL", sub: ["FR.APL.01", "FR.APL.02", "FR.APL.03"] },
  { name: "FR.MAPA", sub: ["FR.MAPA.01", "FR.MAPA.02"] },
  { name: "FR.AK", sub: ["FR.AK.01", "FR.AK.02", "FR.AK.03"] },
];

export function Sidebar() {
  const [open, setOpen] = useState<string | null>("FR.APL");

  return (
    <div className="w-60 bg-white border-r border-gray-200 p-4 space-y-4">
      <div>
        <p className="text-[11px] font-bold text-gray-400 uppercase mb-2">
          Dashboard
        </p>
        <div className="bg-[#F0F4E8] text-[#6A8538] text-sm font-bold p-2.5 rounded-lg flex items-center gap-2">
          <Home size={16} /> Home
        </div>
      </div>
      <div>
        <p className="text-[11px] font-bold text-gray-400 uppercase mb-2">
          Daftar Instruksi
        </p>
        {menuItems.map((item) => (
          <div key={item.name}>
            <button
              onClick={() => setOpen(open === item.name ? null : item.name)}
              className="flex items-center gap-2 w-full p-1.5 text-sm text-gray-600 hover:bg-gray-50 rounded"
            >
              {open === item.name ? (
                <ChevronDown size={12} />
              ) : (
                <ChevronRight size={12} />
              )}
              <FileText size={14} /> {item.name}
            </button>
            {open === item.name &&
              item.sub.map((s) => (
                <div key={s} className="pl-8 py-0.5 text-xs text-gray-400">
                  {s}
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}
