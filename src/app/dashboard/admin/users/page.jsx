"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination,
  TextField, MenuItem, Select, IconButton, Menu, InputAdornment, Chip,
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import { getUsers, updateUserRole, updateUserStatus } from "@/services/dashboard.service";
import { formatCurrency, formatDate, timeAgo } from "@/utils/format";
import { exportToCsv } from "@/utils/exportCsv";
import { ROLES, ROLE_LABELS, ROLE_COLORS } from "@/config/roles";
import StatusChip from "@/components/Dashboard/ui/StatusChip";
import StatCard from "@/components/Dashboard/ui/StatCard";

const ROLE_FILTERS = ["all", ...Object.values(ROLES)];
const STATUS_FILTERS = ["all", "active", "suspended", "pending"];

export default function UsersManagementPage() {
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("all");
  const [status, setStatus] = useState("all");
  const [menu, setMenu] = useState({ anchor: null, user: null });

  const load = () => {
    setLoading(true);
    getUsers({ page, pageSize, search, role, status }).then(({ data, total }) => {
      setRows(data);
      setTotal(total);
      setLoading(false);
    });
  };

  useEffect(load, [page, pageSize, search, role, status]);

  const initials = (name) =>
    name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();

  const handleRole = async (newRole) => {
    if (!menu.user) return;
    await updateUserRole(menu.user.id, newRole);
    setMenu({ anchor: null, user: null });
    load();
  };

  const handleStatus = async (newStatus) => {
    if (!menu.user) return;
    await updateUserStatus(menu.user.id, newStatus);
    setMenu({ anchor: null, user: null });
    load();
  };

  const summary = useMemo(() => {
    const activeCount = rows.filter((r) => r.status === "active").length;
    return { activeCount };
  }, [rows]);

  return (
    <div className="space-y-6 pb-8">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard icon={<GroupOutlinedIcon />} label="Total users (filtered)" value={total} accent="#2095ae" />
        <StatCard icon={<CheckCircleOutlineOutlinedIcon />} label="Active on this page" value={summary.activeCount} accent="#0EA65F" />
        <StatCard icon={<PersonAddAltOutlinedIcon />} label="Roles tracked" value={Object.keys(ROLES).length} accent="#7A316F" />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center gap-3 p-4 border-b border-gray-100">
          <TextField
            size="small"
            placeholder="Search name or email…"
            value={search}
            onChange={(e) => { setPage(0); setSearch(e.target.value); }}
            InputProps={{ startAdornment: <InputAdornment position="start"><SearchOutlinedIcon fontSize="small" /></InputAdornment> }}
            className="w-full md:w-72"
          />
          <Select size="small" value={role} onChange={(e) => { setPage(0); setRole(e.target.value); }} className="w-full md:w-48">
            {ROLE_FILTERS.map((r) => (
              <MenuItem key={r} value={r}>{r === "all" ? "All roles" : ROLE_LABELS[r]}</MenuItem>
            ))}
          </Select>
          <Select size="small" value={status} onChange={(e) => { setPage(0); setStatus(e.target.value); }} className="w-full md:w-40">
            {STATUS_FILTERS.map((s) => (
              <MenuItem key={s} value={s} className="capitalize">{s === "all" ? "All statuses" : s}</MenuItem>
            ))}
          </Select>
          <button
            onClick={() => exportToCsv("go-venture-users", rows.map(({ id, name, email, role, status, totalBookings, totalSpent }) => ({ id, name, email, role, status, totalBookings, totalSpent })))}
            className="ml-auto text-sm font-semibold text-primary border border-primary/30 rounded-lg px-4 py-2 hover:bg-primary/5 transition-colors whitespace-nowrap"
          >
            Export CSV
          </button>
        </div>

        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow className="bg-gray-50">
                <TableCell>User</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Location</TableCell>
                <TableCell align="right">Bookings</TableCell>
                <TableCell align="right">Lifetime spend</TableCell>
                <TableCell>Joined</TableCell>
                <TableCell>Last active</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading && (
                <TableRow><TableCell colSpan={9} className="text-center text-gray-400 py-8">Loading users…</TableCell></TableRow>
              )}
              {!loading && rows.length === 0 && (
                <TableRow><TableCell colSpan={9} className="text-center text-gray-400 py-8">No users match these filters.</TableCell></TableRow>
              )}
              {!loading && rows.map((u) => (
                <TableRow key={u.id} hover>
                  <TableCell>
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
                  </TableCell>
                  <TableCell>
                    <Chip size="small" label={ROLE_LABELS[u.role]} sx={{ bgcolor: `${ROLE_COLORS[u.role]?.bg}1A`, color: ROLE_COLORS[u.role]?.bg, fontWeight: 600 }} />
                  </TableCell>
                  <TableCell><StatusChip status={u.status} /></TableCell>
                  <TableCell className="text-gray-500">{u.location}</TableCell>
                  <TableCell align="right" className="text-gray-700 font-medium">{u.totalBookings}</TableCell>
                  <TableCell align="right" className="text-gray-700 font-medium">{formatCurrency(u.totalSpent)}</TableCell>
                  <TableCell className="text-gray-500">{formatDate(u.joinedAt)}</TableCell>
                  <TableCell className="text-gray-400">{timeAgo(u.lastActive)}</TableCell>
                  <TableCell align="right">
                    <IconButton size="small" onClick={(e) => setMenu({ anchor: e.currentTarget, user: u })}>
                      <MoreVertOutlinedIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={total}
          page={page}
          onPageChange={(_, p) => setPage(p)}
          rowsPerPage={pageSize}
          onRowsPerPageChange={(e) => { setPageSize(parseInt(e.target.value, 10)); setPage(0); }}
          rowsPerPageOptions={[10, 25, 50]}
        />
      </div>

      <Menu anchorEl={menu.anchor} open={!!menu.anchor} onClose={() => setMenu({ anchor: null, user: null })}>
        <p className="px-4 pt-2 pb-1 text-xs font-bold text-gray-400 uppercase">Change role</p>
        {Object.values(ROLES).map((r) => (
          <MenuItem key={r} selected={menu.user?.role === r} onClick={() => handleRole(r)}>
            {ROLE_LABELS[r]}
          </MenuItem>
        ))}
        <p className="px-4 pt-2 pb-1 text-xs font-bold text-gray-400 uppercase border-t mt-1">Account</p>
        {menu.user?.status === "active" ? (
          <MenuItem onClick={() => handleStatus("suspended")} className="!text-red-600">
            <BlockOutlinedIcon fontSize="small" className="mr-2" /> Suspend user
          </MenuItem>
        ) : (
          <MenuItem onClick={() => handleStatus("active")} className="!text-green-700">
            <CheckCircleOutlineOutlinedIcon fontSize="small" className="mr-2" /> Reactivate user
          </MenuItem>
        )}
      </Menu>
    </div>
  );
}
