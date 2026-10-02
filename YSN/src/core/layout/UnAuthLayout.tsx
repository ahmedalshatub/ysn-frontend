import type { ReactNode } from "react";

interface UnAuthLayoutProps {
  children: ReactNode;
}

const UnAuthLayout = ({ children }: UnAuthLayoutProps) => {
  return (
    <div className="auth-container">
      {children}
    </div>
  );
};

export default UnAuthLayout;
