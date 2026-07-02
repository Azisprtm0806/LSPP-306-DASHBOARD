"use client";
import { FileText } from "lucide-react";

export function DashboardClient() {
  return (
    <div className="space-y-6">
      <Section
        title="Daftar Instruksi Terstruktur (DIT)"
        count={[3, 2, 7, 7, 1]}
      />
      <Section title="Portofolio" count={[3, 2, 7, 7, 1]} />
    </div>
  );
}

function Section({ title, count }: { title: string; count: number[] }) {
  return (
    <div>
      <h2 className="text-lg font-bold text-gray-700 mb-3">{title}</h2>{" "}
      <div className="grid grid-cols-2 gap-3">
        {["FR.APL", "FR.MAPA", "FR.AK", "FR.IA", "FR.VA"].map((item, idx) => (
          <div
            key={item}
            className="bg-white p-3 rounded-lg border border-gray-200 flex items-center gap-2 shadow-sm"
          >
            <FileText className="text-gray-400" size={16} />{" "}
            <span className="font-semibold text-gray-700 text-sm">{item}</span>{" "}
            <span className="text-gray-400 text-xs">({count[idx]})</span>{" "}
          </div>
        ))}
      </div>
    </div>
  );
}
