"use client";

import { useState } from "react";
import { TextField, Divider } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import useCurrentUser from "@/hooks/useCurrentUser";
import { ROLE_LABELS } from "@/config/roles";

export default function AccountSettingsPage() {
  const { user } = useCurrentUser();
  const [form, setForm] = useState({ name: user?.name || "", phone: "", location: "" });
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    // TODO: replace with a real PATCH /api/users/:id call once the backend is wired.
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  if (!user) return null;

  return (
    <div className="max-w-2xl space-y-6 pb-8">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center gap-4 mb-6">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary text-lg font-bold">
            {(user.name || "?").split(" ").map((n) => n[0]).slice(0, 2).join("")}
          </span>
          <div>
            <h2 className="text-lg font-bold text-gray-800">{user.name}</h2>
            <p className="text-sm text-gray-400">{ROLE_LABELS[user.role]} · {user.email}</p>
          </div>
        </div>

        <Divider className="mb-6" />

        <form onSubmit={handleSave} className="space-y-4">
          <TextField
            fullWidth label="Full name" value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <TextField
            fullWidth label="Email" value={user.email} disabled
            helperText="Contact support to change your email"
          />
          <TextField
            fullWidth label="Phone number" value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          <TextField
            fullWidth label="Location" value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
          />
          <div className="flex items-center gap-3 pt-2">
            <button type="submit" className="button-primary">Save changes</button>
            {saved && (
              <span className="flex items-center gap-1 text-sm text-green-600 font-semibold">
                <CheckCircleOutlineIcon sx={{ fontSize: 18 }} /> Saved
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
