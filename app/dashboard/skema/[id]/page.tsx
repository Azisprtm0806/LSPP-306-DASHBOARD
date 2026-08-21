import { PlaceholderPage } from "@/components/common/PlaceholderPage";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function SkemaDetailPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <PlaceholderPage
      title={`Detail Skema: ${id.toUpperCase()}`}
      code={id.toUpperCase()}
      category="Skema Informasi"
      description={`Halaman rincian unit kompetensi, persyaratan asesmen, dan dokumen kurikulum untuk skema ${id}.`}
    />
  );
}
