"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField, Select, MenuItem, Divider } from "@mui/material";

import {
  getTickets,
  createTicket,
  updateTicketStatus,
  replyToTicket,
} from "@/services/customer.service";

import useCurrentUser from "@/hooks/useCurrentUser";
import { formatDateTime } from "@/utils/format";
import StatusChip from "@/components/Dashboard/ui/StatusChip";
import { ROLES } from "@/config/roles";
import { ticketSchema } from "@/schemas/ticket.schema";
import RHFTextField from "@/components/ui/Form/RHFTextField";

const STATUS_OPTIONS = ["open", "in_progress", "resolved"];

export default function SupportTicketsPage() {
  const { user } = useCurrentUser();

  const isStaff =
    user &&
    [
      ROLES.SUPER_ADMIN,
      ROLES.ADMIN,
      ROLES.CUSTOMER_SUPPORT,
    ].includes(user.role);

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [reply, setReply] = useState("");

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      subject: "",
      message: "",
    },
  });

  const load = () => {
    if (!user) return;

    setLoading(true);

    getTickets(isStaff ? {} : { email: user.email }).then((data) => {
      setTickets(data);
      setLoading(false);

      setSelected((prev) =>
        prev
          ? data.find((t) => t.id === prev.id) || null
          : null
      );
    });
  };

  useEffect(load, [user?.email, isStaff]); // eslint-disable-line react-hooks/exhaustive-deps

  const onCreateTicket = async (values) => {
    await createTicket({
      subject: values.subject,
      message: values.message,
      customer: {
        name: user.name,
        email: user.email,
      },
    });

    reset();
    load();
  };

  const handleReply = async () => {
    if (!reply.trim() || !selected) return;

    await replyToTicket(
      selected.id,
      reply,
      isStaff ? "support" : "customer"
    );

    setReply("");
    load();
  };

  return (
    <div className="grid grid-cols-1 gap-6 pb-8 lg:grid-cols-3">

      {/* =====================================================
          LEFT — TICKET SIDEBAR
      ====================================================== */}

      <div className="space-y-4 lg:col-span-1">

        {/* New Ticket */}

        {!isStaff && (
          <form
            onSubmit={handleSubmit(onCreateTicket)}
            className="
              space-y-4
              rounded-2xl
              border border-gray-200
              bg-white
              p-5
              shadow-sm
              transition-colors

              dark:border-white/[0.08]
              dark:bg-gray-900/80
              dark:shadow-black/20
            "
          >
            <div>
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                Create a new ticket
              </h3>

              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Tell us what you need help with.
              </p>
            </div>

            <RHFTextField
              name="subject"
              control={control}
              size="small"
              fullWidth
              label="Subject"
            />

            <RHFTextField
              name="message"
              control={control}
              size="small"
              fullWidth
              multiline
              rows={4}
              label="How can we help?"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="
                button-primary
                w-full
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {isSubmitting ? "Submitting…" : "Submit ticket"}
            </button>
          </form>
        )}

        {/* Ticket List */}

        <div
          className="
            overflow-hidden
            rounded-2xl
            border border-gray-200
            bg-white
            shadow-sm

            dark:border-white/[0.08]
            dark:bg-gray-900/80
            dark:shadow-black/20
          "
        >
          {/* List header */}

          <div
            className="
              border-b
              border-gray-100
              px-5
              py-4

              dark:border-white/[0.07]
            "
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  Support tickets
                </h3>

                <p className="mt-0.5 text-xs text-gray-400">
                  {tickets.length}{" "}
                  {tickets.length === 1 ? "conversation" : "conversations"}
                </p>
              </div>
            </div>
          </div>

          {/* Loading */}

          {loading && (
            <div className="px-5 py-8 text-center">
              <p className="text-sm text-gray-400 dark:text-gray-500">
                Loading tickets…
              </p>
            </div>
          )}

          {/* Empty */}

          {!loading && tickets.length === 0 && (
            <div className="px-5 py-10 text-center">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                No tickets yet.
              </p>

              <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                Your support conversations will appear here.
              </p>
            </div>
          )}

          {/* Tickets */}

          {!loading &&
            tickets.map((t) => {
              const isSelected = selected?.id === t.id;

              return (
                <button
                  key={t.id}
                  onClick={() => setSelected(t)}
                  className={`
                    relative
                    w-full
                    border-b
                    border-gray-100
                    px-5
                    py-4
                    text-left
                    transition-all
                    duration-200

                    hover:bg-gray-50

                    dark:border-white/[0.06]
                    dark:hover:bg-white/[0.035]

                    ${
                      isSelected
                        ? `
                          bg-primary/[0.05]
                          dark:bg-primary/[0.10]
                        `
                        : ""
                    }
                  `}
                >
                  {/* Active indicator */}

                  {isSelected && (
                    <span className="absolute inset-y-0 left-0 w-0.5 bg-primary" />
                  )}

                  <div className="flex items-start justify-between gap-3">
                    <p
                      className="
                        min-w-0
                        truncate
                        text-sm
                        font-semibold
                        text-gray-800
                        dark:text-gray-100
                      "
                    >
                      {t.subject}
                    </p>

                    <div className="shrink-0">
                      <StatusChip status={t.status} />
                    </div>
                  </div>

                  {isStaff && (
                    <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                      {t.customer?.name}
                    </p>
                  )}

                  <p className="mt-1 text-[11px] text-gray-400 dark:text-gray-500">
                    {formatDateTime(t.createdAt)}
                  </p>
                </button>
              );
            })}
        </div>
      </div>

      {/* =====================================================
          RIGHT — CONVERSATION
      ====================================================== */}

      <div className="min-w-0 lg:col-span-2">

        {!selected ? (
          <div
            className="
              flex
              min-h-[420px]
              items-center
              justify-center
              rounded-2xl
              border
              border-dashed
              border-gray-200
              bg-white
              px-6
              text-center
              shadow-sm

              dark:border-white/[0.10]
              dark:bg-gray-900/70
            "
          >
            <div>
              <div
                className="
                  mx-auto
                  mb-4
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-full
                  bg-gray-100
                  text-gray-400

                  dark:bg-white/[0.06]
                  dark:text-gray-500
                "
              >
                ?
              </div>

              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Select a ticket
              </p>

              <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                Choose a conversation to view the details.
              </p>
            </div>
          </div>
        ) : (
          <div
            className="
              overflow-hidden
              rounded-2xl
              border border-gray-200
              bg-white
              shadow-sm

              dark:border-white/[0.08]
              dark:bg-gray-900/80
              dark:shadow-black/20
            "
          >

            {/* Conversation Header */}

            <div className="p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                <div className="min-w-0">
                  <h3 className="truncate text-base font-semibold text-gray-900 dark:text-white">
                    {selected.subject}
                  </h3>

                  <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                    {selected.customer?.name}{" "}
                    <span className="mx-1">·</span>
                    {formatDateTime(selected.createdAt)}
                  </p>
                </div>

                {isStaff ? (
                  <Select
                    size="small"
                    value={selected.status}
                    onChange={async (e) => {
                      await updateTicketStatus(
                        selected.id,
                        e.target.value
                      );

                      load();
                    }}
                    sx={{
                      minWidth: 135,
                      color: "inherit",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(128,128,128,0.25)",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(128,128,128,0.45)",
                      },
                      "& .MuiSvgIcon-root": {
                        color: "inherit",
                      },
                    }}
                    className="dark:text-gray-200"
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          bgcolor: "background.paper",
                        },
                      },
                    }}
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <MenuItem
                        key={s}
                        value={s}
                        className="capitalize"
                      >
                        {s.replace("_", " ")}
                      </MenuItem>
                    ))}
                  </Select>
                ) : (
                  <div className="shrink-0">
                    <StatusChip status={selected.status} />
                  </div>
                )}
              </div>
            </div>

            <Divider className="dark:border-white/[0.07]" />

            {/* Conversation */}

            <div className="max-h-[520px] space-y-4 overflow-y-auto p-5">

              {/* Original Message */}

              <div className="flex justify-start">
                <div
                  className="
                    max-w-[90%]
                    rounded-2xl
                    rounded-tl-md
                    bg-gray-100
                    px-4
                    py-3
                    text-sm
                    leading-6
                    text-gray-700

                    dark:bg-white/[0.06]
                    dark:text-gray-300
                  "
                >
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                    Original request
                  </p>

                  {selected.message}
                </div>
              </div>

              {/* Replies */}

              {selected.replies?.map((r, i) => {
                const isSupport = r.from === "support";

                return (
                  <div
                    key={i}
                    className={`flex ${
                      isSupport
                        ? "justify-start"
                        : "justify-end"
                    }`}
                  >
                    <div
                      className={`
                        max-w-[90%]
                        rounded-2xl
                        px-4
                        py-3
                        text-sm
                        leading-6

                        ${
                          isSupport
                            ? `
                              rounded-tl-md
                              bg-primary/10
                              text-gray-700

                              dark:bg-primary/[0.12]
                              dark:text-gray-300
                            `
                            : `
                              rounded-tr-md
                              bg-gray-100
                              text-gray-700

                              dark:bg-white/[0.07]
                              dark:text-gray-300
                            `
                        }
                      `}
                    >
                      <p
                        className={`
                          mb-1
                          text-[10px]
                          font-semibold
                          uppercase
                          tracking-wider
                          ${
                            isSupport
                              ? "text-primary/70 dark:text-primary/80"
                              : "text-gray-400 dark:text-gray-500"
                          }
                        `}
                      >
                        {r.from}
                      </p>

                      {r.text}
                    </div>
                  </div>
                );
              })}
            </div>

            <Divider className="dark:border-white/[0.07]" />

            {/* Reply */}

            <div className="p-4">
              <div className="flex items-end gap-2">
                <TextField
                  size="small"
                  fullWidth
                  multiline
                  maxRows={4}
                  placeholder="Type a reply…"
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                    },
                  }}
                />

                <button
                  onClick={handleReply}
                  disabled={!reply.trim()}
                  className="
                    button-primary
                    shrink-0
                    px-5
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}