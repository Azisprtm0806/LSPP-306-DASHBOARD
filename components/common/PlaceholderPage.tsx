import { FileCode2, Layers, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface PlaceholderPageProps {
  title: string;
  code?: string;
  category?: string;
  description?: string;
}

export function PlaceholderPage({
  title,
  code,
  category = "Formulir Sertifikasi",
  description = "Halaman ini merupakan placeholder skeleton. Siap untuk implementasi form atau modul bisnis ketika API backend tersedia.",
}: PlaceholderPageProps) {
  return (
    <div className="space-y-6">
      {/* Top action / back link */}
      <div className="flex items-center justify-between">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5A7A22] hover:text-[#425918] transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Kembali ke Beranda</span>
        </Link>

        {code && (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-[#F2F5E9] text-[#5A7A22] border border-[#8AA53C]/40">
            <Layers size={12} />
            {code}
          </span>
        )}
      </div>

      {/* Main Skeleton Card */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              {category}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mt-1">
              {title}
            </h2>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-600 text-xs font-medium self-start sm:self-auto">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>Frontend Skeleton</span>
          </div>
        </div>

        {/* Informative placeholder content */}
        <div className="py-8 px-4 flex flex-col items-center justify-center text-center max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-[#F2F5E9] border border-[#8AA53C]/30 flex items-center justify-center text-[#5A7A22] mb-4 shadow-xs">
            <FileCode2 size={28} />
          </div>

          <h3 className="text-base font-bold text-gray-700 mb-2">
            Modul {title}
          </h3>
          <p className="text-sm text-gray-500 leading-relaxed">
            {description}
          </p>

          <div className="mt-6 flex flex-wrap gap-2 justify-center">
            <span className="px-3 py-1 bg-gray-100 rounded-md text-xs text-gray-600 font-mono">
              Route: Active & Protected
            </span>
            <span className="px-3 py-1 bg-gray-100 rounded-md text-xs text-gray-600 font-mono">
              API Ready
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
