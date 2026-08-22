"use client";

import { useState } from "react";
import { Check, Pencil, Save, Plus, X } from "lucide-react";

const inputClass =
  "w-full px-3.5 py-2.5 text-sm text-gray-800 bg-white rounded-xl border border-gray-300 focus:border-[#7E9631] focus:outline-none focus:ring-2 focus:ring-[#7E9631]/20 transition-all disabled:bg-gray-50 disabled:text-gray-400";

const textareaClass =
  "w-full min-h-[88px] p-3 text-sm text-gray-800 bg-white rounded-xl border border-gray-300 focus:border-[#7E9631] focus:outline-none focus:ring-2 focus:ring-[#7E9631]/20 resize-none transition-all disabled:bg-gray-50 disabled:text-gray-400";

interface PertanyaanItem {
  id: string;
  dapatkahSaya: string;
  statusK: boolean;
  statusBK: boolean;
  bukti: string;
  kriteriaUnjukKerja: string[];
}

interface UnitItem {
  id: string;
  kodeUnit: string;
  judulUnit: string;
  pertanyaans: PertanyaanItem[];
}

const INSTRUKSI = [
  "Baca setiap pertanyaan di kolom sebelah kiri",
  "Beri tanda centang (\u221a) pada kotak jika Anda yakin dapat melakukan tugas yang dijelaskan.",
  "Isi kolom di sebelah kanan dengan menuliskan bukti yang relevan anda miliki untuk menunjukkan bahwa anda melakukan pekerjaan.",
];

