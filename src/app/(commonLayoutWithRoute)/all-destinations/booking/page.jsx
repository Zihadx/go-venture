"use client";

import { useMemo, useState } from "react";
import {
ArrowBackRounded,
ArrowForwardRounded,
CheckCircleRounded,
CreditCardRounded,
LockRounded,
PersonOutlineRounded,
PhoneOutlined,
EmailOutlined,
LocationOnOutlined,
CalendarMonthOutlined,
GroupRounded,
ShieldOutlined,
} from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "next/link";

const CheckoutPage = () => {
const [form, setForm] = useState({
firstName: "",
lastName: "",
email: "",
phone: "",
country: "",
address: "",
notes: "",
});

const [paymentMethod, setPaymentMethod] = useState("card");

/*

* Temporary booking data.
*
* Later this should come from:
* * searchParams
* * sessionStorage
* * Zustand/Context
* * or your backend booking draft
    */
    const booking = {
    title: "Your Selected Journey",
    durationDays: 7,
    bookingDate: "2026-09-15",
    adults: 2,
    children: 1,
    pricePerPerson: 850,
    };

const travelerCount = booking.adults + booking.children;

const subtotal = useMemo(
() => travelerCount * booking.pricePerPerson,
[travelerCount]
);

const vat = subtotal * 0.05;
const total = subtotal + vat;

const updateField = (field, value) => {
setForm((prev) => ({
...prev,
[field]: value,
}));
};

const fieldSx = {
"& .MuiOutlinedInput-root": {
borderRadius: "15px",
minHeight: "54px",
backgroundColor: "rgba(148,163,184,0.035)",
transition: "all .25s ease",


  "& fieldset": {
    borderColor: "rgba(148,163,184,.18)",
  },

  "&:hover fieldset": {
    borderColor: "rgba(32,149,174,.4)",
  },

  "&.Mui-focused fieldset": {
    borderColor: "#2095ae",
    borderWidth: "1px",
  },
},

"& .MuiInputLabel-root": {
  fontSize: "13px",
  color: "rgb(148 163 184)",
},

"& .MuiInputBase-input": {
  fontSize: "13px",
},


};

const handleContinue = () => {
console.log("Checkout information:", {
form,
booking,
paymentMethod,
subtotal,
vat,
total,
});

```
// Next step:
// create booking/order in backend
// then redirect to payment page
alert("Checkout information submitted");
```

};

return ( <main className="min-h-screen bg-[#fafafa] text-gray-900 dark:bg-[#08090b] dark:text-white">

```
  {/* =====================================================
      TOP BAR
  ===================================================== */}

  <div className="border-b border-gray-200/70 bg-white/80 backdrop-blur-xl dark:border-white/[0.06] dark:bg-[#08090b]/80">
    <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 md:px-8">

      <Link
        href="/destinations"
        className="group inline-flex items-center gap-2 text-xs font-semibold text-gray-500 transition hover:text-primary dark:text-gray-400"
      >
        <ArrowBackRounded
          sx={{
            fontSize: 18,
            transition: "transform .25s ease",
          }}
          className="group-hover:-translate-x-1"
        />

        Back to destinations
      </Link>

      <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-400">
        <LockRounded sx={{ fontSize: 14 }} />
        Secure checkout
      </div>
    </div>
  </div>

  {/* =====================================================
      PAGE HEADER
  ===================================================== */}

  <section className="mx-auto max-w-7xl px-5 pb-8 pt-10 md:px-8 md:pb-10 md:pt-14">

    <div className="max-w-3xl">

      <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/[0.07] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-primary">
        <CheckCircleRounded sx={{ fontSize: 13 }} />
        Reservation details
      </div>

      <h1 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-gray-950 dark:text-white md:text-5xl">
        Complete your booking.
      </h1>

      <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-500 dark:text-gray-400">
        Tell us a little about yourself and review your journey before
        confirming your reservation.
      </p>

    </div>

    {/* Progress */}

    <div className="mt-8 flex max-w-xl items-center">

      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
          1
        </span>

        <span className="text-[11px] font-semibold text-gray-900 dark:text-white">
          Traveler details
        </span>
      </div>

      <div className="mx-3 h-px flex-1 bg-gray-200 dark:bg-white/10" />

      <div className="flex items-center gap-2 opacity-50">
        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-xs font-bold dark:border-white/10">
          2
        </span>

        <span className="text-[11px] font-semibold">
          Payment
        </span>
      </div>

      <div className="mx-3 h-px flex-1 bg-gray-200 dark:bg-white/10" />

      <div className="flex items-center gap-2 opacity-50">
        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-xs font-bold dark:border-white/10">
          3
        </span>

        <span className="hidden text-[11px] font-semibold sm:block">
          Confirmation
        </span>
      </div>

    </div>
  </section>

  {/* =====================================================
      MAIN CONTENT
  ===================================================== */}

  <div className="mx-auto max-w-7xl px-5 pb-16 md:px-8">

    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_390px]">

      {/* =================================================
          LEFT
      ================================================= */}

      <div className="space-y-6">

        {/* Traveler Information */}

        <section className="rounded-[28px] border border-gray-200/70 bg-white p-5 shadow-sm dark:border-white/[0.07] dark:bg-[#0d1014] dark:shadow-none sm:p-7">

          <div className="flex items-start gap-4">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <PersonOutlineRounded />
            </div>

            <div>
              <h2 className="text-lg font-semibold tracking-tight">
                Traveler information
              </h2>

              <p className="mt-1 text-xs leading-5 text-gray-400">
                Enter the details of the person responsible for this
                reservation.
              </p>
            </div>

          </div>

          <div className="mt-7 grid gap-4 sm:grid-cols-2">

            <TextField
              label="First name"
              fullWidth
              value={form.firstName}
              onChange={(e) =>
                updateField("firstName", e.target.value)
              }
              sx={fieldSx}
            />

            <TextField
              label="Last name"
              fullWidth
              value={form.lastName}
              onChange={(e) =>
                updateField("lastName", e.target.value)
              }
              sx={fieldSx}
            />

            <TextField
              label="Email address"
              type="email"
              fullWidth
              value={form.email}
              onChange={(e) =>
                updateField("email", e.target.value)
              }
              sx={fieldSx}
              InputProps={{
                startAdornment: (
                  <EmailOutlined
                    className="mr-2 text-gray-400"
                    fontSize="small"
                  />
                ),
              }}
            />

            <TextField
              label="Phone number"
              type="tel"
              fullWidth
              value={form.phone}
              onChange={(e) =>
                updateField("phone", e.target.value)
              }
              sx={fieldSx}
              InputProps={{
                startAdornment: (
                  <PhoneOutlined
                    className="mr-2 text-gray-400"
                    fontSize="small"
                  />
                ),
              }}
            />

          </div>

        </section>

        {/* Contact / Address */}

        <section className="rounded-[28px] border border-gray-200/70 bg-white p-5 shadow-sm dark:border-white/[0.07] dark:bg-[#0d1014] dark:shadow-none sm:p-7">

          <div className="flex items-start gap-4">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <LocationOnOutlined />
            </div>

            <div>
              <h2 className="text-lg font-semibold tracking-tight">
                Contact details
              </h2>

              <p className="mt-1 text-xs leading-5 text-gray-400">
                Where should our travel team contact you?
              </p>
            </div>

          </div>

          <div className="mt-7 space-y-4">

            <TextField
              label="Country / Region"
              fullWidth
              value={form.country}
              onChange={(e) =>
                updateField("country", e.target.value)
              }
              sx={fieldSx}
            />

            <TextField
              label="Address"
              fullWidth
              value={form.address}
              onChange={(e) =>
                updateField("address", e.target.value)
              }
              sx={fieldSx}
            />

          </div>

        </section>

        {/* Special Requests */}

        <section className="rounded-[28px] border border-gray-200/70 bg-white p-5 shadow-sm dark:border-white/[0.07] dark:bg-[#0d1014] dark:shadow-none sm:p-7">

          <div className="flex items-start gap-4">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <GroupRounded />
            </div>

            <div>
              <h2 className="text-lg font-semibold tracking-tight">
                Additional requests
              </h2>

              <p className="mt-1 text-xs leading-5 text-gray-400">
                Anything our travel team should know?
              </p>
            </div>

          </div>

          <TextField
            className="mt-7"
            label="Special requests or notes"
            multiline
            rows={4}
            fullWidth
            value={form.notes}
            onChange={(e) =>
              updateField("notes", e.target.value)
            }
            sx={{
              ...fieldSx,

              "& .MuiOutlinedInput-root": {
                ...fieldSx["& .MuiOutlinedInput-root"],
                alignItems: "flex-start",
                paddingTop: "14px",
              },
            }}
          />

        </section>

        {/* Payment */}

        <section className="rounded-[28px] border border-gray-200/70 bg-white p-5 shadow-sm dark:border-white/[0.07] dark:bg-[#0d1014] dark:shadow-none sm:p-7">

          <div className="flex items-start gap-4">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <CreditCardRounded />
            </div>

            <div>
              <h2 className="text-lg font-semibold tracking-tight">
                Payment method
              </h2>

              <p className="mt-1 text-xs leading-5 text-gray-400">
                Choose how you would like to complete your reservation.
              </p>
            </div>

          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">

            <button
              type="button"
              onClick={() => setPaymentMethod("card")}
              className={`rounded-2xl border p-4 text-left transition ${
                paymentMethod === "card"
                  ? "border-primary bg-primary/[0.05] shadow-sm"
                  : "border-gray-200 hover:border-primary/30 dark:border-white/10"
              }`}
            >

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 dark:bg-white/[0.06]">
                    <CreditCardRounded
                      sx={{ fontSize: 20 }}
                    />
                  </div>

                  <div>
                    <p className="text-xs font-semibold">
                      Card payment
                    </p>

                    <p className="mt-1 text-[10px] text-gray-400">
                      Visa, Mastercard & more
                    </p>
                  </div>

                </div>

                {paymentMethod === "card" && (
                  <CheckCircleRounded
                    className="text-primary"
                    sx={{ fontSize: 18 }}
                  />
                )}

              </div>

            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod("later")}
              className={`rounded-2xl border p-4 text-left transition ${
                paymentMethod === "later"
                  ? "border-primary bg-primary/[0.05] shadow-sm"
                  : "border-gray-200 hover:border-primary/30 dark:border-white/10"
              }`}
            >

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 dark:bg-white/[0.06]">
                    <CalendarMonthOutlined
                      sx={{ fontSize: 20 }}
                    />
                  </div>

                  <div>
                    <p className="text-xs font-semibold">
                      Pay later
                    </p>

                    <p className="mt-1 text-[10px] text-gray-400">
                      Discuss with our team
                    </p>
                  </div>

                </div>

                {paymentMethod === "later" && (
                  <CheckCircleRounded
                    className="text-primary"
                    sx={{ fontSize: 18 }}
                  />
                )}

              </div>

            </button>

          </div>

        </section>

      </div>

      {/* =================================================
          RIGHT — BOOKING SUMMARY
      ================================================= */}

      <aside className="lg:relative">

        <div className="lg:sticky lg:top-6">

          <section className="overflow-hidden rounded-[30px] border border-gray-200/70 bg-white shadow-[0_30px_90px_-40px_rgba(15,23,42,.3)] dark:border-white/[0.07] dark:bg-[#0d1014] dark:shadow-none">

            {/* Summary Header */}

            <div className="border-b border-gray-100 p-5 dark:border-white/[0.07] sm:p-6">

              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-primary">
                Your journey
              </p>

              <h2 className="mt-2 text-xl font-semibold tracking-tight">
                {booking.title}
              </h2>

              <div className="mt-4 flex items-center gap-2 text-[10px] text-gray-400">

                <CalendarMonthOutlined sx={{ fontSize: 15 }} />

                {booking.bookingDate}

                <span className="mx-1 h-1 w-1 rounded-full bg-gray-300" />

                {booking.durationDays} days

              </div>

            </div>

            {/* Booking details */}

            <div className="space-y-4 p-5 sm:p-6">

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <GroupRounded sx={{ fontSize: 18 }} />
                  </div>

                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Travelers
                  </span>

                </div>

                <span className="text-xs font-semibold">
                  {travelerCount}
                </span>

              </div>

              <div className="flex items-center justify-between">

                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Adults
                </span>

                <span className="text-xs font-medium">
                  {booking.adults}
                </span>

              </div>

              <div className="flex items-center justify-between">

                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Children
                </span>

                <span className="text-xs font-medium">
                  {booking.children}
                </span>

              </div>

              <div className="h-px bg-gray-100 dark:bg-white/[0.07]" />

              <div className="flex items-center justify-between">

                <span className="text-xs text-gray-500 dark:text-gray-400">
                  ${booking.pricePerPerson} × {travelerCount} travelers
                </span>

                <span className="text-xs font-semibold">
                  ${subtotal.toFixed(2)}
                </span>

              </div>

              <div className="flex items-center justify-between">

                <span className="text-xs text-gray-500 dark:text-gray-400">
                  VAT
                </span>

                <span className="text-xs">
                  ${vat.toFixed(2)}
                </span>

              </div>

              <div className="rounded-2xl bg-gray-50 p-4 dark:bg-white/[0.035]">

                <div className="flex items-end justify-between">

                  <div>

                    <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-gray-400">
                      Total
                    </p>

                    <p className="mt-1 text-3xl font-bold tracking-[-0.05em]">
                      ${total.toFixed(2)}
                    </p>

                  </div>

                  <span className="mb-1 rounded-full bg-emerald-500/10 px-2 py-1 text-[9px] font-semibold text-emerald-600 dark:text-emerald-400">
                    VAT included
                  </span>

                </div>

              </div>

              <Button
                variant="contained"
                fullWidth
                onClick={handleContinue}
                endIcon={<ArrowForwardRounded />}
                sx={{
                  height: 56,
                  borderRadius: "17px",
                  background:
                    "linear-gradient(135deg,#2095ae,#157c91,#106d7f)",
                  textTransform: "none",
                  fontSize: "13px",
                  fontWeight: 700,
                  boxShadow:
                    "0 18px 40px -16px rgba(32,149,174,.65)",
                  transition: "all .3s ease",

                  "&:hover": {
                    background:
                      "linear-gradient(135deg,#249db6,#168198,#117285)",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                Continue to payment
              </Button>

              {/* Trust */}

              <div className="grid grid-cols-2 gap-2">

                <div className="flex items-center gap-2 rounded-xl bg-gray-50 px-3 py-2.5 dark:bg-white/[0.025]">

                  <ShieldOutlined
                    sx={{ fontSize: 15 }}
                    className="shrink-0 text-emerald-500"
                  />

                  <span className="text-[9px] font-medium text-gray-500 dark:text-gray-400">
                    Secure checkout
                  </span>

                </div>

                <div className="flex items-center gap-2 rounded-xl bg-gray-50 px-3 py-2.5 dark:bg-white/[0.025]">

                  <CheckCircleRounded
                    sx={{ fontSize: 15 }}
                    className="shrink-0 text-primary"
                  />

                  <span className="text-[9px] font-medium text-gray-500 dark:text-gray-400">
                    No hidden fees
                  </span>

                </div>

              </div>

              <p className="text-center text-[9px] leading-4 text-gray-400">
                By continuing, you agree to our booking terms and
                cancellation policy.
              </p>

            </div>

          </section>

        </div>

      </aside>

    </div>
  </div>
</main>


);
};

export default CheckoutPage;
