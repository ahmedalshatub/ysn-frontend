import React from "react";

const Minimize2Icon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="1em" height="1em" {...props}>
    <polyline points="4 14 10 14 10 20" />
    <polyline points="20 10 14 10 14 4" />
    <line x1="10" y1="14" x2="3" y2="21" />
    <line x1="21" y1="3" x2="14" y2="10" />
  </svg>
);

export default Minimize2Icon;
