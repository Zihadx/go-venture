"use client";

import { useState } from "react";
import Image from "next/image";
import { TextField, MenuItem, Select, InputAdornment, IconButton, Menu, Chip } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import { usePackagesQuery, useCreatePackage, useUpdatePackage, useSetPackageStatus, useDeletePackage } from "@/hooks/queries/usePackagesQuery";
import { formatCurrency } from "@/utils/format";
import type { TourPackage, PackageStatus } from "@/types/package";
import type { PackageFormValues } from "@/schemas/package.schema";
import DataTable, { type DataTableColumn } from "@/components/Dashboard/ui/DataTable/DataTable";
import PackageFormDialog from "@/components/Dashboard/Packages/PackageFormDialog";
// @ts-ignore — shared JS component
import StatusChip from "@/components/Dashboard/ui/StatusChip";
// @ts-ignore — shared JS component
import StatCard from "@/components/Dashboard/ui/StatCard";

const STATUS_FILTERS = ["all", "active", "draft", "archived"];

export default function PackagesManagementPage() {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [menu, setMenu] = useState<{ anchor: HTMLElement | null; pkg: TourPackage | null }>({ anchor: null, pkg: null });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<TourPackage | null>(null);

  const { data, isLoading } = usePackagesQuery({ page, pageSize, search, status: status as PackageStatus | "all" });
  const createMutation = useCreatePackage();
  const updateMutation = useUpdatePackage();
  const statusMutation = useSetPackageStatus();
  const deleteMutation = useDeletePackage();

  const rows = data?.data || [];
  const total = data?.total || 0;
  const activeCount = rows.filter((p) => p.status === "active").length;

  const closeMenu = () => setMenu({ anchor: null, pkg: null });

  const openCreate = () => { setEditingPackage(null); setDialogOpen(true); };
  const openEdit = (pkg: TourPackage) => { setEditingPackage(pkg); setDialogOpen(true); closeMenu(); };

  const handleSubmit = async (values: PackageFormValues) => {
    if (editingPackage) {
      await updateMutation.mutateAsync({ id: editingPackage.id, input: values });
    } else {
      await createMutation.mutateAsync(values);
    }
  };

  const columns: DataTableColumn<TourPackage>[] = [
    {
      key: "package", header: "Package",
      render: (p) => (
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-14 rounded-md overflow-hidden shrink-0 bg-gray-100">
            <Image src={p.image} alt={p.title} fill className="object-cover" sizes="56px" />
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-gray-800 truncate">{p.title}</p>
            <p className="text-xs text-gray-400 truncate">{p.destination}</p>
          </div>
        </div>
      ),
    },
    { key: "category", header: "Category", render: (p) => <Chip size="small" label={p.category} /> },
    { key: "duration", header: "Duration", render: (p) => <span className="text-gray-600">{p.duration} days</span> },
    { key: "price", header: "Price / head", align: "right", render: (p) => <span className="font-medium text-gray-700">{formatCurrency(p.pricePerHead)}</span> },
    {
      key: "rating", header: "Rating",
      render: (p) => (
        <span className="flex items-center gap-1 text-gray-600">
          <StarRoundedIcon sx={{ fontSize: 16, color: "#F59E0B" }} /> {p.rating || "—"} ({p.reviewCount})
        </span>
      ),
    },
    { key: "status", header: "Status", render: (p) => <StatusChip status={p.status === "active" ? "active" : p.status === "draft" ? "pending" : "suspended"} /> },
    {
      key: "actions", header: "", align: "right",
      render: (p) => (
        <IconButton size="small" onClick={(e) => { e.stopPropagation(); setMenu({ anchor: e.currentTarget, pkg: p }); }}>
          <MoreVertOutlinedIcon fontSize="small" />
        </IconButton>
      ),
    },
  ];

  return (
    <div className="space-y-6 pb-8">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard icon={<MapOutlinedIcon />} label="Total packages" value={total} accent="#2095ae" />
        <StatCard icon={<VisibilityOutlinedIcon />} label="Live on this page" value={activeCount} accent="#0EA65F" />
        <StatCard icon={<AddOutlinedIcon />} label="Categories" value={new Set(rows.map((p) => p.category)).size} accent="#7A316F" />
      </div>

      <DataTable
        columns={columns}
        rows={rows}
        rowKey={(p) => p.id}
        loading={isLoading}
        page={page}
        pageSize={pageSize}
        total={total}
        onPageChange={setPage}
        onPageSizeChange={(size) => { setPageSize(size); setPage(0); }}
        emptyMessage="No packages match these filters."
        toolbar={
          <>
            <TextField
              size="small"
              placeholder="Search packages…"
              value={search}
              onChange={(e) => { setPage(0); setSearch(e.target.value); }}
              InputProps={{ startAdornment: <InputAdornment position="start"><SearchOutlinedIcon fontSize="small" /></InputAdornment> }}
              className="w-full md:w-72"
            />
            <Select size="small" value={status} onChange={(e) => { setPage(0); setStatus(e.target.value); }} className="w-full md:w-44">
              {STATUS_FILTERS.map((s) => <MenuItem key={s} value={s} className="capitalize">{s === "all" ? "All statuses" : s}</MenuItem>)}
            </Select>
            <button onClick={openCreate} className="ml-auto button-primary text-sm py-2 px-4 flex items-center gap-1">
              <AddOutlinedIcon fontSize="small" /> New package
            </button>
          </>
        }
      />

      <Menu anchorEl={menu.anchor} open={!!menu.anchor} onClose={closeMenu}>
        <MenuItem onClick={() => menu.pkg && openEdit(menu.pkg)}>Edit details</MenuItem>
        {menu.pkg?.status !== "active" && (
          <MenuItem onClick={() => { if (menu.pkg) statusMutation.mutate({ id: menu.pkg.id, status: "active" }); closeMenu(); }} className="!text-green-700">
            Publish (make active)
          </MenuItem>
        )}
        {menu.pkg?.status === "active" && (
          <MenuItem onClick={() => { if (menu.pkg) statusMutation.mutate({ id: menu.pkg.id, status: "draft" }); closeMenu(); }}>
            Unpublish (move to draft)
          </MenuItem>
        )}
        <MenuItem onClick={() => { if (menu.pkg) statusMutation.mutate({ id: menu.pkg.id, status: "archived" }); closeMenu(); }}>
          Archive
        </MenuItem>
        <MenuItem
          onClick={() => { if (menu.pkg) deleteMutation.mutate(menu.pkg.id); closeMenu(); }}
          className="!text-red-600"
        >
          Delete permanently
        </MenuItem>
      </Menu>

      <PackageFormDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleSubmit}
        initialValues={editingPackage}
      />
    </div>
  );
}
