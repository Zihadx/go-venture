"use client";

import type { ReactNode } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from "@mui/material";

export interface DataTableColumn<T> {
  key: string;
  header: string;
  align?: "left" | "right" | "center";
  width?: string;
  render: (row: T) => ReactNode;
}

interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  loading?: boolean;
  emptyMessage?: string;
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onRowClick?: (row: T) => void;
  toolbar?: ReactNode;
  rowsPerPageOptions?: number[];
}

export default function DataTable<T>({
  columns,
  rows,
  rowKey,
  loading = false,
  emptyMessage = "No results match these filters.",
  page,
  pageSize,
  total,
  onPageChange,
  onPageSizeChange,
  onRowClick,
  toolbar,
  rowsPerPageOptions = [10, 25, 50],
}: DataTableProps<T>) {
  return (
    <div className="w-full min-w-0 overflow-hidden rounded-2xl border border-gray-200/70 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">

      {toolbar && (
        <div className="border-b border-gray-100 p-3 dark:border-gray-800 sm:p-4">
          <div className="w-full min-w-0">
            {toolbar}
          </div>
        </div>
      )}

      {/* Desktop / Tablet */}
      <div className="hidden w-full overflow-x-auto md:block">
        <TableContainer>
          <Table
            size="small"
            sx={{
              minWidth: 760,
              "& .MuiTableCell-root": {
                whiteSpace: "nowrap",
              },
            }}
          >
            <TableHead>
              <TableRow className="bg-gray-50 dark:bg-gray-800/70">
                {columns.map((col) => (
                  <TableCell
                    key={col.key}
                    align={col.align || "left"}
                    style={{ width: col.width }}
                    className="!border-gray-100 !py-3 !text-[11px] !font-bold !uppercase !tracking-wide !text-gray-500 dark:!border-gray-800 dark:!text-gray-400"
                  >
                    {col.header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {loading && (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="!py-14 !text-center"
                  >
                    <LoadingState />
                  </TableCell>
                </TableRow>
              )}

              {!loading && rows.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="!py-14 !text-center !text-sm !text-gray-400"
                  >
                    {emptyMessage}
                  </TableCell>
                </TableRow>
              )}

              {!loading &&
                rows.map((row) => (
                  <TableRow
                    key={rowKey(row)}
                    hover
                    onClick={() => onRowClick?.(row)}
                    className={`group transition-colors ${
                      onRowClick
                        ? "cursor-pointer"
                        : ""
                    } dark:hover:bg-gray-800/50`}
                  >
                    {columns.map((col) => (
                      <TableCell
                        key={col.key}
                        align={col.align || "left"}
                        className="!border-gray-100 !py-3.5 !text-sm dark:!border-gray-800"
                      >
                        {col.render(row)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {/* Mobile */}
      <div className="block md:hidden">
        {loading && (
          <div className="px-4 py-12">
            <LoadingState />
          </div>
        )}

        {!loading && rows.length === 0 && (
          <div className="px-5 py-14 text-center">
            <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-gray-400 dark:bg-gray-800">
              <span className="text-lg">—</span>
            </div>

            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
              {emptyMessage}
            </p>
          </div>
        )}

        {!loading && rows.length > 0 && (
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {rows.map((row) => (
              <MobileRow
                key={rowKey(row)}
                row={row}
                columns={columns}
                onClick={onRowClick}
              />
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="border-t border-gray-100 dark:border-gray-800">
        <TablePagination
          component="div"
          count={total}
          page={page}
          onPageChange={(_, nextPage) => onPageChange(nextPage)}
          rowsPerPage={pageSize}
          onRowsPerPageChange={(e) => {
            onPageSizeChange(Number(e.target.value));
            onPageChange(0);
          }}
          rowsPerPageOptions={rowsPerPageOptions}
          sx={{
            width: "100%",

            "& .MuiTablePagination-toolbar": {
              minHeight: 58,
              padding: "6px 12px",
              flexWrap: "wrap",
              justifyContent: "flex-end",
              gap: "4px",
            },

            "& .MuiTablePagination-selectLabel": {
              fontSize: "0.72rem",
              color: "rgb(156 163 175)",
            },

            "& .MuiTablePagination-displayedRows": {
              fontSize: "0.72rem",
              color: "rgb(156 163 175)",
            },

            "& .MuiTablePagination-select": {
              fontSize: "0.75rem",
            },

            "@media (max-width: 480px)": {
              "& .MuiTablePagination-toolbar": {
                minHeight: 64,
                padding: "6px 8px",
              },

              "& .MuiTablePagination-spacer": {
                display: "none",
              },

              "& .MuiTablePagination-selectLabel": {
                display: "none",
              },

              "& .MuiTablePagination-select": {
                marginLeft: 0,
                marginRight: 4,
              },

              "& .MuiTablePagination-displayedRows": {
                marginLeft: "auto",
              },
            },
          }}
        />
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="flex items-center justify-center gap-2">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-primary" />
      <span className="text-sm text-gray-400">Loading...</span>
    </div>
  );
}

interface MobileRowProps<T> {
  row: T;
  columns: DataTableColumn<T>[];
  onClick?: (row: T) => void;
}

function MobileRow<T>({
  row,
  columns,
  onClick,
}: MobileRowProps<T>) {
  const primary = columns[0];
  const secondary = columns.slice(1);

  return (
    <div
      onClick={() => onClick?.(row)}
      className={`px-4 py-4 transition-colors ${
        onClick
          ? "cursor-pointer active:bg-gray-50 dark:active:bg-gray-800/70"
          : ""
      }`}
    >
      {/* Primary information */}
      <div className="mb-3 flex min-w-0 items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-gray-400">
            {primary.header}
          </p>

          <div className="min-w-0 overflow-hidden text-sm font-semibold text-gray-800 dark:text-gray-100">
            {primary.render(row)}
          </div>
        </div>

        {onClick && (
          <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-50 text-gray-400 dark:bg-gray-800">
            →
          </span>
        )}
      </div>

      {/* Remaining information */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-3 rounded-xl bg-gray-50/80 p-3 dark:bg-gray-800/50">
        {secondary.map((col) => (
          <div
            key={col.key}
            className="min-w-0"
          >
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-gray-400">
              {col.header}
            </p>

            <div
              className={`min-w-0 overflow-hidden text-xs ${
                col.align === "right"
                  ? "text-right"
                  : ""
              }`}
            >
              {col.render(row)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}