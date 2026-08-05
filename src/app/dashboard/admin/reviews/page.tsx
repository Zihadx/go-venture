"use client";

import { useState } from "react";
import { TextField, MenuItem, Select, InputAdornment, IconButton, Menu } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import ReviewsOutlinedIcon from "@mui/icons-material/ReviewsOutlined";
import HourglassEmptyOutlinedIcon from "@mui/icons-material/HourglassEmptyOutlined";
import { useReviewsQuery, useReviewSummaryQuery, useSetReviewStatus, useReplyToReview } from "@/hooks/queries/useReviewsQuery";
import { formatDate } from "@/utils/format";
import type { Review, ReviewStatus } from "@/types/review";
import DataTable, { type DataTableColumn } from "@/components/Dashboard/ui/DataTable/DataTable";
// @ts-ignore — shared JS component
import StatCard from "@/components/Dashboard/ui/StatCard";

const STATUS_FILTERS = ["all", "pending", "approved", "hidden"];

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <StarRoundedIcon key={i} sx={{ fontSize: 16, color: i < rating ? "#F59E0B" : "#E5E7EB" }} />
      ))}
    </span>
  );
}

export default function ReviewsModerationPage() {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [menu, setMenu] = useState<{ anchor: HTMLElement | null; review: Review | null }>({ anchor: null, review: null });
  const [replyDraft, setReplyDraft] = useState<{ review: Review | null; text: string }>({ review: null, text: "" });

  const { data, isLoading } = useReviewsQuery({ page, pageSize, search, status: status as ReviewStatus | "all" });
  const { data: summary } = useReviewSummaryQuery();
  const setStatusMutation = useSetReviewStatus();
  const replyMutation = useReplyToReview();

  const rows = data?.data || [];
  const total = data?.total || 0;

  const closeMenu = () => setMenu({ anchor: null, review: null });

  const columns: DataTableColumn<Review>[] = [
    {
      key: "customer", header: "Customer",
      render: (r) => (
        <div>
          <p className="text-gray-800 font-medium">{r.customer.name}</p>
          <p className="text-xs text-gray-400">{r.destination}</p>
        </div>
      ),
    },
    { key: "rating", header: "Rating", render: (r) => <Stars rating={r.rating} /> },
    { key: "comment", header: "Review", width: "35%", render: (r) => <p className="text-gray-600 line-clamp-2">{r.comment}</p> },
    {
      key: "status", header: "Status",
      render: (r) => (
        <span className={`text-xs font-semibold capitalize ${r.status === "approved" ? "text-green-600" : r.status === "hidden" ? "text-red-600" : "text-amber-600"}`}>
          {r.status}
        </span>
      ),
    },
    { key: "date", header: "Posted", render: (r) => <span className="text-gray-400">{formatDate(r.createdAt)}</span> },
    {
      key: "actions", header: "", align: "right",
      render: (r) => (
        <IconButton size="small" onClick={(e) => { e.stopPropagation(); setMenu({ anchor: e.currentTarget, review: r }); }}>
          <MoreVertOutlinedIcon fontSize="small" />
        </IconButton>
      ),
    },
  ];

  return (
    <div className="space-y-6 pb-8">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard icon={<ReviewsOutlinedIcon />} label="Total reviews" value={summary?.total ?? "—"} accent="#2095ae" />
        <StatCard icon={<HourglassEmptyOutlinedIcon />} label="Awaiting moderation" value={summary?.pending ?? "—"} accent="#b59677" />
        <StatCard icon={<StarRoundedIcon />} label="Average rating" value={summary ? `${summary.avgRating} / 5` : "—"} accent="#F59E0B" />
      </div>

      {summary && (
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-4">
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">Rating distribution</p>
          <div className="space-y-2">
            {summary.distribution.map((d) => (
              <div key={d.star} className="flex items-center gap-3 text-sm">
                <span className="w-10 text-gray-500">{d.star} star</span>
                <div className="flex-1 h-2 rounded-full bg-gray-100 dark:bg-gray-800">
                  <div className="h-2 rounded-full bg-amber-400" style={{ width: `${summary.total ? (d.count / summary.total) * 100 : 0}%` }} />
                </div>
                <span className="w-8 text-right text-gray-400">{d.count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <DataTable
        columns={columns}
        rows={rows}
        rowKey={(r) => r.id}
        loading={isLoading}
        page={page}
        pageSize={pageSize}
        total={total}
        onPageChange={setPage}
        onPageSizeChange={(size) => { setPageSize(size); setPage(0); }}
        emptyMessage="No reviews match these filters."
        toolbar={
          <>
            <TextField
              size="small"
              placeholder="Search customer, destination, review text…"
              value={search}
              onChange={(e) => { setPage(0); setSearch(e.target.value); }}
              InputProps={{ startAdornment: <InputAdornment position="start"><SearchOutlinedIcon fontSize="small" /></InputAdornment> }}
              className="w-full md:w-96"
            />
            <Select size="small" value={status} onChange={(e) => { setPage(0); setStatus(e.target.value); }} className="w-full md:w-44">
              {STATUS_FILTERS.map((s) => <MenuItem key={s} value={s} className="capitalize">{s === "all" ? "All statuses" : s}</MenuItem>)}
            </Select>
          </>
        }
      />

      <Menu anchorEl={menu.anchor} open={!!menu.anchor} onClose={closeMenu}>
        {menu.review?.status !== "approved" && (
          <MenuItem onClick={() => { if (menu.review) setStatusMutation.mutate({ id: menu.review.id, status: "approved" }); closeMenu(); }} className="!text-green-700">
            Approve
          </MenuItem>
        )}
        {menu.review?.status !== "hidden" && (
          <MenuItem onClick={() => { if (menu.review) setStatusMutation.mutate({ id: menu.review.id, status: "hidden" }); closeMenu(); }} className="!text-red-600">
            Hide
          </MenuItem>
        )}
        <MenuItem onClick={() => { setReplyDraft({ review: menu.review, text: menu.review?.agencyReply || "" }); closeMenu(); }}>
          {menu.review?.agencyReply ? "Edit reply" : "Reply as agency"}
        </MenuItem>
      </Menu>

      {replyDraft.review && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={() => setReplyDraft({ review: null, text: "" })}>
          <div className="bg-white dark:bg-gray-900 rounded-xl p-5 w-full max-w-md space-y-3" onClick={(e) => e.stopPropagation()}>
            <p className="font-bold text-gray-800 dark:text-gray-100">Reply to {replyDraft.review.customer.name}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 italic">&ldquo;{replyDraft.review.comment}&rdquo;</p>
            <TextField
              fullWidth multiline rows={3} placeholder="Write a public reply…"
              value={replyDraft.text} onChange={(e) => setReplyDraft({ ...replyDraft, text: e.target.value })}
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setReplyDraft({ review: null, text: "" })} className="text-sm font-semibold text-gray-500 px-4 py-2">Cancel</button>
              <button
                disabled={replyMutation.isPending}
                onClick={async () => {
                  if (replyDraft.review) await replyMutation.mutateAsync({ id: replyDraft.review.id, reply: replyDraft.text });
                  setReplyDraft({ review: null, text: "" });
                }}
                className="button-primary disabled:opacity-60"
              >
                Post reply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
