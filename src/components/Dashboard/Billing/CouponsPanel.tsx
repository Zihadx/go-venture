"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Switch } from "@mui/material";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import { getCoupons, createCoupon, toggleCoupon } from "@/services/billing.service";
import { formatDate } from "@/utils/format";
import type { Coupon } from "@/types/billing";
import { couponSchema, type CouponFormValues } from "@/schemas/coupon.schema";
import RHFTextField from "@/components/ui/Form/RHFTextField";

export default function CouponsPanel() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);

  const { control, handleSubmit, reset, formState: { isSubmitting } } = useForm<CouponFormValues>({
    resolver: zodResolver(couponSchema),
    defaultValues: { code: "", discountPercent: 10, maxUsage: 100 },
  });

  const load = () => {
    setLoading(true);
    getCoupons().then((data) => { setCoupons(data); setLoading(false); });
  };

  useEffect(load, []);

  const onSubmit = async (values: CouponFormValues) => {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);
    await createCoupon({
      code: values.code.toUpperCase(),
      discountPercent: values.discountPercent,
      maxUsage: values.maxUsage,
      active: true,
      expiresAt: expiresAt.toISOString(),
    });
    reset();
    load();
  };

  const handleToggle = async (code: string) => {
    await toggleCoupon(code);
    load();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-3 h-fit">
        <h3 className="font-bold text-gray-800 flex items-center gap-2"><LocalOfferOutlinedIcon fontSize="small" /> New coupon</h3>
        <RHFTextField name="code" control={control} fullWidth size="small" label="Code" />
        <RHFTextField name="discountPercent" control={control} fullWidth size="small" type="number" label="Discount %" />
        <RHFTextField name="maxUsage" control={control} fullWidth size="small" type="number" label="Max redemptions" />
        <button disabled={isSubmitting} className="button-primary w-full disabled:opacity-60">
          {isSubmitting ? "Creating…" : "Create coupon"}
        </button>
      </form>

      <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm divide-y">
        {loading && <p className="p-4 text-gray-400 text-sm">Loading coupons…</p>}
        {!loading && coupons.map((c) => (
          <div key={c.code} className="flex items-center justify-between p-4">
            <div>
              <p className="font-bold text-gray-800 tracking-wide">{c.code}</p>
              <p className="text-xs text-gray-400">
                {c.discountPercent}% off · {c.usageCount}/{c.maxUsage} used · expires {formatDate(c.expiresAt)}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-semibold ${c.active ? "text-green-600" : "text-gray-400"}`}>
                {c.active ? "Active" : "Inactive"}
              </span>
              <Switch checked={c.active} onChange={() => handleToggle(c.code)} size="small" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
