import { PlaceholderPage } from "@/components/common/PlaceholderPage";

interface PageProps {
  params: Promise<{ formId: string; subId: string }>;
}

const SUB_TITLES: Record<
  string,
  { code: string; title: string; desc: string }
> = {
  rincian: {
    code: "FR.APL.01.1",
    title: "Rincian Data Permohonan Sertifikasi",
    desc: "Pada bagian ini, cantumkan data pribadi, data pendidikan formal, serta data pekerjaan anda pada saat ini.",
  },
  "data-sertifikasi": {
    code: "FR.APL.01.2",
    title: "Data Sertifikasi",
    desc: "Tuliskan Judul dan Nomor Skema Sertifikasi yang anda ajukan berikut Daftar Unit Kompetensi sesuai kemasan pada Skema Sertifikasi untuk mendapatkan pengakuan sesuai dengan latar belakang pendidikan, pelatihan, serta pengalaman kerja yang anda miliki.",
  },
  "bukti-kelengkapan": {
    code: "FR.APL.01.3",
    title: "Bukti Kelengkapan Pemohon",
    desc: "",
  },
};

export default async function FRSubPage({ params }: PageProps) {
  const { formId, subId } = await params;
  const normalizedSub = subId.toLowerCase();
  const subInfo = SUB_TITLES[normalizedSub] || {
    code: `FR.${formId.toUpperCase()}`,
    title: subId
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" "),
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
