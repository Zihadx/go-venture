"use client";
import React, { useState } from "react";
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
import { Box, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";

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

const Register = () => {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (values) => {
    setError(null);
    const data = modifyPayload(values);
    // console.log(data);

    if (values.password.length < 6 || !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/.test(values.password)) {
      toast.error("Password must be at least 6 characters and include uppercase, lowercase, a number, and a symbol.");
      return;
    }

    try {
      const res = await registerUsers(data);
      if (res?.data?.email) {
        toast.success(res?.message);
        const result = await userLogin({
          password: values.password,
          email: values.email,
        });
        if (result?.data?.accessToken) {
          storUserInfo({ accessToken: result?.data?.accessToken });
          router.push("/");
        }
      }
    } catch (err) {
      const errorMessage = err?.message ? JSON.parse(err.message)?.message : "An unexpected error occurred.";
      console.log(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md relative overflow-hidden border">
      <h1 className="text-xl font-bold text-center mb-4">Create an Account!</h1>
        {error && (
          <Box>
            <Typography sx={{ color: "red", textAlign: "center" }}>{error}</Typography>
          </Box>
        )}
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
            sx={inputStyles}
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
            sx={inputStyles}
          />

          {/*----------- Password -------------*/}
          <TextField
            {...register("password", { required: "Password is required" })}
            label="Password"
            type={showPassword ? "text" : "password"}
            fullWidth
            margin="normal"
            variant="outlined"
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ""}
            sx={inputStyles}
            InputProps={{
              endAdornment: (
                <IconButton onClick={togglePasswordVisibility} edge="end">
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              ),
            }}
          />

          {/*----- Terms and Conditions -----------*/}
          <div className="flex justify-between items-center my-[14px]">
            <FormControlLabel
              control={<Checkbox color="primary" />}
              label="I agree to the Terms and Conditions"
              sx={{ "& .MuiCheckbox-colorPrimary.Mui-checked": { color: "#2095ae" } }}
            />
          </div>

          {/* ---------Submit Button -----------*/}
          <Button variant="contained" color="primary" fullWidth type="submit" className=" bg-primary">
            Register
          </Button>
        </form>
        <div className="text-center mt-4">
          Already have an account? {" "}
          <Link href="/login" className="text-primary">
            Login here
          </Link>
        </div>
        <div className="rounded-full absolute -top-24 -left-40 pointer-events-none">
          <Image src={treeImage} alt="treeImage" width={400} height={400} className="h-[380px] w-[280px]"></Image>
        </div>
        <div className="p-20 rounded-full bg-primary absolute -bottom-24 -right-24"></div>
      </div>
    </div>
  );
};

export default Register;
