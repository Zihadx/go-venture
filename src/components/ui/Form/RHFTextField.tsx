"use client";

import { Controller, type Control, type FieldValues, type Path } from "react-hook-form";
import { TextField, type TextFieldProps } from "@mui/material";

type Props<T extends FieldValues> = Omit<TextFieldProps, "name" | "error" | "helperText"> & {
  name: Path<T>;
  control: Control<T>;
  helperText?: string;
};

/**
 * Every form in the dashboard used to be five `useState` calls plus manual
 * error strings. This is the one field component all of them now share:
 * wire it to a Zod-validated `useForm`, get validation, error display, and
 * type safety for free.
 */
export default function RHFTextField<T extends FieldValues>({ name, control, helperText, ...rest }: Props<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          {...rest}
          onChange={(e) => {
            if (rest.type === "number") {
              field.onChange(e.target.value === "" ? "" : Number(e.target.value));
            } else {
              field.onChange(e);
            }
          }}
          error={!!fieldState.error}
          helperText={fieldState.error?.message || helperText}
        />
      )}
    />
  );
}
