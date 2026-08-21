"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Award, FileCheck } from "lucide-react";

interface APL01LayoutProps {
  children: ReactNode;
}

const STEPS = [
  {
    id: "rincian",
    label: "1. Data Pribadi & Pekerjaan",
    href: "/dashboard/fr/apl-01/rincian",
    icon: User,
    desc: "Bagian 1 : Rincian Data Pemohon",
  },
  {
    id: "data-sertifikasi",
    label: "2. Data Sertifikasi",
    href: "/dashboard/fr/apl-01/data-sertifikasi",
    icon: Award,
    desc: "Bagian 2 : Skema & Unit Kompetensi",
  },
  {
    id: "bukti-kelengkapan",
    label: "3. Bukti Kelengkapan",
    href: "/dashboard/fr/apl-01/bukti-kelengkapan",
    icon: FileCheck,
    desc: "Bagian 3 : Dokumen Persyaratan Dasar",
  },
];

export default function APL01Layout({ children }: APL01LayoutProps) {
  const pathname = usePathname();

  return (
    <div className="space-y-6">
      {/* Step Navigation Bar */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isActive =
              pathname === step.href ||
              (pathname === "/dashboard/fr/apl-01" && idx === 0);

            return (
              <Link
                key={step.id}
                href={step.href}
                className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                  isActive
                    ? "bg-[#F2F5E9] border-[#8AA53C] text-[#5A7A22] shadow-xs"
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-600"
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 font-bold text-sm ${
                    isActive
                      ? "bg-[#8AA53C] text-white"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  <Icon size={18} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold truncate">{step.label}</p>
                  <p className="text-[11px] text-gray-500 truncate">
                    {step.desc}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Child Step Content */}
      <div>{children}</div>
    </div>
  );
}
