"use client";

import { useState, useEffect, useRef } from "react";
import { Check, Award, Save, Upload, Plus, X, Pencil } from "lucide-react";

const STORAGE_KEY = "fr-apl-01-form-data";

const inputClass =
  "w-full h-11 px-3.5 text-sm text-gray-800 bg-white rounded-xl border border-gray-300 focus:border-[#7E9631] focus:outline-none focus:ring-2 focus:ring-[#7E9631]/20 transition-all disabled:bg-gray-50 disabled:text-gray-400";

const inputClassSm =
  "w-full px-3 py-2 text-sm rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#8AA53C]/30 focus:border-[#8AA53C] transition-all disabled:bg-gray-50 disabled:text-gray-400";

function SectionDivider() {
  return <div className="border-t-2 border-dashed border-gray-200 my-2" />;
}

interface UnitKompetensiInput {
  kodeUnit: string;
  judulUnit: string;
}

interface PersyaratanItem {
  id: string;
  label: string;
  fileName: string;
  status: "Ada" | "Tidak ada";
  memenuhiSyarat: boolean;
  tidakMemenuhiSyarat: boolean;
}

interface LampiranItem {
  id: string;
  judul: string;
  fileName: string;
  url: string;
}

interface FormState {
  // Bagian 1 - Rincian
  namaLengkap: string;
  noKtp: string;
  tempatTglLahir: string;
  jenisKelamin: "Laki-laki" | "Perempuan";
  kebangsaan: string;
  alamatRumah: string;
  noTelepon: string;
  email: string;
  kualifikasiPendidikan: string;
  namaInstitusi: string;
  jabatan: string;
  alamatKantor: string;
  noTeleponKantor: string;
  emailKantor: string;
  // Bagian 2 - Data Sertifikasi
  judulSkema: string;
  nomorSkema: string;
  tujuanAsesmen: string[];
  units: UnitKompetensiInput[];
  // Bagian 3 - Bukti Kelengkapan
  persyaratanDasar: PersyaratanItem[];
  buktiAdministratif: PersyaratanItem[];
  lampiran: LampiranItem[];
  pemohonNama: string;
  pemohonTtd: string;
  adminNama: string;
  adminTtd: string;
  catatan: string;
}

const TUJUAN_OPTIONS = [
  "Sertifikasi",
  "Sertifikasi Ulang",
  "Pengakuan Kompetensi Terkini (PKT)",
  "Rekognisi Pembelajaran Lampau (RPL)",
  "Lainnya",
];

const DEFAULT_FORM: FormState = {
  namaLengkap: "",
  noKtp: "",
  tempatTglLahir: "",
  jenisKelamin: "Laki-laki",
  kebangsaan: "",
  alamatRumah: "",
  noTelepon: "",
  email: "",
  kualifikasiPendidikan: "",
  namaInstitusi: "",
  jabatan: "",
  alamatKantor: "",
  noTeleponKantor: "",
  emailKantor: "",
  judulSkema: "",
  nomorSkema: "",
  tujuanAsesmen: [],
  units: [
    { kodeUnit: "N.00MIC00.000.0", judulUnit: "" },
    { kodeUnit: "", judulUnit: "" },
  ],
  persyaratanDasar: [
    {
      id: "pd-1",
      label: "Fotokopi Surat Keterangan/SK pengangkatan ....",
      fileName: "",
      status: "Ada",
      memenuhiSyarat: false,
      tidakMemenuhiSyarat: false,
    },
  ],
  buktiAdministratif: [
    {
      id: "ba-1",
      label: "Fotokopi KTP/Paspor",
      fileName: "",
      status: "Ada",
      memenuhiSyarat: false,
      tidakMemenuhiSyarat: false,
    },
  ],
  lampiran: [
    { id: "lp-1", judul: "", fileName: "", url: "" },
    { id: "lp-2", judul: "", fileName: "", url: "" },
  ],
  pemohonNama: "",
  pemohonTtd: "",
  adminNama: "",
  adminTtd: "",
  catatan: "",
};

interface SectionProps {
  formData: FormState;
  updateField: (
    key: keyof FormState,
    value: FormState[keyof FormState],
  ) => void;
  isEditing: boolean;
}

