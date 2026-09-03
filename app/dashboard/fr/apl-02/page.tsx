"use client";

import { useState } from "react";
import { Check, Pencil, Save, Plus, X } from "lucide-react";

const inputClass =
  "w-full px-3.5 py-2.5 text-sm text-gray-800 bg-white border border-gray-300 focus:border-[#7E9631] focus:outline-none focus:ring-2 focus:ring-[#7E9631]/20 transition-all disabled:bg-gray-50 disabled:text-gray-400";

const textareaClass =
  "w-full min-h-[88px] p-3 text-sm text-gray-800 bg-white border border-gray-300 focus:border-[#7E9631] focus:outline-none focus:ring-2 focus:ring-[#7E9631]/20 resize-none transition-all disabled:bg-gray-50 disabled:text-gray-400";

const buktiInputClass =
  "flex-1 px-2.5 py-1.5 text-xs text-gray-600 bg-white border border-gray-300 focus:border-[#7E9631] focus:outline-none focus:ring-2 focus:ring-[#7E9631]/20 transition-all disabled:bg-gray-50 disabled:text-gray-400 placeholder:text-gray-400";

const checkboxClass =
  "w-4 h-4 border-gray-300 text-[#8AA53C] focus:ring-[#8AA53C]/40 cursor-pointer disabled:cursor-default";

function inlineEditableClass(isEditing: boolean, extra = "") {
  return `w-full px-1.5 py-0.5 border transition-all ${extra} ${
    isEditing
      ? "border-gray-300 bg-white focus:border-[#7E9631] focus:outline-none focus:ring-2 focus:ring-[#7E9631]/20"
      : "border-transparent bg-transparent"
  }`;
}

interface KUKItem {
  id: string;
  teks: string;
}

interface BuktiItem {
  id: string;
  teks: string;
}

interface ElemenItem {
  id: string;
  nomor: number;
  nama: string;
  statusK: boolean;
  statusBK: boolean;
  kukList: KUKItem[];
  buktiList: BuktiItem[];
}

interface UnitItem {
  id: string;
  kodeUnit: string;
  judulUnit: string;
  elemens: ElemenItem[];
}

const INSTRUKSI = [
  "Baca setiap pertanyaan di kolom sebelah kiri",
  "Beri tanda centang (\u221a) pada kotak jika Anda yakin dapat melakukan tugas yang dijelaskan.",
  "Isi kolom di sebelah kanan dengan menuliskan bukti yang relevan anda miliki untuk menunjukkan bahwa anda melakukan pekerjaan.",
];

