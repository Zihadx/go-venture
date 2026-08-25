"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Divider, TextField } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import useCurrentUser from "@/hooks/useCurrentUser";
import { ROLE_LABELS } from "@/config/roles";
import {
  accountSchema,
  type AccountFormValues,
} from "@/schemas/account.schema";
import RHFTextField from "@/components/ui/Form/RHFTextField";

export default function AccountSettingsPage() {
  const { user } = useCurrentUser();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, isSubmitSuccessful },
  } = useForm<AccountFormValues>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      name: "",
      phone: "",
      location: "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        phone: "",
        location: "",
      });
    }
  }, [user, reset]);

  const onSubmit = async (_values: AccountFormValues) => {
    await new Promise((res) => setTimeout(res, 300));
  };

  if (!user) return null;

  const initials =
    (user.name || "?")
      .split(" ")
      .map((n: string) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

  return (
    <div className="w-full max-w-4xl pb-10">

      {/* =====================================================
          PAGE HEADER
      ====================================================== */}

      <div className="mb-6">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />

          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">
            Account
          </span>
        </div>

        <h1 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
          Account settings
        </h1>

        <p className="mt-1 max-w-xl text-sm text-gray-500 dark:text-gray-400">
          Manage your personal information and account preferences.
        </p>
      </div>

      {/* =====================================================
          MAIN CARD
      ====================================================== */}

      <div
        className="
          overflow-hidden
          rounded-2xl
          border
          border-gray-200
          bg-white
          shadow-sm

          dark:border-white/[0.08]
          dark:bg-gray-900/80
          dark:shadow-black/20
        "
      >

        {/* ===================================================
            PROFILE HEADER
        ==================================================== */}

        <div className="relative overflow-hidden p-5 sm:p-6">

          {/* subtle decorative glow */}

          <div
            className="
              pointer-events-none
              absolute
              -right-20
              -top-20
              h-40
              w-40
              rounded-full
              bg-primary/10
              blur-3xl
              dark:bg-primary/10
            "
          />

          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex min-w-0 items-center gap-4">

              {/* Avatar */}

              <div
                className="
                  flex
                  h-14
                  w-14
                  shrink-0
                  items-center
                  justify-center
                  rounded-2xl
                  bg-primary/10
                  text-base
                  font-bold
                  text-primary
                  ring-1
                  ring-primary/10

                  dark:bg-primary/[0.12]
                  dark:ring-primary/20
                "
              >
                {initials}
              </div>

              {/* User info */}

              <div className="min-w-0">
                <h2 className="truncate text-base font-semibold text-gray-900 dark:text-white sm:text-lg">
                  {user.name}
                </h2>

                <p className="mt-1 truncate text-xs text-gray-500 dark:text-gray-400">
                  {ROLE_LABELS[user.role]}
                </p>

                <div className="mt-2 flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500">
                  <MailOutlineIcon sx={{ fontSize: 14 }} />
                  <span className="truncate">{user.email}</span>
                </div>
              </div>
            </div>

            {/* Account status */}

            <div
              className="
                inline-flex
                w-fit
                items-center
                gap-2
                rounded-full
                border
                border-green-200
                bg-green-50
                px-3
                py-1.5
                text-xs
                font-medium
                text-green-700

                dark:border-emerald-400/20
                dark:bg-emerald-400/[0.08]
                dark:text-emerald-300
              "
            >
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 dark:bg-emerald-400" />
              Account active
            </div>
          </div>
        </div>

        <Divider className="dark:border-white/[0.07]" />

        {/* ===================================================
            FORM
        ==================================================== */}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-5 sm:p-6"
        >

          {/* Personal information */}

          <div className="mb-5 flex items-start gap-3">
            <div
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-gray-100
                text-gray-500

                dark:bg-white/[0.06]
                dark:text-gray-400
              "
            >
              <PersonOutlineIcon sx={{ fontSize: 19 }} />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                Personal information
              </h3>

              <p className="mt-0.5 text-xs text-gray-400 dark:text-gray-500">
                Keep your account information up to date.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

            {/* Name */}

            <RHFTextField
              name="name"
              control={control}
              fullWidth
              label="Full name"
            />

            {/* Email */}

            <TextField
              fullWidth
              label="Email"
              value={user.email}
              disabled
              helperText="Contact support to change your email"
              sx={{
                "& .MuiInputBase-input.Mui-disabled": {
                  WebkitTextFillColor: "inherit",
                },
              }}
            />

            {/* Phone */}

            <RHFTextField
              name="phone"
              control={control}
              fullWidth
              label="Phone number"
            />

            {/* Location */}

            <RHFTextField
              name="location"
              control={control}
              fullWidth
              label="Location"
            />
          </div>

          <Divider className="my-6 dark:border-white/[0.07]" />

          {/* =================================================
              ACTIONS
          ================================================== */}

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">

            <button
              type="submit"
              disabled={isSubmitting}
              className="
                button-primary
                w-full
                disabled:cursor-not-allowed
                disabled:opacity-60
                sm:w-auto
                mt-4
              "
            >
              {isSubmitting ? "Saving…" : "Save changes"}
            </button>

            {isSubmitSuccessful && !isSubmitting && (
              <span
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-1.5
                  text-sm
                  mt-4
                  font-medium
                  text-green-600

                  dark:text-emerald-400
                "
              >
                <CheckCircleOutlineIcon sx={{ fontSize: 18 }} />
                Changes saved
              </span>
            )}

          </div>
        </form>
      </div>
    </div>
  );
}