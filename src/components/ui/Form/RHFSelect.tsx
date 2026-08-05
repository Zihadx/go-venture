"use client";

import { Controller, type Control, type FieldValues, type Path } from "react-hook-form";
import { TextField, MenuItem, type TextFieldProps } from "@mui/material";

type Option = { value: string | number; label: string };

type Props<T extends FieldValues> = Omit<TextFieldProps, "name" | "error" | "helperText" | "select"> & {
  name: Path<T>;
  control: Control<T>;
  options: Option[];
};

export default function RHFSelect<T extends FieldValues>({ name, control, options, ...rest }: Props<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <TextField {...field} {...rest} select error={!!fieldState.error} helperText={fieldState.error?.message}>
          {options.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
          ))}
        </TextField>
      )}
    />
  );
}
