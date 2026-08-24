"use client";

import { useState } from "react";
import { Check, Pencil, Save } from "lucide-react";

const inputClass =
  "w-full px-3.5 py-2.5 text-sm text-gray-800 bg-white rounded-xl border border-gray-300 focus:border-[#7E9631] focus:outline-none focus:ring-2 focus:ring-[#7E9631]/20 transition-all disabled:bg-gray-50 disabled:text-gray-400";

const textareaClass =
  "w-full min-h-[88px] p-3 text-sm text-gray-800 bg-white rounded-xl border border-gray-300 focus:border-[#7E9631] focus:outline-none focus:ring-2 focus:ring-[#7E9631]/20 resize-none transition-all disabled:bg-gray-50 disabled:text-gray-400";

interface RadioOption {
  value: string;
  label: string;
}

interface CheckboxOption {
  value: string;
  label: string;
}

const STANDAR_INDUSTRI_OPTIONS: CheckboxOption[] = [
  { value: "standar-kompetensi", label: "Standar Kompetensi" },
  {
    value: "kriteria-kurikulum",
    label: "Kriteria asesmen dari kurikulum pelatihan",
  },
  {
    value: "spesifikasi-kinerja",
    label: "Spesifikasi kinerja suatu perusahaan atau industri",
  },
  { value: "spesifikasi-produk", label: "Spesifikasi Produk" },
  { value: "pedoman-khusus", label: "Pedoman khusus" },
];

const STANDAR_KOMPETENSI_DEFAULT_NOTE =
  "Keputusan Menteri Ketenagakerjaan Republik Indonesia Nomor 123 Tahun 2024 tentang Penetapan Standar Kompetensi Kerja Nasional Indonesia Kategori Aktivitas Penyewaan dan Sewa Guna Usaha Tanpa Hak Opsi, Ketenagakerjaan, Agen Perjalanan dan Penunjang Usaha Lainnya Golongan Pokok Aktivitas Administrasi Kantor, Aktivitas Penunjang Kantor, Aktivitas Penunjang Usaha Lainnya Bidang Meeting, Incentive, Convention, and Exhibition (MICE)";

function renderWithBoldSegment(text: string, boldPart: string) {
  const idx = text.indexOf(boldPart);
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <strong className="font-semibold text-gray-800">{boldPart}</strong>
      {text.slice(idx + boldPart.length)}
    </>
  );
}

const ASESI_OPTIONS: RadioOption[] = [
  {
    value: "pelatihan-terstandar",
    label:
      "Hasil pelatihan dan / atau pendidikan, dimana Kurikulum dan fasilitas praktek mampu telusur terhadap standar kompetensi",
  },
  {
    value: "pelatihan-belum-terstandar",
    label:
      "Hasil pelatihan dan / atau pendidikan, dimana kurikulum belum berbasis kompetensi",
  },
  {
    value: "pekerja-terstandar",
    label:
      "Pekerja berpengalaman, dimana berasal dari industri/tempat kerja yang dalam operasionalnya mampu telusur dengan standar kompetensi",
  },
  {
    value: "pekerja-belum-terstandar",
    label:
      "Pekerja berpengalaman, dimana berasal dari industri/tempat kerja yang dalam operasionalnya belum berbasis kompetensi",
  },
  {
    value: "otodidak",
    label: "Pelatihan / belajar mandiri atau otodidak",
  },
];

const TUJUAN_OPTIONS: RadioOption[] = [
  { value: "sertifikasi", label: "Sertifikasi" },
  { value: "pkt", label: "Pengakuan Kompetensi Terkini (PKT)" },
  { value: "rpl", label: "Rekognisi Pembelajaran Lampau (RPL)" },
  { value: "lainnya", label: "Lainnya" },
];

const LINGKUNGAN_OPTIONS: RadioOption[] = [
  { value: "nyata", label: "Tempat kerja nyata" },
  { value: "simulasi", label: "Tempat kerja simulasi" },
];

const PELUANG_OPTIONS: RadioOption[] = [
  { value: "tersedia", label: "Tersedia" },
  { value: "terbatas", label: "Terbatas" },
];

