import { PlaceholderPage } from "@/components/common/PlaceholderPage";

interface PageProps {
  params: Promise<{ formId: string; subId: string }>;
}

const SUB_TITLES: Record<string, { code: string; title: string; desc: string }> = {
  "rincian": {
    code: "FR.APL.01.1",
    title: "Rincian Data Permohonan Sertifikasi",
    desc: "Bagian 1: Data pribadi pemohon sertifikasi kompetensi LSPP 306.",
  },
  "data-sertifikasi": {
    code: "FR.APL.01.2",
    title: "Data Sertifikasi",
    desc: "Bagian 2: Data skema sertifikasi, tujuan asesmen, dan unit kompetensi.",
  },
  "bukti-kelengkapan": {
    code: "FR.APL.01.3",
    title: "Bukti Kelengkapan Pemohon",
    desc: "Bagian 3: Bukti persyaratan dasar pemohon dan dokumen pendukung.",
  },
};

export default async function FRSubPage({ params }: PageProps) {
  const { formId, subId } = await params;
  const normalizedSub = subId.toLowerCase();
  const subInfo = SUB_TITLES[normalizedSub] || {
    code: `FR.${formId.toUpperCase()}`,
    title: subId.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
    desc: `Sub-halaman formulir ${formId.toUpperCase()} untuk sertifikasi kompetensi.`,
  };

  return (
    <PlaceholderPage
      title={subInfo.title}
      code={subInfo.code}
      category={`FR.${formId.toUpperCase()}`}
      description={subInfo.desc}
    />
  );
}
