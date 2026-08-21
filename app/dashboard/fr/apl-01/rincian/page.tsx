"use client";

import { useState } from "react";
import { Check } from "lucide-react";

export default function APL01RincianPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [formData, setFormData] = useState({
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
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenderChange = (val: "Laki-laki" | "Perempuan") => {
    setFormData((prev) => ({ ...prev, jenisKelamin: val }));
  };

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSavedSuccess(true);
    setIsEditing(false);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const inputClass =
    "w-full h-11 px-3.5 text-sm text-gray-800 bg-white rounded-xl border border-gray-300 focus:border-[#7E9631] focus:outline-none focus:ring-2 focus:ring-[#7E9631]/20 transition-all";

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-10 shadow-xs">
      {/* Top Action Bar */}
      <div className="flex items-center justify-between gap-4 pb-4">
        <div>
          {savedSuccess && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F2F5E9] text-[#5A7A22] text-xs font-semibold border border-[#8AA53C]/30 animate-in fade-in">
              <Check size={14} className="stroke-[2.5]" />
              Data berhasil disimpan
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 ml-auto">
          <button
            type="button"
            onClick={handleEdit}
            className={`px-6 py-2 rounded-lg text-sm font-semibold border transition-all cursor-pointer ${
              isEditing
                ? "bg-gray-100 text-gray-500 border-gray-300"
                : "border-[#7E9631] text-[#7E9631] bg-white hover:bg-[#F2F5E9]"
            }`}
          >
            Ubah
          </button>
          <button
            type="button"
            onClick={() => handleSave()}
            className="px-6 py-2 rounded-lg text-sm font-semibold text-white bg-[#7E9631] hover:bg-[#6C8229] transition-all shadow-xs cursor-pointer"
          >
            Simpan
          </button>
        </div>
      </div>

      {/* Header Titles */}
      <div className="mt-2 mb-8">
        <p className="text-sm md:text-base font-bold text-gray-700 tracking-tight">
          Bagian 1:
        </p>
        <h1 className="text-2xl md:text-3xl font-bold text-[#344054] mt-1 tracking-tight">
          Rincian Data Pemohon Sertifikasi
        </h1>
        <p className="text-xs md:text-sm text-gray-400 mt-1.5">
          Pada bagian ini, cantumkan data pribadi, data pendidikan formal, serta
          data pekerjaan anda pada saat ini.
        </p>
      </div>

      <form onSubmit={handleSave}>
        {/* Sub-section: a. Data Pribadi */}
        <div className="mb-10">
          <h2 className="text-base md:text-lg font-bold text-gray-800 tracking-tight mb-5">
            a. Data Pribadi
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
            {/* Row 1: Nama Lengkap */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-gray-600">
                Nama Lengkap
              </label>
              <input
                type="text"
                name="namaLengkap"
                value={formData.namaLengkap}
                onChange={handleChange}
                placeholder=""
                className={inputClass}
              />
            </div>
            <div className="hidden md:block" />

            {/* Row 2: No. KTP/NIK/Paspor & Tempat/Tgl. Lahir */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-gray-600">
                No. KTP/NIK/Paspor
              </label>
              <input
                type="text"
                name="noKtp"
                value={formData.noKtp}
                onChange={handleChange}
                placeholder=""
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
                placeholder=""
                className={inputClass}
              />
            </div>

            {/* Row 3: Jenis Kelamin & Kebangsaan */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-gray-600">
                Jenis Kelamin
              </label>
              <div className="flex items-center gap-6 h-10">
                <label
                  onClick={() => handleGenderChange("Laki-laki")}
                  className="inline-flex items-center gap-2.5 cursor-pointer select-none group"
                >
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                      formData.jenisKelamin === "Laki-laki"
                        ? "border-[#7E9631] bg-[#7E9631]"
                        : "border-gray-300 group-hover:border-gray-400 bg-white"
                    }`}
                  >
                    {formData.jenisKelamin === "Laki-laki" && (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    Laki-laki
                  </span>
                </label>

                <label
                  onClick={() => handleGenderChange("Perempuan")}
                  className="inline-flex items-center gap-2.5 cursor-pointer select-none group"
                >
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                      formData.jenisKelamin === "Perempuan"
                        ? "border-[#7E9631] bg-[#7E9631]"
                        : "border-gray-300 group-hover:border-gray-400 bg-white"
                    }`}
                  >
                    {formData.jenisKelamin === "Perempuan" && (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    Perempuan
                  </span>
                </label>
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
                placeholder=""
                className={inputClass}
              />
            </div>

            {/* Row 4: Alamat Rumah */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-gray-600">
                Alamat Rumah
              </label>
              <textarea
                name="alamatRumah"
                value={formData.alamatRumah}
                onChange={handleChange}
                rows={4}
                placeholder=""
                className="w-full h-[120px] p-3 text-sm text-gray-800 bg-white rounded-xl border border-gray-300 focus:border-[#7E9631] focus:outline-none focus:ring-2 focus:ring-[#7E9631]/20 resize-none transition-all"
              />
            </div>
            <div className="hidden md:block" />

            {/* Row 5: No. Telepon & E-mail */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-gray-600">
                No. Telepon (Rumah/HP/Kantor)
              </label>
              <input
                type="tel"
                name="noTelepon"
                value={formData.noTelepon}
                onChange={handleChange}
                placeholder=""
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
                placeholder=""
                className={inputClass}
              />
            </div>

            {/* Row 6: Kualifikasi Pendidikan */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-gray-600">
                Kualifikasi Pendidikan
              </label>
              <input
                type="text"
                name="kualifikasiPendidikan"
                value={formData.kualifikasiPendidikan}
                onChange={handleChange}
                placeholder=""
                className={inputClass}
              />
            </div>
            <div className="hidden md:block" />
          </div>
        </div>

        {/* Sub-section: b. Data Pekerjaan Sekarang */}
        <div className="mb-6">
          <h2 className="text-base md:text-lg font-bold text-gray-800 tracking-tight mb-5">
            b. Data Pekerjaan Sekarang
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
            {/* Row 1: Nama Institusi/Perusahaan & Jabatan */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-gray-600">
                Nama Institusi/ Perusahaan
              </label>
              <input
                type="text"
                name="namaInstitusi"
                value={formData.namaInstitusi}
                onChange={handleChange}
                placeholder=""
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
                placeholder=""
                className={inputClass}
              />
            </div>

            {/* Row 2: Alamat Kantor */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-gray-600">
                Alamat Kantor
              </label>
              <textarea
                name="alamatKantor"
                value={formData.alamatKantor}
                onChange={handleChange}
                rows={4}
                placeholder=""
                className="w-full h-[120px] p-3 text-sm text-gray-800 bg-white rounded-xl border border-gray-300 focus:border-[#7E9631] focus:outline-none focus:ring-2 focus:ring-[#7E9631]/20 resize-none transition-all"
              />
            </div>
            <div className="hidden md:block" />

            {/* Row 3: No. Telepon/Fax & E-mail */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-gray-600">
                No. Telepon/Fax
              </label>
              <input
                type="tel"
                name="noTeleponKantor"
                value={formData.noTeleponKantor}
                onChange={handleChange}
                placeholder=""
                className={inputClass}
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-gray-600">
                E-mail
              </label>
              <input
                type="email"
                name="emailKantor"
                value={formData.emailKantor}
                onChange={handleChange}
                placeholder=""
                className={inputClass}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
