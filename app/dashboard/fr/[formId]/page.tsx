import { PlaceholderPage } from "@/components/common/PlaceholderPage";

interface PageProps {
  params: Promise<{ formId: string }>;
}

const FORM_TITLES: Record<string, { code: string; title: string; desc: string }> = {
  "apl-01": {
    code: "FR.APL.01",
    title: "FR.APL.01 - Permohonan Sertifikasi Kompetensi",
    desc: "Formulir pendaftaran dan kelengkapan data pemohon sertifikasi kompetensi LSPP 306.",
  },
  "apl-02": {
    code: "FR.APL.02",
    title: "FR.APL.02 - Asesmen Mandiri",
    desc: "Formulir evaluasi mandiri asesi terhadap standar kompetensi kerja nasional yang diujikan.",
  },
  "mapa-01": {
    code: "FR.MAPA.01",
    title: "FR.MAPA.01 - Merencanakan Aktivitas dan Proses Asesmen",
    desc: "Formulir perencanaan aktivitas asesmen, konteks asesmen, dan pendekatan asesmen.",
  },
  "mapa-02": {
    code: "FR.MAPA.02",
    title: "FR.MAPA.02 - Peta Instrumen Asesmen",
    desc: "Pemetaan bukti langsung, tidak langsung, dan tambahan beserta instrumen evaluasi.",
  },
  "ak-01": {
    code: "FR.AK.01",
    title: "FR.AK.01 - Persetujuan Asesmen dan Kerahasiaan",
    desc: "Persetujuan pelaksanaan asesmen dan kesepakatan kerahasiaan antara asesi dan asesor.",
  },
  "ak-02": {
    code: "FR.AK.02",
    title: "FR.AK.02 - Rekaman Asesmen Kompetensi",
    desc: "Dokumen rekam jejak penilaian capaian setiap elemen dan kriteria unjuk kerja.",
  },
  "ak-03": {
    code: "FR.AK.03",
    title: "FR.AK.03 - Umpan Balik dan Catatan Asesmen",
    desc: "Formulir pemberian umpan balik dari asesi kepada asesor mengenai proses asesmen.",
  },
  "ak-04": {
    code: "FR.AK.04",
    title: "FR.AK.04 - Banding Asesmen",
    desc: "Formulir pengajuan banding hasil asesmen oleh asesi jika terdapat keberatan rekomendasi.",
  },
  "ak-05": {
    code: "FR.AK.05",
    title: "FR.AK.05 - Laporan Asesmen",
    desc: "Laporan ringkas hasil pelaksanaan asesmen kompetensi untuk komite teknis LSPP.",
  },
  "ak-06": {
    code: "FR.AK.06",
    title: "FR.AK.06 - Meninjau Proses Asesmen",
    desc: "Evaluasi dan peninjauan berkala efektivitas instrumen dan prosedur pelaksanaan asesmen.",
  },
  "ak-07": {
    code: "FR.AK.07",
    title: "FR.AK.07 - Ceklis Verifikasi Portofolio",
    desc: "Daftar ceklis verifikasi kesesuaian dan keabsahan portofolio bukti kerja asesi.",
  },
  "ia-04a": {
    code: "FR.IA.04A",
    title: "FR.IA.04A - Daftar Cek Verifikasi Portofolio (A)",
    desc: "Instrumen asesmen verifikasi portofolio bagian A untuk asesi pariwisata.",
  },
  "ia-04b": {
    code: "FR.IA.04B",
    title: "FR.IA.04B - Daftar Cek Verifikasi Portofolio (B)",
    desc: "Instrumen asesmen verifikasi portofolio bagian B untuk asesi pariwisata.",
  },
  "ia-06a": {
    code: "FR.IA.06A",
    title: "FR.IA.06A - Pertanyaan Tertulis Esai",
    desc: "Instrumen uji kompetensi berupa pertanyaan tertulis esai.",
  },
  "ia-06b": {
    code: "FR.IA.06B",
    title: "FR.IA.06B - Kunci Jawaban Pertanyaan Tertulis Esai",
    desc: "Lembar kunci jawaban pertanyaan tertulis esai.",
  },
  "ia-06c": {
    code: "FR.IA.06C",
    title: "FR.IA.06C - Lembar Jawaban Asesi Tertulis Esai",
    desc: "Lembar jawaban tertulis esai peserta asesmen.",
  },
  "ia-08": {
    code: "FR.IA.08",
    title: "FR.IA.08 - Ceklis Verifikasi Portofolio",
    desc: "Instrumen ceklis verifikasi bukti portofolio tambahan.",
  },
  "ia-09": {
    code: "FR.IA.09",
    title: "FR.IA.09 - Pertanyaan Wawancara",
    desc: "Instrumen daftar pertanyaan wawancara untuk bukti tambahan.",
  },
  "va": {
    code: "FR.VA",
    title: "FR.VA - Verifikasi Asesmen",
    desc: "Formulir verifikasi tempat uji kompetensi dan perangkat asesmen.",
  },
};

export default async function FRFormPage({ params }: PageProps) {
  const { formId } = await params;
  const normalizedId = formId.toLowerCase();
  const formInfo = FORM_TITLES[normalizedId] || {
    code: `FR.${formId.toUpperCase()}`,
    title: `Formulir FR.${formId.toUpperCase()}`,
    desc: "Halaman formulir standar operasional asesmen sertifikasi LSPP 306.",
  };

  return (
    <PlaceholderPage
      title={formInfo.title}
      code={formInfo.code}
      category="Pages"
      description={formInfo.desc}
    />
  );
}
