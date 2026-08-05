"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Divider, TextField } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import useCurrentUser from "@/hooks/useCurrentUser";
import { ROLE_LABELS } from "@/config/roles";
import { accountSchema, type AccountFormValues } from "@/schemas/account.schema";
import RHFTextField from "@/components/ui/Form/RHFTextField";

export default function AccountSettingsPage() {
  const { user } = useCurrentUser();

  const { control, handleSubmit, reset, formState: { isSubmitting, isSubmitSuccessful } } = useForm<AccountFormValues>({
    resolver: zodResolver(accountSchema),
    defaultValues: { name: "", phone: "", location: "" },
  });

  useEffect(() => {
    if (user) reset({ name: user.name, phone: "", location: "" });
  }, [user, reset]);

  const onSubmit = async (_values: AccountFormValues) => {
    // TODO: replace with a real PATCH /api/users/:id call once the backend is wired.
    await new Promise((res) => setTimeout(res, 300));
  };

  if (!user) return null;

  return (
    <div className="max-w-2xl space-y-6 pb-8">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center gap-4 mb-6">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary text-lg font-bold">
            {(user.name || "?").split(" ").map((n: string) => n[0]).slice(0, 2).join("")}
          </span>
          <div>
            <h2 className="text-lg font-bold text-gray-800">{user.name}</h2>
            <p className="text-sm text-gray-400">{ROLE_LABELS[user.role]} · {user.email}</p>
          </div>
        </div>

        <Divider className="mb-6" />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <RHFTextField name="name" control={control} fullWidth label="Full name" />
          <TextField fullWidth label="Email" value={user.email} disabled helperText="Contact support to change your email" />
          <RHFTextField name="phone" control={control} fullWidth label="Phone number" />
          <RHFTextField name="location" control={control} fullWidth label="Location" />
          <div className="flex items-center gap-3 pt-2">
            <button type="submit" disabled={isSubmitting} className="button-primary disabled:opacity-60">
              {isSubmitting ? "Saving…" : "Save changes"}
            </button>
            {isSubmitSuccessful && !isSubmitting && (
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