const INITIAL_UNITS: UnitItem[] = [
  {
    id: "unit-1",
    kodeUnit: "I.55HDR00.217.2",
    judulUnit:
      "Berkomunikasi Secara Lisan Dalam Bahasa Inggris pada Tingkat Operasional Dasar",
    pertanyaans: [
      {
        id: "u1-1",
        dapatkahSaya:
          "Berkomunikasi dengan pelanggan dan kolega mengenai hal-hal yang berkaitan dengan kegiatan dasar dan sehari-hari ditempat kerja serta kegiatan pelayanan pelanggan.",
        statusK: false,
        statusBK: false,
        bukti: "",
        kriteriaUnjukKerja: [
          "Istilah, ungkapan, dan bahasa tubuh untuk memperjelas komunikasi secara lisan dilakukan",
          "Mengerti dan menggunakan kalimat yang sopan dan ramah serta mengetahui kapan harus memakai kalimat resmi atau tidak resmi",
        ],
      },
      {
        id: "u1-2",
        dapatkahSaya: "Berbicara melalui telepon",
        statusK: false,
        statusBK: false,
        bukti: "",
        kriteriaUnjukKerja: [
          "Salam diberikan dengan benar termasuk menyebutkan nama perusahaan",
          "Bantuan dan menentukan tujuan telepon ditawarkan",
          "Penelepon diminta untuk menunggu ketika mencari orang yang dikehendaki.",
          "Apabila diperlukan, meminta maaf kepada penelepon ketika orang yang dikehendaki tidak berada di tempat",
          "Data penelepon di catat",
        ],
      },
    ],
  },
  {
    id: "unit-2",
    kodeUnit: "I.55HDR00.149.2",
    judulUnit: "Melakukan Kerjasama Dengan Kolega dan Pelanggan",
    pertanyaans: [
      {
        id: "u2-1",
        dapatkahSaya: "Melakukan komunikasi di tempat kerja",
        statusK: false,
        statusBK: false,
        bukti: "",
        kriteriaUnjukKerja: [
          "Komunikasi dengan tamu dan kolega dilaksanakan secara terbuka, profesional, ramah dan sopan.",
          "Gunakan bahasa dan nada yang cocok.",
          "Efek bahasa tubuh personal dipertimbangkan.",
          "Kepekaan terhadap perbedaan budaya dan sosial diperlihatkan",
          "Mendengar dan melontarkan pertanyaan secara aktif digunakan untuk memastikan komunikasi dua arah yang efektif",
          "Konflik yang ada dan potensial diidentifikasi dan solusi dicari dengan bantuan dari kolega bila dibutuhkan.",
        ],
      },
      {
        id: "u2-2",
        dapatkahSaya: "Memberikan bantuan untuk tamu internal dan eksternal",
        statusK: false,
        statusBK: false,
        bukti: "",
        kriteriaUnjukKerja: [
          "Kebutuhan dan harapan tamu, termasuk hal-hal dengan kebutuhan tertentu, diidentifikasi secara benar yang mencakup produk dan layanan yang tepat diberikan.",
          "Karyawan berkomunikasi dengan tamu dan dilayani dengan ramah dan sopan.",
          "Seluruh kebutuhan dan permintaan pelanggan dipenuhi dalam jangka waktu yang cepat sesuai prosedur perusahaan.",
          "Kesempatan untuk meningkatkan kualitas layanan diidentifikasi dan diambil bila memungkinkan.",
          "Kekecewaan pelanggan cepat dikenali dan mengambil tindakan untuk memecahkan masalahnya sesuai dengan Tingkat tanggung jawab individu dan prosedur perusahaan.",
          "Keluhan pelanggan ditangani secara positif, sensitif dan sopan.",
          "Keluhan ditangani oleh orang yang tepat untuk ditindak lanjuti sesuai dengan (di skkni nya ke potong)",
        ],
      },
      {
        id: "u2-3",
        dapatkahSaya: "Menjaga standar kinerja presentasi personal",
        statusK: false,
        statusBK: false,
        bukti: "",
        kriteriaUnjukKerja: [
          "Standar kinerja tinggi digunakan untuk dapat melakukan pekerjaan yang berkaitan dengan kolega serta pelanggan",
          "Penggunaan standar kinerja diterapkan pada saat melakukan pekerjaan di tempat kerja serta mempertimbangkan kriteria lainnnya sesuai peraturan perusahaan",
          "Masalah kebersihan, kesehatan dan keselamatan.",
          "Persyaratan presentasi khusus untuk fungsi kerja khusus.",
          "Perawatan kebersihan personil yang sesuai dengan standar perusahaan.",
          "Pakaian yang pantas.",
        ],
      },
      {
        id: "u2-4",
        dapatkahSaya: "Melakukan kerja dalam tim",
        statusK: false,
        statusBK: false,
        bukti: "",
        kriteriaUnjukKerja: [
          "Kepercayaan, dukungan dan hormat diperlihatkan kepada anggota tim dalam aktifitas sehari-hari.",
          "Perbedaan budaya dalam tim diakomodir.",
          "Tujuan kerja tim secara Bersama diidentifikasi.",
          "Tanggung jawab individu dan tugas-tugas diidentifikasi, diprioritaskan serta diselesaikan dalam kurun waktu yang ditentukan.",
          "Meminta bantuan dari anggota tim yang lain bila dibutuhkan.",
          "Bantuan ditawarkan pada kolega untuk memastikan tujuan kerja yang ditentukan terpenuhi.",
          "Umpan balik dan informasi dari anggota tim lain diterima.",
          "Perubahan tanggung jawab dari masing-masing individu diperhatikan, yang nantinya harus dibicarakan Kembali tujuan kerja tim.",
        ],
      },
    ],
  },
  {
    id: "unit-3",
    kodeUnit: "I.55HDR00.150.2",
    judulUnit: "Melakukan Kerja Dalam Lingkungan Sosial yang Beragam",
    pertanyaans: [
      {
        id: "u3-1",
        dapatkahSaya:
          "Melakukan komunikasi dengan pelanggan dan kolega dari latar belakang yang beragam",
        statusK: false,
        statusBK: false,
        bukti: "",
        kriteriaUnjukKerja: [
          "Pelanggan dan kolega dari seluruh kelompok budaya dinilai dan diperlakukan dengan hormat dan kepekaan.",
          "Komunikasi lisan dan non-lisan mempertimbangkan perbedaan budaya.",
          "Dimana ada hambatan bahasa, usaha-usaha dilakukan untuk berkomunikasi dengan bahasa isyarat atau kata-kata sederhana dalam bahasa orang tersebut.",
          "Bantuan dari kolega, buku-buku referensi atau organisasi luar diperoleh ketika dibutuhkan.",
        ],
      },
      {
        id: "u3-2",
        dapatkahSaya: "Menangani kesalah pahaman antar budaya",
        statusK: false,
        statusBK: false,
        bukti: "",
        kriteriaUnjukKerja: [
          "Hal-hal yang dapat menimbulkan kesalah pahaman di tempat kerja haru diidentifikasi.",
          "Kesulitan-kesulitan disampaikan pada orang yang tepat dan bantuan dicari dari ketua tim.",
          "Ketika kesulitan atau kesalah pahaman terjadi, kemungkinan perbedaan budaya harus dipertimbangkan.",
          "Usaha-usaha dilakukan untuk memecahkan masalah kesalah pahaman, dengan pertimbangan budaya.",
          "Hal-hal dan masalah diajukan pada ketua tim /penyelia yang tepat untuk tindak lanjut.",
        ],
      },
    ],
  },
  {
    id: "unit-4",
    kodeUnit: "N.82MIC00.074.2",
    judulUnit: "Mencari dan Memberikan Informasi",
    pertanyaans: [
      {
        id: "u4-1",
        dapatkahSaya:
          "Melakukan komunikasi dengan pelanggan dan kolega dari latar belakang yang beragam",
        statusK: false,
        statusBK: false,
        bukti: "",
        kriteriaUnjukKerja: [
          "Sumber informasi yang ada dicari tahu sesuai dengan informasi yang akan dicari.",
          "Sumber informasi didapatkan dan diteliti keabsahannya sesuai dengan kebutuhan.",
          "Informasi didapatkan sesuai dengan jadwal yang telah ditetapkan.",
        ],
      },
      {
        id: "u4-2",
        dapatkahSaya: "Mempersiapkan dan memberikan informasi",
        statusK: false,
        statusBK: false,
        bukti: "",
        kriteriaUnjukKerja: [
          "Informasi diteliti dan dipilih isi sesuai dengan kebutuhan tertentu.",
          "Konsep penulisan dibuat sesuai dengan kebutuhan.",
          "Informasi dijelaskan dengan jelas, tepat, dan akurat sesuai dengan kebutuhan.",
          "Informasi diberikan sesuai dengan pedoman perusahaan dan bentuk yang sesuai dengan kondisi dan peserta.",
          "Informasi disampaikan kepada orang yang tepat pada waktu yang telah ditentukan sesuai kebutuhan.",
        ],
      },
    ],
  },
  {
    id: "unit-5",
    kodeUnit: "N.82MIC00.087.3",
    judulUnit: "Mengikuti Aturan Keprotokolan",
    pertanyaans: [
      {
        id: "u5-1",
        dapatkahSaya:
          "Mengidentifikasi kategori tamu atau delegasi yang akan datang",
        statusK: false,
        statusBK: false,
        bukti: "",
        kriteriaUnjukKerja: [
          "Daftar tamu kegiatan disusun berdasarkan tamu yang diundang.",
          "Profil tamu diidentifikasi sesuai kebijakan perusahaan.",
          "Logistik kebutuhan tamu diidentifikasi sesuai kebutuhan kegiatan",
        ],
      },
      {
        id: "u5-2",
        dapatkahSaya:
          "Merencanakan rangkaian kegiatan kenegaraan atau kegiatan resmi secara detail",
        statusK: false,
        statusBK: false,
        bukti: "",
        kriteriaUnjukKerja: [
          "Kebutuhan dan kebiasaan tamu diidentifikasi berdasarkan kebijakan perusahaan.",
          "Susunan rincian acara dibuat sesuai dengan kebutuhan tamu.",
          "Susunan rincian acara dianalisis sesuai kebutuhan.",
          "Susunan rincian acara dikembangkan sesuai kebutuhan.",
          "Susunan rincian acara dikoordinasikan dengan semua pihak terkait.",
        ],
      },
      {
        id: "u5-3",
        dapatkahSaya: "Menetapkan rangkaian susunan kegiatan",
        statusK: false,
        statusBK: false,
        bukti: "",
        kriteriaUnjukKerja: [
          "Susunan kegiatan dibuat sesuai dengan rencana.",
          "Susunan kegiatan ditetapkan sesuai dengan kesepakatan.",
          "Gladi kotor dan gladi bersih dilakukan bersama semua pihak yang terkait sesuai dengan kebutuhan.",
        ],
      },
      {
        id: "u5-4",
        dapatkahSaya:
          "Menjelaskan tentang Keseluruhan rangkaian kegiatan dan layanan secara rinci",
        statusK: false,
        statusBK: false,
        bukti: "",
        kriteriaUnjukKerja: [
          "Lokasi penyelenggaraan, jadwal kegiatan, fasilitas, dan informasi umum lainnya dijelaskan dalam rangkaian kegiatan secara keseluruhan.",
          "Ketersediaan layanan dan logistic disampaikan secara lisan maupun tulisan dalam bentuk buku panduan sesuai prosedur.",
        ],
      },
    ],
  },
  {
    id: "unit-6",
    kodeUnit: "I.55HDR00.224.2",
    judulUnit:
      "Menulis Dalam Bahasa Inggris pada Tingkat Penyeliaan dan Operasional Menengah",
    pertanyaans: [
      {
        id: "u6-1",
        dapatkahSaya: "Menulis dokumen rutin dan tidak rutin di tempat kerja",
        statusK: false,
        statusBK: false,
        bukti: "",
        kriteriaUnjukKerja: [
          "Pembaca dan tujuan dari teks diidentifikasi",
          "Dokumen yang tepat dipilih untuk dipersiapkan",
          "Ide dikembangkan secara mendalam untuk memenuhi kebutuhan konteks khusus",
          "Bahasa yang sesuai digunakan untuk memenuhi persyaratan ditempat kerja dan/atau situasi",
          "Tata cara, sosial, dan budaya diamati yang berkaitan dengan penulisan dokumen di tempat kerja",
          "Kaidah ejaan, tanda baca, dan tata Bahasa (Kepotong di skkni)",
        ],
      },
      {
        id: "u6-2",
        dapatkahSaya: "Menulis petunjuk dan instruksi rutin dan tidak rutin",
        statusK: false,
        statusBK: false,
        bukti: "",
        kriteriaUnjukKerja: [
          "Pembaca dan tujuan dari teks diidentifikasi",
          "Kata kunci, ungkapan, dan kalimat sederhana digunakan dalam menyampaikan suatu pengertian",
          "Instruksi dan/atau petunjuk diurut dengan benar",
          "Kaidah ejaan, tanda baca dan tata Bahasa yang umum diikuti dalam bisnis",
          "Komunikasi tertulis didukung dengan informasi visual seperti tanda-tanda, peta, diagram, dan tabel apabila diperlukan",
        ],
      },
      {
        id: "u6-3",
        dapatkahSaya: "Menulis laporan singkat",
        statusK: false,
        statusBK: false,
        bukti: "",
        kriteriaUnjukKerja: [
          "Tujuan dan pembaca teks diidentifikasi",
          "Dokumen yang tepat dipilih untuk dipersiapkan",
          "Ide-ide secara logis diurut dan disusun untuk memenuhi tujuan",
          "Kalimat diurut dengan cara yang tepat",
          "Tata cara konvensional standar digunakan seperti penulisan alenia, penggunaan tanda titik, dan subjudul",
          "Informasi disampaikan secara objektif",
          "Kaidah ejaan, tanda baca, dan tata Bahasa yang umum diikuti untuk pembuatan dokumen",
        ],
      },
    ],
  },
  {
    id: "unit-7",
    kodeUnit: "I.55HDR00.224.2",
    judulUnit: "Memproses dan Memantau Pendaftaran Kegiatan",
    pertanyaans: [
      {
        id: "u7-1",
        dapatkahSaya: "Memproses pendaftaran",
        statusK: false,
        statusBK: false,
        bukti: "",
        kriteriaUnjukKerja: [
          "Pendaftaran acara ditafsirkan dan diproses secara akurat sesuai dengan prosedur organisasi dan jadwal.",
          "Informasi pelanggan diidentifikasi, dikumpulkan, dan diproses sesuai tenggat waktu.",
          "Penawaran untuk pendaftaran tidak disediakan termasuk pilihan daftar tunggu sesuai ketentuan.",
          "Pertanyaan dijawab tentang biaya dan detail acara lainnya sesuai dengan prosedur.",
          "Rekam rincian pelanggan digunakan dengan sistem dan teknologi yang tepat guna sesuai dengan perkembangan zaman.",
          "Berkas pendaftaran acara dievaluasi sesuai dengan sistem atau persyaratan prosedural.",
        ],
      },
      {
        id: "u7-2",
        dapatkahSaya: "Memperbaharui pendaftaran",
        statusK: false,
        statusBK: false,
        bukti: "",
        kriteriaUnjukKerja: [
          "Status keuangan diperbaharui dari pendaftaran yang akurat sesuai spesifikasi.",
          "Setiap permintaan pelanggan diterima, diproses, dan direkam untuk perubahan atau pembatalan sesuai kesepakatan para pihak.",
          "Pemahaman dari rincian perubahan atau pembatalan kondisi dan biaya diberikan dan dikonfirmasi kepada pelanggan sesuai prosedur.",
        ],
      },
      {
        id: "u7-3",
        dapatkahSaya: "Memantau dan menghasilkan laporan pendaftaran",
        statusK: false,
        statusBK: false,
        bukti: "",
        kriteriaUnjukKerja: [
          "Laporan pendaftaran personel yang relevan dipantau dan dihasilkan sesuai dengan kebutuhan.",
          "Masalah yang muncul diidentifikasi dan dilaporkan secara proaktif dari informasi kehadiran sesuai prosedur.",
          "Tindakan diambil untuk mengatasi masalah kehadiran sesuai dengan tanggung jawab individu dan prosedur organisasi.",
        ],
      },
      {
        id: "u7-4",
        dapatkahSaya: "Menghasilkan Dokumentasi pendaftaran akhir",
        statusK: false,
        statusBK: false,
        bukti: "",
        kriteriaUnjukKerja: [
          "Rincian pendaftaran acara diperiksa dan diselesaikan dalam waktu yang telah ditentukan sesuai ketentuan.",
          "Dokumen pelanggan disiapkan dan diterbitkan dalam waktu yang telah ditentukan sesuai kebutuhan.",
          "Semua dokumentasi diperiksa untuk akurasi sebelum diterbitkan dan dirubah seperlunya.",
          "Laporan pendaftaran akhir dihasilkan dan didistribusikan dalam format dan gaya sesuai dengan persetujuan prosedur dan jadwal.",
          "Penggunaan bahan cetak diminimalkan dan dimaksimalkan sesuai dengan transmisi elektronik dari semua dokumen untuk mengurangi limbah.",
        ],
      },
    ],
  },
  {
    id: "unit-8",
    kodeUnit: "N.82MIC00.086.3",
    judulUnit: "Mengatur Pendaftaran Tamu dalam Suatu Acara",
    pertanyaans: [
      {
        id: "u8-1",
        dapatkahSaya: "Melakukan persiapan pendaftaran",
        statusK: false,
        statusBK: false,
        bukti: "",
        kriteriaUnjukKerja: [
          "Seluruh database dan peralatan yang diperlukan untuk pendaftaran disiapkan.",
          "Persiapan untuk tempat pendaftaran diperiksa sesuai acara dan sesuai dengan persetujuan.",
          "Perincian akses dikonfirmasi sesuai acara",
        ],
      },
      {
        id: "u8-2",
        dapatkahSaya: "Melakukan penataan tempat pendaftaran",
        statusK: false,
        statusBK: false,
        bukti: "",
        kriteriaUnjukKerja: [
          "Tempat pendaftaran dan tata letaknya diperiksa sesuai permintaan sebelumnya.",
          "Tempat pendaftaran diperiksa untuk keamanan dan kenyamanan tamu, anggota delegasi serta rekan sejawatnya termasuk yang ber-handicap/cacat sesuai dengan prosedur.",
          "Tanda-tanda disiapkan sesuai persetujuan sebelumnya.",
          "Peralatan disiapkan sebelum pelaksanaan acara.",
          "Materi disiapkan sesuai area pendaftaran.",
        ],
      },
      {
        id: "u8-3",
        dapatkahSaya: "Melakukan proses pendaftaran",
        statusK: false,
        statusBK: false,
        bukti: "",
        kriteriaUnjukKerja: [
          "Tamu delegasi disambut dengan ramah sesuai dengan prosedur.",
          "Hal-hal rinci diperiksa sesuai dengan prosedur pendaftaran yang ditetapkan.",
          "Ketidakcocokan yang ditemukan diselesaikan dengan tidak mengganggu tamu sesuai dengan prosedur.",
          "Ketidakhadiran harus dicatat sesuai prosedur.",
          "Tamu diberi informasi tentang kegiatan acara serta buku program sesuai dengan ketentuan acara.",
        ],
      },
    ],
  },
  {
    id: "unit-9",
    kodeUnit: "N.82MIC00.027.1",
    judulUnit: "Mengelola Database",
    pertanyaans: [
      {
        id: "u9-1",
        dapatkahSaya: "Membuat database sederhana",
        statusK: false,
        statusBK: false,
        bukti: "",
        kriteriaUnjukKerja: [
          "Database sederhana dirancang dengan menggunakan aplikasi database, prinsip desain dasar, fungsi perangkat lunak, dan rumus sederhana. persyaratan tugas dan organisasi.",
          "Tabel dikembangkan dengan bidang dan atribut yang sesuai dengan penggunaan database, seperti pertimbangan data dan persyaratan pengguna.",
          "Kunci utama untuk setiap table dibuat sesuai dengan kebutuhan.",
          "Tata letak tabel dan atribut bidang dimodifikasi sesuai kebutuhan.",
          "Hubungan di antara kedua table dibuat sesuai dengan kebutuhan.",
          "Data yang dimasukkan diperiksa dan diubah sesuai dengan",
        ],
      },
      {
        id: "u9-2",
        dapatkahSaya: "Membuat laporan dan permintaan",
        statusK: false,
        statusBK: false,
        bukti: "",
        kriteriaUnjukKerja: [
          "Penggunaan hasil informasi, table database, dan tata letak laporan ditentukan untuk memenuhi persyaratan tugas sesuai dengan permintaan.",
          "Pengelompokan data dan kriteria dibuat untuk memenuhi persyaratan tugas sesuai dengan permintaan.",
          "Laporan dan permintaan diakses untuk memeriksa hasil dan rumus telah sesuai dengan data yang diperlukan.",
          "Laporan dimodifikasi sebagai persyaratan tambahan sesuai dengan kebutuhan.",
        ],
      },
      {
        id: "u9-3",
        dapatkahSaya: "Menggunakan database",
        statusK: false,
        statusBK: false,
        bukti: "",
        kriteriaUnjukKerja: [
          "Database yang diakses dipastikan kesesuaiannya memenuhi tenggat waktu yang ditentukan dan persyaratan organisasi seusai dengan kebutuhan.",
          "Permasalahan database, rancangan, dan produksi diperbaiki sesuai dengan buku pedoman, dokumentasi pengguna, dan bantuan secara daring.",
        ],
      },
    ],
  },
];

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

