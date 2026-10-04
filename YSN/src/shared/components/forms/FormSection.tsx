import type { ReactNode } from "react";

interface FormSectionProps {
  icon: ReactNode;
  title: string;
  columns?: 1 | 2;
  children: ReactNode;
}

const FormSection = ({ icon, title, columns = 1, children }: FormSectionProps) => (
  <div>
    <div className="form-section-title mb-4">
      <span className="flex h-4 w-4 items-center justify-center text-primary [&>svg]:h-full [&>svg]:w-full">{icon}</span>
      <h3>{title}</h3>
    </div>
    <div className={`grid grid-cols-1 gap-4 ${columns === 2 ? "md:grid-cols-2" : ""}`}>{children}</div>
  </div>
);

export default FormSection;
