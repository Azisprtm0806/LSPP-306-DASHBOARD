"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FileCheck,
  Upload,
  CheckCircle2,
  AlertCircle,
  FileText,
  ArrowLeft,
  Send,
  Save,
} from "lucide-react";

interface DokumenItem {
  id: string;
  nama: string;
  wajib: boolean;
  keterangan: string;
  fileName?: string;
  fileSize?: string;
  status: "uploaded" | "empty";
}

const INITIAL_DOCS: DokumenItem[] = [
  {
    id: "ktp",
    nama: "Salinan KTP / Kartu Identitas Resmi",
    wajib: true,
    keterangan: "Format PDF/JPG/PNG maksimal 2MB",
    fileName: "KTP_Ahmad_Riyadh.pdf",
    fileSize: "420 KB",
    status: "uploaded",
  },
  {
    id: "ijazah",
    nama: "Salinan Ijazah Pendidikan Terakhir",
    wajib: true,
    keterangan: "Ijazah D3/S1 Perhotelan / Pariwisata",
    fileName: "Ijazah_D3_Perhotelan.pdf",
    fileSize: "1.2 MB",
    status: "uploaded",
  },
  {
    id: "cv",
    nama: "Surat Pengalaman Kerja / Curriculum Vitae (CV)",
    wajib: true,
    keterangan: "Surat keterangan kerja min. 1 tahun di industri terkait",
    fileName: "Surat_Keterangan_GrandSahid.pdf",
    fileSize: "850 KB",
    status: "uploaded",
  },
  {
    id: "foto",
    nama: "Pas Foto 3x4 (Latar Belakang Merah)",
    wajib: true,
    keterangan: "Format JPG/PNG foto formal rapi",
    fileName: "PasFoto_3x4_Ahmad.jpg",
    fileSize: "310 KB",
    status: "uploaded",
  },
  {
    id: "sertifikat",
    nama: "Sertifikat Pelatihan / Bukti Kompetensi Tambahan",
    wajib: false,
    keterangan: "Dokumen sertifikat kursus/workshop bidang perhotelan (opsional)",
    fileName: undefined,
    fileSize: undefined,
    status: "empty",
  },
];

export default function APL01BuktiKelengkapanPage() {
  const [docs, setDocs] = useState<DokumenItem[]>(INITIAL_DOCS);
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSimpanDraf = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      alert("Harap centang persetujuan keabsahan dokumen sebelum mengirimkan.");
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#F2F5E9] text-[#5A7A22] mb-1">
            FR.APL.01 - Bagian 3
          </div>
          <h2 className="text-xl font-bold text-gray-800">
            Bukti Kelengkapan Dokumen Pemohon
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Unggah dokumen persyaratan dasar untuk diverifikasi kelayakan administrasinya oleh admin LSPP 306.
          </p>
        </div>

        {savedSuccess && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-medium border border-emerald-200 animate-in fade-in">
            <CheckCircle2 size={16} />
            Draf berhasil disimpan
          </div>
        )}
      </div>

      {submitted ? (
        <div className="bg-white p-8 rounded-xl border border-emerald-200 text-center space-y-4 shadow-sm animate-in fade-in">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 size={36} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">
              Permohonan Sertifikasi Berhasil Dikirim!
            </h3>
            <p className="text-xs text-gray-600 max-w-md mx-auto mt-1">
              Dokumen FR.APL.01 Anda telah tersimpan dan masuk dalam antrian verifikasi berkas oleh Tim Admin LSPP 306.
            </p>
          </div>
          <div className="pt-2 flex justify-center gap-3">
            <Link
              href="/dashboard/fr/apl-02"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#8AA53C] hover:bg-[#789332] text-white text-xs font-bold shadow-xs transition-colors"
            >
              Lanjutkan ke FR.APL.02 (Asesmen Mandiri)
            </Link>
            <button
              onClick={() => setSubmitted(false)}
              className="px-4 py-2.5 rounded-lg border border-gray-300 text-gray-700 text-xs font-semibold hover:bg-gray-50"
            >
              Edit Kembali
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section: Upload Berkas Persyaratan Dasar */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
            <div className="px-5 py-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-md bg-[#F2F5E9] flex items-center justify-center text-[#5A7A22]">
                  <FileCheck size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-800">
                    A. Bukti Persyaratan Dasar Pemohon
                  </h3>
                  <p className="text-xs text-gray-500">
                    Pastikan seluruh dokumen wajib telah terunggah dengan jelas dan terbaca
                  </p>
                </div>
              </div>
            </div>

            <div className="divide-y divide-gray-100">
              {docs.map((doc, idx) => (
                <div
                  key={doc.id}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50/50 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-xs font-bold text-gray-800">{doc.nama}</p>
                        {doc.wajib ? (
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-red-50 text-red-600 border border-red-100">
                            Wajib
                          </span>
                        ) : (
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-gray-100 text-gray-600">
                            Opsional
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-gray-500 mt-0.5">{doc.keterangan}</p>

                      {doc.fileName && (
                        <div className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 rounded bg-[#F2F5E9] text-[#5A7A22] text-xs font-medium border border-[#8AA53C]/30">
                          <FileText size={13} />
                          <span>{doc.fileName}</span>
                          <span className="text-gray-400 text-[10px]">({doc.fileSize})</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-xs font-semibold text-gray-700 shadow-xs transition-colors">
                      <Upload size={14} className="text-gray-500" />
                      <span>{doc.fileName ? "Ganti Berkas" : "Unggah Berkas"}</span>
                      <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" />
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Pernyataan Pemohon */}
          <div className="bg-[#FAFBF7] p-5 rounded-xl border border-[#8AA53C]/30 space-y-3">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="agreement"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1 w-4 h-4 rounded text-[#8AA53C] focus:ring-[#8AA53C] border-gray-300 cursor-pointer"
              />
              <label htmlFor="agreement" className="text-xs text-gray-700 leading-relaxed cursor-pointer select-none">
                <span className="font-bold text-gray-800">Pernyataan Pemohon:</span> Dengan ini saya menyatakan bahwa data yang saya cantumkan dalam formulir FR.APL.01 ini adalah benar dan dapat dipertanggungjawabkan keabsahannya. Saya bersedia mengikuti seluruh tahapan proses asesmen sesuai ketentuan LSPP 306 dan BNSP.
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-2">
            <Link
              href="/dashboard/fr/apl-01/data-sertifikasi"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 text-xs font-semibold shadow-xs transition-colors"
            >
              <ArrowLeft size={15} />
              Kembali: Data Sertifikasi
            </Link>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={handleSimpanDraf}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              >
                <Save size={15} />
                Simpan Draf
              </button>

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#8AA53C] hover:bg-[#789332] text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
              >
                <Send size={15} />
                Kirim Permohonan Sertifikasi
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
