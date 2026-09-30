import React from "react";
import CheckIcon from "../../../assets/icons/CheckIcon";
import TriangleAlertIcon from "../../../assets/icons/TriangleAlertIcon";
import XCircleIcon from "../../../assets/icons/XCircleIcon";

type StepperVariant = "default" | "outlined" | "filled" | "minimal" | "gradient";
type StepperSize = "sm" | "md" | "lg";
type StepperOrientation = "horizontal" | "vertical";
type StepperLabelPlacement = "bottom" | "right" | "alternate";
type StepStatus = "completed" | "active" | "upcoming" | "error" | "warning";

interface StepItem {
  id: string | number;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  status?: StepStatus;
  optional?: boolean;
  content?: React.ReactNode;
}

interface StepperProps {
  steps: StepItem[];
  activeStep: number;
  variant?: StepperVariant;
  size?: StepperSize;
  orientation?: StepperOrientation;
  labelPlacement?: StepperLabelPlacement;
  showConnector?: boolean;
  clickable?: boolean;
  animated?: boolean;
  showStepNumbers?: boolean;
  responsive?: boolean;
  className?: string;
  onStepClick?: (stepIndex: number) => void;
}

const sizeConfig: Record<StepperSize, { icon: string; iconInner: string; text: string; desc: string; connector: string; gap: string }> = {
  sm: { icon: "w-7 h-7", iconInner: "w-3.5 h-3.5", text: "text-xs", desc: "text-[10px]", connector: "h-0.5", gap: "gap-1" },
  md: { icon: "w-9 h-9", iconInner: "w-4 h-4", text: "text-sm", desc: "text-xs", connector: "h-0.5", gap: "gap-1.5" },
  lg: { icon: "w-11 h-11", iconInner: "w-5 h-5", text: "text-base", desc: "text-sm", connector: "h-1", gap: "gap-2" },
};

const getStepStatus = (stepIndex: number, activeStep: number, step: StepItem): StepStatus => {
  if (step.status) return step.status;
  if (stepIndex < activeStep) return "completed";
  if (stepIndex === activeStep) return "active";
  return "upcoming";
};

