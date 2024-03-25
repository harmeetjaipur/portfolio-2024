export interface TabbedProps {
  tabSize?: number;
  children: React.ReactNode;
  className?: string; 
}

export interface WorkType {
  year: number;
  copy: string;
  link: string;
  workName: string;
}
