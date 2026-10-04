import type { ReactNode } from "react";
import { createPortal } from "react-dom";

interface PageActionsProps {
  target?: HTMLElement | null;
  children: ReactNode;
}

const PageActions = ({ target, children }: PageActionsProps) => (target ? createPortal(children, target) : <>{children}</>);

export default PageActions;