const getVariantClasses = (
  variant: StepperVariant,
  status: StepStatus,
): { iconBg: string; iconBorder: string; iconText: string; connector: string; connectorActive: string } => {
  const variants: Record<StepperVariant, Record<StepStatus, { iconBg: string; iconBorder: string; iconText: string }>> = {
    default: {
      completed: { iconBg: "stepper-completed-bg", iconBorder: "stepper-completed-border", iconText: "text-white" },
      active: { iconBg: "stepper-icon-default-bg", iconBorder: "stepper-active-border border-2", iconText: "stepper-active-text" },
      upcoming: { iconBg: "stepper-icon-upcoming-bg", iconBorder: "stepper-icon-upcoming-border border-2", iconText: "stepper-icon-upcoming-text" },
      error: { iconBg: "stepper-error-bg", iconBorder: "stepper-error-border", iconText: "text-white" },
      warning: { iconBg: "stepper-warning-bg", iconBorder: "stepper-warning-border", iconText: "text-white" },
    },
    outlined: {
      completed: { iconBg: "bg-transparent", iconBorder: "stepper-active-border border-2", iconText: "stepper-completed-text" },
      active: { iconBg: "stepper-icon-outlined-active-bg", iconBorder: "stepper-active-border border-2", iconText: "stepper-active-text" },
      upcoming: { iconBg: "bg-transparent", iconBorder: "stepper-icon-upcoming-border border-2", iconText: "stepper-icon-upcoming-text" },
      error: { iconBg: "stepper-icon-outlined-error-bg", iconBorder: "stepper-error-border border-2", iconText: "stepper-error-text" },
      warning: { iconBg: "stepper-icon-outlined-warning-bg", iconBorder: "stepper-warning-border border-2", iconText: "stepper-warning-text" },
    },
    filled: {
      completed: { iconBg: "stepper-completed-bg", iconBorder: "border-transparent", iconText: "text-white" },
      active: { iconBg: "stepper-active-bg", iconBorder: "border-transparent", iconText: "text-white" },
      upcoming: { iconBg: "stepper-icon-filled-upcoming-bg", iconBorder: "border-transparent", iconText: "stepper-icon-upcoming-text" },
      error: { iconBg: "stepper-error-bg", iconBorder: "border-transparent", iconText: "text-white" },
      warning: { iconBg: "stepper-warning-bg", iconBorder: "border-transparent", iconText: "text-white" },
    },
    minimal: {
      completed: { iconBg: "bg-transparent", iconBorder: "border-transparent", iconText: "stepper-completed-text" },
      active: { iconBg: "bg-transparent", iconBorder: "border-transparent", iconText: "stepper-active-text" },
      upcoming: { iconBg: "bg-transparent", iconBorder: "border-transparent", iconText: "stepper-icon-upcoming-text" },
      error: { iconBg: "bg-transparent", iconBorder: "border-transparent", iconText: "stepper-error-text" },
      warning: { iconBg: "bg-transparent", iconBorder: "border-transparent", iconText: "stepper-warning-text" },
    },
    gradient: {
      completed: { iconBg: "stepper-gradient-completed-bg", iconBorder: "border-transparent", iconText: "text-white" },
      active: { iconBg: "stepper-gradient-active-bg", iconBorder: "border-transparent ring-4 stepper-icon-gradient-active-ring", iconText: "text-white" },
      upcoming: { iconBg: "stepper-icon-gradient-upcoming-bg", iconBorder: "stepper-icon-gradient-upcoming-border border", iconText: "stepper-icon-upcoming-text" },
      error: { iconBg: "stepper-gradient-error-bg", iconBorder: "border-transparent", iconText: "text-white" },
      warning: { iconBg: "stepper-gradient-warning-bg", iconBorder: "border-transparent", iconText: "text-white" },
    },
  };

  const style = variants[variant][status];
  return {
    ...style,
    connector: "stepper-connector-default",
    connectorActive: variant === "gradient" ? "stepper-connector-gradient" : "stepper-connector-active",
  };
};

