interface StepHeadingProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const StepHeading = ({ title, description, icon }: StepHeadingProps) => (
  <div className="flex items-start gap-3 pb-4 mb-6 border-b ce-divider">
    <span className="ce-icon-primary-bg shrink-0 w-10 h-10 rounded-xl flex items-center justify-center">
      {icon}
    </span>
    <div className="min-w-0">
      <h3 className="ce-heading text-base font-semibold">{title}</h3>
      <p className="ce-muted text-sm mt-0.5">{description}</p>
    </div>
  </div>
);

export default StepHeading;
