import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import ExportButton from "../../../../shared/components/buttons/ExportButton";
import ListContainer from "../../../../shared/components/cards/ListContainer";
import PageActions from "../../../../shared/components/navigation/PageActions";
import Message from "../../../../shared/components/feedback/Message";
import usePermission from "../../../../shared/hooks/usePermission";
import { Permission } from "../../../../shared/types/Permissions.types";

interface ReportLayoutProps {
  framed?: boolean;
  actionsTarget?: HTMLElement | null;
  title: string;
  totalCount?: number;
  error: string | null;
  exportLoading: boolean;
  onExport: () => Promise<unknown>;
  filters: ReactNode;
  table: ReactNode;
  summary: ReactNode;
}

const ReportLayout = ({ framed, actionsTarget, title, totalCount, error, exportLoading, onExport, filters, table, summary }: ReportLayoutProps) => {
  const { t } = useTranslation();
  const { can } = usePermission();

  return (
    <div className={framed ? "space-y-6" : "space-y-4"}>
      <ListContainer plain={!framed}>{filters}</ListContainer>
      <ListContainer plain={!framed}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="list-header-title">
            {title} <span className="list-header-count">({totalCount ?? 0})</span>
          </h3>
          <PageActions target={actionsTarget}>
            {can(Permission.ReportsExport) && !error && <ExportButton loading={exportLoading} onExport={onExport} />}
          </PageActions>
        </div>
        {error ? <Message variant="warning">{t(error)}</Message> : table}
      </ListContainer>
      {!error && summary}
    </div>
  );
};

export default ReportLayout;