const Stepper: React.FC<StepperProps> = ({
  steps,
  activeStep,
  variant = "default",
  size = "md",
  orientation = "horizontal",
  labelPlacement = "bottom",
  showConnector = true,
  clickable = false,
  animated = true,
  showStepNumbers = true,
  responsive = true,
  className,
  onStepClick,
}) => {
  const config = sizeConfig[size];

  const renderStepIcon = (step: StepItem, index: number, status: StepStatus) => {
    const styles = getVariantClasses(variant, status);

    const iconContent = () => {
      if (status === "completed" && !step.icon) {
        return <CheckIcon className={`${config.iconInner} ${animated ? "stepper-check" : ""}`} />;
      }
      if (status === "error") {
        return step.icon || <XCircleIcon className={config.iconInner} />;
      }
      if (status === "warning") {
        return step.icon || <TriangleAlertIcon className={config.iconInner} />;
      }
      if (step.icon) {
        return <span className={config.iconInner}>{step.icon}</span>;
      }
      if (showStepNumbers) {
        return <span className="font-semibold">{index + 1}</span>;
      }
      return <span className={`rounded-full ${status === "active" ? "w-2.5 h-2.5 bg-current" : "w-2 h-2 bg-current"} ${animated ? "stepper-dot-enter" : ""}`} />;
    };

    return (
      <div
        className={`stepper-icon-wrapper ${config.icon} rounded-full flex items-center justify-center flex-shrink-0 ${styles.iconBg} ${styles.iconBorder} ${styles.iconText} ${status === "active" && animated ? "stepper-active-pulse" : ""} ${clickable ? "cursor-pointer" : ""}`}
        onClick={() => clickable && onStepClick?.(index)}
      >
        {iconContent()}
      </div>
    );
  };

  const renderConnector = (index: number) => {
    if (!showConnector || index === steps.length - 1) return null;
    const status = getStepStatus(index, activeStep, steps[index]);
    const styles = getVariantClasses(variant, status);
    const isCompleted = status === "completed";

    if (orientation === "vertical") {
      return (
        <div className={`stepper-connector ms-[18px] w-0.5 flex-1 min-h-[24px] ${isCompleted ? styles.connectorActive : styles.connector}`} style={size === "sm" ? { marginInlineStart: 13 } : size === "lg" ? { marginInlineStart: 21 } : undefined} />
      );
    }

    return (
      <>
        <div className={`stepper-h-connector stepper-connector flex-1 ${config.connector} rounded-full ${isCompleted ? styles.connectorActive : styles.connector}`} />
        {responsive && (
          <div className={`stepper-v-connector stepper-connector ms-[18px] w-0.5 min-h-[16px] ${isCompleted ? styles.connectorActive : styles.connector}`} style={size === "sm" ? { marginInlineStart: 13 } : size === "lg" ? { marginInlineStart: 21 } : undefined} />
        )}
      </>
    );
  };

  if (orientation === "vertical") {
    return (
      <div className={`flex flex-col ${className || ""}`}>
        {steps.map((step, index) => {
          const status = getStepStatus(index, activeStep, step);
          const isActive = status === "active";
          const isCompleted = status === "completed";
          return (
            <div key={step.id} className={animated ? "stepper-step-enter" : ""} style={animated ? { animationDelay: `${index * 80}ms`, animationFillMode: "both" } : undefined}>
              <div className={`flex items-start ${config.gap}`}>
                {renderStepIcon(step, index, status)}
                <div className="min-w-0 pt-1">
                  <div className="flex items-center gap-2">
                    <span className={`stepper-label font-medium ${config.text} ${isActive ? "stepper-label-active" : isCompleted ? "stepper-label-completed" : "stepper-label-upcoming"}`}>
                      {step.label}
                    </span>
                    {step.optional && (
                      <span className={`${config.desc} stepper-optional-text italic`}>Optional</span>
                    )}
                  </div>
                  {step.description && (
                    <p className={`stepper-description ${config.desc} ${isActive ? "stepper-desc-active" : "stepper-desc-default"} mt-0.5`}>{step.description}</p>
                  )}
                  {step.content && isActive && (
                    <div className="stepper-content mt-3">{step.content}</div>
                  )}
                </div>
              </div>
              {renderConnector(index)}
            </div>
          );
        })}
      </div>
    );
  }

  if (labelPlacement === "right") {
    return (
      <div className={`stepper-scroll flex items-center ${responsive ? "stepper-responsive" : ""} ${className || ""}`}>
        {steps.map((step, index) => {
          const status = getStepStatus(index, activeStep, step);
          const isActive = status === "active";
          const isCompleted = status === "completed";
          return (
            <React.Fragment key={step.id}>
              <div className={`stepper-h-step flex items-center ${config.gap} ${animated ? "stepper-step-enter" : ""}`} style={animated ? { animationDelay: `${index * 80}ms`, animationFillMode: "both" } : undefined}>
                {renderStepIcon(step, index, status)}
                <div className="min-w-0 stepper-label-bottom">
                  <span className={`stepper-label font-medium ${config.text} whitespace-nowrap ${isActive ? "stepper-label-active" : isCompleted ? "stepper-label-completed" : "stepper-label-upcoming"}`}>
                    {step.label}
                  </span>
                  {step.description && (
                    <p className={`stepper-description ${config.desc} ${isActive ? "stepper-desc-active" : "stepper-desc-default"} whitespace-nowrap`}>{step.description}</p>
                  )}
                </div>
              </div>
              {renderConnector(index)}
            </React.Fragment>
          );
        })}
      </div>
    );
  }

  if (labelPlacement === "alternate") {
    return (
      <div className={`stepper-scroll flex items-start ${responsive ? "stepper-responsive" : ""} ${className || ""}`}>
        {steps.map((step, index) => {
          const status = getStepStatus(index, activeStep, step);
          const isActive = status === "active";
          const isCompleted = status === "completed";
          const isTop = index % 2 === 0;
          return (
            <React.Fragment key={step.id}>
              <div className={`stepper-h-step flex flex-col items-center flex-shrink-0 ${animated ? "stepper-step-enter" : ""}`} style={animated ? { animationDelay: `${index * 80}ms`, animationFillMode: "both" } : undefined}>
                {isTop ? (
                  <>
                    <div className={`text-center mb-2 ${config.gap}`}>
                      <span className={`stepper-label font-medium ${config.text} block ${isActive ? "stepper-label-active" : isCompleted ? "stepper-label-completed" : "stepper-label-upcoming"}`}>
                        {step.label}
                      </span>
                      {step.description && (
                        <p className={`stepper-description ${config.desc} ${isActive ? "stepper-desc-active" : "stepper-desc-default"}`}>{step.description}</p>
                      )}
                    </div>
                    {renderStepIcon(step, index, status)}
                    <div className="h-8" />
                  </>
                ) : (
                  <>
                    <div className="h-8" />
                    {renderStepIcon(step, index, status)}
                    <div className={`text-center mt-2 ${config.gap}`}>
                      <span className={`stepper-label font-medium ${config.text} block ${isActive ? "stepper-label-active" : isCompleted ? "stepper-label-completed" : "stepper-label-upcoming"}`}>
                        {step.label}
                      </span>
                      {step.description && (
                        <p className={`stepper-description ${config.desc} ${isActive ? "stepper-desc-active" : "stepper-desc-default"}`}>{step.description}</p>
                      )}
                    </div>
                  </>
                )}
              </div>
              {showConnector && index < steps.length - 1 && (
                <>
                  <div className={`stepper-h-connector flex-1 self-center ${config.connector} rounded-full ${getStepStatus(index, activeStep, steps[index]) === "completed" ? getVariantClasses(variant, "completed").connectorActive : "stepper-connector-default"}`} />
                  {responsive && (
                    <div className={`stepper-v-connector stepper-connector ms-[18px] w-0.5 min-h-[16px] ${getStepStatus(index, activeStep, steps[index]) === "completed" ? getVariantClasses(variant, "completed").connectorActive : "stepper-connector-default"}`} style={size === "sm" ? { marginInlineStart: 13 } : size === "lg" ? { marginInlineStart: 21 } : undefined} />
                  )}
                </>
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  }

  return (
    <div className={`stepper-scroll flex items-center ${responsive ? "stepper-responsive" : ""} ${className || ""}`}>
      {steps.map((step, index) => {
        const status = getStepStatus(index, activeStep, step);
        const isActive = status === "active";
        const isCompleted = status === "completed";
        return (
          <React.Fragment key={step.id}>
            <div className={`stepper-h-step flex flex-col items-center flex-shrink-0 ${animated ? "stepper-step-enter" : ""}`} style={animated ? { animationDelay: `${index * 80}ms`, animationFillMode: "both" } : undefined}>
              {renderStepIcon(step, index, status)}
              <div className={`stepper-label-bottom text-center mt-2 ${config.gap}`}>
                <div className="flex items-center justify-center gap-1">
                  <span className={`stepper-label font-medium ${config.text} ${isActive ? "stepper-label-active" : isCompleted ? "stepper-label-completed" : "stepper-label-upcoming"}`}>
                    {step.label}
                  </span>
                  {step.optional && (
                    <span className={`${config.desc} stepper-optional-text italic`}>*</span>
                  )}
                </div>
                {step.description && (
                  <p className={`stepper-description ${config.desc} ${isActive ? "stepper-desc-active" : "stepper-desc-default"} max-w-[120px]`}>{step.description}</p>
                )}
              </div>
            </div>
            {renderConnector(index)}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export type { StepItem, StepStatus };
export default Stepper;
