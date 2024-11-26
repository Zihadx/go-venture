"use client";
import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Image from "next/image";
import treeImage from "@/assets/All-image/tree.png";
import { modifyPayload } from "@/utils/Payload/modifyPayload";
import { registerUsers } from "@/services/actions/registerUsers";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { userLogin } from "@/services/actions/userLogin";
import { storUserInfo } from "@/services/auth.service";

const Register = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (values) => {
    const data = modifyPayload(values);
    console.log(data);

    try {
      const res = await registerUsers(data);
      // console.log(res);
      if (res?.data?.email) {
        toast.success(res?.message);
        // router.push("/login")

        const result = await userLogin({
          password: values.password,
          email: values.email,
        });
        // console.log(result);
        if (result?.data?.accessToken) {
          storUserInfo({ accessToken: result?.data?.accessToken });
          router.push("/");
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md relative overflow-hidden border">
        <h1 className="text-2xl font-bold text-center mb-6">
          Go Venture&apos;s
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/*------------- Username ------------*/}
          <TextField
            {...register("name", { required: "Username is required" })}
            label="User name"
            type="text"
            fullWidth
            margin="normal"
            variant="outlined"
            error={!!errors.name}
            helperText={errors.name ? errors.name.message : ""}
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

          {/* ------------Email ------------*/}
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

          {/*----------- Password -------------*/}
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

          {/*----- Terms and Conditions -----------*/}
          <div className="flex justify-between items-center my-[14px]">
            <FormControlLabel
              control={<Checkbox color="primary" />}
              label="I agree to the Terms and Conditions"
              sx={{
                "& .MuiCheckbox-colorPrimary.Mui-checked": {
                  color: "#2095ae",
                },
              }}
            />
          </div>

          {/* ---------Submit Button -----------*/}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            className=" bg-primary"
          >
            Register
          </Button>
        </form>
        <div className="text-center mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-primary">
            Login here
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

export default Register;
