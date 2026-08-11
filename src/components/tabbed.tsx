import React from "react";
import type { TabbedProps } from "./types";

const Tabbed: React.FC<TabbedProps> = ({ children, className = "" }) => {
  return <section className={className || "tabbed-content"}>{children}</section>;
};

export default Tabbed;