function FileUploadField({
  value,
  onChange,
  isEditing,
  placeholder = "Unggah Dokumen",
}: {
  value: string;
  onChange: (fileName: string) => void;
  isEditing: boolean;
  placeholder?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      onClick={() => isEditing && inputRef.current?.click()}
      className={`flex items-center justify-between gap-2 h-11 px-3.5 rounded-xl border text-sm transition-all ${
        isEditing
          ? "border-gray-300 bg-white cursor-pointer hover:border-[#7E9631]"
          : "border-gray-200 bg-gray-50 cursor-default"
      }`}
    >
      <span
        className={`flex items-center gap-2 truncate ${value ? "text-gray-800" : "text-gray-400"}`}
      >
        <Upload size={15} className="text-gray-400 shrink-0" />
        <span className="truncate">{value || placeholder}</span>
      </span>
      {value && isEditing && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onChange("");
          }}
          className="text-gray-400 hover:text-red-500 shrink-0 cursor-pointer"
        >
          <X size={16} />
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        disabled={!isEditing}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onChange(file.name);
          e.target.value = "";
        }}
      />
    </div>
  );
}

function AdaTidakRadio({
  value,
  onChange,
  isEditing,
}: {
  value: "Ada" | "Tidak ada";
  onChange: (val: "Ada" | "Tidak ada") => void;
  isEditing: boolean;
}) {
  return (
    <div className="flex items-center gap-8">
      {(["Ada", "Tidak ada"] as const).map((opt) => (
        <label
          key={opt}
          onClick={() => isEditing && onChange(opt)}
          className={`inline-flex items-center gap-2.5 select-none ${
            isEditing ? "cursor-pointer" : "cursor-default"
          }`}
        >
          <div
            className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
              value === opt
                ? "border-[#7E9631] bg-[#7E9631]"
                : "border-gray-300 bg-white"
            }`}
          >
            {value === opt && <div className="w-2 h-2 rounded-full bg-white" />}
          </div>
          <span className="text-sm text-gray-700">{opt}</span>
        </label>
      ))}
    </div>
  );
}

function SyaratCheckboxes({
  memenuhi,
  tidakMemenuhi,
  onChangeMemenuhi,
  onChangeTidak,
  isEditing,
}: {
  memenuhi: boolean;
  tidakMemenuhi: boolean;
  onChangeMemenuhi: (v: boolean) => void;
  onChangeTidak: (v: boolean) => void;
  isEditing: boolean;
}) {
  return (
    <div className="space-y-2">
      <label
        className={`flex items-center gap-2.5 select-none w-fit ${
          isEditing ? "cursor-pointer" : "cursor-default"
        }`}
      >
        <input
          type="checkbox"
          checked={memenuhi}
          disabled={!isEditing}
          onChange={(e) => onChangeMemenuhi(e.target.checked)}
          className="w-4 h-4 rounded border-gray-300 text-[#8AA53C] focus:ring-[#8AA53C]/40 cursor-pointer disabled:cursor-default"
        />
        <span className="text-sm text-gray-700">Memenuhi Syarat</span>
      </label>
      <label
        className={`flex items-center gap-2.5 select-none w-fit ${
          isEditing ? "cursor-pointer" : "cursor-default"
        }`}
      >
        <input
          type="checkbox"
          checked={tidakMemenuhi}
          disabled={!isEditing}
          onChange={(e) => onChangeTidak(e.target.checked)}
          className="w-4 h-4 rounded border-gray-300 text-[#8AA53C] focus:ring-[#8AA53C]/40 cursor-pointer disabled:cursor-default"
        />
        <span className="text-sm text-gray-700">Tidak Memenuhi Syarat</span>
      </label>
    </div>
  );
}

function SignatureBox({
  label,
  value,
  onChange,
  isEditing,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  isEditing: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold text-gray-700">{label}</label>
      <div
        onClick={() => isEditing && inputRef.current?.click()}
        className={`h-28 rounded-xl border border-dashed flex items-center justify-center text-sm transition-all ${
          isEditing
            ? "border-gray-300 bg-white cursor-pointer hover:border-[#7E9631]"
            : "border-gray-200 bg-gray-50 cursor-default"
        }`}
      >
        {value ? (
          <span className="text-xs text-gray-600 px-3 text-center truncate">
            {value}
          </span>
        ) : (
          <Plus size={20} className="text-gray-300" />
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        disabled={!isEditing}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onChange(file.name);
          e.target.value = "";
        }}
      />
    </div>
  );
}

function PersyaratanList({
  items,
  onChange,
  isEditing,
}: {
  items: PersyaratanItem[];
  onChange: (items: PersyaratanItem[]) => void;
  isEditing: boolean;
}) {
  const updateItem = (id: string, patch: Partial<PersyaratanItem>) => {
    onChange(items.map((it) => (it.id === id ? { ...it, ...patch } : it)));
  };

  const addItem = () => {
    onChange([
      ...items,
      {
        id: `item-${Date.now()}`,
        label: "",
        fileName: "",
        status: "Ada",
        memenuhiSyarat: false,
        tidakMemenuhiSyarat: false,
      },
    ]);
  };

  const removeItem = (id: string) => {
    onChange(items.filter((it) => it.id !== id));
  };

  return (
    <div className="space-y-6">
      {items.map((item) => (
        <div
          key={item.id}
          className="space-y-2.5 pb-6 border-b border-gray-100 last:border-b-0 last:pb-0"
        >
          <div className="flex items-start justify-between gap-2">
            <input
              type="text"
              value={item.label}
              onChange={(e) => updateItem(item.id, { label: e.target.value })}
              disabled={!isEditing}
              placeholder="Nama dokumen persyaratan ...."
              className="flex-1 text-xs text-gray-500 bg-transparent border-none focus:outline-none focus:ring-0 disabled:text-gray-500 px-0 py-0"
            />
            {isEditing && items.length > 1 && (
              <button
                type="button"
                onClick={() => removeItem(item.id)}
                className="text-gray-300 hover:text-red-500 shrink-0 cursor-pointer"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <FileUploadField
            value={item.fileName}
            onChange={(v) => updateItem(item.id, { fileName: v })}
            isEditing={isEditing}
          />

          <AdaTidakRadio
            value={item.status}
            onChange={(v) => updateItem(item.id, { status: v })}
            isEditing={isEditing}
          />

          <SyaratCheckboxes
            memenuhi={item.memenuhiSyarat}
            tidakMemenuhi={item.tidakMemenuhiSyarat}
            onChangeMemenuhi={(v) => updateItem(item.id, { memenuhiSyarat: v })}
            onChangeTidak={(v) =>
              updateItem(item.id, { tidakMemenuhiSyarat: v })
            }
            isEditing={isEditing}
          />
        </div>
      ))}

      {isEditing && (
        <button
          type="button"
          onClick={addItem}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#8AA53C] hover:bg-[#789332] text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
        >
          Tambah
        </button>
      )}
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

function SectionRincian({ formData, updateField, isEditing }: SectionProps) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    updateField(name as keyof FormState, value);
  };

  const handleGenderChange = (val: "Laki-laki" | "Perempuan") => {
    updateField("jenisKelamin", val);
  };

  return (
    <section
      id="rincian"
      className="scroll-mt-6 bg-white rounded-2xl border border-gray-100 p-6 md:p-10 shadow-xs"
    >
      <div className="pb-6 border-b border-gray-100 mb-8">
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#F2F5E9] text-[#5A7A22] mb-2">
          FR.APL.01 — Bagian 1
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-[#344054] tracking-tight">
          Rincian Data Pemohon Sertifikasi
        </h2>
        <p className="text-xs md:text-sm text-gray-400 mt-1.5">
          Pada bagian ini, cantumkan data pribadi, data pendidikan formal, serta
          data pekerjaan anda pada saat ini.
        </p>
      </div>

      <div className="space-y-10">
        <div>
          <h3 className="text-base font-bold text-gray-800 mb-5">
            a. Data Pribadi
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-gray-600">
                Nama Lengkap
              </label>
              <input
                type="text"
                name="namaLengkap"
                value={formData.namaLengkap}
                onChange={handleChange}
                disabled={!isEditing}
                className={inputClass}
              />
            </div>
            <div className="hidden md:block" />

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-gray-600">
                No. KTP/NIK/Paspor
              </label>
              <input
                type="text"
                name="noKtp"
                value={formData.noKtp}
                onChange={handleChange}
                disabled={!isEditing}
                className={inputClass}
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-gray-600">
                Tempat/Tgl. Lahir
              </label>
              <input
                type="text"
                name="tempatTglLahir"
                value={formData.tempatTglLahir}
                onChange={handleChange}
                disabled={!isEditing}
                className={inputClass}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-semibold text-gray-600">
                Jenis Kelamin
              </label>
              <div className="flex items-center gap-6 h-10">
                {(["Laki-laki", "Perempuan"] as const).map((val) => (
                  <label
                    key={val}
                    onClick={() => isEditing && handleGenderChange(val)}
                    className={`inline-flex items-center gap-2.5 select-none group ${isEditing ? "cursor-pointer" : "cursor-default"}`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                        formData.jenisKelamin === val
                          ? "border-[#7E9631] bg-[#7E9631]"
                          : "border-gray-300 group-hover:border-gray-400 bg-white"
                      }`}
                    >
                      {formData.jenisKelamin === val && (
                        <div className="w-2 h-2 rounded-full bg-white" />
                      )}
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {val}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-gray-600">
                Kebangsaan
              </label>
              <input
                type="text"
                name="kebangsaan"
                value={formData.kebangsaan}
                onChange={handleChange}
                disabled={!isEditing}
                className={inputClass}
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-gray-600">
                Alamat Rumah
              </label>
              <textarea
                name="alamatRumah"
                value={formData.alamatRumah}
                onChange={handleChange}
                disabled={!isEditing}
                rows={4}
                className="w-full h-[120px] p-3 text-sm text-gray-800 bg-white rounded-xl border border-gray-300 focus:border-[#7E9631] focus:outline-none focus:ring-2 focus:ring-[#7E9631]/20 resize-none transition-all disabled:bg-gray-50 disabled:text-gray-400"
              />
            </div>
            <div className="hidden md:block" />

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-gray-600">
                No. Telepon (Rumah/HP/Kantor)
              </label>
              <input
                type="tel"
                name="noTelepon"
                value={formData.noTelepon}
                onChange={handleChange}
                disabled={!isEditing}
                className={inputClass}
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-gray-600">
                E-mail
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
                className={inputClass}
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-gray-600">
                Kualifikasi Pendidikan
              </label>
              <input
                type="text"
                name="kualifikasiPendidikan"
                value={formData.kualifikasiPendidikan}
                onChange={handleChange}
                disabled={!isEditing}
                className={inputClass}
              />
            </div>
            <div className="hidden md:block" />
          </div>
        </div>

        {/* b. Data Pekerjaan */}
        <div>
          <h3 className="text-base font-bold text-gray-800 mb-5">
            b. Data Pekerjaan Sekarang
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-gray-600">
                Nama Institusi / Perusahaan
              </label>
              <input
                type="text"
                name="namaInstitusi"
                value={formData.namaInstitusi}
                onChange={handleChange}
                disabled={!isEditing}
                className={inputClass}
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-gray-600">
                Jabatan
              </label>
              <input
                type="text"
                name="jabatan"
                value={formData.jabatan}
                onChange={handleChange}
                disabled={!isEditing}
                className={inputClass}
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-gray-600">
                Alamat Kantor
              </label>
              <textarea
                name="alamatKantor"
                value={formData.alamatKantor}
                onChange={handleChange}
                disabled={!isEditing}
                rows={4}
                className="w-full h-[120px] p-3 text-sm text-gray-800 bg-white rounded-xl border border-gray-300 focus:border-[#7E9631] focus:outline-none focus:ring-2 focus:ring-[#7E9631]/20 resize-none transition-all disabled:bg-gray-50 disabled:text-gray-400"
              />
            </div>
            <div className="hidden md:block" />

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-gray-600">
                No. Telepon/Fax
              </label>
              <input
                type="tel"
                name="noTeleponKantor"
                value={formData.noTeleponKantor}
                onChange={handleChange}
                disabled={!isEditing}
                className={inputClass}
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-gray-600">
                E-mail Kantor
              </label>
              <input
                type="email"
                name="emailKantor"
                value={formData.emailKantor}
                onChange={handleChange}
                disabled={!isEditing}
                className={inputClass}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionDataSertifikasi({
  formData,
  updateField,
  isEditing,
}: SectionProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateField(name as keyof FormState, value);
  };

  const toggleTujuan = (val: string) => {
    const next = formData.tujuanAsesmen.includes(val)
      ? formData.tujuanAsesmen.filter((v) => v !== val)
      : [...formData.tujuanAsesmen, val];
    updateField("tujuanAsesmen", next);
  };

  const handleUnitChange = (
    idx: number,
    field: keyof UnitKompetensiInput,
    value: string,
  ) => {
    const next = formData.units.map((u, i) =>
      i === idx ? { ...u, [field]: value } : u,
    );
    updateField("units", next);
  };

  const addUnitRow = () => {
    updateField("units", [...formData.units, { kodeUnit: "", judulUnit: "" }]);
  };

  const removeUnitRow = (idx: number) => {
    updateField(
      "units",
      formData.units.filter((_, i) => i !== idx),
    );
  };

  return (
    <section id="data-sertifikasi" className="scroll-mt-6 space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="px-5 py-4 bg-gray-50 border-b border-gray-200 flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md bg-[#F2F5E9] flex items-center justify-center text-[#5A7A22]">
            <Award size={16} />
          </div>
          <div>
            <h3 className="text-[#5A7A22] text-xs font-semibold">
              FR.APL.01 — Bagian 2
            </h3>
            <h3 className="text-lg font-bold text-gray-800">
              Data Sertifikasi
            </h3>
            <p className="text-xs text-gray-500">
              Tuliskan Judul dan Nomor Skema Sertifikasi yang anda ajukan
              berikut Daftar Unit Kompetensi sesuai kemasan pada Skema
              Sertifikasi untuk mendapatkan pengakuan sesuai dengan latar
              belakang pendidikan, pelatihan, serta pengalaman kerja yang anda
              miliki.
            </p>
          </div>
        </div>

        <div className="p-5 space-y-7">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700">
                Judul
              </label>
              <input
                type="text"
                name="judulSkema"
                value={formData.judulSkema}
                onChange={handleChange}
                disabled={!isEditing}
                className={inputClassSm}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700">
                Nomor
              </label>
              <input
                type="text"
                name="nomorSkema"
                value={formData.nomorSkema}
                onChange={handleChange}
                disabled={!isEditing}
                className={inputClassSm}
              />
            </div>
          </div>

          <div className="space-y-2.5">
            <label className="text-xs font-semibold text-gray-700 block">
              Tujuan Asesmen
            </label>
            <div className="space-y-2.5">
              {TUJUAN_OPTIONS.map((opt) => (
                <label
                  key={opt}
                  className={`flex items-center gap-2.5 select-none w-fit ${isEditing ? "cursor-pointer" : "cursor-default"}`}
                >
                  <input
                    type="checkbox"
                    checked={formData.tujuanAsesmen.includes(opt)}
                    disabled={!isEditing}
                    onChange={() => toggleTujuan(opt)}
                    className="w-4 h-4 rounded border-gray-300 text-[#8AA53C] focus:ring-[#8AA53C]/40 cursor-pointer disabled:cursor-default"
                  />
                  <span className="text-sm text-gray-700">{opt}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-gray-800">
                Daftar Unit Kompetensi sesuai kemasan:
              </label>
              {isEditing && (
                <button
                  type="button"
                  onClick={addUnitRow}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#7E9631] hover:text-[#6C8229] cursor-pointer"
                >
                  <Plus size={14} />
                  Tambah Unit
                </button>
              )}
            </div>

            <div className="hidden md:grid grid-cols-2 gap-4 px-0.5">
              <span className="text-xs font-semibold text-gray-700">
                Kode Unit
              </span>
              <span className="text-xs font-semibold text-gray-700">
                Judul Unit
              </span>
            </div>

            <div className="space-y-3">
              {formData.units.map((unit, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-3 items-center"
                >
                  <div className="space-y-1.5 md:hidden">
                    <span className="text-xs font-semibold text-gray-700">
                      Kode Unit
                    </span>
                  </div>
                  <input
                    type="text"
                    value={unit.kodeUnit}
                    onChange={(e) =>
                      handleUnitChange(idx, "kodeUnit", e.target.value)
                    }
                    disabled={!isEditing}
                    placeholder="N.00MIC00.000.0"
                    className={`${inputClassSm} font-mono`}
                  />
                  <div className="space-y-1.5 md:hidden">
                    <span className="text-xs font-semibold text-gray-700">
                      Judul Unit
                    </span>
                  </div>
                  <input
                    type="text"
                    value={unit.judulUnit}
                    onChange={(e) =>
                      handleUnitChange(idx, "judulUnit", e.target.value)
                    }
                    disabled={!isEditing}
                    className={inputClassSm}
                  />
                  {isEditing && (
                    <button
                      type="button"
                      onClick={() => removeUnitRow(idx)}
                      disabled={formData.units.length <= 1}
                      className="justify-self-end md:justify-self-center p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gray-400 transition-colors cursor-pointer disabled:cursor-default"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-700">
              Standar Kompetensi Kerja
            </label>
            <div className="bg-[#FAFBEA] border border-[#E3E6C8] rounded-lg p-4 text-xs text-gray-700 leading-relaxed">
              Keputusan Menteri Ketenagakerjaan Republik Indonesia{" "}
              <span className="font-bold">Nomor 123 Tahun 2024</span> tentang
              Penetapan Standar Kompetensi Kerja Nasional Indonesia Kategori
              Aktivitas Penyewaan dan Sewa Guna Usaha Tanpa Hak Opsi,
              Ketenagakerjaan, Agen Perjalanan dan Penunjang Usaha Lainnya
              Golongan Pokok Aktivitas Administrasi Kantor, Aktivitas Penunjang
              Kantor, Aktivitas Penunjang Usaha Lainnya Bidang Meeting,
              Incentive, Convention, and Exhibition (MICE)
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionBuktiKelengkapan({
  formData,
  updateField,
  isEditing,
}: SectionProps) {
  const updateLampiranItem = (id: string, patch: Partial<LampiranItem>) => {
    updateField(
      "lampiran",
      formData.lampiran.map((l) => (l.id === id ? { ...l, ...patch } : l)),
    );
  };

  const addLampiran = () => {
    updateField("lampiran", [
      ...formData.lampiran,
      { id: `lp-${Date.now()}`, judul: "", fileName: "", url: "" },
    ]);
  };

  const removeLampiran = (id: string) => {
    updateField(
      "lampiran",
      formData.lampiran.filter((l) => l.id !== id),
    );
  };

  return (
    <section id="bukti-kelengkapan" className="scroll-mt-6">
      <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="px-5 py-4 bg-gray-50 border-b border-gray-200">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#F2F5E9] text-[#5A7A22] mb-2">
            FR.APL.01 — Bagian 3
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-[#344054] tracking-tight">
            Bukti Kelengkapan Pemohon
          </h2>
        </div>

        <div className="p-5 md:p-6 space-y-8">
          <div className="space-y-5">
            <h3 className="text-base font-bold text-gray-800">
              3.1. Bukti Persyaratan Dasar Pemohon
            </h3>
            <PersyaratanList
              items={formData.persyaratanDasar}
              onChange={(items) => updateField("persyaratanDasar", items)}
              isEditing={isEditing}
            />
          </div>

          <div className="border-t border-dashed border-gray-200" />
          <div className="space-y-5">
            <h3 className="text-base font-bold text-gray-800">
              3.2. Bukti Administratif
            </h3>
            <PersyaratanList
              items={formData.buktiAdministratif}
              onChange={(items) => updateField("buktiAdministratif", items)}
              isEditing={isEditing}
            />

            <div className="bg-[#F2F5E9] rounded-lg p-4 space-y-2.5">
              <p className="text-xs font-semibold text-gray-700">
                Bukti Kelengkapan telah dibuka oleh:
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-gray-200 text-xs font-medium text-gray-700">
                  assesor <Check size={13} className="text-[#7E9631]" />
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-gray-200 text-xs font-medium text-gray-700">
                  Admin <Check size={13} className="text-[#7E9631]" />
                </span>
              </div>
            </div>
          </div>

          <div className="border-t border-dashed border-gray-200" />

          {/* 3.3 */}
          <div className="space-y-6">
            <h3 className="text-base font-bold text-gray-800">
              3.3. Lampiran Hasil Pekerjaan
            </h3>

            <div className="space-y-4">
              {formData.lampiran.map((item, idx) => (
                <div key={item.id} className="flex items-start gap-3">
                  <span className="text-sm font-semibold text-gray-500 mt-2.5 w-5 shrink-0">
                    {idx + 1}.
                  </span>
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={item.judul}
                      onChange={(e) =>
                        updateLampiranItem(item.id, { judul: e.target.value })
                      }
                      disabled={!isEditing}
                      placeholder="Judul"
                      className={inputClass}
                    />
                    <div className="space-y-3">
                      <FileUploadField
                        value={item.fileName}
                        onChange={(v) =>
                          updateLampiranItem(item.id, { fileName: v })
                        }
                        isEditing={isEditing}
                      />
                      <input
                        type="text"
                        value={item.url}
                        onChange={(e) =>
                          updateLampiranItem(item.id, { url: e.target.value })
                        }
                        disabled={!isEditing}
                        placeholder="URL"
                        className={inputClass}
                      />
                    </div>
                  </div>
                  {isEditing && formData.lampiran.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeLampiran(item.id)}
                      className="mt-2.5 text-gray-300 hover:text-red-500 shrink-0 cursor-pointer"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {isEditing && (
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={addLampiran}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#8AA53C] hover:bg-[#789332] text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
                >
                  <Plus size={14} />
                  Tambah Lampiran
                </button>
              </div>
            )}

            <div className="bg-[#F2F5E9] rounded-lg p-4 text-xs text-gray-700 leading-relaxed">
              <span className="font-bold text-gray-800">
                Rekomendasi (diisi oleh LSP):
              </span>{" "}
              Berdasarkan ketentuan persyaratan dasar, maka pemohon:{" "}
              <span className="font-bold text-[#5A7A22]">Diterima</span>/
              <span className="font-bold text-red-500">Tidak Diterima*</span>{" "}
              sebagai peserta sertifikasi.
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-gray-800">
                  Pemohon/Kandidat:
                </h4>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700">
                    Nama
                  </label>
                  <input
                    type="text"
                    value={formData.pemohonNama}
                    onChange={(e) => updateField("pemohonNama", e.target.value)}
                    disabled={!isEditing}
                    className={inputClass}
                  />
                </div>
                <SignatureBox
                  label="Tanda Tangan dan Tanggal"
                  value={formData.pemohonTtd}
                  onChange={(v) => updateField("pemohonTtd", v)}
                  isEditing={isEditing}
                />
              </div>
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-gray-800">Admin LSP:</h4>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700">
                    Nama
                  </label>
                  <input
                    type="text"
                    value={formData.adminNama}
                    onChange={(e) => updateField("adminNama", e.target.value)}
                    disabled={!isEditing}
                    className={inputClass}
                  />
                </div>
                <SignatureBox
                  label="Tanda Tangan dan Tanggal"
                  value={formData.adminTtd}
                  onChange={(v) => updateField("adminTtd", v)}
                  isEditing={isEditing}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700">
                Catatan
              </label>
              <textarea
                value={formData.catatan}
                onChange={(e) => updateField("catatan", e.target.value)}
                disabled={!isEditing}
                rows={4}
                className="w-full p-3 text-sm text-gray-800 bg-white rounded-xl border border-gray-300 focus:border-[#7E9631] focus:outline-none focus:ring-2 focus:ring-[#7E9631]/20 resize-none transition-all disabled:bg-gray-50 disabled:text-gray-400"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function APL01Page() {
  const [formData, setFormData] = useState<FormState>(DEFAULT_FORM);
  const [isEditing, setIsEditing] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<FormState>;
        setFormData((prev) => ({ ...prev, ...parsed }));
      }
    } catch (err) {
      console.error("Gagal memuat data tersimpan:", err);
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    } catch (err) {
      console.error("Gagal menyimpan data ke localStorage:", err);
    }
  }, [formData, loaded]);

  const updateField = (
    key: keyof FormState,
    value: FormState[keyof FormState],
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleUbah = () => setIsEditing(true);

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

      <div className="space-y-8">
        <SectionRincian
          formData={formData}
          updateField={updateField}
          isEditing={isEditing}
        />
        <SectionDivider />
        <SectionDataSertifikasi
          formData={formData}
          updateField={updateField}
          isEditing={isEditing}
        />
        <SectionDivider />
        <SectionBuktiKelengkapan
          formData={formData}
          updateField={updateField}
          isEditing={isEditing}
        />
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
