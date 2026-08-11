import type { ReactNode } from "react";

export interface TabbedProps {
  tabSize?: number;
  children: ReactNode;
  className?: string;
}

export interface WorkType {
  year: number;
  copy: string;
  link: string;
  workName: string;
}