const RAW_UNITS: {
  kodeUnit: string;
  judulUnit: string;
  items: { nama: string; kuk: string[] }[];
}[] = [
  {
    kodeUnit: "I.55HDR00.217.2",
    judulUnit:
      "Berkomunikasi Secara Lisan Dalam Bahasa Inggris pada Tingkat Operasional Dasar",
    items: [
      {
        nama: "Berkomunikasi dengan pelanggan dan kolega mengenai hal-hal yang berkaitan dengan kegiatan dasar dan sehari-hari ditempat kerja serta kegiatan pelayanan pelanggan.",
        kuk: [
          "Istilah, ungkapan, dan bahasa tubuh untuk memperjelas komunikasi secara lisan dilakukan",
          "Mengerti dan menggunakan kalimat yang sopan dan ramah serta mengetahui kapan harus memakai kalimat resmi atau tidak resmi",
        ],
      },
      {
        nama: "Berbicara melalui telepon",
        kuk: [
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
    kodeUnit: "I.55HDR00.149.2",
    judulUnit: "Melakukan Kerjasama Dengan Kolega dan Pelanggan",
    items: [
      {
        nama: "Melakukan komunikasi di tempat kerja",
        kuk: [
          "Komunikasi dengan tamu dan kolega dilaksanakan secara terbuka, profesional, ramah dan sopan.",
          "Gunakan bahasa dan nada yang cocok.",
          "Efek bahasa tubuh personal dipertimbangkan.",
          "Kepekaan terhadap perbedaan budaya dan sosial diperlihatkan",
          "Mendengar dan melontarkan pertanyaan secara aktif digunakan untuk memastikan komunikasi dua arah yang efektif",
          "Konflik yang ada dan potensial diidentifikasi dan solusi dicari dengan bantuan dari kolega bila dibutuhkan.",
        ],
      },
      {
        nama: "Memberikan bantuan untuk tamu internal dan eksternal",
        kuk: [
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
        nama: "Menjaga standar kinerja presentasi personal",
        kuk: [
          "Standar kinerja tinggi digunakan untuk dapat melakukan pekerjaan yang berkaitan dengan kolega serta pelanggan",
          "Penggunaan standar kinerja diterapkan pada saat melakukan pekerjaan di tempat kerja serta mempertimbangkan kriteria lainnnya sesuai peraturan perusahaan",
          "Masalah kebersihan, kesehatan dan keselamatan.",
          "Persyaratan presentasi khusus untuk fungsi kerja khusus.",
          "Perawatan kebersihan personil yang sesuai dengan standar perusahaan.",
          "Pakaian yang pantas.",
        ],
      },
      {
        nama: "Melakukan kerja dalam tim",
        kuk: [
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
    kodeUnit: "I.55HDR00.150.2",
    judulUnit: "Melakukan Kerja Dalam Lingkungan Sosial yang Beragam",
    items: [
      {
        nama: "Melakukan komunikasi dengan pelanggan dan kolega dari latar belakang yang beragam",
        kuk: [
          "Pelanggan dan kolega dari seluruh kelompok budaya dinilai dan diperlakukan dengan hormat dan kepekaan.",
          "Komunikasi lisan dan non-lisan mempertimbangkan perbedaan budaya.",
          "Dimana ada hambatan bahasa, usaha-usaha dilakukan untuk berkomunikasi dengan bahasa isyarat atau kata-kata sederhana dalam bahasa orang tersebut.",
          "Bantuan dari kolega, buku-buku referensi atau organisasi luar diperoleh ketika dibutuhkan.",
        ],
      },
      {
        nama: "Menangani kesalah pahaman antar budaya",
        kuk: [
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
    kodeUnit: "N.82MIC00.074.2",
    judulUnit: "Mencari dan Memberikan Informasi",
    items: [
      {
        nama: "Melakukan komunikasi dengan pelanggan dan kolega dari latar belakang yang beragam",
        kuk: [
          "Sumber informasi yang ada dicari tahu sesuai dengan informasi yang akan dicari.",
          "Sumber informasi didapatkan dan diteliti keabsahannya sesuai dengan kebutuhan.",
          "Informasi didapatkan sesuai dengan jadwal yang telah ditetapkan.",
        ],
      },
      {
        nama: "Mempersiapkan dan memberikan informasi",
        kuk: [
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
    kodeUnit: "N.82MIC00.087.3",
    judulUnit: "Mengikuti Aturan Keprotokolan",
    items: [
      {
        nama: "Mengidentifikasi kategori tamu atau delegasi yang akan datang",
        kuk: [
          "Daftar tamu kegiatan disusun berdasarkan tamu yang diundang.",
          "Profil tamu diidentifikasi sesuai kebijakan perusahaan.",
          "Logistik kebutuhan tamu diidentifikasi sesuai kebutuhan kegiatan",
        ],
      },
      {
        nama: "Merencanakan rangkaian kegiatan kenegaraan atau kegiatan resmi secara detail",
        kuk: [
          "Kebutuhan dan kebiasaan tamu diidentifikasi berdasarkan kebijakan perusahaan.",
          "Susunan rincian acara dibuat sesuai dengan kebutuhan tamu.",
          "Susunan rincian acara dianalisis sesuai kebutuhan.",
          "Susunan rincian acara dikembangkan sesuai kebutuhan.",
          "Susunan rincian acara dikoordinasikan dengan semua pihak terkait.",
        ],
      },
      {
        nama: "Menetapkan rangkaian susunan kegiatan",
        kuk: [
          "Susunan kegiatan dibuat sesuai dengan rencana.",
          "Susunan kegiatan ditetapkan sesuai dengan kesepakatan.",
          "Gladi kotor dan gladi bersih dilakukan bersama semua pihak yang terkait sesuai dengan kebutuhan.",
        ],
      },
      {
        nama: "Menjelaskan tentang Keseluruhan rangkaian kegiatan dan layanan secara rinci",
        kuk: [
          "Lokasi penyelenggaraan, jadwal kegiatan, fasilitas, dan informasi umum lainnya dijelaskan dalam rangkaian kegiatan secara keseluruhan.",
          "Ketersediaan layanan dan logistic disampaikan secara lisan maupun tulisan dalam bentuk buku panduan sesuai prosedur.",
        ],
      },
    ],
  },
  {
    kodeUnit: "I.55HDR00.224.2",
    judulUnit:
      "Menulis Dalam Bahasa Inggris pada Tingkat Penyeliaan dan Operasional Menengah",
    items: [
      {
        nama: "Menulis dokumen rutin dan tidak rutin di tempat kerja",
        kuk: [
          "Pembaca dan tujuan dari teks diidentifikasi",
          "Dokumen yang tepat dipilih untuk dipersiapkan",
          "Ide dikembangkan secara mendalam untuk memenuhi kebutuhan konteks khusus",
          "Bahasa yang sesuai digunakan untuk memenuhi persyaratan ditempat kerja dan/atau situasi",
          "Tata cara, sosial, dan budaya diamati yang berkaitan dengan penulisan dokumen di tempat kerja",
          "Kaidah ejaan, tanda baca, dan tata Bahasa (Kepotong di skkni)",
        ],
      },
      {
        nama: "Menulis petunjuk dan instruksi rutin dan tidak rutin",
        kuk: [
          "Pembaca dan tujuan dari teks diidentifikasi",
          "Kata kunci, ungkapan, dan kalimat sederhana digunakan dalam menyampaikan suatu pengertian",
          "Instruksi dan/atau petunjuk diurut dengan benar",
          "Kaidah ejaan, tanda baca dan tata Bahasa yang umum diikuti dalam bisnis",
          "Komunikasi tertulis didukung dengan informasi visual seperti tanda-tanda, peta, diagram, dan tabel apabila diperlukan",
        ],
      },
      {
        nama: "Menulis laporan singkat",
        kuk: [
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
    kodeUnit: "I.55HDR00.224.2",
    judulUnit: "Memproses dan Memantau Pendaftaran Kegiatan",
    items: [
      {
        nama: "Memproses pendaftaran",
        kuk: [
          "Pendaftaran acara ditafsirkan dan diproses secara akurat sesuai dengan prosedur organisasi dan jadwal.",
          "Informasi pelanggan diidentifikasi, dikumpulkan, dan diproses sesuai tenggat waktu.",
          "Penawaran untuk pendaftaran tidak disediakan termasuk pilihan daftar tunggu sesuai ketentuan.",
          "Pertanyaan dijawab tentang biaya dan detail acara lainnya sesuai dengan prosedur.",
          "Rekam rincian pelanggan digunakan dengan sistem dan teknologi yang tepat guna sesuai dengan perkembangan zaman.",
          "Berkas pendaftaran acara dievaluasi sesuai dengan sistem atau persyaratan prosedural.",
        ],
      },
      {
        nama: "Memperbaharui pendaftaran",
        kuk: [
          "Status keuangan diperbaharui dari pendaftaran yang akurat sesuai spesifikasi.",
          "Setiap permintaan pelanggan diterima, diproses, dan direkam untuk perubahan atau pembatalan sesuai kesepakatan para pihak.",
          "Pemahaman dari rincian perubahan atau pembatalan kondisi dan biaya diberikan dan dikonfirmasi kepada pelanggan sesuai prosedur.",
        ],
      },
      {
        nama: "Memantau dan menghasilkan laporan pendaftaran",
        kuk: [
          "Laporan pendaftaran personel yang relevan dipantau dan dihasilkan sesuai dengan kebutuhan.",
          "Masalah yang muncul diidentifikasi dan dilaporkan secara proaktif dari informasi kehadiran sesuai prosedur.",
          "Tindakan diambil untuk mengatasi masalah kehadiran sesuai dengan tanggung jawab individu dan prosedur organisasi.",
        ],
      },
      {
        nama: "Menghasilkan Dokumentasi pendaftaran akhir",
        kuk: [
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
    kodeUnit: "N.82MIC00.086.3",
    judulUnit: "Mengatur Pendaftaran Tamu dalam Suatu Acara",
    items: [
      {
        nama: "Melakukan persiapan pendaftaran",
        kuk: [
          "Seluruh database dan peralatan yang diperlukan untuk pendaftaran disiapkan.",
          "Persiapan untuk tempat pendaftaran diperiksa sesuai acara dan sesuai dengan persetujuan.",
          "Perincian akses dikonfirmasi sesuai acara",
        ],
      },
      {
        nama: "Melakukan penataan tempat pendaftaran",
        kuk: [
          "Tempat pendaftaran dan tata letaknya diperiksa sesuai permintaan sebelumnya.",
          "Tempat pendaftaran diperiksa untuk keamanan dan kenyamanan tamu, anggota delegasi serta rekan sejawatnya termasuk yang ber-handicap/cacat sesuai dengan prosedur.",
          "Tanda-tanda disiapkan sesuai persetujuan sebelumnya.",
          "Peralatan disiapkan sebelum pelaksanaan acara.",
          "Materi disiapkan sesuai area pendaftaran.",
        ],
      },
      {
        nama: "Melakukan proses pendaftaran",
        kuk: [
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
    kodeUnit: "N.82MIC00.027.1",
    judulUnit: "Mengelola Database",
    items: [
      {
        nama: "Membuat database sederhana",
        kuk: [
          "Database sederhana dirancang dengan menggunakan aplikasi database, prinsip desain dasar, fungsi perangkat lunak, dan rumus sederhana. persyaratan tugas dan organisasi.",
          "Tabel dikembangkan dengan bidang dan atribut yang sesuai dengan penggunaan database, seperti pertimbangan data dan persyaratan pengguna.",
          "Kunci utama untuk setiap table dibuat sesuai dengan kebutuhan.",
          "Tata letak tabel dan atribut bidang dimodifikasi sesuai kebutuhan.",
          "Hubungan di antara kedua table dibuat sesuai dengan kebutuhan.",
          "Data yang dimasukkan diperiksa dan diubah sesuai dengan",
        ],
      },
      {
        nama: "Membuat laporan dan permintaan",
        kuk: [
          "Penggunaan hasil informasi, table database, dan tata letak laporan ditentukan untuk memenuhi persyaratan tugas sesuai dengan permintaan.",
          "Pengelompokan data dan kriteria dibuat untuk memenuhi persyaratan tugas sesuai dengan permintaan.",
          "Laporan dan permintaan diakses untuk memeriksa hasil dan rumus telah sesuai dengan data yang diperlukan.",
          "Laporan dimodifikasi sebagai persyaratan tambahan sesuai dengan kebutuhan.",
        ],
      },
      {
        nama: "Menggunakan database",
        kuk: [
          "Database yang diakses dipastikan kesesuaiannya memenuhi tenggat waktu yang ditentukan dan persyaratan organisasi seusai dengan kebutuhan.",
          "Permasalahan database, rancangan, dan produksi diperbaiki sesuai dengan buku pedoman, dokumentasi pengguna, dan bantuan secara daring.",
        ],
      },
    ],
  },
];

function buildInitialUnits(): UnitItem[] {
  return RAW_UNITS.map((ru, uIdx) => ({
    id: `unit-${uIdx + 1}`,
    kodeUnit: ru.kodeUnit,
    judulUnit: ru.judulUnit,
    elemens: ru.items.map((item, eIdx) => ({
      id: `unit-${uIdx + 1}-elemen-${eIdx + 1}`,
      nomor: eIdx + 1,
      nama: item.nama,
      statusK: false,
      statusBK: false,
      kukList: item.kuk.map((teks, kIdx) => ({
        id: `unit-${uIdx + 1}-elemen-${eIdx + 1}-kuk-${kIdx + 1}`,
        teks,
      })),
      buktiList: [
        { id: `unit-${uIdx + 1}-elemen-${eIdx + 1}-bukti-1`, teks: "" },
      ],
    })),
  }));
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
      className={`relative w-full h-[130px] border border-dashed flex items-center justify-center overflow-hidden transition-all ${
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
    "MEETING/CONFERENCE PROJECT MANAGER",
  );
  const [nomorSkema, setNomorSkema] = useState("005/LSPP306/V/2026");
  const [skemaType, setSkemaType] = useState<"kkni" | "okupasi" | "klaster">(
    "okupasi",
  );
  const [units, setUnits] = useState<UnitItem[]>(buildInitialUnits);
  const [isEditing, setIsEditing] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [keputusan, setKeputusan] = useState<
    "diterima" | "tidak_diterima" | null
  >(null);
  const [metode, setMetode] = useState({ tpd: false, kt: false, vp: false });
  const [jenisBuktiTambahan, setJenisBuktiTambahan] = useState("");
  const [catatan, setCatatan] = useState("");
  const [pemohonNama, setPemohonNama] = useState("");
  const [pemohonTtd, setPemohonTtd] = useState<string | null>(null);
  const [adminNama, setAdminNama] = useState("");
  const [adminTtd, setAdminTtd] = useState<string | null>(null);

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

  const updateElemen = (
    unitId: string,
    elemenId: string,
    patch: Partial<ElemenItem>,
  ) => {
    setUnits((prev) =>
      prev.map((u) => {
        if (u.id !== unitId) return u;
        return {
          ...u,
          elemens: u.elemens.map((e) =>
            e.id === elemenId ? { ...e, ...patch } : e,
          ),
        };
      }),
    );
  };

  const updateKUK = (
    unitId: string,
    elemenId: string,
    kukId: string,
    teks: string,
  ) => {
    setUnits((prev) =>
      prev.map((u) => {
        if (u.id !== unitId) return u;
        return {
          ...u,
          elemens: u.elemens.map((e) => {
            if (e.id !== elemenId) return e;
            return {
              ...e,
              kukList: e.kukList.map((k) =>
                k.id === kukId ? { ...k, teks } : k,
              ),
            };
          }),
        };
      }),
    );
  };

  const updateBukti = (
    unitId: string,
    elemenId: string,
    buktiId: string,
    teks: string,
  ) => {
    setUnits((prev) =>
      prev.map((u) => {
        if (u.id !== unitId) return u;
        return {
          ...u,
          elemens: u.elemens.map((e) => {
            if (e.id !== elemenId) return e;
            return {
              ...e,
              buktiList: e.buktiList.map((b) =>
                b.id === buktiId ? { ...b, teks } : b,
              ),
            };
          }),
        };
      }),
    );
  };

  const addBukti = (unitId: string, elemenId: string) => {
    setUnits((prev) =>
      prev.map((u) => {
        if (u.id !== unitId) return u;
        return {
          ...u,
          elemens: u.elemens.map((e) => {
            if (e.id !== elemenId) return e;
            return {
              ...e,
              buktiList: [
                ...e.buktiList,
                { id: `${elemenId}-bukti-${Date.now()}`, teks: "" },
              ],
            };
          }),
        };
      }),
    );
  };

  const removeBukti = (unitId: string, elemenId: string, buktiId: string) => {
    setUnits((prev) =>
      prev.map((u) => {
        if (u.id !== unitId) return u;
        return {
          ...u,
          elemens: u.elemens.map((e) => {
            if (e.id !== elemenId) return e;
            if (e.buktiList.length <= 1) return e;
            return {
              ...e,
              buktiList: e.buktiList.filter((b) => b.id !== buktiId),
            };
          }),
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
        {/* Ringkasan Skema Sertifikasi */}
        <div className="border border-gray-200">
          <table className="w-full border-collapse text-sm">
            <tbody>
              <tr>
                <td
                  rowSpan={2}
                  className="w-56 align-middle px-4 py-3 bg-gray-50 border border-gray-200 font-semibold text-gray-700 text-sm"
                >
                  Skema Sertifikasi (
                  <button
                    type="button"
                    disabled={!isEditing}
                    onClick={() => setSkemaType("kkni")}
                    className={
                      skemaType === "kkni"
                        ? "text-gray-800"
                        : "line-through text-gray-400"
                    }
                  >
                    KKNI
                  </button>
                  /
                  <button
                    type="button"
                    disabled={!isEditing}
                    onClick={() => setSkemaType("okupasi")}
                    className={
                      skemaType === "okupasi"
                        ? "text-gray-800"
                        : "line-through text-gray-400"
                    }
                  >
                    Okupasi
                  </button>
                  /
                  <button
                    type="button"
                    disabled={!isEditing}
                    onClick={() => setSkemaType("klaster")}
                    className={
                      skemaType === "klaster"
                        ? "text-gray-800"
                        : "line-through text-gray-400"
                    }
                  >
                    Klaster
                  </button>
                  )
                </td>
                <td className="w-24 px-4 py-3 border border-gray-200 font-semibold text-gray-600">
                  Judul
                </td>
                <td className="w-8 px-2 py-3 border border-gray-200 text-center text-gray-400">
                  :
                </td>
                <td className="px-3 py-2 border border-gray-200">
                  <input
                    type="text"
                    value={judulSkema}
                    onChange={(e) => setJudulSkema(e.target.value)}
                    disabled={!isEditing}
                    className={inputClass}
                  />
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 border border-gray-200 font-semibold text-gray-600">
                  Nomor
                </td>
                <td className="px-2 py-3 border border-gray-200 text-center text-gray-400">
                  :
                </td>
                <td className="px-3 py-2 border border-gray-200">
                  <input
                    type="text"
                    value={nomorSkema}
                    onChange={(e) => setNomorSkema(e.target.value)}
                    disabled={!isEditing}
                    className={inputClass}
                  />
                </td>
              </tr>
            </tbody>
          </table>
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

        <div className="space-y-2">
          <h3 className="text-base font-bold text-gray-800">
            Skema Sertifikasi (KKNI/Okupasi/Klaster)
          </h3>
          <p className="text-sm text-gray-600">
            Tuliskan Judul dan Nomor Skema Sertifikasi yang anda ajukan berikut
            Daftar Unit Kompetensi sesuai kemasan pada Skema Sertifikasi untuk
            mendapatkan pengakuan sesuai dengan latar belakang pendidikan,
            pelatihan, serta pengalaman kerja yang anda miliki.
          </p>
        </div>

        {units.map((unit, uIdx) => (
          <div key={unit.id}>
            <div className="border-t border-dashed border-gray-200 mb-8" />
            {/* Kode Unit / Judul Unit + Elemen table, merged into a single bordered block */}
            <div className="border border-gray-200">
              <table className="w-full border-collapse text-sm">
                <tbody>
                  <tr>
                    <td
                      rowSpan={2}
                      className="w-40 align-middle px-4 py-3 bg-gray-50 border border-gray-200 font-bold text-gray-800"
                    >
                      Unit Kompetensi {uIdx + 1}
                    </td>
                    <td className="w-28 px-4 py-3 border border-gray-200 font-semibold text-gray-600">
                      Kode Unit
                    </td>
                    <td className="w-8 px-2 py-3 border border-gray-200 text-center text-gray-400">
                      :
                    </td>
                    <td className="px-3 py-2 border border-gray-200">
                      <input
                        type="text"
                        value={unit.kodeUnit}
                        onChange={(e) =>
                          updateUnitField(unit.id, "kodeUnit", e.target.value)
                        }
                        disabled={!isEditing}
                        className={`${inputClass} font-mono`}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 border border-gray-200 font-semibold text-gray-600">
                      Judul Unit
                    </td>
                    <td className="px-2 py-3 border border-gray-200 text-center text-gray-400">
                      :
                    </td>
                    <td className="px-3 py-2 border border-gray-200">
                      <input
                        type="text"
                        value={unit.judulUnit}
                        onChange={(e) =>
                          updateUnitField(unit.id, "judulUnit", e.target.value)
                        }
                        disabled={!isEditing}
                        className={inputClass}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>

              <table className="w-full border-collapse text-sm table-fixed">
                <thead>
                  <tr className="text-xs font-semibold text-gray-600">
                    <th className="text-left px-4 py-2.5 border border-gray-200">
                      Dapatkah saya ...............?
                    </th>
                    <th className="w-12 px-2 py-2.5 border border-gray-200">
                      K
                    </th>
                    <th className="w-12 px-2 py-2.5 border border-gray-200">
                      BK
                    </th>
                    <th className="w-72 text-left px-4 py-2.5 border border-gray-200">
                      Bukti yang relevan
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {unit.elemens.map((elemen) => (
                    <tr key={elemen.id} className="align-top">
                      <td className="px-4 py-4 border border-gray-200 align-top">
                        <div className="flex items-start gap-1.5 mb-2">
                          <span className="text-sm font-semibold text-gray-800 shrink-0">
                            {elemen.nomor}. Elemen:
                          </span>
                          <input
                            type="text"
                            value={elemen.nama}
                            onChange={(e) =>
                              updateElemen(unit.id, elemen.id, {
                                nama: e.target.value,
                              })
                            }
                            disabled={!isEditing}
                            className={inlineEditableClass(
                              isEditing,
                              "text-sm font-semibold text-gray-800",
                            )}
                          />
                        </div>
                        <p className="text-xs italic text-gray-500 mb-1.5">
                          * Kriteria Unjuk Kerja:
                        </p>
                        <ol className="space-y-1.5">
                          {elemen.kukList.map((kuk, kIdx) => (
                            <li
                              key={kuk.id}
                              className="flex gap-2 text-xs text-gray-600"
                            >
                              <span className="shrink-0 text-gray-400 pt-0.5">
                                {elemen.nomor}.{kIdx + 1}
                              </span>
                              <input
                                type="text"
                                value={kuk.teks}
                                onChange={(e) =>
                                  updateKUK(
                                    unit.id,
                                    elemen.id,
                                    kuk.id,
                                    e.target.value,
                                  )
                                }
                                disabled={!isEditing}
                                className={inlineEditableClass(
                                  isEditing,
                                  "text-xs text-gray-600",
                                )}
                              />
                            </li>
                          ))}
                        </ol>
                      </td>
                      <td className="px-2 py-4 border border-gray-200 text-center">
                        <input
                          type="checkbox"
                          checked={elemen.statusK}
                          disabled={!isEditing}
                          onChange={(e) =>
                            updateElemen(unit.id, elemen.id, {
                              statusK: e.target.checked,
                            })
                          }
                          className={checkboxClass}
                        />
                      </td>
                      <td className="px-2 py-4 border border-gray-200 text-center">
                        <input
                          type="checkbox"
                          checked={elemen.statusBK}
                          disabled={!isEditing}
                          onChange={(e) =>
                            updateElemen(unit.id, elemen.id, {
                              statusBK: e.target.checked,
                            })
                          }
                          className={checkboxClass}
                        />
                      </td>
                      <td className="px-4 py-4 border border-gray-200">
                        <ol className="space-y-1.5">
                          {elemen.buktiList.map((bukti, bIdx) => (
                            <li
                              key={bukti.id}
                              className="flex items-center gap-2"
                            >
                              <span className="text-xs text-gray-400 shrink-0">
                                {bIdx + 1}
                              </span>
                              <input
                                type="text"
                                value={bukti.teks}
                                onChange={(e) =>
                                  updateBukti(
                                    unit.id,
                                    elemen.id,
                                    bukti.id,
                                    e.target.value,
                                  )
                                }
                                disabled={!isEditing}
                                placeholder="Judul Dokumen Bukti..."
                                className={buktiInputClass}
                              />
                              {isEditing && elemen.buktiList.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    removeBukti(unit.id, elemen.id, bukti.id)
                                  }
                                  className="text-gray-300 hover:text-red-500 shrink-0 cursor-pointer"
                                >
                                  <X size={13} />
                                </button>
                              )}
                            </li>
                          ))}
                        </ol>
                        {isEditing && (
                          <button
                            type="button"
                            onClick={() => addBukti(unit.id, elemen.id)}
                            className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[#7E9631] hover:text-[#6C8229] cursor-pointer"
                          >
                            <Plus size={12} />
                            Tambah Bukti
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}

        {/* Rekomendasi */}
        <div>
          <div className="border-t border-dashed border-gray-200 mb-8" />
          <div className="border border-gray-200">
            <table className="w-full border-collapse text-sm">
              <tbody>
                <tr>
                  <td className="w-1/2 align-top p-5 border border-gray-200">
                    <p className="font-bold text-gray-800 mb-1">
                      Rekomendasi (diisi oleh LSP):
                    </p>
                    <p className="text-xs text-gray-500 mb-3">
                      Berdasarkan ketentuan persyaratan dasar, maka pemohon:
                    </p>
                    <p className="text-sm font-semibold mb-1">
                      <button
                        type="button"
                        disabled={!isEditing}
                        onClick={() =>
                          setKeputusan((prev) =>
                            prev === "diterima" ? null : "diterima",
                          )
                        }
                        className={
                          keputusan === "tidak_diterima"
                            ? "line-through text-gray-400 cursor-pointer"
                            : "text-gray-800 cursor-pointer"
                        }
                      >
                        Diterima
                      </button>
                      {" / "}
                      <button
                        type="button"
                        disabled={!isEditing}
                        onClick={() =>
                          setKeputusan((prev) =>
                            prev === "tidak_diterima" ? null : "tidak_diterima",
                          )
                        }
                        className={
                          keputusan === "diterima"
                            ? "line-through text-gray-400 cursor-pointer"
                            : "text-gray-800 cursor-pointer"
                        }
                      >
                        Tidak diterima
                      </button>
                      {" *)"}
                    </p>
                    <p className="text-xs text-gray-500 mb-1">
                      sebagai peserta sertifikasi
                    </p>
                    <p className="text-xs italic text-gray-400 mb-3">
                      *coret yang tidak sesuai
                    </p>
                    <p className="text-xs italic text-gray-500 mb-1.5">
                      Dengan menggunakan Metode:
                    </p>
                    <div className="space-y-1.5 mb-4">
                      {(["tpd", "kt", "vp"] as const).map((m) => (
                        <label
                          key={m}
                          className={`flex items-center gap-2 text-sm text-gray-700 ${
                            isEditing ? "cursor-pointer" : "cursor-default"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={metode[m]}
                            disabled={!isEditing}
                            onChange={(e) =>
                              setMetode((prev) => ({
                                ...prev,
                                [m]: e.target.checked,
                              }))
                            }
                            className={checkboxClass}
                          />
                          {m.toUpperCase()}
                        </label>
                      ))}
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-600">
                        Jenis Bukti Tambahan
                      </label>
                      <input
                        type="text"
                        value={jenisBuktiTambahan}
                        onChange={(e) => setJenisBuktiTambahan(e.target.value)}
                        disabled={!isEditing}
                        className={inputClass}
                      />
                    </div>
                  </td>
                  <td className="w-1/2 align-top border border-gray-200 p-0">
                    <div className="px-5 py-2.5 bg-gray-50 border-b border-gray-200 font-bold text-gray-800">
                      Pemohon/Kandidat:
                    </div>
                    <div className="p-5 space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-600">
                          Nama
                        </label>
                        <input
                          type="text"
                          value={pemohonNama}
                          onChange={(e) => setPemohonNama(e.target.value)}
                          disabled={!isEditing}
                          className={inputClass}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-600">
                          Tanda Tangan dan Tanggal
                        </label>
                        <SignatureBox
                          value={pemohonTtd}
                          onChange={setPemohonTtd}
                          isEditing={isEditing}
                          inputId="pemohon-ttd-upload"
                        />
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="align-top p-5 border border-gray-200">
                    <p className="font-bold text-gray-800 mb-2">Catatan:</p>
                    <textarea
                      value={catatan}
                      onChange={(e) => setCatatan(e.target.value)}
                      disabled={!isEditing}
                      rows={6}
                      className={textareaClass}
                    />
                  </td>
                  <td className="align-top border border-gray-200 p-0">
                    <div className="px-5 py-2.5 bg-gray-50 border-b border-gray-200 font-bold text-gray-800">
                      Admin LSP:
                    </div>
                    <div className="p-5 space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-600">
                          Nama
                        </label>
                        <input
                          type="text"
                          value={adminNama}
                          onChange={(e) => setAdminNama(e.target.value)}
                          disabled={!isEditing}
                          className={inputClass}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-600">
                          Tanda Tangan dan Tanggal
                        </label>
                        <SignatureBox
                          value={adminTtd}
                          onChange={setAdminTtd}
                          isEditing={isEditing}
                          inputId="admin-ttd-upload"
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
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
