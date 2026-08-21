"use client";

import { useState } from "react";
import Link from "next/link";
import { Award, Layers, Save, ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";

interface UnitKompetensi {
  no: number;
  kode: string;
  judul: string;
  standar: string;
}

const UNIT_LIST: UnitKompetensi[] = [
  {
    no: 1,
    kode: "PAR.HT02.001.01",
    judul: "Berkomunikasi Secara Efektif di Lingkungan Kerja Pariwisata",
    standar: "SKKNI No. 145/2018",
  },
  {
    no: 2,
    kode: "PAR.HT02.002.01",
    judul: "Menerapkan Prosedur Kesehatan, Keselamatan dan Keamanan Kerja (K3)",
    standar: "SKKNI No. 145/2018",
  },
  {
    no: 3,
    kode: "PAR.HT02.003.01",
    judul: "Mengembangkan dan Memperbarui Pengetahuan Industri Perhotelan",
    standar: "SKKNI No. 145/2018",
  },
  {
    no: 4,
    kode: "PAR.FO02.001.01",
    judul: "Menyediakan Layanan Akomodasi Penerimaan Tamu (Front Desk)",
    standar: "SKKNI No. 145/2018",
  },
  {
    no: 5,
    kode: "PAR.FO02.002.01",
    judul: "Memproses Reservasi Tamu dan Transaksi Pembayaran",
    standar: "SKKNI No. 145/2018",
  },
];

export default function APL01DataSertifikasiPage() {
  const [formData, setFormData] = useState({
    judulSkema: "Okupasi Front Office Supervisor",
    nomorSkema: "SKM/LSPP-306/FOS/2024",
    jenisSkema: "Okupasi Nasional",
    tujuanAsesmen: "Sertifikasi",
    tuk: "TUK Sewaktu - Grand Sahid Hotel Jakarta",
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveDraft = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#F2F5E9] text-[#5A7A22] mb-1">
            FR.APL.01 - Bagian 2
          </div>
          <h2 className="text-xl font-bold text-gray-800">
            Data Sertifikasi & Unit Kompetensi
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Tentukan skema sertifikasi yang diajukan serta unit kompetensi yang akan diujikan pada asesmen.
          </p>
        </div>

        {savedSuccess && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-medium border border-emerald-200 animate-in fade-in">
            <CheckCircle2 size={16} />
            Draf berhasil disimpan
          </div>
        )}
      </div>

      <form onSubmit={handleSaveDraft} className="space-y-6">
        {/* Section 1: Skema & Tujuan Asesmen */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
          <div className="px-5 py-4 bg-gray-50 border-b border-gray-200 flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-[#F2F5E9] flex items-center justify-center text-[#5A7A22]">
              <Award size={16} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-800">
                A. Skema Sertifikasi & Tujuan Asesmen
              </h3>
              <p className="text-xs text-gray-500">
                Pilih skema kompetensi dan rincian asesmen
              </p>
            </div>
          </div>

          <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700">
                Judul Skema Sertifikasi <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="judulSkema"
                value={formData.judulSkema}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8AA53C]/30 focus:border-[#8AA53C]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700">
                Nomor Skema Sertifikasi <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="nomorSkema"
                value={formData.nomorSkema}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8AA53C]/30 focus:border-[#8AA53C]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700">
                Jenis Skema <span className="text-red-500">*</span>
              </label>
              <select
                name="jenisSkema"
                value={formData.jenisSkema}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8AA53C]/30 focus:border-[#8AA53C]"
              >
                <option value="KKNI">KKNI</option>
                <option value="Okupasi Nasional">Okupasi Nasional</option>
                <option value="Klaster">Klaster</option>
                <option value="Standar Khusus">Standar Khusus</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700">
                Tujuan Asesmen <span className="text-red-500">*</span>
              </label>
              <select
                name="tujuanAsesmen"
                value={formData.tujuanAsesmen}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8AA53C]/30 focus:border-[#8AA53C]"
              >
                <option value="Sertifikasi">Sertifikasi Baru</option>
                <option value="Sertifikasi Ulang">Sertifikasi Ulang (Re-sertifikasi)</option>
                <option value="Pengakuan Kompetensi Terkini (PKT)">
                  Pengakuan Kompetensi Terkini (PKT)
                </option>
                <option value="Rekognisi Pembelajaran Lampau (RPL)">
                  Rekognisi Pembelajaran Lampau (RPL)
                </option>
                <option value="Pencapaian Proses Pembelajaran">
                  Pencapaian Proses Pembelajaran
                </option>
              </select>
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-semibold text-gray-700">
                Tempat Uji Kompetensi (TUK) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="tuk"
                value={formData.tuk}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8AA53C]/30 focus:border-[#8AA53C]"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Daftar Unit Kompetensi */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
          <div className="px-5 py-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-md bg-[#F2F5E9] flex items-center justify-center text-[#5A7A22]">
                <Layers size={16} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-800">
                  B. Daftar Unit Kompetensi Sesuai Skema
                </h3>
                <p className="text-xs text-gray-500">
                  Total {UNIT_LIST.length} unit kompetensi yang akan diujikan
                </p>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50/80 text-gray-600 font-semibold border-b border-gray-200">
                <tr>
                  <th className="py-3 px-4 w-12 text-center">No</th>
                  <th className="py-3 px-4 w-44">Kode Unit</th>
                  <th className="py-3 px-4">Judul Unit Kompetensi</th>
                  <th className="py-3 px-4 w-44">Jenis Standar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                {UNIT_LIST.map((unit) => (
                  <tr key={unit.kode} className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-3 px-4 text-center font-medium text-gray-500">
                      {unit.no}
                    </td>
                    <td className="py-3 px-4 font-mono font-semibold text-[#5A7A22]">
                      {unit.kode}
                    </td>
                    <td className="py-3 px-4 font-medium text-gray-800">
                      {unit.judul}
                    </td>
                    <td className="py-3 px-4 text-gray-500">
                      {unit.standar}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-2">
          <Link
            href="/dashboard/fr/apl-01/rincian"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 text-xs font-semibold shadow-xs transition-colors"
          >
            <ArrowLeft size={15} />
            Kembali: Data Pemohon
          </Link>

          <div className="flex items-center gap-2.5">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <Save size={15} />
              Simpan Draf
            </button>

            <Link
              href="/dashboard/fr/apl-01/bukti-kelengkapan"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#8AA53C] hover:bg-[#789332] text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
            >
              Lanjutkan: Bukti Kelengkapan
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
