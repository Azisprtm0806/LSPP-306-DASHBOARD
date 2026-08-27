"use client";

import { useState, useEffect, useRef } from "react";
import { Check, Save, Upload, Plus, X, Pencil } from "lucide-react";

const STORAGE_KEY = "fr-apl-01-form-data";

/* ---------------------------------------------------------------------- */
/* Shared style tokens                                                     */
/* ---------------------------------------------------------------------- */

const lineInputClass =
  "w-full bg-transparent border-0 border-b border-gray-300 focus:border-[#7E9631] focus:outline-none focus:ring-0 text-sm text-gray-800 px-0.5 py-1.5 disabled:text-gray-700 transition-colors";

const cellInputClass =
  "w-full bg-transparent border-0 border-b border-gray-300 focus:border-[#7E9631] focus:outline-none focus:ring-0 text-sm text-gray-800 px-0.5 py-1 disabled:text-gray-700 transition-colors";

const tableCellClass = "border border-gray-300 px-3 py-2.5 align-top";
const tableHeadClass =
  "border border-gray-300 px-3 py-2.5 align-middle text-xs font-semibold text-gray-700 bg-gray-50 text-center";

function SectionDivider() {
  return <div className="border-t-2 border-dashed border-gray-200 my-2" />;
}

/* ---------------------------------------------------------------------- */
/* Types                                                                   */
/* ---------------------------------------------------------------------- */

interface UnitKompetensiInput {
  kodeUnit: string;
  judulUnit: string;
}

interface PersyaratanItem {
  id: string;
  label: string;
  fileName: string;
  memenuhiSyarat: boolean;
  tidakMemenuhiSyarat: boolean;
  tidakAda: boolean;
}

interface LampiranItem {
  id: string;
  judul: string;
  fileName: string;
  url: string;
}

