import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../../../shared/components/buttons/Button";
import ExportButton from "../../../shared/components/buttons/ExportButton";
import usePermission from "../../../shared/hooks/usePermission";
import { Permission } from "../../../shared/types/Permissions.types";
import type { SortDirection } from "../../../shared/components/table/TableHeader";
import MailIcon from "../../../assets/icons/MailIcon";
import type { CustomerListDto } from "../../customers/types/Customers.types";
import { useExportMessagesMutation, useGetMessagesQuery } from "../api/Messages.api";
import useMessageAudiences from "../hooks/useMessageAudiences";
import MessageFilters from "./MessageFilters";
import MessagesTable from "./MessagesTable";
import MessageDetailsModal from "./MessageDetailsModal";
import SendMessageModal from "./SendMessageModal";
import DeleteMessageAlert from "./DeleteMessageAlert";
import RestoreMessageAlert from "./RestoreMessageAlert";
import {
  MessageTarget,
  type MessageFilter,
  type MessageListDto,
  type MessageRequest,
} from "../types/Messages.types";

interface MessagesListProps {
  recipient?: CustomerListDto | null;
  initialFilter?: Partial<MessageRequest>;
}

type DialogName = "view" | "send" | "delete" | "restore";

const initialValues: MessageRequest = {
  pageNumber: 1,
  pageSize: 25,
  sortBy: "createdAt",
  isAscending: false,
  isDeleted: false,
};

const toQueryFilter = (values: MessageRequest, userId?: number): MessageFilter => ({
  subject: values.subject || undefined,
  content: values.content || undefined,
  userId,
  name: userId ? undefined : values.name || undefined,
  phoneNumber: userId ? undefined : values.phoneNumber || undefined,
  userType: userId ? undefined : values.userType,
  cityId: userId ? undefined : values.cityId,
  isRead: values.isRead,
  isDeleted: values.isDeleted,
  fromDate: values.fromDate,
  toDate: values.toDate,
});

const MessagesList = ({ recipient, initialFilter }: MessagesListProps) => {
  const { t } = useTranslation();
  const { can } = usePermission();
  const audiences = useMessageAudiences();
  const [values, setValues] = useState<MessageRequest>(() => ({ ...initialValues, ...initialFilter }));
  const [dialog, setDialog] = useState<DialogName | null>(null);
  const [selected, setSelected] = useState<MessageListDto | null>(null);

  const queryFilter = toQueryFilter(values, recipient?.id);
  const { data, isLoading, isFetching, refetch } = useGetMessagesQuery(
    { ...queryFilter, pageNumber: values.pageNumber, pageSize: values.pageSize, sortBy: values.sortBy, isAscending: values.isAscending },
    { refetchOnMountOrArgChange: true }
  );
  const [exportMessages, { isLoading: isExporting }] = useExportMessagesMutation();

  const openDialog = useCallback((name: DialogName, message: MessageListDto | null) => {
    setSelected(message);
    setDialog(name);
  }, []);
  const closeDialog = () => {
    setDialog(null);
    setSelected(null);
  };

  const handleView = useCallback((message: MessageListDto) => openDialog("view", message), [openDialog]);
  const handleDelete = useCallback((message: MessageListDto) => openDialog("delete", message), [openDialog]);
  const handleRestore = useCallback((message: MessageListDto) => openDialog("restore", message), [openDialog]);

  const canSend = recipient ? audiences.includes(MessageTarget.Customer) : audiences.length > 0;

  return (
    <div className="space-y-4">
      <MessageFilters
        values={values}
        forRecipient={!!recipient}
        onChange={(name, value) => setValues((previous) => ({ ...previous, pageNumber: 1, [name]: value }))}
        onSearch={refetch}
        onClear={() => setValues(initialValues)}
      />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="list-header-title">
          {t("messages.pageTitle")} <span className="list-header-count">({data?.totalCount ?? 0})</span>
        </h3>
        <div className="flex flex-wrap items-center gap-2">
          {can(Permission.MessagesExport) && (
            <ExportButton loading={isExporting} onExport={() => exportMessages(queryFilter).unwrap()} />
          )}
          {canSend && (
            <Button
              variant="dark"
              size="md"
              label={t("messages.sendMessage")}
              icon={<MailIcon className="h-4 w-4" />}
              iconPosition="left"
              onClick={() => openDialog("send", null)}
            />
          )}
        </div>
      </div>
      <MessagesTable
        items={data?.items || []}
        totalCount={data?.totalCount || 0}
        loading={isLoading || isFetching}
        filterValues={values}
        showCustomer={!recipient}
        onPageChange={(page) => setValues((previous) => ({ ...previous, pageNumber: page }))}
        onPageSizeChange={(size) => setValues((previous) => ({ ...previous, pageSize: size, pageNumber: 1 }))}
        onSort={(column: string, direction: SortDirection) =>
          setValues((previous) => ({ ...previous, sortBy: column, isAscending: direction === "asc", pageNumber: 1 }))
        }
        onView={handleView}
        onDelete={handleDelete}
        onRestore={handleRestore}
      />

      {dialog === "view" && selected && <MessageDetailsModal open messageId={selected.id} onClose={closeDialog} />}
      {dialog === "send" && <SendMessageModal open customer={recipient} onClose={closeDialog} onSuccess={refetch} />}
      {dialog === "delete" && selected && (
        <DeleteMessageAlert open message={selected} onClose={closeDialog} onSuccess={refetch} />
      )}
      {dialog === "restore" && selected && (
        <RestoreMessageAlert open message={selected} onClose={closeDialog} onSuccess={refetch} />
      )}
    </div>
  );
};

export default MessagesList;
