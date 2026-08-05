"use client";

import { useEffect, useState } from "react";
import { Select, MenuItem, Chip, Tooltip } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import { MODULES, ROLES, ROLE_LABELS, ROLE_COLORS } from "@/config/roles";
import { getAuditLog, type AuditLogEntry } from "@/services/auditLog.service";
import { formatDateTime } from "@/utils/format";

const CATEGORY_FILTERS = ["all", "booking", "user", "package", "billing", "review", "system"];

export default function SystemSettingsPage() {
  const [logs, setLogs] = useState<AuditLogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("all");

  useEffect(() => {
    setLoading(true);
    getAuditLog({ category }).then((data) => { setLogs(data); setLoading(false); });
  }, [category]);

  const modules = Object.entries(MODULES);
  const roles = Object.values(ROLES);

  return (
    <div className="space-y-6 pb-8">
      {/* Permission matrix — a live view of src/config/roles.js, not a
          separately-maintained document that inevitably drifts from the
          actual route-guard logic. Read-only by design: real role/permission
          edits should be a server-side, audited operation, not client mock
          state pretending to be authoritative. */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-5">
        <div className="flex items-center gap-2 mb-1">
          <SecurityOutlinedIcon fontSize="small" className="text-gray-400" />
          <h3 className="font-bold text-gray-800 dark:text-gray-100">Role & permission matrix</h3>
        </div>
        <p className="text-sm text-gray-400 mb-4">
          Reflects the live RBAC config that gates every dashboard route. Read-only here — role changes ship through code review, not a settings toggle.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b border-gray-100 dark:border-gray-800">
                <th className="py-2 pr-4 font-medium text-gray-500">Module</th>
                {roles.map((r) => (
                  <th key={r} className="py-2 px-3 font-medium text-gray-500 text-center whitespace-nowrap">
                    <span
                      className="inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold"
                      style={{ backgroundColor: ROLE_COLORS[r]?.bg, color: ROLE_COLORS[r]?.fg }}
                      title={ROLE_LABELS[r]}
                    >
                      {ROLE_LABELS[r][0]}
                    </span>
                  </th>
                ))}
                <th className="py-2 pl-3 font-medium text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody>
              {modules.map(([key, mod]) => (
                <tr key={key} className="border-b border-gray-50 dark:border-gray-800 last:border-0">
                  <td className="py-2.5 pr-4 text-gray-700 dark:text-gray-200 font-medium">{mod.label}</td>
                  {roles.map((r) => (
                    <td key={r} className="py-2.5 px-3 text-center">
                      {mod.roles.includes(r) ? (
                        <CheckCircleIcon sx={{ fontSize: 16, color: "#0EA65F" }} />
                      ) : (
                        <CancelOutlinedIcon sx={{ fontSize: 16, color: "#E5E7EB" }} />
                      )}
                    </td>
                  ))}
                  <td className="py-2.5 pl-3">
                    <Chip
                      size="small"
                      label={mod.status === "live" ? "Live" : "Coming soon"}
                      sx={{
                        bgcolor: mod.status === "live" ? "#D1FAE5" : "#F3F4F6",
                        color: mod.status === "live" ? "#065F46" : "#6B7280",
                        fontWeight: 600,
                        fontSize: "0.7rem",
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Audit log */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-5">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <HistoryOutlinedIcon fontSize="small" className="text-gray-400" />
            <h3 className="font-bold text-gray-800 dark:text-gray-100">Activity log</h3>
          </div>
          <Select size="small" value={category} onChange={(e) => setCategory(e.target.value)} className="w-44">
            {CATEGORY_FILTERS.map((c) => <MenuItem key={c} value={c} className="capitalize">{c === "all" ? "All activity" : c}</MenuItem>)}
          </Select>
        </div>

        {loading && <p className="text-gray-400 text-sm py-6 text-center">Loading activity…</p>}

        <div className="space-y-3">
          {!loading && logs.map((log) => (
            <div key={log.id} className="flex items-start gap-3 border-b border-gray-50 dark:border-gray-800 last:border-0 pb-3 last:pb-0">
              <span
                className="mt-1 h-2 w-2 rounded-full shrink-0"
                style={{
                  backgroundColor:
                    log.category === "booking" ? "#2095ae" :
                    log.category === "user" ? "#7A316F" :
                    log.category === "package" ? "#b59677" :
                    log.category === "billing" ? "#0EA65F" :
                    log.category === "review" ? "#F59E0B" : "#6B7280",
                }}
              />
              <div className="min-w-0 flex-1">
                <p className="text-sm text-gray-700 dark:text-gray-200">
                  <span className="font-semibold">{log.actor}</span>{" "}
                  <span className="text-gray-400">({log.actorRole})</span> {log.action.toLowerCase()}{" "}
                  <span className="font-medium text-gray-600 dark:text-gray-300">{log.target}</span>
                </p>
                <p className="text-xs text-gray-400">{formatDateTime(log.at)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
