"use client";

import { useState } from "react";
import {
  FileCheck2,
  Info,
  Save,
  Send,
  Printer,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface KUKItem {
  id: string;
  nomor: string;
  pernyataan: string;
  status: "K" | "BK" | null;
  bukti: string;
}

interface ElemenItem {
  nomor: string;
  judul: string;
  kuks: KUKItem[];
}

interface UnitItem {
  kode: string;
  judul: string;
  standar: string;
  elemens: ElemenItem[];
}

const INITIAL_UNITS: UnitItem[] = [
  {
    kode: "PAR.HT02.001.01",
    judul: "Berkomunikasi Secara Efektif di Lingkungan Kerja Pariwisata",
    standar: "SKKNI No. 145/2018",
    elemens: [
      {
        nomor: "1",
        judul: "Berkomunikasi di tempat kerja",
        kuks: [
          {
            id: "1.1",
            nomor: "1.1",
            pernyataan:
              "Komunikasi dilakukan secara terbuka, profesional, dan ramah tamah kepada seluruh tamu dan kolega kerja.",
            status: "K",
            bukti: "Logbook Layanan Tamu & Penilaian Supervisor",
          },
          {
            id: "1.2",
            nomor: "1.2",
            pernyataan:
              "Bahasa tubuh, nada bicara, dan etika komunikasi diterapkan secara konsisten dalam situasi kerja.",
            status: "K",
            bukti: "SOP Grooming & Communication Handbook",
          },
        ],
      },
      {
        nomor: "2",
        judul: "Menangani keluhan pelanggan (customer complaint)",
        kuks: [
          {
            id: "2.1",
            nomor: "2.1",
            pernyataan:
              "Keluhan tamu diterima dengan penuh perhatian dan empati sesuai prosedur standar hotel.",
            status: "K",
            bukti: "Laporan Penanganan Keluhan Tamu (Complaint Report)",
          },
        ],
      },
    ],
  },
  {
    kode: "PAR.HT02.002.01",
    judul: "Menerapkan Prosedur Kesehatan, Keselamatan dan Keamanan Kerja (K3)",
    standar: "SKKNI No. 145/2018",
    elemens: [
      {
        nomor: "1",
        judul: "Mengikuti prosedur keselamatan dan kesehatan kerja di area hotel",
        kuks: [
          {
            id: "3.1",
            nomor: "1.1",
            pernyataan:
              "Standar dan rambu K3 dipatuhi di seluruh area operasional front office sesuai regulasi keselamatan kerja.",
            status: "K",
            bukti: "Sertifikat Pelatihan K3 Perhotelan",
          },
          {
            id: "3.2",
            nomor: "1.2",
            pernyataan:
              "Prosedur tanggap darurat (evakuasi, kebakaran, P3K) dipahami dan siap diimplementasikan.",
            status: "K",
            bukti: "Sertifikat Simulasi Fire Drill & Emergency Response",
          },
        ],
      },
    ],
  },
];

export default function APL02Page() {
  const [units, setUnits] = useState<UnitItem[]>(INITIAL_UNITS);
  const [openUnits, setOpenUnits] = useState<Record<string, boolean>>({
    "PAR.HT02.001.01": true,
    "PAR.HT02.002.01": true,
  });
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const toggleUnit = (kode: string) => {
    setOpenUnits((prev) => ({ ...prev, [kode]: !prev[kode] }));
  };

  const handleStatusChange = (
    unitKode: string,
    elemenNomor: string,
    kukId: string,
    status: "K" | "BK"
  ) => {
    setUnits((prev) =>
      prev.map((unit) => {
        if (unit.kode !== unitKode) return unit;
        return {
          ...unit,
          elemens: unit.elemens.map((el) => {
            if (el.nomor !== elemenNomor) return el;
            return {
              ...el,
              kuks: el.kuks.map((kuk) =>
                kuk.id === kukId ? { ...kuk, status } : kuk
              ),
            };
          }),
        };
      })
    );
  };

  const handleBuktiChange = (
    unitKode: string,
    elemenNomor: string,
    kukId: string,
    bukti: string
  ) => {
    setUnits((prev) =>
      prev.map((unit) => {
        if (unit.kode !== unitKode) return unit;
        return {
          ...unit,
          elemens: unit.elemens.map((el) => {
            if (el.nomor !== elemenNomor) return el;
            return {
              ...el,
              kuks: el.kuks.map((kuk) =>
                kuk.id === kukId ? { ...kuk, bukti } : kuk
              ),
            };
          }),
        };
      })
    );
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  // Count total KUKs and Kompeten
  const totalKUK = units.reduce(
    (acc, u) => acc + u.elemens.reduce((elAcc, el) => elAcc + el.kuks.length, 0),
    0
  );
  const totalKompeten = units.reduce(
    (acc, u) =>
      acc +
      u.elemens.reduce(
        (elAcc, el) =>
          elAcc + el.kuks.filter((k) => k.status === "K").length,
        0
      ),
    0
  );

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#F2F5E9] text-[#5A7A22] mb-1">
            FR.APL.02
          </div>
          <h2 className="text-xl font-bold text-gray-800">
            Formulir Asesmen Mandiri (Self Assessment)
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Lakukan evaluasi mandiri terhadap setiap kriteria unjuk kerja (KUK) dengan memilih status K (Kompeten) atau BK (Belum Kompeten).
          </p>
        </div>

        {savedSuccess && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-medium border border-emerald-200 animate-in fade-in">
            <CheckCircle2 size={16} />
            Data asesmen tersimpan
          </div>
        )}
      </div>

      {/* Skema & Peserta Meta Card */}
      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        <div>
          <span className="text-gray-400 block mb-0.5">Skema Sertifikasi:</span>
          <span className="font-bold text-gray-800">Okupasi Front Office Supervisor</span>
        </div>
        <div>
          <span className="text-gray-400 block mb-0.5">Nomor Skema:</span>
          <span className="font-mono font-semibold text-gray-700">SKM/LSPP-306/FOS/2024</span>
        </div>
        <div>
          <span className="text-gray-400 block mb-0.5">Nama Asesi:</span>
          <span className="font-bold text-gray-800">Ahmad Riyadh Smith</span>
        </div>
        <div>
          <span className="text-gray-400 block mb-0.5">Progres Evaluasi:</span>
          <span className="font-bold text-[#5A7A22]">
            {totalKompeten} / {totalKUK} KUK Kompeten ({Math.round((totalKompeten / (totalKUK || 1)) * 100)}%)
          </span>
        </div>
      </div>

      {/* Petunjuk Pengisian */}
      <div className="bg-[#FAFBF7] p-4 rounded-xl border border-[#8AA53C]/30 flex items-start gap-3 text-xs text-gray-700">
        <Info size={18} className="text-[#8AA53C] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold text-gray-800">Panduan Asesmen Mandiri:</p>
          <ul className="list-disc pl-4 space-y-0.5 text-gray-600">
            <li>Baca setiap Kriteria Unjuk Kerja (KUK) dengan seksama.</li>
            <li>Pilih <strong className="text-emerald-700 font-semibold">K (Kompeten)</strong> jika Anda yakin mampu dan memiliki bukti pendukung relevan.</li>
            <li>Pilih <strong className="text-amber-700 font-semibold">BK (Belum Kompeten)</strong> jika Anda belum menguasai kriteria tersebut.</li>
            <li>Tuliskan nama dokumen/bukti pendukung yang valid pada kolom Bukti Pendukung.</li>
          </ul>
        </div>
      </div>

      {submitted ? (
        <div className="bg-white p-8 rounded-xl border border-emerald-200 text-center space-y-4 shadow-sm animate-in fade-in">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 size={36} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">
              Asesmen Mandiri Berhasil Diajukan!
            </h3>
            <p className="text-xs text-gray-600 max-w-md mx-auto mt-1">
              Dokumen FR.APL.02 telah tersimpan. Asesor akan meninjau evaluasi mandiri Anda sebelum tahap asesmen uji kompetensi dimulai.
            </p>
          </div>
          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 text-xs font-semibold hover:bg-gray-50 cursor-pointer"
            >
              <Printer size={15} />
              Cetak Berkas FR.APL.02
            </button>
            <button
              onClick={() => setSubmitted(false)}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 text-xs font-semibold hover:bg-gray-50 cursor-pointer"
            >
              Edit Kembali
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSave} className="space-y-6">
          {/* List of Units */}
          {units.map((unit, uIdx) => {
            const isOpen = !!openUnits[unit.kode];

            return (
              <div
                key={unit.kode}
                className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden"
              >
                {/* Unit Header */}
                <div
                  onClick={() => toggleUnit(unit.kode)}
                  className="px-5 py-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between cursor-pointer hover:bg-gray-100/70 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#F2F5E9] text-[#5A7A22] flex items-center justify-center font-bold text-xs shrink-0">
                      U{uIdx + 1}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-xs font-bold text-[#5A7A22]">
                          {unit.kode}
                        </span>
                        <span className="text-[11px] text-gray-400">({unit.standar})</span>
                      </div>
                      <h3 className="text-sm font-bold text-gray-800 leading-snug">
                        {unit.judul}
                      </h3>
                    </div>
                  </div>

                  <button type="button" className="text-gray-400 hover:text-gray-600 p-1">
                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                </div>

                {/* Elements & KUK Table */}
                {isOpen && (
                  <div className="p-4 sm:p-5 space-y-6">
                    {unit.elemens.map((el) => (
                      <div key={el.nomor} className="space-y-3">
                        <div className="flex items-center gap-2 text-xs font-bold text-gray-700 pb-1 border-b border-gray-100">
                          <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-600">
                            Elemen {el.nomor}
                          </span>
                          <span>{el.judul}</span>
                        </div>

                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-xs border border-gray-200 rounded-lg overflow-hidden">
                            <thead className="bg-gray-50 text-gray-600 font-semibold border-b border-gray-200">
                              <tr>
                                <th className="py-2.5 px-3 w-16 text-center">No KUK</th>
                                <th className="py-2.5 px-3">Daftar Pertanyaan Asesmen Mandiri (KUK)</th>
                                <th className="py-2.5 px-3 w-28 text-center">Penilaian</th>
                                <th className="py-2.5 px-3 w-64">Bukti Pendukung Relevan</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-gray-700">
                              {el.kuks.map((kuk) => (
                                <tr key={kuk.id} className="hover:bg-gray-50/50 transition-colors">
                                  <td className="py-3 px-3 text-center font-mono font-semibold text-gray-500">
                                    {kuk.nomor}
                                  </td>
                                  <td className="py-3 px-3 text-gray-800 leading-relaxed font-medium">
                                    Apakah Anda dapat {kuk.pernyataan.toLowerCase()}?
                                  </td>
                                  <td className="py-3 px-3">
                                    <div className="flex items-center justify-center gap-3">
                                      <label className="flex items-center gap-1 cursor-pointer font-bold text-emerald-700">
                                        <input
                                          type="radio"
                                          name={`kuk-${unit.kode}-${el.nomor}-${kuk.id}`}
                                          checked={kuk.status === "K"}
                                          onChange={() =>
                                            handleStatusChange(
                                              unit.kode,
                                              el.nomor,
                                              kuk.id,
                                              "K"
                                            )
                                          }
                                          className="text-emerald-600 focus:ring-emerald-500"
                                        />
                                        <span>K</span>
                                      </label>
                                      <label className="flex items-center gap-1 cursor-pointer font-bold text-amber-700">
                                        <input
                                          type="radio"
                                          name={`kuk-${unit.kode}-${el.nomor}-${kuk.id}`}
                                          checked={kuk.status === "BK"}
                                          onChange={() =>
                                            handleStatusChange(
                                              unit.kode,
                                              el.nomor,
                                              kuk.id,
                                              "BK"
                                            )
                                          }
                                          className="text-amber-600 focus:ring-amber-500"
                                        />
                                        <span>BK</span>
                                      </label>
                                    </div>
                                  </td>
                                  <td className="py-3 px-3">
                                    <input
                                      type="text"
                                      value={kuk.bukti}
                                      onChange={(e) =>
                                        handleBuktiChange(
                                          unit.kode,
                                          el.nomor,
                                          kuk.id,
                                          e.target.value
                                        )
                                      }
                                      placeholder="Nama dokumen bukti..."
                                      className="w-full px-2.5 py-1.5 text-xs rounded border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#8AA53C] focus:border-[#8AA53C]"
                                    />
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {/* Rekomendasi Asesor Card */}
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2">
              <FileCheck2 size={18} className="text-[#8AA53C]" />
              <h3 className="text-sm font-bold text-gray-800">
                Rekomendasi Asesor (Untuk Diisi Oleh Asesor)
              </h3>
            </div>
            <p className="text-xs text-gray-500">
              Berdasarkan hasil asesmen mandiri di atas, pemohon direkomendasikan untuk:
            </p>
            <div className="flex items-center gap-6 text-xs text-gray-700">
              <label className="flex items-center gap-2 font-medium">
                <input
                  type="checkbox"
                  defaultChecked
                  disabled
                  className="rounded text-[#8AA53C]"
                />
                <span>Dapat dilanjutkan untuk mengikuti Asesmen Uji Kompetensi</span>
              </label>
              <label className="flex items-center gap-2 font-medium text-gray-400">
                <input type="checkbox" disabled className="rounded" />
                <span>Belum dapat dilanjutkan (perlu penguatan portofolio)</span>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <Printer size={15} />
              Cetak Dokumen FR.APL.02
            </button>

            <div className="flex items-center gap-2.5">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              >
                <Save size={15} />
                Simpan Draf
              </button>

              <button
                type="button"
                onClick={handleSubmit}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#8AA53C] hover:bg-[#789332] text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
              >
                <Send size={15} />
                Ajukan Asesmen Mandiri
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