interface FormState {
  // Bagian 1 - Rincian - a. Data Pribadi
  namaLengkap: string;
  noKtp: string;
  tempatTglLahir: string;
  jenisKelamin: "Laki-laki" | "Perempuan";
  kebangsaan: string;
  alamatRumah: string;
  kodePosRumah: string;
  teleponRumah: string;
  teleponKantorPribadi: string;
  teleponHp: string;
  email: string;
  kualifikasiPendidikan: string;
  // b. Data Pekerjaan Sekarang
  namaInstitusi: string;
  jabatan: string;
  alamatKantor: string;
  kodePosKantor: string;
  telpKantor: string;
  faxKantor: string;
  emailKantor: string;
  kualifikasiPendidikanKerja: string;
  // Bagian 2 - Data Sertifikasi
  judulSkema: string;
  nomorSkema: string;
  tujuanAsesmen: string[];
  units: UnitKompetensiInput[];
  standarKompetensi: string;
  // Bagian 3 - Bukti Kelengkapan
  persyaratanDasar: PersyaratanItem[];
  buktiAdministratif: PersyaratanItem[];
  lampiran: LampiranItem[];
  rekomendasi: "Diterima" | "Tidak diterima" | "";
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
  kodePosRumah: "",
  teleponRumah: "",
  teleponKantorPribadi: "",
  teleponHp: "",
  email: "",
  kualifikasiPendidikan: "",
  namaInstitusi: "",
  jabatan: "",
  alamatKantor: "",
  kodePosKantor: "",
  telpKantor: "",
  faxKantor: "",
  emailKantor: "",
  kualifikasiPendidikanKerja: "",
  judulSkema: "MEETING/CONFERENCE PROJECT MANAGER",
  nomorSkema: "005/LSPP306/V/2026",
  tujuanAsesmen: [],
  units: [
    {
      kodeUnit: "I.55HDR00.217.2",
      judulUnit:
        "Berkomunikasi Secara Lisan Dalam Bahasa Inggris pada Tingkat Operasional Dasar",
    },
    {
      kodeUnit: "I.55HDR00.149.2",
      judulUnit: "Melakukan Kerjasama dengan Kolega dan Pelanggan",
    },
    {
      kodeUnit: "I.55HDR00.150.2",
      judulUnit: "Melakukan Kerja dalam Lingkungan Sosial yang Beragam",
    },
    {
      kodeUnit: "I.55HDR00.151.2",
      judulUnit:
        "Mengikuti Prosedur Kesehatan, Keselamatan dan Keamanan di Tempat Kerja",
    },
    {
      kodeUnit: "N.82MIC00.023.1",
      judulUnit: "Melakukan Komunikasi Melalui Elektronik",
    },
    {
      kodeUnit: "I.55HDR00.153.2",
      judulUnit: "Memperbaharui Pengetahuan Lokal",
    },
    {
      kodeUnit: "N.82MIC00.104.2",
      judulUnit:
        "Menetapkan dan Menerapkan Pengetahuan Industri Meeting, Incentive, Convention, & Exhibition (MICE)",
    },
    {
      kodeUnit: "N.82MIC00.100.2",
      judulUnit: "Mengoperasikan Sistem Informasi Online",
    },
  ],
  standarKompetensi:
    "1. Keputusan Menteri Ketenagakerjaan Republik Indonesia Nomor 145 Tahun 2018 tentang Penetapan Standar Kompetensi Kerja Nasional Indonesia Kategori Penyediaan Akomodasi Dan Penyediaan Makan Minum Golongan Pokok Penyediaan Akomodasi Bidang Hotel dan Restoran.\n2. Keputusan Menteri Ketenagakerjaan Republik Indonesia Nomor 123 Tahun 2024 tentang Penetapan Standar Kompetensi Kerja Nasional Indonesia Kategori Aktivitas Penyewaan dan Sewa Guna Usaha Tanpa Hak Opsi, Ketenagakerjaan, Agen Perjalanan dan Penunjang Usaha Lainnya Golongan Pokok Aktivitas Administrasi Kantor, Aktivitas Penunjang Kantor, Aktivitas Penunjang Usaha Lainnya Bidang Meeting, Incentive, Convention, and Exhibition (MICE).",
  persyaratanDasar: [
    {
      id: "pd-1",
      label:
        "Fotokopi Surat Keterangan/SK pengangkatan/Kontrak kerja jabatan Meeting/Conference Project Manager, atau;",
      fileName: "",
      memenuhiSyarat: false,
      tidakMemenuhiSyarat: false,
      tidakAda: false,
    },
    {
      id: "pd-2",
      label:
        "Fotokopi Surat Keterangan pengalaman kerja pada jabatan Meeting/Conference Project Manager minimal 1 (satu) tahun, atau;",
      fileName: "",
      memenuhiSyarat: false,
      tidakMemenuhiSyarat: false,
      tidakAda: false,
    },
    {
      id: "pd-3",
      label:
        "Fotokopi Sertifikat pelatihan berbasis kompetensi okupasi Meeting/Conference Project Manager yang diterbitkan oleh Lembaga Pelatihan Vokasi, atau;",
      fileName: "",
      memenuhiSyarat: false,
      tidakMemenuhiSyarat: false,
      tidakAda: false,
    },
    {
      id: "pd-4",
      label:
        "Fotokopi Kartu Hasil Studi/Transkip Nilai mahasiswa diploma atau strata 1 bidang pariwisata yang tercantum mata kuliah mencakup seluruh unit kompetensi pada jabatan Meeting/Conference Project Manager dan Fotokopi Surat Keterangan/ Sertifikat praktek industri/magang pada Subbidang Meeting/Conference",
      fileName: "",
      memenuhiSyarat: false,
      tidakMemenuhiSyarat: false,
      tidakAda: false,
    },
  ],
  buktiAdministratif: [
    {
      id: "ba-1",
      label: "Fotokopi KTP/Paspor",
      fileName: "",
      memenuhiSyarat: false,
      tidakMemenuhiSyarat: false,
      tidakAda: false,
    },
    {
      id: "ba-2",
      label:
        "Pas Photo Berlatar belakang merah 3x4 (terkini, tiga bulan terakhir)",
      fileName: "",
      memenuhiSyarat: false,
      tidakMemenuhiSyarat: false,
      tidakAda: false,
    },
  ],
  lampiran: [
    { id: "lp-1", judul: "", fileName: "", url: "" },
    { id: "lp-2", judul: "", fileName: "", url: "" },
  ],
  rekomendasi: "",
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

/* ---------------------------------------------------------------------- */
/* Small primitives                                                        */
/* ---------------------------------------------------------------------- */

function FieldRow({
  label,
  name,
  value,
  onChange,
  isEditing,
  type = "text",
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isEditing: boolean;
  type?: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <span className="w-44 shrink-0 text-sm text-gray-500">{label}</span>
      <span className="text-sm text-gray-400 shrink-0">:</span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        disabled={!isEditing}
        className={lineInputClass}
      />
    </div>
  );
}

function SubFieldRow({
  label,
  name,
  value,
  onChange,
  isEditing,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isEditing: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-14 shrink-0 text-sm text-gray-500">{label}</span>
      <span className="text-sm text-gray-400 shrink-0">:</span>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        disabled={!isEditing}
        className={lineInputClass}
      />
    </div>
  );
}

function FileUploadTrigger({
  value,
  onChange,
  isEditing,
}: {
  value: string;
  onChange: (fileName: string) => void;
  isEditing: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="mt-1.5">
      <button
        type="button"
        onClick={() => isEditing && inputRef.current?.click()}
        disabled={!isEditing}
        className={`inline-flex items-center gap-1.5 text-xs ${
          value ? "text-gray-600" : "text-gray-400"
        } ${isEditing ? "hover:text-[#7E9631] cursor-pointer" : "cursor-default"}`}
      >
        <Upload size={12} />
        <span className="truncate max-w-[220px]">
          {value || "Unggah Dokumen"}
        </span>
        {value && isEditing && (
          <X
            size={12}
            className="hover:text-red-500"
            onClick={(e) => {
              e.stopPropagation();
              onChange("");
            }}
          />
        )}
      </button>
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
    <div className="flex items-start gap-3">
      <span className="w-32 shrink-0 text-xs text-gray-500 pt-3">{label}</span>
      <div
        onClick={() => isEditing && inputRef.current?.click()}
        className={`flex-1 h-20 rounded-md border border-dashed flex items-center justify-center text-xs transition-all ${
          isEditing
            ? "border-gray-300 bg-white cursor-pointer hover:border-[#7E9631]"
            : "border-gray-200 bg-gray-50/50 cursor-default"
        }`}
      >
        {value ? (
          <span className="text-xs text-gray-600 px-3 text-center truncate">
            {value}
          </span>
        ) : (
          <Plus size={18} className="text-gray-300" />
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

function TableCheckbox({
  checked,
  onChange,
  isEditing,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  isEditing: boolean;
}) {
  return (
    <div className="flex items-center justify-center">
      <input
        type="checkbox"
        checked={!!checked}
        disabled={!isEditing}
        onChange={(e) => onChange(e.target.checked)}
        className="w-4 h-4 rounded-sm border-gray-400 text-[#7E9631] focus:ring-[#8AA53C]/40 cursor-pointer disabled:cursor-default"
      />
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

/* ---------------------------------------------------------------------- */
/* Bagian 1 - Rincian Data Pemohon                                         */
/* ---------------------------------------------------------------------- */

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
    <section id="rincian" className="scroll-mt-28">
      <div className="mb-6">
        <p className="text-sm font-semibold text-gray-500">Bagian 1:</p>
        <h2 className="text-2xl md:text-[28px] font-bold text-gray-800 tracking-tight">
          Rincian Data Pemohon Sertifikasi
        </h2>
        <p className="text-xs md:text-sm text-gray-400 mt-1.5">
          Pada bagian ini, cantumkan data pribadi, data pendidikan formal, serta
          data pekerjaan anda pada saat ini.
        </p>
      </div>

      <div className="space-y-8">
        {/* a. Data Pribadi */}
        <div>
          <h3 className="text-sm font-bold text-gray-800 mb-4">
            a. Data Pribadi
          </h3>
          <div className="space-y-3.5">
            <FieldRow
              label="Nama Lengkap"
              name="namaLengkap"
              value={formData.namaLengkap}
              onChange={handleChange}
              isEditing={isEditing}
            />
            <FieldRow
              label="No. KTP/NIK/Paspor"
              name="noKtp"
              value={formData.noKtp}
              onChange={handleChange}
              isEditing={isEditing}
            />
            <FieldRow
              label="Tempat/Tgl. Lahir"
              name="tempatTglLahir"
              value={formData.tempatTglLahir}
              onChange={handleChange}
              isEditing={isEditing}
            />

            <div className="flex items-center gap-4">
              <span className="w-44 shrink-0 text-sm text-gray-500">
                Jenis Kelamin
              </span>
              <span className="text-sm text-gray-400 shrink-0">:</span>
              <div className="flex items-center gap-6">
                {(["Laki-laki", "Perempuan"] as const).map((val, i) => (
                  <label
                    key={val}
                    onClick={() => isEditing && handleGenderChange(val)}
                    className={`inline-flex items-center gap-2 select-none text-sm ${
                      isEditing ? "cursor-pointer" : "cursor-default"
                    } ${
                      formData.jenisKelamin === val
                        ? "text-gray-800 font-medium"
                        : "text-gray-400"
                    }`}
                  >
                    <span
                      className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                        formData.jenisKelamin === val
                          ? "border-[#7E9631]"
                          : "border-gray-300"
                      }`}
                    >
                      {formData.jenisKelamin === val && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#7E9631]" />
                      )}
                    </span>
                    {val === "Laki-laki" ? "Laki-Laki" : "Wanita"}
                    {i === 0 && <span className="text-gray-300">/</span>}
                  </label>
                ))}
                <span className="text-gray-400">*</span>
              </div>
            </div>

            <FieldRow
              label="Kebangsaan"
              name="kebangsaan"
              value={formData.kebangsaan}
              onChange={handleChange}
              isEditing={isEditing}
            />
            <FieldRow
              label="Alamat Rumah"
              name="alamatRumah"
              value={formData.alamatRumah}
              onChange={handleChange}
              isEditing={isEditing}
            />

            <div className="flex items-center gap-4">
              <span className="w-44 shrink-0" />
              <span className="w-3 shrink-0" />
              <div className="flex-1 flex items-center gap-3">
                <span className="text-sm text-gray-500 shrink-0">Kode Pos</span>
                <span className="text-sm text-gray-400 shrink-0">:</span>
                <input
                  type="text"
                  name="kodePosRumah"
                  value={formData.kodePosRumah}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`${lineInputClass} max-w-[160px]`}
                />
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="w-44 shrink-0 text-sm text-gray-500 pt-1.5">
                No. Telepon/E-Mail
              </span>
              <span className="text-sm text-gray-400 shrink-0 pt-1.5">:</span>
              <div className="flex-1 space-y-3.5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <SubFieldRow
                    label="Rumah"
                    name="teleponRumah"
                    value={formData.teleponRumah}
                    onChange={handleChange}
                    isEditing={isEditing}
                  />
                  <SubFieldRow
                    label="Kantor"
                    name="teleponKantorPribadi"
                    value={formData.teleponKantorPribadi}
                    onChange={handleChange}
                    isEditing={isEditing}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <SubFieldRow
                    label="HP"
                    name="teleponHp"
                    value={formData.teleponHp}
                    onChange={handleChange}
                    isEditing={isEditing}
                  />
                  <SubFieldRow
                    label="E-Mail"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    isEditing={isEditing}
                  />
                </div>
              </div>
            </div>

            <FieldRow
              label="Kualifikasi Pendidikan"
              name="kualifikasiPendidikan"
              value={formData.kualifikasiPendidikan}
              onChange={handleChange}
              isEditing={isEditing}
            />
          </div>
          <p className="text-xs italic text-gray-400 mt-3">
            *coret yang tidak perlu
          </p>
        </div>

        {/* b. Data Pekerjaan */}
        <div>
          <h3 className="text-sm font-bold text-gray-800 mb-4">
            b. Data Pekerjaan Sekarang
          </h3>
          <div className="space-y-3.5">
            <FieldRow
              label="Nama Institusi/ Perusahaan"
              name="namaInstitusi"
              value={formData.namaInstitusi}
              onChange={handleChange}
              isEditing={isEditing}
            />
            <FieldRow
              label="jabatan"
              name="jabatan"
              value={formData.jabatan}
              onChange={handleChange}
              isEditing={isEditing}
            />
            <FieldRow
              label="Alamat Kantor"
              name="alamatKantor"
              value={formData.alamatKantor}
              onChange={handleChange}
              isEditing={isEditing}
            />

            <div className="flex items-center gap-4">
              <span className="w-44 shrink-0" />
              <span className="w-3 shrink-0" />
              <div className="flex-1 flex items-center gap-3">
                <span className="text-sm text-gray-500 shrink-0">Kode Pos</span>
                <span className="text-sm text-gray-400 shrink-0">:</span>
                <input
                  type="text"
                  name="kodePosKantor"
                  value={formData.kodePosKantor}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`${lineInputClass} max-w-[160px]`}
                />
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="w-44 shrink-0 text-sm text-gray-500 pt-1.5">
                No. Telepon/E-Mail
              </span>
              <span className="text-sm text-gray-400 shrink-0 pt-1.5">:</span>
              <div className="flex-1 space-y-3.5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <SubFieldRow
                    label="Telp"
                    name="telpKantor"
                    value={formData.telpKantor}
                    onChange={handleChange}
                    isEditing={isEditing}
                  />
                  <SubFieldRow
                    label="Fax"
                    name="faxKantor"
                    value={formData.faxKantor}
                    onChange={handleChange}
                    isEditing={isEditing}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <SubFieldRow
                    label="E-Mail"
                    name="emailKantor"
                    value={formData.emailKantor}
                    onChange={handleChange}
                    isEditing={isEditing}
                  />
                  <span />
                </div>
              </div>
            </div>

            <FieldRow
              label="Kualifikasi Pendidikan"
              name="kualifikasiPendidikanKerja"
              value={formData.kualifikasiPendidikanKerja}
              onChange={handleChange}
              isEditing={isEditing}
            />
          </div>
          <p className="text-xs italic text-gray-400 mt-3">
            *coret yang tidak perlu
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------- */
/* Bagian 2 - Data Sertifikasi                                             */
/* ---------------------------------------------------------------------- */

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
    <section id="data-sertifikasi" className="scroll-mt-28">
      <div className="mb-6">
        <p className="text-sm font-semibold text-gray-500">Bagian 2:</p>
        <h2 className="text-2xl md:text-[28px] font-bold text-gray-800 tracking-tight">
          Data Sertifikasi
        </h2>
        <p className="text-xs md:text-sm text-gray-400 mt-1.5 max-w-3xl">
          Tuliskan Judul dan Nomor Skema Sertifikasi yang anda ajukan berikut
          Daftar Unit Kompetensi sesuai kemasan pada Skema Sertifikasi untuk
          mendapatkan pengakuan sesuai dengan latar belakang pendidikan,
          pelatihan, serta pengalaman kerja yang anda miliki.
        </p>
      </div>

      <div className="space-y-6">
        <table className="w-full border border-gray-300 border-collapse text-sm">
          <tbody>
            <tr>
              <td
                rowSpan={3}
                className={`${tableCellClass} w-56 font-semibold text-gray-800 bg-gray-50`}
              >
                Skema Sertifikasi
                <br />
                <span className="text-xs font-normal text-gray-500">
                  (KKNI/Okupasi/Klaster)
                </span>
              </td>
              <td className={`${tableCellClass} w-32 text-gray-600`}>Judul</td>
              <td className={`${tableCellClass} w-4 text-gray-400 text-center`}>
                :
              </td>
              <td className={tableCellClass}>
                <input
                  type="text"
                  name="judulSkema"
                  value={formData.judulSkema}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={cellInputClass}
                />
              </td>
            </tr>
            <tr>
              <td className={`${tableCellClass} text-gray-600`}>Nomor</td>
              <td className={`${tableCellClass} text-gray-400 text-center`}>
                :
              </td>
              <td className={tableCellClass}>
                <input
                  type="text"
                  name="nomorSkema"
                  value={formData.nomorSkema}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={cellInputClass}
                />
              </td>
            </tr>
            <tr>
              <td className={`${tableCellClass} text-gray-600`}>
                Tujuan Asesmen
              </td>
              <td className={`${tableCellClass} text-gray-400 text-center`}>
                :
              </td>
              <td className={tableCellClass}>
                <div className="space-y-2">
                  {TUJUAN_OPTIONS.map((opt) => (
                    <label
                      key={opt}
                      className={`flex items-center gap-2.5 select-none w-fit ${
                        isEditing ? "cursor-pointer" : "cursor-default"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.tujuanAsesmen.includes(opt)}
                        disabled={!isEditing}
                        onChange={() => toggleTujuan(opt)}
                        className="w-4 h-4 rounded-sm border-gray-400 text-[#7E9631] focus:ring-[#8AA53C]/40 cursor-pointer disabled:cursor-default"
                      />
                      <span className="text-sm text-gray-700">{opt}</span>
                    </label>
                  ))}
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-gray-800">
              Daftar Unit Kompetensi sesuai kemasan:
            </h3>
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

          <table className="w-full border border-gray-300 border-collapse text-sm">
            <thead>
              <tr>
                <th className={`${tableHeadClass} w-12`}>No</th>
                <th className={`${tableHeadClass} w-40 text-left`}>
                  Kode Unit
                </th>
                <th className={`${tableHeadClass} text-left`}>Judul Unit</th>
                <th className={`${tableHeadClass} w-72 text-left`}>
                  Standar Kompetensi Kerja
                </th>
                {isEditing && <th className={`${tableHeadClass} w-10`} />}
              </tr>
            </thead>
            <tbody>
              {formData.units.map((unit, idx) => (
                <tr key={idx}>
                  <td className={`${tableCellClass} text-center text-gray-500`}>
                    {idx + 1}
                  </td>
                  <td className={tableCellClass}>
                    <input
                      type="text"
                      value={unit.kodeUnit}
                      onChange={(e) =>
                        handleUnitChange(idx, "kodeUnit", e.target.value)
                      }
                      disabled={!isEditing}
                      placeholder="N.00MIC00.000.0"
                      className={`${cellInputClass} font-mono`}
                    />
                  </td>
                  <td className={tableCellClass}>
                    <input
                      type="text"
                      value={unit.judulUnit}
                      onChange={(e) =>
                        handleUnitChange(idx, "judulUnit", e.target.value)
                      }
                      disabled={!isEditing}
                      className={cellInputClass}
                    />
                  </td>
                  {idx === 0 && (
                    <td
                      rowSpan={formData.units.length}
                      className={`${tableCellClass} align-top`}
                    >
                      <textarea
                        value={formData.standarKompetensi}
                        onChange={(e) =>
                          updateField("standarKompetensi", e.target.value)
                        }
                        disabled={!isEditing}
                        rows={Math.max(6, formData.units.length * 2)}
                        className="w-full bg-transparent border-0 focus:outline-none focus:ring-0 text-xs text-gray-700 leading-relaxed px-0 py-0 resize-none disabled:text-gray-700"
                      />
                    </td>
                  )}
                  {isEditing && (
                    <td className={`${tableCellClass} text-center`}>
                      <button
                        type="button"
                        onClick={() => removeUnitRow(idx)}
                        disabled={formData.units.length <= 1}
                        className="text-gray-300 hover:text-red-500 disabled:opacity-30 cursor-pointer disabled:cursor-default"
                      >
                        <X size={14} />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------- */
/* Bagian 3 - Bukti Kelengkapan Pemohon                                    */
/* ---------------------------------------------------------------------- */

function PersyaratanTable({
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
        memenuhiSyarat: false,
        tidakMemenuhiSyarat: false,
        tidakAda: false,
      },
    ]);
  };

  const removeItem = (id: string) => {
    onChange(items.filter((it) => it.id !== id));
  };

  return (
    <div className="space-y-3">
      <table className="w-full border border-gray-300 border-collapse text-sm">
        <thead>
          <tr>
            <th rowSpan={2} className={`${tableHeadClass} w-12`}>
              No
            </th>
            <th rowSpan={2} className={`${tableHeadClass} text-left`}>
              Bukti Persyaratan Dasar
            </th>
            <th colSpan={2} className={tableHeadClass}>
              Ada
            </th>
            <th rowSpan={2} className={`${tableHeadClass} w-24`}>
              Tidak Ada
            </th>
            {isEditing && (
              <th rowSpan={2} className={`${tableHeadClass} w-10`} />
            )}
          </tr>
          <tr>
            <th className={`${tableHeadClass} w-28`}>Memenuhi Syarat</th>
            <th className={`${tableHeadClass} w-28`}>Tidak Memenuhi Syarat</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <tr key={item.id}>
              <td className={`${tableCellClass} text-center text-gray-500`}>
                {idx + 1}
              </td>
              <td className={tableCellClass}>
                <textarea
                  value={item.label}
                  onChange={(e) =>
                    updateItem(item.id, { label: e.target.value })
                  }
                  disabled={!isEditing}
                  rows={2}
                  placeholder="Nama dokumen persyaratan ...."
                  className="w-full bg-transparent border-0 focus:outline-none focus:ring-0 text-sm text-gray-800 px-0 py-0 resize-none disabled:text-gray-700"
                />
                <FileUploadTrigger
                  value={item.fileName}
                  onChange={(v) => updateItem(item.id, { fileName: v })}
                  isEditing={isEditing}
                />
              </td>
              <td className={tableCellClass}>
                <TableCheckbox
                  checked={item.memenuhiSyarat}
                  onChange={(v) =>
                    updateItem(item.id, {
                      memenuhiSyarat: v,
                      tidakMemenuhiSyarat: v ? false : item.tidakMemenuhiSyarat,
                      tidakAda: v ? false : item.tidakAda,
                    })
                  }
                  isEditing={isEditing}
                />
              </td>
              <td className={tableCellClass}>
                <TableCheckbox
                  checked={item.tidakMemenuhiSyarat}
                  onChange={(v) =>
                    updateItem(item.id, {
                      tidakMemenuhiSyarat: v,
                      memenuhiSyarat: v ? false : item.memenuhiSyarat,
                      tidakAda: v ? false : item.tidakAda,
                    })
                  }
                  isEditing={isEditing}
                />
              </td>
              <td className={tableCellClass}>
                <TableCheckbox
                  checked={item.tidakAda}
                  onChange={(v) =>
                    updateItem(item.id, {
                      tidakAda: v,
                      memenuhiSyarat: v ? false : item.memenuhiSyarat,
                      tidakMemenuhiSyarat: v ? false : item.tidakMemenuhiSyarat,
                    })
                  }
                  isEditing={isEditing}
                />
              </td>
              {isEditing && (
                <td className={`${tableCellClass} text-center`}>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    disabled={items.length <= 1}
                    className="text-gray-300 hover:text-red-500 disabled:opacity-30 cursor-pointer disabled:cursor-default"
                  >
                    <X size={14} />
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {isEditing && (
        <button
          type="button"
          onClick={addItem}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#8AA53C] hover:bg-[#789332] text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
        >
          <Plus size={13} />
          Tambah
        </button>
      )}
    </div>
  );
}

function SectionBuktiKelengkapan({
  formData,
  updateField,
  isEditing,
}: SectionProps) {
  return (
    <section id="bukti-kelengkapan" className="scroll-mt-28">
      <div className="mb-6">
        <p className="text-sm font-semibold text-gray-500">Bagian 3:</p>
        <h2 className="text-2xl md:text-[28px] font-bold text-gray-800 tracking-tight">
          Bukti Kelengkapan Pemohon
        </h2>
      </div>

      <div className="space-y-8">
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-gray-800">
            1. Bukti Persyaratan Dasar Pemohon
          </h3>
          <PersyaratanTable
            items={formData.persyaratanDasar}
            onChange={(items) => updateField("persyaratanDasar", items)}
            isEditing={isEditing}
          />
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-bold text-gray-800">
            2. Bukti Administratif
          </h3>
          <PersyaratanTable
            items={formData.buktiAdministratif}
            onChange={(items) => updateField("buktiAdministratif", items)}
            isEditing={isEditing}
          />
        </div>

        <table className="w-full border border-gray-300 border-collapse text-sm">
          <tbody>
            <tr>
              <td rowSpan={3} className={`${tableCellClass} w-1/2`}>
                <p className="font-semibold text-gray-800 mb-1.5">
                  Rekomendasi (diisi oleh LSP):
                </p>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Berdasarkan ketentuan persyaratan dasar, maka pemohon:
                </p>
                <div className="flex items-center gap-4 mt-2">
                  {(["Diterima", "Tidak diterima"] as const).map((opt, i) => (
                    <label
                      key={opt}
                      onClick={() =>
                        isEditing && updateField("rekomendasi", opt)
                      }
                      className={`inline-flex items-center gap-1.5 text-xs font-bold select-none ${
                        opt === "Diterima" ? "text-[#5A7A22]" : "text-red-500"
                      } ${isEditing ? "cursor-pointer" : "cursor-default"} ${
                        formData.rekomendasi && formData.rekomendasi !== opt
                          ? "opacity-30"
                          : ""
                      }`}
                    >
                      {opt}
                      {i === 0 && <span className="text-gray-300">/</span>}
                    </label>
                  ))}
                </div>
                <p className="text-[11px] text-gray-400 mt-1">
                  sebagai peserta sertifikasi
                  <br />
                  <span className="italic">*coret yang tidak sesuai</span>
                </p>
              </td>
              <td className={`${tableCellClass} font-semibold text-gray-700`}>
                Pemohon/Kandidat:
              </td>
            </tr>
            <tr>
              <td className={tableCellClass}>
                <div className="flex items-center gap-3">
                  <span className="w-12 shrink-0 text-xs text-gray-500">
                    Nama
                  </span>
                  <input
                    type="text"
                    value={formData.pemohonNama}
                    onChange={(e) => updateField("pemohonNama", e.target.value)}
                    disabled={!isEditing}
                    className={cellInputClass}
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td className={tableCellClass}>
                <SignatureBox
                  label="Tanda Tangan/Tanggal"
                  value={formData.pemohonTtd}
                  onChange={(v) => updateField("pemohonTtd", v)}
                  isEditing={isEditing}
                />
              </td>
            </tr>

            <tr>
              <td rowSpan={3} className={tableCellClass}>
                <p className="font-semibold text-gray-800 mb-2">Catatan:</p>
                <textarea
                  value={formData.catatan}
                  onChange={(e) => updateField("catatan", e.target.value)}
                  disabled={!isEditing}
                  rows={6}
                  className="w-full bg-transparent border-0 focus:outline-none focus:ring-0 text-xs text-gray-700 px-0 py-0 resize-none disabled:text-gray-600"
                />
              </td>
              <td className={`${tableCellClass} font-semibold text-gray-700`}>
                Admin LSP:
              </td>
            </tr>
            <tr>
              <td className={tableCellClass}>
                <div className="flex items-center gap-3">
                  <span className="w-12 shrink-0 text-xs text-gray-500">
                    Nama
                  </span>
                  <input
                    type="text"
                    value={formData.adminNama}
                    onChange={(e) => updateField("adminNama", e.target.value)}
                    disabled={!isEditing}
                    className={cellInputClass}
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td className={tableCellClass}>
                <SignatureBox
                  label="Tanda Tangan/Tanggal"
                  value={formData.adminTtd}
                  onChange={(v) => updateField("adminTtd", v)}
                  isEditing={isEditing}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------- */
/* Page                                                                     */
/* ---------------------------------------------------------------------- */

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
        const normalizePersyaratan = (
          items: Partial<PersyaratanItem>[] | undefined,
          fallback: PersyaratanItem[],
        ): PersyaratanItem[] =>
          items && items.length > 0
            ? items.map((it, idx) => ({
                id: it.id ?? `item-${idx}`,
                label: it.label ?? "",
                fileName: it.fileName ?? "",
                memenuhiSyarat: it.memenuhiSyarat ?? false,
                tidakMemenuhiSyarat: it.tidakMemenuhiSyarat ?? false,
                tidakAda: it.tidakAda ?? false,
              }))
            : fallback;

        setFormData((prev) => ({
          ...prev,
          ...parsed,
          persyaratanDasar: normalizePersyaratan(
            parsed.persyaratanDasar,
            prev.persyaratanDasar,
          ),
          buktiAdministratif: normalizePersyaratan(
            parsed.buktiAdministratif,
            prev.buktiAdministratif,
          ),
        }));
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
    <form
      onSubmit={handleSubmit}
      className="max-w-5xl mx-auto bg-white px-6 md:px-12 py-8 md:py-10 space-y-4"
    >
      <div className="flex justify-end">
        <EditSaveControls
          isEditing={isEditing}
          savedSuccess={savedSuccess}
          onUbah={handleUbah}
        />
      </div>

      <div className="space-y-10">
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

      <div className="flex justify-end pt-4">
        <EditSaveControls
          isEditing={isEditing}
          savedSuccess={savedSuccess}
          onUbah={handleUbah}
        />
      </div>
    </form>
  );
}
