import { useState } from "react";
import DataTable from "../../../shared/components/table/DataTable";
import TreeTable from "../../../shared/components/table/TreeTable";
import TableImage from "../../../shared/components/table/TableImage";
import TableActionButtons from "../../../shared/components/table/TableActionButtons";
import TableActionDropdown from "../../../shared/components/table/TableActionDropdown";
import Pagination from "../../../shared/components/navigation/Pagination";
import SimplePagination from "../../../shared/components/navigation/SimplePagination";
import StarIcon from "../../../assets/icons/StarIcon";
import DownloadIcon from "../../../assets/icons/DownloadIcon";
import TrashIcon from "../../../assets/icons/TrashIcon";
import SearchIcon from "../../../assets/icons/SearchIcon";
import PlusIcon from "../../../assets/icons/PlusIcon";
import {
  SectionTitle,
  ExampleBlock,
  sampleUsers,
  tableColumns,
  clientColumns,
  treeTableColumns,
  treeTableData,
  type UserRow,
} from "../types/showcaseData";

const TablesTab = () => {
  const [page, setPage] = useState(1);
  const [simplePage, setSimplePage] = useState(1);
  const [paginationPage, setPaginationPage] = useState(1);
  const [simplePaginationPage, setSimplePaginationPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<Set<string | number>>(new Set());

  return (
    <div className="space-y-8">
      {/* ── DATA TABLE ───────────────────────── */}
      <SectionTitle title="DataTable" description="Full-featured data table with sorting, selection, pagination, and actions." />

      <ExampleBlock title="Full Featured (Selectable, Striped)">
        <DataTable<UserRow>
          columns={tableColumns}
          data={sampleUsers.slice((page - 1) * 5, page * 5)}
          rowKey={(row) => row.id}
          selectable
          selectedRows={selectedRows}
          onSelectionChange={setSelectedRows}
          striped
          hoverable
          pageSize={5}
          currentPage={page}
          totalItems={sampleUsers.length}
          onPageChange={setPage}
          title="Users"
        />
      </ExampleBlock>

      <ExampleBlock title="Compact & Borderless">
        <DataTable<UserRow>
          columns={tableColumns.slice(0, 4)}
          data={sampleUsers.slice(0, 5)}
          rowKey={(row) => row.id}
          compact
          borderless
        />
      </ExampleBlock>

      <ExampleBlock title="Loading State">
        <DataTable<UserRow>
          columns={tableColumns.slice(0, 4)}
          data={[]}
          rowKey={(row) => row.id}
          title="Loading Data"
          loading
          pageSize={5}
        />
      </ExampleBlock>

      <ExampleBlock title="Empty State">
        <DataTable<UserRow>
          columns={tableColumns.slice(0, 4)}
          data={[]}
          rowKey={(row) => row.id}
          title="Empty Table"
          emptyMessage="No users found matching your criteria"
          pageSize={5}
        />
      </ExampleBlock>

      <ExampleBlock title="Simple Pagination (Prev / Next)">
        <DataTable<UserRow>
          columns={tableColumns.slice(0, 4)}
          data={sampleUsers.slice((simplePage - 1) * 5, simplePage * 5)}
          rowKey={(row) => row.id}
          title="Users (Simple Nav)"
          pageSize={5}
          currentPage={simplePage}
          totalItems={sampleUsers.length}
          onPageChange={setSimplePage}
          paginationMode="simple"
          hoverable
        />
      </ExampleBlock>

      <ExampleBlock title="Client-Side Managed">
        <p className="text-sm sc-subtext mb-3">Sorting and pagination handled internally — no external state needed.</p>
        <DataTable<UserRow>
          columns={clientColumns}
          data={sampleUsers}
          rowKey={(row) => row.id}
          title="Auto-Managed Users"
          clientSidePagination
          clientSideSorting
          pageSize={5}
          selectable
          striped
        />
      </ExampleBlock>

      {/* ── TREE TABLE ───────────────────────── */}
      <SectionTitle title="TreeTable" description="Hierarchical table with expandable rows." />

      <ExampleBlock title="Default">
        <TreeTable columns={treeTableColumns} data={treeTableData} defaultExpanded={["f1", "f1-1"]} />
      </ExampleBlock>

      <ExampleBlock title="Selectable & Bordered">
        <TreeTable columns={treeTableColumns} data={treeTableData} selectable bordered defaultExpanded={["f1"]} />
      </ExampleBlock>

      <ExampleBlock title="Striped & Compact">
        <TreeTable columns={treeTableColumns} data={treeTableData} striped compact defaultExpanded={["f1", "f1-1", "f1-2", "f2"]} />
      </ExampleBlock>

      {/* ── TABLE ACTION BUTTONS ─────────────── */}
      <SectionTitle title="TableActionButtons" description="Inline row action buttons." />

      <ExampleBlock title="Icon Only / Icon+Text / Text Only / Disabled">
        <div className="space-y-4">
          <div>
            <p className="text-sm sc-subtext mb-2">Icon Only</p>
            <TableActionButtons actions={[
              { icon: <StarIcon />, variant: "warning", tooltip: "Star", onClick: () => alert("Star") },
              { icon: <DownloadIcon />, variant: "info", tooltip: "Download", onClick: () => alert("Download") },
              { icon: <TrashIcon />, variant: "danger", tooltip: "Delete", onClick: () => alert("Delete") },
            ]} />
          </div>
          <div>
            <p className="text-sm sc-subtext mb-2">Icon + Text</p>
            <TableActionButtons actions={[
              { icon: <StarIcon />, label: "Star", variant: "warning", onClick: () => alert("Star") },
              { icon: <DownloadIcon />, label: "Download", variant: "info", onClick: () => alert("Download") },
              { icon: <TrashIcon />, label: "Delete", variant: "danger", onClick: () => alert("Delete") },
            ]} />
          </div>
          <div>
            <p className="text-sm sc-subtext mb-2">Text Only</p>
            <TableActionButtons actions={[
              { label: "Approve", variant: "success", onClick: () => alert("Approve") },
              { label: "Reject", variant: "danger", onClick: () => alert("Reject") },
              { label: "Pending", variant: "warning", onClick: () => alert("Pending") },
            ]} />
          </div>
          <div>
            <p className="text-sm sc-subtext mb-2">With Disabled</p>
            <TableActionButtons actions={[
              { icon: <StarIcon />, label: "Disabled", variant: "primary", disabled: true, onClick: () => {} },
              { icon: <TrashIcon />, label: "Active", variant: "danger", onClick: () => alert("Active") },
            ]} />
          </div>
        </div>
      </ExampleBlock>

      {/* ── TABLE ACTION DROPDOWN ────────────── */}
      <SectionTitle title="TableActionDropdown" description="Dropdown action menu for table rows." />

      <ExampleBlock title="Variants & Sizes">
        <div className="flex flex-wrap items-start gap-8">
          <div className="text-center">
            <p className="text-sm sc-subtext mb-2">Icon + Text</p>
            <TableActionDropdown actions={[
              { label: "View", icon: <SearchIcon />, onClick: () => alert("View") },
              { label: "Edit", icon: <PlusIcon />, onClick: () => alert("Edit") },
              { divider: true, label: "", onClick: () => {} },
              { label: "Delete", icon: <TrashIcon />, variant: "danger", onClick: () => alert("Delete") },
            ]} />
          </div>
          <div className="text-center">
            <p className="text-sm sc-subtext mb-2">Text Only</p>
            <TableActionDropdown actions={[
              { label: "View Profile", onClick: () => alert("View") },
              { label: "Send Message", onClick: () => alert("Message") },
              { label: "Remove", variant: "danger", onClick: () => alert("Remove") },
            ]} />
          </div>
          <div className="text-center">
            <p className="text-sm sc-subtext mb-2">With Disabled</p>
            <TableActionDropdown actions={[
              { label: "Active Action", icon: <StarIcon />, onClick: () => alert("Active") },
              { label: "Disabled Action", icon: <DownloadIcon />, disabled: true, onClick: () => {} },
              { divider: true, label: "", onClick: () => {} },
              { label: "Delete", icon: <TrashIcon />, variant: "danger", onClick: () => alert("Delete") },
            ]} />
          </div>
          <div className="text-center">
            <p className="text-sm sc-subtext mb-2">Small</p>
            <TableActionDropdown size="sm" actions={[
              { label: "View", onClick: () => alert("View") },
              { label: "Delete", variant: "danger", onClick: () => alert("Delete") },
            ]} />
          </div>
          <div className="text-center">
            <p className="text-sm sc-subtext mb-2">Large</p>
            <TableActionDropdown size="lg" actions={[
              { label: "View", icon: <SearchIcon />, onClick: () => alert("View") },
              { label: "Delete", icon: <TrashIcon />, variant: "danger", onClick: () => alert("Delete") },
            ]} />
          </div>
        </div>
      </ExampleBlock>

      {/* ── TABLE IMAGE ──────────────────────── */}
      <SectionTitle title="TableImage" description="Inline table images with shapes and sizes." />

      <ExampleBlock title="Shapes & Sizes">
        <div className="flex flex-wrap items-center gap-6">
          <div className="text-center">
            <p className="text-sm sc-subtext mb-2">Circle</p>
            <TableImage src="https://i.pravatar.cc/150?img=15" alt="Circle" size={48} shape="circle" />
          </div>
          <div className="text-center">
            <p className="text-sm sc-subtext mb-2">Rounded</p>
            <TableImage src="https://i.pravatar.cc/150?img=16" alt="Rounded" size={48} shape="rounded" />
          </div>
          <div className="text-center">
            <p className="text-sm sc-subtext mb-2">Square</p>
            <TableImage src="https://i.pravatar.cc/150?img=17" alt="Square" size={48} shape="square" />
          </div>
          <div className="text-center">
            <p className="text-sm sc-subtext mb-2">Small</p>
            <TableImage src="https://i.pravatar.cc/150?img=18" alt="Small" size={28} shape="circle" />
          </div>
          <div className="text-center">
            <p className="text-sm sc-subtext mb-2">Large</p>
            <TableImage src="https://i.pravatar.cc/150?img=19" alt="Large" size={64} shape="circle" />
          </div>
          <div className="text-center">
            <p className="text-sm sc-subtext mb-2">Fallback</p>
            <TableImage src="" alt="No image" size={48} shape="circle" />
          </div>
        </div>
      </ExampleBlock>

      {/* ── PAGINATION ───────────────────────── */}
      <SectionTitle title="Pagination" description="Page navigation with full and simple variants." />

      <ExampleBlock title="Full Pagination — Variants & Sizes">
        <div className="space-y-4">
          <div>
            <p className="text-sm sc-subtext mb-2">Default</p>
            <Pagination currentPage={paginationPage} totalPages={20} onPageChange={setPaginationPage} />
          </div>
          <div>
            <p className="text-sm sc-subtext mb-2">Rounded</p>
            <Pagination currentPage={paginationPage} totalPages={20} onPageChange={setPaginationPage} variant="rounded" />
          </div>
          <div>
            <p className="text-sm sc-subtext mb-2">Minimal</p>
            <Pagination currentPage={paginationPage} totalPages={20} onPageChange={setPaginationPage} variant="minimal" />
          </div>
          <div>
            <p className="text-sm sc-subtext mb-2">Small</p>
            <Pagination currentPage={paginationPage} totalPages={20} onPageChange={setPaginationPage} size="sm" />
          </div>
          <div>
            <p className="text-sm sc-subtext mb-2">Large</p>
            <Pagination currentPage={paginationPage} totalPages={20} onPageChange={setPaginationPage} size="lg" />
          </div>
        </div>
      </ExampleBlock>

      {/* ── SIMPLE PAGINATION ────────────────── */}
      <SectionTitle title="SimplePagination" description="Minimal previous/next navigation." />

      <ExampleBlock title="Variants & Sizes">
        <div className="space-y-4">
          <div>
            <p className="text-sm sc-subtext mb-2">Default</p>
            <SimplePagination currentPage={simplePaginationPage} totalPages={20} onPageChange={setSimplePaginationPage} />
          </div>
          <div>
            <p className="text-sm sc-subtext mb-2">Rounded</p>
            <SimplePagination currentPage={simplePaginationPage} totalPages={20} onPageChange={setSimplePaginationPage} variant="rounded" />
          </div>
          <div>
            <p className="text-sm sc-subtext mb-2">Minimal</p>
            <SimplePagination currentPage={simplePaginationPage} totalPages={20} onPageChange={setSimplePaginationPage} variant="minimal" />
          </div>
          <div>
            <p className="text-sm sc-subtext mb-2">Without Page Info</p>
            <SimplePagination currentPage={simplePaginationPage} totalPages={20} onPageChange={setSimplePaginationPage} showPageInfo={false} />
          </div>
          <div>
            <p className="text-sm sc-subtext mb-2">Small</p>
            <SimplePagination currentPage={simplePaginationPage} totalPages={20} onPageChange={setSimplePaginationPage} size="sm" />
          </div>
          <div>
            <p className="text-sm sc-subtext mb-2">Large</p>
            <SimplePagination currentPage={simplePaginationPage} totalPages={20} onPageChange={setSimplePaginationPage} size="lg" />
          </div>
        </div>
      </ExampleBlock>
    </div>
  );
};

export default TablesTab;
