"use client";

import { ReactNode, useEffect } from "react";

interface APL01LayoutProps {
  children: ReactNode;
}

const SECTIONS = ["rincian", "data-sertifikasi", "bukti-kelengkapan"];

export default function APL01Layout({ children }: APL01LayoutProps) {
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        const el = document.getElementById(hash);
        if (el) {
          setTimeout(() => {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 150);
        }
      }
    }
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            window.dispatchEvent(
              new CustomEvent("apl01-section-change", { detail: id }),
            );
            if (
              typeof window !== "undefined" &&
              window.location.hash !== `#${id}`
            ) {
              window.history.replaceState(null, "", `#${id}`);
            }
          }
        },
        {
          rootMargin: "-20% 0px -60% 0px",
          threshold: 0,
        },
      );

      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return <>{children}</>;
}
