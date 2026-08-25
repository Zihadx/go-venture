"use client";

import { useMemo, useState } from "react";
import { TextField, MenuItem, Select, IconButton, Menu, InputAdornment, Chip } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import { useUsersQuery, useUpdateUserRole, useUpdateUserStatus } from "@/hooks/queries/useUsersQuery";
import { formatCurrency, formatDate, timeAgo } from "@/utils/format";
import { exportToCsv } from "@/utils/exportCsv";
import { ROLES, ROLE_LABELS, ROLE_COLORS } from "@/config/roles";
import type { Role } from "@/redux/slices/sessionSlice";
import DataTable, { type DataTableColumn } from "@/components/Dashboard/ui/DataTable/DataTable";
// @ts-ignore — shared JS component
import StatusChip from "@/components/Dashboard/ui/StatusChip";
// @ts-ignore — shared JS component
import StatCard from "@/components/Dashboard/ui/StatCard";

interface DashboardUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: string;
  location: string;
  totalBookings: number;
  totalSpent: number;
  joinedAt: string;
  lastActive: string;
}

const ROLE_FILTERS = ["all", ...Object.values(ROLES)];
const STATUS_FILTERS = ["all", "active", "suspended", "pending"];

export default function UsersManagementPage() {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("all");
  const [status, setStatus] = useState("all");
  const [menu, setMenu] = useState<{ anchor: HTMLElement | null; user: DashboardUser | null }>({ anchor: null, user: null });

  const { data, isLoading } = useUsersQuery({ page, pageSize, search, role, status });
  const updateRole = useUpdateUserRole();
  const updateStatus = useUpdateUserStatus();

  const rows = useMemo(() => (data?.data || []) as DashboardUser[], [data]);
  const total = data?.total || 0;

  const initials = (name: string) => name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();

  const closeMenu = () => setMenu({ anchor: null, user: null });

  const columns: DataTableColumn<DashboardUser>[] = [
    {
      key: "user",
      header: "User",
      render: (u) => (
        <div className="flex items-center gap-3">
          <span
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold"
            style={{ backgroundColor: ROLE_COLORS[u.role]?.bg, color: ROLE_COLORS[u.role]?.fg }}
          >
            {initials(u.name)}
          </span>
          <div className="min-w-0">
            <p className="font-semibold text-gray-800 truncate">{u.name}</p>
            <p className="text-xs text-gray-400 truncate">{u.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: "role",
      header: "Role",
      render: (u) => (
        <Chip
          size="small"
          label={ROLE_LABELS[u.role]}
          sx={{ bgcolor: `${ROLE_COLORS[u.role]?.bg}1A`, color: ROLE_COLORS[u.role]?.bg, fontWeight: 600 }}
        />
      ),
    },
    { key: "status", header: "Status", render: (u) => <StatusChip status={u.status} /> },
    { key: "location", header: "Location", render: (u) => <span className="text-gray-500">{u.location}</span> },
    { key: "bookings", header: "Bookings", align: "right", render: (u) => <span className="font-medium text-gray-700">{u.totalBookings}</span> },
    { key: "spend", header: "Lifetime spend", align: "right", render: (u) => <span className="font-medium text-gray-700">{formatCurrency(u.totalSpent)}</span> },
    { key: "joined", header: "Joined", render: (u) => <span className="text-gray-500">{formatDate(u.joinedAt)}</span> },
    { key: "active", header: "Last active", render: (u) => <span className="text-gray-400">{timeAgo(u.lastActive)}</span> },
    {
      key: "actions",
      header: "",
      align: "right",
      render: (u) => (
        <IconButton size="small" onClick={(e) => { e.stopPropagation(); setMenu({ anchor: e.currentTarget, user: u }); }}>
          <MoreVertOutlinedIcon fontSize="small" />
        </IconButton>
      ),
    },
  ];

  const activeCount = useMemo(() => rows.filter((r) => r.status === "active").length, [rows]);

  return (
    <div className="space-y-6 pb-8">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard icon={<GroupOutlinedIcon />} label="Total users (filtered)" value={total} accent="#2095ae" />
        <StatCard icon={<CheckCircleOutlineOutlinedIcon />} label="Active on this page" value={activeCount} accent="#0EA65F" />
        <StatCard icon={<PersonAddAltOutlinedIcon />} label="Roles tracked" value={Object.keys(ROLES).length} accent="#7A316F" />
      </div>

      <DataTable
        columns={columns}
        rows={rows}
        rowKey={(u) => u.id}
        loading={isLoading}
        page={page}
        pageSize={pageSize}
        total={total}
        onPageChange={setPage}
        onPageSizeChange={(size) => { setPageSize(size); setPage(0); }}
        toolbar={
          <div className="flex w-full flex-col gap-3 sm:grid sm:grid-cols-2 lg:flex lg:flex-row lg:items-center">
            <TextField
              size="small"
              placeholder="Search name or email…"
              value={search}
              onChange={(e) => { setPage(0); setSearch(e.target.value); }}
              InputProps={{ startAdornment: <InputAdornment position="start"><SearchOutlinedIcon fontSize="small" /></InputAdornment> }}
              className="w-full md:w-72"
            />
            <Select size="small" value={role} onChange={(e) => { setPage(0); setRole(e.target.value); }} className="w-full md:w-48">
              {ROLE_FILTERS.map((r) => <MenuItem key={r} value={r}>{r === "all" ? "All roles" : ROLE_LABELS[r as Role]}</MenuItem>)}
            </Select>
            <Select size="small" value={status} onChange={(e) => { setPage(0); setStatus(e.target.value); }} className="w-full md:w-40">
              {STATUS_FILTERS.map((s) => <MenuItem key={s} value={s} className="capitalize">{s === "all" ? "All statuses" : s}</MenuItem>)}
            </Select>
            <button
              onClick={() => exportToCsv("go-venture-users", rows.map(({ id, name, email, role, status, totalBookings, totalSpent }) => ({ id, name, email, role, status, totalBookings, totalSpent })))}
              className="ml-auto text-sm font-semibold text-primary border border-primary/30 rounded-lg px-4 py-2 hover:bg-primary/5 transition-colors whitespace-nowrap"
            >
              Export CSV
            </button>
          </div>
        }
      />

      <Menu anchorEl={menu.anchor} open={!!menu.anchor} onClose={closeMenu}>
        <p className="px-4 pt-2 pb-1 text-xs font-bold text-gray-400 uppercase">Change role</p>
        {Object.values(ROLES).map((r) => (
          <MenuItem
            key={r}
            selected={menu.user?.role === r}
            onClick={() => { if (menu.user) updateRole.mutate({ userId: menu.user.id, role: r }); closeMenu(); }}
          >
            {ROLE_LABELS[r]}
          </MenuItem>
        ))}
        <p className="px-4 pt-2 pb-1 text-xs font-bold text-gray-400 uppercase border-t mt-1">Account</p>
        {menu.user?.status === "active" ? (
          <MenuItem onClick={() => { if (menu.user) updateStatus.mutate({ userId: menu.user.id, status: "suspended" }); closeMenu(); }} className="!text-red-600">
            <BlockOutlinedIcon fontSize="small" className="mr-2" /> Suspend user
          </MenuItem>
        ) : (
          <MenuItem onClick={() => { if (menu.user) updateStatus.mutate({ userId: menu.user.id, status: "active" }); closeMenu(); }} className="!text-green-700">
            <CheckCircleOutlineOutlinedIcon fontSize="small" className="mr-2" /> Reactivate user
          </MenuItem>
        )}
      </Menu>
    </div>
  );
}