function RadioGroup({
  name,
  options,
  value,
  onChange,
  isEditing,
  inline = false,
}: {
  name: string;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  isEditing: boolean;
  inline?: boolean;
}) {
  return (
    <div className={inline ? "flex flex-wrap gap-x-10 gap-y-3" : "space-y-3"}>
      {options.map((opt) => {
        const checked = value === opt.value;
        return (
          <label
            key={opt.value}
            className={`flex items-start gap-3 text-sm text-gray-700 ${
              isEditing ? "cursor-pointer" : "cursor-default"
            }`}
          >
            <span className="relative flex items-center justify-center mt-0.5 shrink-0">
              <input
                type="radio"
                name={name}
                value={opt.value}
                checked={checked}
                disabled={!isEditing}
                onChange={() => onChange(opt.value)}
                className="peer sr-only"
              />
              <span
                className={`w-[18px] h-[18px] rounded-full border-2 transition-all flex items-center justify-center ${
                  checked
                    ? "border-[#7E9631] bg-[#7E9631]"
                    : "border-gray-300 bg-white"
                } ${!isEditing && !checked ? "opacity-70" : ""}`}
              >
                {checked && (
                  <span className="w-[6px] h-[6px] rounded-full bg-white" />
                )}
              </span>
            </span>
            <span className="leading-relaxed">{opt.label}</span>
          </label>
        );
      })}
    </div>
  );
}

function CheckboxGroup({
  name,
  options,
  values,
  onToggle,
  isEditing,
  renderDetail,
}: {
  name: string;
  options: CheckboxOption[];
  values: string[];
  onToggle: (value: string) => void;
  isEditing: boolean;
  renderDetail?: (value: string) => React.ReactNode;
}) {
  return (
    <div className="space-y-4">
      {options.map((opt) => {
        const checked = values.includes(opt.value);
        return (
          <div key={opt.value} className="space-y-3">
            <label
              className={`flex items-center gap-3 text-sm text-gray-700 ${
                isEditing ? "cursor-pointer" : "cursor-default"
              }`}
            >
              <span className="relative flex items-center justify-center shrink-0">
                <input
                  type="checkbox"
                  name={name}
                  checked={checked}
                  disabled={!isEditing}
                  onChange={() => onToggle(opt.value)}
                  className="peer sr-only"
                />
                <span
                  className={`w-[18px] h-[18px] rounded-md border-2 transition-all flex items-center justify-center ${
                    checked
                      ? "border-[#7E9631] bg-[#7E9631]"
                      : "border-gray-300 bg-white"
                  } ${!isEditing && !checked ? "opacity-70" : ""}`}
                >
                  {checked && (
                    <Check size={12} className="text-white stroke-[3]" />
                  )}
                </span>
              </span>
              <span>{opt.label}</span>
            </label>
            {checked && renderDetail && renderDetail(opt.value)}
          </div>
        );
      })}
    </div>
  );
}

