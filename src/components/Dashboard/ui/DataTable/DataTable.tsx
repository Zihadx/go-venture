"use client";

import type { ReactNode } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination,
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

/**
 * One table implementation for every paginated dashboard list (Users,
 * Bookings, Invoices, and any future one). Each caller only supplies column
 * definitions and data — search/filter inputs stay page-specific and are
 * passed in as `toolbar`, since those genuinely differ per page.
 */
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
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
      {toolbar && (
        <div className="flex flex-col md:flex-row md:items-center gap-3 p-4 border-b border-gray-100 dark:border-gray-800">
          {toolbar}
        </div>
      )}

      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow className="bg-gray-50 dark:bg-gray-800">
              {columns.map((col) => (
                <TableCell key={col.key} align={col.align || "left"} style={{ width: col.width }}>
                  {col.header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading && (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center text-gray-400 py-8">
                  Loading…
                </TableCell>
              </TableRow>
            )}
            {!loading && rows.length === 0 && (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center text-gray-400 py-8">
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
                  className={onRowClick ? "cursor-pointer" : undefined}
                >
                  {columns.map((col) => (
                    <TableCell key={col.key} align={col.align || "left"}>
                      {col.render(row)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={total}
        page={page}
        onPageChange={(_, p) => onPageChange(p)}
        rowsPerPage={pageSize}
        onRowsPerPageChange={(e) => onPageSizeChange(parseInt(e.target.value, 10))}
        rowsPerPageOptions={rowsPerPageOptions}
      />
    </div>
  );
}
