import { type LucideIcon } from "lucide-react";

export interface NavSubItem {
  name: string;
  href: string;
  badge?: string | number;
  usePageBadge?: boolean;
}

export interface NavItem {
  name: string;
  href?: string;
  icon?: LucideIcon;
  badge?: string | number;
  usePageBadge?: boolean;
  isCategory?: boolean;
  children?: NavSubItem[];
}

export interface NavSection {
  title: string;
  items: NavItem[];
}