function EditSaveControls({
  isEditing,
  savedSuccess,
  onUbah,
}: {
  isEditing: boolean;
  savedSuccess: boolean;
  onUbah: () => void;
}) {
  return (
    <div className="flex items-center gap-2.5 shrink-0">
      {savedSuccess && (
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F2F5E9] text-[#5A7A22] text-xs font-semibold border border-[#8AA53C]/30 animate-in fade-in">
          <Check size={14} className="stroke-[2.5]" />
          Tersimpan
        </div>
      )}
      <button
        type="button"
        onClick={onUbah}
        disabled={isEditing}
        className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
          isEditing
            ? "bg-gray-100 text-gray-400 border-gray-200 cursor-default"
            : "border-[#7E9631] text-[#7E9631] bg-white hover:bg-[#F2F5E9]"
        }`}
      >
        <Pencil size={13} />
        Ubah
      </button>
      <button
        type="submit"
        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-white bg-[#7E9631] hover:bg-[#6C8229] transition-all shadow-xs cursor-pointer"
      >
        <Save size={13} />
        Simpan
      </button>
    </div>
  );
}

export default function Mapa01Page() {
  const [judulSkema, setJudulSkema] = useState("");
  const [nomorSkema, setNomorSkema] = useState("");

  const [asesi, setAsesi] = useState("pelatihan-terstandar");
  const [tujuanAsesmen, setTujuanAsesmen] = useState("sertifikasi");
  const [lingkungan, setLingkungan] = useState("simulasi");
  const [peluangBukti, setPeluangBukti] = useState("tersedia");

  const [standarIndustri, setStandarIndustri] = useState<string[]>([
    "standar-kompetensi",
  ]);
  const [standarKompetensiNote, setStandarKompetensiNote] = useState(
    STANDAR_KOMPETENSI_DEFAULT_NOTE,
  );

  const [isEditing, setIsEditing] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleUbah = () => setIsEditing(true);

  const toggleStandarIndustri = (value: string) => {
    setStandarIndustri((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex justify-end">
        <EditSaveControls
          isEditing={isEditing}
          savedSuccess={savedSuccess}
          onUbah={handleUbah}
        />
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-10 shadow-xs space-y-10">
        {/* Skema Sertifikasi */}
        <div className="space-y-3">
          <h3 className="text-base font-bold text-gray-800">
            Skema Sertifikasi (KKNI/Okupasi/Klaster)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-600">
                Judul
              </label>
              <input
                type="text"
                value={judulSkema}
                onChange={(e) => setJudulSkema(e.target.value)}
                disabled={!isEditing}
                className={inputClass}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-600">
                Nomor
              </label>
              <input
                type="text"
                value={nomorSkema}
                onChange={(e) => setNomorSkema(e.target.value)}
                disabled={!isEditing}
                className={inputClass}
              />
            </div>
          </div>
        </div>

        <div className="border-t border-dashed border-gray-200" />

        {/* 1. Menentukan Pendekatan Asesmen */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-gray-800">
            1. Menentukan Pendekatan Asesmen
          </h2>

          <div className="space-y-8">
            <h3 className="text-lg font-bold text-gray-800">1.1</h3>

            {/* Asesi */}
            <div className="space-y-3">
              <p className="text-xs font-semibold text-gray-500">Asesi</p>
              <RadioGroup
                name="asesi"
                options={ASESI_OPTIONS}
                value={asesi}
                onChange={setAsesi}
                isEditing={isEditing}
              />
            </div>

            {/* Tujuan Asesmen */}
            <div className="space-y-3">
              <p className="text-xs font-semibold text-gray-500">
                Tujuan Asesmen
              </p>
              <RadioGroup
                name="tujuan-asesmen"
                options={TUJUAN_OPTIONS}
                value={tujuanAsesmen}
                onChange={setTujuanAsesmen}
                isEditing={isEditing}
              />
            </div>

            {/* Konteks Asesmen */}
            <div className="space-y-5">
              <p className="text-xs font-semibold text-gray-500">
                Konteks Asesmen
              </p>

              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">Lingkungan</p>
                <RadioGroup
                  name="lingkungan"
                  options={LINGKUNGAN_OPTIONS}
                  value={lingkungan}
                  onChange={setLingkungan}
                  isEditing={isEditing}
                  inline
                />
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">
                  Peluang untuk mengumpulkan bukti dalam sejumlah situasi
                </p>
                <RadioGroup
                  name="peluang-bukti"
                  options={PELUANG_OPTIONS}
                  value={peluangBukti}
                  onChange={setPeluangBukti}
                  isEditing={isEditing}
                  inline
                />
              </div>
            </div>
          </div>

          {/* 1.2 */}
          <div className="space-y-4 pt-2">
            <h3 className="text-lg font-bold text-gray-800">1.2</h3>

            <div className="space-y-3">
              <p className="text-xs font-semibold text-gray-500">
                Standar Industri atau Tempat Kerja
              </p>
              <CheckboxGroup
                name="standar-industri"
                options={STANDAR_INDUSTRI_OPTIONS}
                values={standarIndustri}
                onToggle={toggleStandarIndustri}
                isEditing={isEditing}
                renderDetail={(value) =>
                  value === "standar-kompetensi" ? (
                    <div className="rounded-xl border border-[#EDE6C8] bg-[#F7F4E7] p-4">
                      {isEditing ? (
                        <textarea
                          value={standarKompetensiNote}
                          onChange={(e) =>
                            setStandarKompetensiNote(e.target.value)
                          }
                          rows={3}
                          className="w-full bg-transparent text-sm text-gray-700 leading-relaxed focus:outline-none resize-none"
                        />
                      ) : (
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {renderWithBoldSegment(
                            standarKompetensiNote,
                            "Nomor 123 Tahun 2024",
                          )}
                        </p>
                      )}
                    </div>
                  ) : null
                }
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <EditSaveControls
          isEditing={isEditing}
          savedSuccess={savedSuccess}
          onUbah={handleUbah}
        />
      </div>
    </form>
  );
}
