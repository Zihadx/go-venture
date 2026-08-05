"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { packageSchema, type PackageFormValues } from "@/schemas/package.schema";
import RHFTextField from "@/components/ui/Form/RHFTextField";
import RHFSelect from "@/components/ui/Form/RHFSelect";
import type { TourPackage } from "@/types/package";

const STATUS_OPTIONS = [
  { value: "active", label: "Active — visible to customers" },
  { value: "draft", label: "Draft — hidden" },
  { value: "archived", label: "Archived — hidden" },
];

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: PackageFormValues) => Promise<void>;
  initialValues?: TourPackage | null;
}

const emptyValues: PackageFormValues = {
  title: "",
  description: "",
  city: "",
  country: "",
  category: "Adventure",
  image: "",
  duration: 5,
  pricePerHead: 500,
  maxTravelers: 8,
  status: "draft",
};

export default function PackageFormDialog({ open, onClose, onSubmit, initialValues }: Props) {
  const { control, handleSubmit, reset, formState: { isSubmitting } } = useForm<PackageFormValues>({
    resolver: zodResolver(packageSchema),
    defaultValues: emptyValues,
  });

  useEffect(() => {
    if (open) {
      reset(
        initialValues
          ? {
              title: initialValues.title,
              description: initialValues.description,
              city: initialValues.city,
              country: initialValues.country,
              category: initialValues.category,
              image: initialValues.image,
              duration: initialValues.duration,
              pricePerHead: initialValues.pricePerHead,
              maxTravelers: initialValues.maxTravelers,
              status: initialValues.status,
            }
          : emptyValues
      );
    }
  }, [open, initialValues, reset]);

  const submit = async (values: PackageFormValues) => {
    await onSubmit(values);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{initialValues ? "Edit package" : "New package"}</DialogTitle>
      <form onSubmit={handleSubmit(submit)}>
        <DialogContent className="space-y-4">
          <RHFTextField name="title" control={control} fullWidth label="Package title" />
          <RHFTextField name="description" control={control} fullWidth multiline rows={3} label="Description" />
          <div className="grid grid-cols-2 gap-3">
            <RHFTextField name="city" control={control} fullWidth label="City" />
            <RHFTextField name="country" control={control} fullWidth label="Country" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <RHFTextField name="category" control={control} fullWidth label="Category" />
            <RHFSelect name="status" control={control} fullWidth label="Status" options={STATUS_OPTIONS} />
          </div>
          <RHFTextField name="image" control={control} fullWidth label="Image URL" />
          <div className="grid grid-cols-3 gap-3">
            <RHFTextField name="duration" control={control} fullWidth type="number" label="Duration (days)" />
            <RHFTextField name="pricePerHead" control={control} fullWidth type="number" label="Price / head ($)" />
            <RHFTextField name="maxTravelers" control={control} fullWidth type="number" label="Max travelers" />
          </div>
        </DialogContent>
        <DialogActions className="p-4">
          <button type="button" onClick={onClose} className="text-sm font-semibold text-gray-500 px-4 py-2">Cancel</button>
          <button type="submit" disabled={isSubmitting} className="button-primary disabled:opacity-60">
            {isSubmitting ? "Saving…" : initialValues ? "Save changes" : "Create package"}
          </button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