function SignatureBox({
  value,
  onChange,
  isEditing,
  inputId,
}: {
  value: string | null;
  onChange: (dataUrl: string | null) => void;
  isEditing: boolean;
  inputId: string;
}) {
  const handleFile = (file: File | undefined) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onChange(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div
      className={`relative w-full h-[130px] rounded-xl border border-dashed flex items-center justify-center overflow-hidden transition-all ${
        isEditing
          ? "border-[#7E9631]/50 bg-white"
          : "border-gray-200 bg-gray-50"
      }`}
    >
      {value ? (
        <>
          <img
            src={value}
            alt="Tanda tangan"
            className="max-h-full max-w-full object-contain"
          />
          {isEditing && (
            <button
              type="button"
              onClick={() => onChange(null)}
              className="absolute top-1.5 right-1.5 p-1 rounded-full bg-white border border-gray-200 text-gray-500 hover:text-red-500 hover:border-red-200 transition-colors cursor-pointer"
            >
              <X size={12} />
            </button>
          )}
        </>
      ) : isEditing ? (
        <label
          htmlFor={inputId}
          className="flex flex-col items-center justify-center gap-1 text-gray-400 hover:text-[#7E9631] cursor-pointer w-full h-full"
        >
          <Plus size={22} className="stroke-[1.5]" />
          <input
            id={inputId}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
        </label>
      ) : (
        <Plus size={22} className="stroke-[1.5] text-gray-300" />
      )}
    </div>
  );
}

