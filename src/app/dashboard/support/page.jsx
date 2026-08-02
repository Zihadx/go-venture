"use client";

import { useEffect, useState } from "react";
import { TextField, Select, MenuItem, Divider } from "@mui/material";
import { getTickets, createTicket, updateTicketStatus, replyToTicket } from "@/services/customer.service";
import useCurrentUser from "@/hooks/useCurrentUser";
import { formatDateTime } from "@/utils/format";
import StatusChip from "@/components/Dashboard/ui/StatusChip";
import { ROLES } from "@/config/roles";

const STATUS_OPTIONS = ["open", "in_progress", "resolved"];

export default function SupportTicketsPage() {
  const { user } = useCurrentUser();
  const isStaff = user && [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.CUSTOMER_SUPPORT].includes(user.role);

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [reply, setReply] = useState("");
  const [form, setForm] = useState({ subject: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const load = () => {
    if (!user) return;
    setLoading(true);
    getTickets(isStaff ? {} : { email: user.email }).then((data) => {
      setTickets(data);
      setLoading(false);
      setSelected((prev) => (prev ? data.find((t) => t.id === prev.id) || null : null));
    });
  };

  useEffect(load, [user?.email, isStaff]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.subject.trim() || !form.message.trim()) return;
    setSubmitting(true);
    await createTicket({ subject: form.subject, message: form.message, customer: { name: user.name, email: user.email } });
    setForm({ subject: "", message: "" });
    setSubmitting(false);
    load();
  };

  const handleReply = async () => {
    if (!reply.trim() || !selected) return;
    await replyToTicket(selected.id, reply, isStaff ? "support" : "customer");
    setReply("");
    load();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-8">
      <div className="lg:col-span-1 space-y-4">
        {!isStaff && (
          <form onSubmit={handleCreate} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 space-y-3">
            <h3 className="font-bold text-gray-800">New ticket</h3>
            <TextField
              size="small" fullWidth label="Subject"
              value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
            />
            <TextField
              size="small" fullWidth multiline rows={3} label="How can we help?"
              value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
            <button disabled={submitting} className="button-primary w-full disabled:opacity-60">
              {submitting ? "Submitting…" : "Submit ticket"}
            </button>
          </form>
        )}

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm divide-y">
          {loading && <p className="p-4 text-gray-400 text-sm">Loading tickets…</p>}
          {!loading && tickets.length === 0 && <p className="p-4 text-gray-400 text-sm">No tickets yet.</p>}
          {!loading && tickets.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelected(t)}
              className={`w-full text-left p-4 hover:bg-gray-50 transition-colors ${selected?.id === t.id ? "bg-primary/5" : ""}`}
            >
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-semibold text-gray-800 truncate">{t.subject}</p>
                <StatusChip status={t.status} />
              </div>
              {isStaff && <p className="text-xs text-gray-400">{t.customer.name}</p>}
              <p className="text-xs text-gray-400">{formatDateTime(t.createdAt)}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="lg:col-span-2">
        {!selected ? (
          <div className="h-full flex items-center justify-center text-gray-400 bg-white rounded-xl border border-gray-100 py-24">
            Select a ticket to view the conversation.
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-gray-800">{selected.subject}</h3>
                <p className="text-xs text-gray-400">{selected.customer.name} · {formatDateTime(selected.createdAt)}</p>
              </div>
              {isStaff ? (
                <Select
                  size="small" value={selected.status}
                  onChange={async (e) => { await updateTicketStatus(selected.id, e.target.value); load(); }}
                >
                  {STATUS_OPTIONS.map((s) => <MenuItem key={s} value={s} className="capitalize">{s.replace("_", " ")}</MenuItem>)}
                </Select>
              ) : <StatusChip status={selected.status} />}
            </div>
            <Divider />
            <div className="space-y-3">
              <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-700">{selected.message}</div>
              {selected.replies.map((r, i) => (
                <div
                  key={i}
                  className={`rounded-lg p-3 text-sm max-w-[85%] ${
                    r.from === "support" ? "bg-primary/10 text-gray-700" : "bg-gray-50 text-gray-700 ml-auto"
                  }`}
                >
                  <p className="text-xs font-semibold text-gray-400 mb-1 capitalize">{r.from}</p>
                  {r.text}
                </div>
              ))}
            </div>
            <Divider />
            <div className="flex gap-2">
              <TextField size="small" fullWidth placeholder="Type a reply…" value={reply} onChange={(e) => setReply(e.target.value)} />
              <button onClick={handleReply} className="button-primary px-4">Send</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
