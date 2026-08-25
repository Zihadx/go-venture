"use client";

import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { FaFacebook, FaGoogle, FaGithub } from "react-icons/fa";
import { useForm } from "react-hook-form";
import Link from "next/link";
import treeImage from "@/assets/All-image/tree.png";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { userLogin } from "@/services/actions/userLogin";
import { storUserInfo } from "@/services/auth.service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Box, Typography } from "@mui/material";

const inputStyles = {
  "& .MuiInputLabel-root": {
    color: "#2095ae",
  },

  "& .MuiInputLabel-root.Mui-focused": {
    color: "#2095ae",
  },

  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "#2095ae",
    },

    "& input": {
      color: "#2095ae",
    },
  },
};

const Login = () => {
  const router = useRouter();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Normal email/password login
  const onSubmit = async (values) => {
    setError("");
    setLoading(true);

    try {
      const res = await userLogin(values);

      if (res?.data?.accessToken) {
        toast.success(res?.message || "Login successful!");

        storUserInfo({
          accessToken: res.data.accessToken,
        });

        router.push("/");
        router.refresh();
      } else {
        const message = res?.message || "Login failed. Please try again.";

        setError(message);
        toast.error(message);
      }
    } catch (err) {
      let errorMessage = "An unexpected error occurred.";

      try {
        if (err?.message) {
          const parsedError = JSON.parse(err.message);
          errorMessage =
            parsedError?.message || parsedError?.error || err.message;
        }
      } catch {
        errorMessage = err?.message || errorMessage;
      }

      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Social login
  const handleSocialLogin = async (provider) => {
    setSocialLoading(provider);
    setError("");

    try {
      await signIn(provider, {
        callbackUrl: "/",
      });
    } catch (err) {
      const message =
        err?.message || `Unable to continue with ${provider} login.`;

      setError(message);
      toast.error(message);
      setSocialLoading("");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 px-4 py-8 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-xl sm:p-8">
        {/* Decorative background */}
        <div className="rounded-full absolute -top-16 -left-40 pointer-events-none">
          <Image src={treeImage} alt="treeImage" width={400} height={400} className="h-[380px] w-[280px]"></Image>
        </div>

        <div className="pointer-events-none absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-primary/10" />

        {/* Content */}
        <div className="relative z-10">
          {/* Header */}
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Welcome Back!
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Sign in to continue your journey
            </p>
          </div>

          {/* Error */}
          {error && (
            <Box className="mb-4">
              <Typography
                sx={{
                  color: "#dc2626",
                  backgroundColor: "#fef2f2",
                  border: "1px solid #fecaca",
                  borderRadius: "8px",
                  padding: "10px 12px",
                  fontSize: "14px",
                  textAlign: "center",
                }}
              >
                {error}
              </Typography>
            </Box>
          )}

          {/* Login form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-1">
            <TextField
              {...register("email", {
                required: "Email is required",
              })}
              label="Email Address"
              type="email"
              fullWidth
              margin="normal"
              variant="outlined"
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ""}
              sx={inputStyles}
            />

            <TextField
              {...register("password", {
                required: "Password is required",
              })}
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              variant="outlined"
              error={!!errors.password}
              helperText={errors.password ? errors.password.message : ""}
              sx={inputStyles}
            />

            {/* Remember + forgot */}
            <div className="flex flex-col gap-2 py-2 sm:flex-row sm:items-center sm:justify-between">
              <FormControlLabel
                className="!m-0"
                control={
                  <Checkbox
                    sx={{
                      color: "#2095ae",
                      "&.Mui-checked": {
                        color: "#2095ae",
                      },
                    }}
                  />
                }
                label={
                  <span className="text-sm text-gray-600">
                    Remember me
                  </span>
                }
              />

              <Link
                href="/forgot-password"
                className="text-sm font-medium text-primary transition-colors hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {/* Login button */}
            <Button
              variant="contained"
              fullWidth
              type="submit"
              disabled={loading}
              sx={{
                mt: 1,
                py: 1.35,
                borderRadius: "10px",
                backgroundColor: "#2095ae",
                textTransform: "none",
                fontSize: "15px",
                fontWeight: 600,
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: "#187d94",
                  boxShadow: "none",
                },
              }}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />

            <span className="shrink-0 text-xs font-medium text-gray-400">
              OR CONTINUE WITH
            </span>

            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* Social login */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
            {/* Google */}
            <Button
            className="w-full"
              variant="outlined"
              disabled={!!socialLoading}
              startIcon={<FaGoogle className="text-red-400" />}
              onClick={() => handleSocialLogin("google")}
              sx={{
                minHeight: "44px",
                borderRadius: "10px",
                borderColor: "#e5e7eb",
                color: "#374151",
                textTransform: "none",
                fontWeight: 600,
                "&:hover": {
                  borderColor: "#2095ae",
                  backgroundColor: "#f0fdfa",
                },
              }}
            >
              {socialLoading === "google" ? "..." : "Google"}
            </Button>

            {/* Facebook */}
            <Button
                 className="w-full"
              variant="outlined"
              disabled={!!socialLoading}
              startIcon={<FaFacebook className="text-blue-500" />}
              onClick={() => handleSocialLogin("facebook")}
              sx={{
                minHeight: "44px",
                borderRadius: "10px",
                borderColor: "#e5e7eb",
                color: "#374151",
                textTransform: "none",
                fontWeight: 600,
                "&:hover": {
                  borderColor: "#2095ae",
                  backgroundColor: "#f0fdfa",
                },
              }}
            >
              {socialLoading === "facebook" ? "..." : "Facebook"}
            </Button>

          </div>

          {/* Register */}
          <div className="mt-6 text-center text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-primary hover:underline"
            >
              Register here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;