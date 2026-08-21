import AuthGuard from "@/components/auth/AuthGuard";
import { DashboardLayoutWrapper } from "@/components/layout/DashboardLayoutWrapper";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <DashboardLayoutWrapper>{children}</DashboardLayoutWrapper>
    </AuthGuard>
  );
}
