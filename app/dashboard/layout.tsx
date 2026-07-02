import { NavbarDashboard } from "@/components/ui/NavbarDashboard";
import { Sidebar } from "@/components/ui/sidebar";
import { TopbarHero } from "@/components/ui/topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen bg-[#F1F3F6]">
      <NavbarDashboard />
      <TopbarHero />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <main className="flex-1 overflow-y-auto p-8">{children}</main>
      </div>
    </div>
  );
}
