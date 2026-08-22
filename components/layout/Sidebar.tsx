"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAVIGATION_CONFIG, isNavItemActive } from "@/lib/navigation";
import { NavSubItem } from "@/types/navigation";

interface SidebarProps {
  onItemClick?: () => void;
  className?: string;
}

function PageBadgeIcon({ active = false }: { active?: boolean }) {
  return (
    <span
      className={`shrink-0 flex items-center justify-center w-4 h-4 rounded-[3px] transition-colors ${
        active ? "bg-[#8AA53C]" : "bg-[#8A909D]"
      }`}
    >
      <svg
        className="w-2.5 h-2.5 text-white"
        viewBox="0 0 10 10"
        fill="currentColor"
      >
        <rect x="1.5" y="2" width="7" height="1.2" rx="0.4" />
        <rect x="1.5" y="4.4" width="7" height="1.2" rx="0.4" />
        <rect x="1.5" y="6.8" width="5" height="1.2" rx="0.4" />
      </svg>
    </span>
  );
}

export function Sidebar({ onItemClick, className = "" }: SidebarProps) {
  const pathname = usePathname();

  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    "FR.APL.01": true,
  });

  const [activeApl01Section, setActiveApl01Section] = useState<string>("rincian");

  useEffect(() => {
    NAVIGATION_CONFIG.forEach((section) => {
      section.items.forEach((item) => {
        if (item.children && item.children.length > 0) {
          const hasActiveChild =
            pathname.startsWith(item.href || "") ||
            item.children.some((child) => child.href.split("#")[0] === pathname);
          if (hasActiveChild) {
            setOpenGroups((prev) => ({ ...prev, [item.name]: true }));
          }
        }
      });
    });
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/dashboard/fr/apl-01") return;

    // Check initial hash
    if (typeof window !== "undefined" && window.location.hash) {
      const hash = window.location.hash.replace("#", "");
      if (hash) setActiveApl01Section(hash);
    }

    const handleSectionChange = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) {
        setActiveApl01Section(customEvent.detail);
      }
    };

    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash) setActiveApl01Section(hash);
    };

    window.addEventListener("apl01-section-change", handleSectionChange);
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("apl01-section-change", handleSectionChange);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [pathname]);

  const toggleGroup = (name: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <aside
      className={`w-64 bg-white border-r border-gray-100 flex flex-col h-full overflow-y-auto select-none ${className}`}
    >
      <div className="p-4 space-y-6 flex-1">
        {NAVIGATION_CONFIG.map((section) => (
          <div key={section.title}>
            <p className="text-sm font-bold text-gray-700 mb-2 px-1">
              {section.title}
            </p>
            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const hasChildren = item.children && item.children.length > 0;
                const isOpen = !!openGroups[item.name];
                const isActive = item.href
                  ? isNavItemActive(item.href, pathname)
                  : false;
                const isChildActive = hasChildren
                  ? item.children!.some((child) => {
                      const cleanHref = child.href.split("#")[0];
                      return cleanHref === pathname;
                    })
                  : false;

                if (hasChildren) {
                  return (
                    <div key={item.name} className="space-y-1">
                      {/* Main Group Header Item */}
                      <div
                        onClick={() => toggleGroup(item.name)}
                        className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm cursor-pointer transition-all ${
                          isActive || isChildActive
                            ? "bg-[#F2F5E9] border border-[#8AA53C] text-[#5A7A22] font-bold"
                            : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                        }`}
                      >
                        {item.usePageBadge ? (
                          <PageBadgeIcon active={isActive || isChildActive} />
                        ) : Icon ? (
                          <Icon
                            size={16}
                            className={
                              isActive || isChildActive
                                ? "text-[#8AA53C]"
                                : "text-gray-400"
                            }
                          />
                        ) : null}
                        <span className="flex-1">{item.name}</span>
                      </div>

                      {isOpen && (
                        <div className="pl-6 space-y-2 py-1 my-1">
                          {item.children!.map((child: NavSubItem) => {
                            const isApl01Child = child.href.startsWith("/dashboard/fr/apl-01#");
                            const sectionId = isApl01Child ? child.href.split("#")[1] : "";
                            const isApl01Page = pathname === "/dashboard/fr/apl-01";

                            const childActive =
                              isApl01Child && isApl01Page
                                ? activeApl01Section === sectionId
                                : pathname === child.href;

                            const handleSubClick = (e: React.MouseEvent) => {
                              if (onItemClick) onItemClick();
                              if (isApl01Child && isApl01Page && sectionId) {
                                e.preventDefault();
                                const el = document.getElementById(sectionId);
                                if (el) {
                                  el.scrollIntoView({ behavior: "smooth", block: "start" });
                                  setActiveApl01Section(sectionId);
                                  window.history.replaceState(null, "", `#${sectionId}`);
                                }
                              }
                            };

                            return (
                              <Link
                                key={child.href}
                                href={child.href}
                                onClick={handleSubClick}
                                className={`flex items-start gap-2.5 text-xs py-1 transition-colors ${
                                  childActive
                                    ? "text-[#5A7A22] font-bold"
                                    : "text-gray-500 hover:text-gray-800"
                                }`}
                              >
                                <span className="mt-0.5">
                                  <PageBadgeIcon active={childActive} />
                                </span>
                                <span className="leading-snug">
                                  {child.name}
                                </span>
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.name}
                    href={item.href || "#"}
                    onClick={onItemClick}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all ${
                      isActive
                        ? "bg-[#F2F5E9] border border-[#8AA53C] text-[#5A7A22] font-bold"
                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                    }`}
                  >
                    {item.usePageBadge ? (
                      <PageBadgeIcon active={isActive} />
                    ) : Icon ? (
                      <Icon
                        size={16}
                        className={
                          isActive ? "text-[#8AA53C]" : "text-gray-400"
                        }
                      />
                    ) : null}
                    <span className="truncate">{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
