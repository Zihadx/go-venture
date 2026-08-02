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

const checkboxStyles = {
  checkedColor: {
    color: "#2095ae",
  },
};

const Login = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (values) => {
    try {
      const res = await userLogin(values);
      // console.log(res);
      if (res?.data.accessToken) {
        toast.success(res?.message);
        storUserInfo({ accessToken: res?.data.accessToken });
        router.push("/");
      } else {
        toast.error(res?.message);
      }
    } catch (err) {
      const errorMessage = err?.message
        ? JSON.parse(err.message)?.message
        : "An unexpected error occurred.";
      // console.log(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md relative overflow-hidden border">
        <h1 className="text-xl font-bold text-center mb-4">Welcome Back!</h1>
        {error && (
          <Box>
            <Typography
              sx={{
                color: "red",
                textAlign: "center",
              }}
            >
              {error}
            </Typography>
          </Box>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register("email", { required: "Email is required" })}
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
            {...register("password", { required: "Password is required" })}
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ""}
            sx={inputStyles}
          />
          <div className="flex justify-between items-center mb-4">
            <FormControlLabel
              className="w-full"
              control={<Checkbox color="primary" />}
              label="Remember me"
              sx={{
                "& .MuiCheckbox-colorPrimary.Mui-checked": checkboxStyles.checkedColor,
              }}
            />
            <a href="#" className="text-sm text-primary w-full">
              Forgot your password?
            </a>
          </div>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            className=" bg-primary"
          >
            Login
          </Button>
        </form>

        {/*--------- social login ----------- */}
        <div className="text-center my-4">Or Login With</div>
        <div className="flex justify-around gap-1 mb-4">
          <Button
            className="bg-pink-700"
            variant="contained"
            color="error"
            startIcon={<FaGoogle />}
            onClick={() =>
              signIn("google", { callbackUrl: "https://go-venture.vercel.app" })
            }
          >
            Google
          </Button>
          <Button
            className="bg-blue-700"
            variant="contained"
            color="primary"
            startIcon={<FaFacebook />}
            onClick={() =>
              signIn("facebook", {
                callbackUrl: "https://go-venture.vercel.app",
              })
            }
          >
            Facebook
          </Button>
          <Button
            className="bg-slate-700"
            variant="contained"
            color="primary"
            startIcon={<FaGithub />}
            onClick={() =>
              signIn("github", { callbackUrl: "https://go-venture.vercel.app" })
            }
          >
            Github
          </Button>
        </div>

        {/*---------- others content --------- */}

        <div className="text-center">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-primary">
            Register here
          </Link>
        </div>

        <div className="rounded-full absolute -top-24 -left-40 pointer-events-none">
          <Image
            src={treeImage}
            alt="treeImage"
            width={400}
            height={400}
            className="h-[380px] w-[280px]"
          ></Image>
        </div>
        <div className="p-20 rounded-full bg-primary absolute -bottom-24 -right-24"></div>
      </div>
    </div>
  );
};

export default Login;
