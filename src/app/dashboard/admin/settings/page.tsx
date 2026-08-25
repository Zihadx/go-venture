"use client";

import { useEffect, useState } from "react";
import { Select, MenuItem, Chip } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

import {
  MODULES,
  ROLES,
  ROLE_LABELS,
  ROLE_COLORS,
} from "@/config/roles";

import {
  getAuditLog,
  type AuditLogEntry,
} from "@/services/auditLog.service";

import { formatDateTime } from "@/utils/format";

const CATEGORY_FILTERS = [
  "all",
  "booking",
  "user",
  "package",
  "billing",
  "review",
  "system",
];

const getCategoryColor = (category) => {
  switch (category) {
    case "booking":
      return "#2095ae";
    case "user":
      return "#7A316F";
    case "package":
      return "#b59677";
    case "billing":
      return "#0EA65F";
    case "review":
      return "#F59E0B";
    default:
      return "#6B7280";
  }
};

export default function SystemSettingsPage() {
  const [logs, setLogs] = useState<AuditLogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("all");

  useEffect(() => {
    setLoading(true);

    getAuditLog({ category }).then((data) => {
      setLogs(data);
      setLoading(false);
    });
  }, [category]);

  const modules = Object.entries(MODULES);
  const roles = Object.values(ROLES);

  return (
    <div className="w-full min-w-0 max-w-full space-y-5 overflow-x-hidden pb-8 sm:space-y-6">
      {/* Permission Matrix */}
      <section className="w-full min-w-0 overflow-hidden rounded-2xl border border-gray-200/70 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
        {/* Header */}
        <div className="border-b border-gray-100 p-4 sm:p-5 lg:p-6 dark:border-gray-800">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-300">
              <SecurityOutlinedIcon fontSize="small" />
            </div>

            <div className="min-w-0">
              <h3 className="text-base font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-lg">
                Role & permission matrix
              </h3>

              <p className="mt-1 max-w-3xl text-xs leading-5 text-gray-500 dark:text-gray-400 sm:text-sm">
                Reflects the live RBAC config that gates every dashboard route.
                Read-only here — role changes ship through code review, not a
                settings toggle.
              </p>
            </div>
          </div>
        </div>

        {/* Desktop / Tablet Matrix */}
        <div className="hidden w-full overflow-x-auto md:block">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/80 text-left dark:border-gray-800 dark:bg-gray-800/40">
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Module
                </th>

                {roles.map((role) => (
                  <th
                    key={role}
                    className="whitespace-nowrap px-3 py-3 text-center text-xs font-semibold uppercase tracking-wide text-gray-500"
                  >
                    <div className="flex justify-center">
                      <span
                        className="flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold"
                        style={{
                          backgroundColor: ROLE_COLORS[role]?.bg,
                          color: ROLE_COLORS[role]?.fg,
                        }}
                        title={ROLE_LABELS[role]}
                      >
                        {ROLE_LABELS[role][0]}
                      </span>
                    </div>
                  </th>
                ))}

                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {modules.map(([key, mod]) => (
                <tr
                  key={key}
                  className="border-b border-gray-100 transition-colors last:border-0 hover:bg-gray-50/70 dark:border-gray-800 dark:hover:bg-gray-800/40"
                >
                  <td className="px-5 py-4 font-semibold text-gray-700 dark:text-gray-200">
                    {mod.label}
                  </td>

                  {roles.map((role) => (
                    <td
                      key={role}
                      className="px-3 py-4 text-center"
                    >
                      {mod.roles.includes(role) ? (
                        <CheckCircleIcon
                          sx={{
                            fontSize: 18,
                            color: "#0EA65F",
                          }}
                        />
                      ) : (
                        <CancelOutlinedIcon
                          sx={{
                            fontSize: 18,
                            color: "#D1D5DB",
                          }}
                        />
                      )}
                    </td>
                  ))}

                  <td className="px-5 py-4">
                    <Chip
                      size="small"
                      label={
                        mod.status === "live"
                          ? "Live"
                          : "Coming soon"
                      }
                      sx={{
                        height: 25,
                        bgcolor:
                          mod.status === "live"
                            ? "#D1FAE5"
                            : "#F3F4F6",
                        color:
                          mod.status === "live"
                            ? "#065F46"
                            : "#6B7280",
                        fontWeight: 700,
                        fontSize: "0.68rem",
                        borderRadius: "7px",
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Permission Cards */}
        <div className="block divide-y divide-gray-100 dark:divide-gray-800 md:hidden">
          {modules.map(([key, mod]) => (
            <div
              key={key}
              className="p-4 transition-colors active:bg-gray-50 dark:active:bg-gray-800/50"
            >
              {/* Module header */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-xs font-bold text-gray-500 dark:bg-gray-800 dark:text-gray-300">
                    {mod.label.charAt(0)}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-gray-800 dark:text-gray-100">
                      {mod.label}
                    </p>

                    <p className="mt-0.5 text-[11px] text-gray-400">
                      {mod.roles.length}{" "}
                      {mod.roles.length === 1
                        ? "role"
                        : "roles"}{" "}
                      enabled
                    </p>
                  </div>
                </div>

                <Chip
                  size="small"
                  label={
                    mod.status === "live"
                      ? "Live"
                      : "Coming soon"
                  }
                  sx={{
                    flexShrink: 0,
                    height: 24,
                    bgcolor:
                      mod.status === "live"
                        ? "#D1FAE5"
                        : "#F3F4F6",
                    color:
                      mod.status === "live"
                        ? "#065F46"
                        : "#6B7280",
                    fontWeight: 700,
                    fontSize: "0.65rem",
                    borderRadius: "7px",
                  }}
                />
              </div>

              {/* Roles */}
              <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {roles.map((role) => {
                  const hasAccess = mod.roles.includes(role);

                  return (
                    <div
                      key={role}
                      className={`flex min-w-0 items-center gap-2 rounded-lg border px-2.5 py-2 ${
                        hasAccess
                          ? "border-emerald-100 bg-emerald-50/70 dark:border-emerald-900/40 dark:bg-emerald-950/20"
                          : "border-gray-100 bg-gray-50/70 dark:border-gray-800 dark:bg-gray-800/40"
                      }`}
                    >
                      {hasAccess ? (
                        <CheckCircleIcon
                          sx={{
                            fontSize: 16,
                            color: "#0EA65F",
                            flexShrink: 0,
                          }}
                        />
                      ) : (
                        <CancelOutlinedIcon
                          sx={{
                            fontSize: 16,
                            color: "#D1D5DB",
                            flexShrink: 0,
                          }}
                        />
                      )}

                      <span
                        className={`truncate text-[11px] font-medium ${
                          hasAccess
                            ? "text-gray-700 dark:text-gray-200"
                            : "text-gray-400"
                        }`}
                      >
                        {ROLE_LABELS[role]}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Legend */}
        <div className="flex flex-wrap gap-x-4 gap-y-2 border-t border-gray-100 bg-gray-50/50 px-4 py-3 dark:border-gray-800 dark:bg-gray-800/20 md:hidden">
          <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
            <CheckCircleIcon
              sx={{
                fontSize: 15,
                color: "#0EA65F",
              }}
            />
            Has access
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
            <CancelOutlinedIcon
              sx={{
                fontSize: 15,
                color: "#D1D5DB",
              }}
            />
            No access
          </div>
        </div>
      </section>

      {/* Activity Log */}
      <section className="w-full min-w-0 overflow-hidden rounded-2xl border border-gray-200/70 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
        {/* Header */}
        <div className="border-b border-gray-100 p-4 dark:border-gray-800 sm:p-5">
          <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-300">
                <HistoryOutlinedIcon fontSize="small" />
              </div>

              <div className="min-w-0">
                <h3 className="text-base font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-lg">
                  Activity log
                </h3>

                <p className="mt-0.5 text-xs text-gray-400">
                  Recent system and admin activity
                </p>
              </div>
            </div>

            <Select
              size="small"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full sm:w-48"
              sx={{
                borderRadius: "10px",
                fontSize: "0.8rem",
                backgroundColor: "transparent",
              }}
            >
              {CATEGORY_FILTERS.map((c) => (
                <MenuItem
                  key={c}
                  value={c}
                  className="capitalize"
                >
                  {c === "all" ? "All activity" : c}
                </MenuItem>
              ))}
            </Select>
          </div>
        </div>

        {/* Activity content */}
        <div className="p-4 sm:p-5">
          {loading && (
            <div className="flex min-h-[160px] items-center justify-center">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-gray-200 border-t-primary" />
                Loading activity…
              </div>
            </div>
          )}

          {!loading && logs.length === 0 && (
            <div className="flex min-h-[160px] flex-col items-center justify-center text-center">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-400 dark:bg-gray-800">
                <HistoryOutlinedIcon fontSize="small" />
              </div>

              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                No activity found
              </p>

              <p className="mt-1 text-xs text-gray-400">
                Try selecting another category.
              </p>
            </div>
          )}

          {!loading && logs.length > 0 && (
            <div className="space-y-0">
              {logs.map((log) => (
                <div
                  key={log.id}
                  className="group relative flex gap-3 border-b border-gray-100 py-4 first:pt-0 last:border-0 last:pb-0 dark:border-gray-800"
                >
                  {/* Timeline indicator */}
                  <div className="relative flex w-5 shrink-0 justify-center">
                    <span
                      className="relative z-10 mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ring-4 ring-white dark:ring-gray-900"
                      style={{
                        backgroundColor: getCategoryColor(
                          log.category
                        ),
                      }}
                    />

                    {log !== logs[logs.length - 1] && (
                      <span className="absolute top-4 h-full w-px bg-gray-100 dark:bg-gray-800" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <div className="flex min-w-0 flex-col gap-1">
                      <p className="break-words text-sm leading-5 text-gray-700 dark:text-gray-200">
                        <span className="font-semibold text-gray-900 dark:text-gray-100">
                          {log.actor}
                        </span>{" "}
                        <span className="text-xs text-gray-400">
                          ({log.actorRole})
                        </span>{" "}
                        <span>{log.action.toLowerCase()}</span>{" "}
                        <span className="font-semibold text-gray-700 dark:text-gray-300">
                          {log.target}
                        </span>
                      </p>

                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[11px] text-gray-400">
                          {formatDateTime(log.at)}
                        </span>

                        <span
                          className="h-1 w-1 rounded-full"
                          style={{
                            backgroundColor: getCategoryColor(
                              log.category
                            ),
                          }}
                        />

                        <span className="text-[11px] font-medium capitalize text-gray-400">
                          {log.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  <ArrowForwardIosRoundedIcon
                    className="mt-1 hidden shrink-0 text-gray-300 transition-transform group-hover:translate-x-0.5 sm:block"
                    sx={{ fontSize: 13 }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}