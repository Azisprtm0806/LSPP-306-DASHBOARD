"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import GlobalLoader from "@/components/ui/loader";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isLoading && !isAuthenticated) {
      const redirectUrl = pathname
        ? `/login?redirect=${encodeURIComponent(pathname)}`
        : "/login";
      router.replace(redirectUrl);
    }
  }, [mounted, isAuthenticated, isLoading, router, pathname]);

  if (!mounted || isLoading) {
    return <GlobalLoader />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
