import React from "react";
import CheckCircleIcon from "../../../assets/icons/CheckCircleIcon";
import XCircleIcon from "../../../assets/icons/XCircleIcon";
import TriangleAlertIcon from "../../../assets/icons/TriangleAlertIcon";
import InfoIcon from "../../../assets/icons/InfoIcon";
import FileTextIcon from "../../../assets/icons/FileTextIcon";
import ShieldIcon from "../../../assets/icons/ShieldIcon";

type ResultStatus = "success" | "error" | "warning" | "info" | "404" | "403" | "500";

interface ResultProps {
  status: ResultStatus;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  extra?: React.ReactNode;
  className?: string;
}

const defaultIcons: Record<ResultStatus, React.ReactNode> = {
  success: <CheckCircleIcon strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />,
  error: <XCircleIcon strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />,
  warning: <TriangleAlertIcon strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />,
  info: <InfoIcon strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />,
  "404": <FileTextIcon strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />,
  "403": <ShieldIcon strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />,
  "500": <TriangleAlertIcon strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />,
};

const statusClasses: Record<ResultStatus, string> = {
  success: "result-icon-success",
  error: "result-icon-error",
  warning: "result-icon-warning",
  info: "result-icon-info",
  "404": "result-icon-info",
  "403": "result-icon-warning",
  "500": "result-icon-error",
};

const Result: React.FC<ResultProps> = ({
  status,
  title,
  subtitle,
  icon,
  extra,
  className = "",
}) => {
  return (
    <div className={`result-container ${className}`}>
      <div className={`result-icon-wrapper ${statusClasses[status]}`}>
        <span className="result-icon">
          {icon || defaultIcons[status]}
        </span>
      </div>
      <h3 className="result-title">{title}</h3>
      {subtitle && <p className="result-subtitle">{subtitle}</p>}
      {extra && <div className="result-extra">{extra}</div>}
    </div>
  );
};

export default Result;