export default function APL02Page() {
  const [judulSkema, setJudulSkema] = useState(
    "MEETING/CONFERENCE REGISTRATION STAFF",
  );
  const [nomorSkema, setNomorSkema] = useState("001/LSPP306/V/2026");
  const [units, setUnits] = useState<UnitItem[]>(INITIAL_UNITS);
  const [isEditing, setIsEditing] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [rekomendasi, setRekomendasi] = useState(
    "Asesmen dapat / tidak dapat dilanjutkan Melalui Pendekatan ................",
  );
  const [asesiNama, setAsesiNama] = useState("");
  const [asesiTtd, setAsesiTtd] = useState<string | null>(null);
  const [asesorNama, setAsesorNama] = useState("");
  const [asesorNoReg, setAsesorNoReg] = useState("");
  const [asesorTtd, setAsesorTtd] = useState<string | null>(null);

  const handleUbah = () => setIsEditing(true);

  const updateUnitField = (
    unitId: string,
    field: "kodeUnit" | "judulUnit",
    value: string,
  ) => {
    setUnits((prev) =>
      prev.map((u) => (u.id === unitId ? { ...u, [field]: value } : u)),
    );
  };

  const updatePertanyaan = (
    unitId: string,
    pertanyaanId: string,
    patch: Partial<PertanyaanItem>,
  ) => {
    setUnits((prev) =>
      prev.map((u) => {
        if (u.id !== unitId) return u;
        return {
          ...u,
          pertanyaans: u.pertanyaans.map((p) =>
            p.id === pertanyaanId ? { ...p, ...patch } : p,
          ),
        };
      }),
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

        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-500">
            Panduan Asesmen Mandiri
          </p>
          <h2 className="text-2xl font-bold text-gray-800">Instruksi</h2>
          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
            {INSTRUKSI.map((teks, idx) => (
              <li key={idx}>{teks}</li>
            ))}
          </ul>
        </div>

        {units.map((unit, uIdx) => (
          <div key={unit.id}>
            <div className="border-t border-dashed border-gray-200 mb-8" />
            <div className="space-y-5">
              <h3 className="text-lg font-bold text-gray-800">
                Unit Kompetensi {uIdx + 1}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-600">
                    Kode Unit
                  </label>
                  <input
                    type="text"
                    value={unit.kodeUnit}
                    onChange={(e) =>
                      updateUnitField(unit.id, "kodeUnit", e.target.value)
                    }
                    disabled={!isEditing}
                    className={`${inputClass} font-mono`}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-600">
                    Judul Unit
                  </label>
                  <input
                    type="text"
                    value={unit.judulUnit}
                    onChange={(e) =>
                      updateUnitField(unit.id, "judulUnit", e.target.value)
                    }
                    disabled={!isEditing}
                    className={inputClass}
                  />
                </div>
              </div>

              {unit.pertanyaans.map((p) => (
                <div key={p.id} className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-600">
                        Dapatkah Saya ?
                      </label>
                      <textarea
                        value={p.dapatkahSaya}
                        onChange={(e) =>
                          updatePertanyaan(unit.id, p.id, {
                            dapatkahSaya: e.target.value,
                          })
                        }
                        disabled={!isEditing}
                        rows={2}
                        className={`${textareaClass} min-h-0`}
                      />
                      <div className="flex items-center gap-6 pt-1">
                        <label
                          className={`inline-flex items-center gap-2 text-sm text-gray-700 ${
                            isEditing ? "cursor-pointer" : "cursor-default"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={p.statusK}
                            disabled={!isEditing}
                            onChange={(e) =>
                              updatePertanyaan(unit.id, p.id, {
                                statusK: e.target.checked,
                              })
                            }
                            className="w-4 h-4 rounded border-gray-300 text-[#8AA53C] focus:ring-[#8AA53C]/40 cursor-pointer disabled:cursor-default"
                          />
                          K
                        </label>
                        <label
                          className={`inline-flex items-center gap-2 text-sm text-gray-700 ${
                            isEditing ? "cursor-pointer" : "cursor-default"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={p.statusBK}
                            disabled={!isEditing}
                            onChange={(e) =>
                              updatePertanyaan(unit.id, p.id, {
                                statusBK: e.target.checked,
                              })
                            }
                            className="w-4 h-4 rounded border-gray-300 text-[#8AA53C] focus:ring-[#8AA53C]/40 cursor-pointer disabled:cursor-default"
                          />
                          BK
                        </label>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-600">
                        Bukti yang relevan
                      </label>
                      <textarea
                        value={p.bukti}
                        onChange={(e) =>
                          updatePertanyaan(unit.id, p.id, {
                            bukti: e.target.value,
                          })
                        }
                        disabled={!isEditing}
                        rows={4}
                        className={textareaClass}
                      />
                    </div>
                  </div>

                  {p.kriteriaUnjukKerja.length > 0 && (
                    <div className="text-xs text-gray-500 space-y-1">
                      <p>Kriteria Unjuk Kerja</p>
                      <ul className="list-disc pl-4 space-y-0.5">
                        {p.kriteriaUnjukKerja.map((kuk, kIdx) => (
                          <li key={kIdx}>{kuk}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        <div>
          <div className="border-t border-dashed border-gray-200 mb-8" />
          <div className="space-y-6">
            <div className="space-y-1.5">
              <h3 className="text-lg font-bold text-gray-800">
                Rekomendasi Untuk Asesi:
              </h3>
              <textarea
                value={rekomendasi}
                onChange={(e) => setRekomendasi(e.target.value)}
                disabled={!isEditing}
                rows={3}
                className={textareaClass}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Asesi */}
              <div className="space-y-4">
                <h4 className="text-base font-bold text-gray-800">Asesi:</h4>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-600">
                    Nama
                  </label>
                  <input
                    type="text"
                    value={asesiNama}
                    onChange={(e) => setAsesiNama(e.target.value)}
                    disabled={!isEditing}
                    className={inputClass}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-600">
                    Tanda Tangan dan Tanggal
                  </label>
                  <SignatureBox
                    value={asesiTtd}
                    onChange={setAsesiTtd}
                    isEditing={isEditing}
                    inputId="asesi-ttd-upload"
                  />
                </div>
              </div>

              {/* Ditinjau Oleh Asesor */}
              <div className="space-y-4">
                <h4 className="text-base font-bold text-gray-800">
                  Ditinjau Oleh Asesor:
                </h4>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-600">
                    Nama
                  </label>
                  <input
                    type="text"
                    value={asesorNama}
                    onChange={(e) => setAsesorNama(e.target.value)}
                    disabled={!isEditing}
                    className={inputClass}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-600">
                    No. Reg
                  </label>
                  <input
                    type="text"
                    value={asesorNoReg}
                    onChange={(e) => setAsesorNoReg(e.target.value)}
                    disabled={!isEditing}
                    className={inputClass}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-600">
                    Tanda Tangan dan Tanggal
                  </label>
                  <SignatureBox
                    value={asesorTtd}
                    onChange={setAsesorTtd}
                    isEditing={isEditing}
                    inputId="asesor-ttd-upload"
                  />
                </div>
              </div>
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
