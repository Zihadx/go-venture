"use client";
import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { FaFacebook, FaGoogle, FaGithub } from "react-icons/fa";
import { useForm } from "react-hook-form";
import Link from "next/link";
import treeImage from "@/assets/All-image/tree.png";
import Image from "next/image";

import {signIn} from "next-auth/react"

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md relative overflow-hidden border">
        <h1 className="text-2xl font-bold text-center mb-6">
          Go Venture&apos;s
        </h1>
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
            sx={{
              "& .MuiInputLabel-root": {
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
            }}
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
            sx={{
              "& .MuiInputLabel-root": {
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
            }}
          />
          <div className="flex justify-between items-center mb-4">
            <FormControlLabel
            className="w-full"
              control={<Checkbox color="primary" />}
              label="Remember me"
              sx={{
                "& .MuiCheckbox-colorPrimary.Mui-checked": {
                  color: "#2095ae",
                },
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
        <div className="text-center my-4">Or Login With</div>
        <div className="flex justify-around gap-1 mb-4">
          <Button
            className="bg-pink-700"
            variant="contained"
            color="error"
            startIcon={<FaGoogle />}
            onClick={()=> signIn ("google", {callbackUrl: "https://go-venture.vercel.app"})}
          >
            Google
          </Button>
          <Button
            className="bg-blue-700"
            variant="contained"
            color="primary"
            startIcon={<FaFacebook />}
            onClick={()=> signIn ("facebook", {callbackUrl: "https://go-venture.vercel.app"})}
          >
            Facebook
          </Button>
          <Button
            className="bg-slate-700"
            variant="contained"
            color="primary"
            startIcon={<FaGithub />}

            onClick={()=> signIn ("github", {callbackUrl: "https://go-venture.vercel.app"})}
          >
            Github
          </Button>
        </div>
        <div className="text-center">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-primary">
            Register here
          </Link>
        </div>

        <div className="rounded-full absolute -top-24 -left-40">
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
