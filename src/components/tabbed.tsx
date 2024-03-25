import React from "react";
import styled from "styled-components";

import { TabbedProps } from "./types";

export const StyledTabbed = styled.section<TabbedProps>`
  ${({ tabSize = 0 }) => `
    padding-left: ${tabSize * 2}em;
    overflow: auto;
  `}
`;

const Tabbed: React.FC<TabbedProps> = ({ children, className = "" }) => {
  return (
    <StyledTabbed className="tabbed-content" tabSize={1}>
      {children}
    </StyledTabbed>
  );
};

export default Tabbed;
