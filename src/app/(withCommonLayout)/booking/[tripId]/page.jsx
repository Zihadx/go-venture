"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  Stepper, Step, StepLabel, TextField, MenuItem, Select, Checkbox, FormControlLabel, Divider,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import { getTripById } from "@/services/trips.service";
import { createBooking } from "@/services/dashboard.service";
import useCurrentUser from "@/hooks/useCurrentUser";
import { formatCurrency } from "@/utils/format";

const STEPS = ["Trip & dates", "Travelers", "Add-ons", "Review", "Confirmation"];

const ADD_ONS = [
  { key: "insurance", label: "Travel insurance", perTraveler: 45, desc: "Trip cancellation & medical coverage" },
  { key: "baggage", label: "Extra baggage", perTraveler: 30, desc: "+15kg checked baggage per traveler" },
  { key: "pickup", label: "Airport pickup", flat: 25, desc: "Private transfer on arrival" },
  { key: "visa", label: "Visa assistance", flat: 60, desc: "Document review & application support" },
];

const emptyTraveler = () => ({ name: "", age: "", passport: "" });

export default function BookingWizardPage() {
  const { tripId } = useParams();
  const router = useRouter();
  const { user } = useCurrentUser();

  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(0);

  const [travelDate, setTravelDate] = useState("");
  const [travelerCount, setTravelerCount] = useState(1);
  const [travelers, setTravelers] = useState([emptyTraveler()]);
  const [emergencyContact, setEmergencyContact] = useState({ name: "", phone: "" });
  const [addOns, setAddOns] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  useEffect(() => {
    getTripById(tripId).then((t) => {
      setTrip(t);
      setLoading(false);
    });
  }, [tripId]);

  useEffect(() => {
    setTravelers((prev) => {
      const next = [...prev];
      while (next.length < travelerCount) next.push(emptyTraveler());
      return next.slice(0, travelerCount);
    });
  }, [travelerCount]);

  const pricing = useMemo(() => {
    if (!trip) return { base: 0, addOnsTotal: 0, tax: 0, total: 0 };
    const base = trip.pricePerHead * travelerCount;
    let addOnsTotal = 0;
    ADD_ONS.forEach((a) => {
      if (!addOns[a.key]) return;
      addOnsTotal += a.perTraveler ? a.perTraveler * travelerCount : a.flat;
    });
    const tax = Math.round((base + addOnsTotal) * 0.05);
    return { base, addOnsTotal, tax, total: base + addOnsTotal + tax };
  }, [trip, travelerCount, addOns]);

  if (loading) {
    return <div className="custom-container py-16 text-center text-gray-400">Loading trip…</div>;
  }
  if (!trip) {
    return (
      <div className="custom-container py-16 text-center">
        <p className="text-gray-500">We couldn&apos;t find that trip.</p>
        <a href="/trips" className="text-primary font-semibold hover:underline">Browse trips</a>
      </div>
    );
  }

  const canProceed = () => {
    if (step === 0) return !!travelDate;
    if (step === 1) return travelers.every((t) => t.name.trim() && t.age) && emergencyContact.name && emergencyContact.phone;
    return true;
  };

  const handleConfirm = async () => {
    setSubmitting(true);
    const booking = await createBooking({
      customer: { name: user?.name, email: user?.email },
      destination: trip.destination,
      packageName: trip.title,
      travelers: travelerCount,
      travelDate: new Date(travelDate).toISOString(),
      amount: pricing.total,
      addOns: Object.keys(addOns).filter((k) => addOns[k]),
    });
    setConfirmedBooking(booking);
    setSubmitting(false);
    setStep(4);
  };

  return (
    <div className="custom-container py-10">
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <PlaceOutlinedIcon sx={{ fontSize: 16 }} /> {trip.destination}
        <span>•</span>
        <ScheduleOutlinedIcon sx={{ fontSize: 16 }} /> {trip.duration} days
      </div>

      <Stepper activeStep={step} alternativeLabel className="mb-10">
        {STEPS.map((label) => (
          <Step key={label}><StepLabel>{label}</StepLabel></Step>
        ))}
      </Stepper>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          {step === 0 && (
            <div className="space-y-5">
              <h2 className="text-xl font-bold text-gray-800">{trip.title}</h2>
              <p className="text-gray-500">{trip.description}</p>
              <ul className="grid grid-cols-2 gap-2">
                {trip.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircleOutlineIcon sx={{ fontSize: 16, color: "#0EA65F" }} /> {h}
                  </li>
                ))}
              </ul>
              <Divider />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TextField
                  label="Travel date"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                  inputProps={{ min: new Date().toISOString().split("T")[0] }}
                />
                <Select value={travelerCount} onChange={(e) => setTravelerCount(Number(e.target.value))} fullWidth>
                  {Array.from({ length: trip.maxTravelers }, (_, i) => i + 1).map((n) => (
                    <MenuItem key={n} value={n}>{n} traveler{n > 1 ? "s" : ""}</MenuItem>
                  ))}
                </Select>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-800">Traveler details</h2>
              {travelers.map((t, i) => (
                <div key={i} className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-lg bg-gray-50">
                  <TextField
                    label={`Traveler ${i + 1} full name`}
                    size="small"
                    value={t.name}
                    onChange={(e) => {
                      const next = [...travelers]; next[i] = { ...t, name: e.target.value }; setTravelers(next);
                    }}
                    className="sm:col-span-1"
                  />
                  <TextField
                    label="Age" type="number" size="small" value={t.age}
                    onChange={(e) => { const next = [...travelers]; next[i] = { ...t, age: e.target.value }; setTravelers(next); }}
                  />
                  <TextField
                    label="Passport / NID (optional)" size="small" value={t.passport}
                    onChange={(e) => { const next = [...travelers]; next[i] = { ...t, passport: e.target.value }; setTravelers(next); }}
                  />
                </div>
              ))}
              <Divider />
              <h3 className="font-semibold text-gray-700">Emergency contact</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <TextField label="Contact name" size="small" value={emergencyContact.name} onChange={(e) => setEmergencyContact({ ...emergencyContact, name: e.target.value })} />
                <TextField label="Contact phone" size="small" value={emergencyContact.phone} onChange={(e) => setEmergencyContact({ ...emergencyContact, phone: e.target.value })} />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-800">Add-ons & extras</h2>
              {ADD_ONS.map((a) => (
                <label key={a.key} className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Checkbox checked={!!addOns[a.key]} onChange={(e) => setAddOns({ ...addOns, [a.key]: e.target.checked })} />
                    <div>
                      <p className="font-semibold text-gray-700">{a.label}</p>
                      <p className="text-xs text-gray-400">{a.desc}</p>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-gray-600">
                    {a.perTraveler ? `+${formatCurrency(a.perTraveler)}/traveler` : `+${formatCurrency(a.flat)}`}
                  </p>
                </label>
              ))}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <h2 className="text-xl font-bold text-gray-800">Review your booking</h2>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><p className="text-xs uppercase text-gray-400">Trip</p><p className="text-gray-700 font-medium">{trip.title}</p></div>
                <div><p className="text-xs uppercase text-gray-400">Travel date</p><p className="text-gray-700 font-medium">{travelDate}</p></div>
                <div><p className="text-xs uppercase text-gray-400">Travelers</p><p className="text-gray-700 font-medium">{travelerCount}</p></div>
                <div><p className="text-xs uppercase text-gray-400">Emergency contact</p><p className="text-gray-700 font-medium">{emergencyContact.name} · {emergencyContact.phone}</p></div>
              </div>
              <Divider />
              <div>
                <p className="text-xs uppercase text-gray-400 mb-2">Travelers</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  {travelers.map((t, i) => <li key={i}>{i + 1}. {t.name} — Age {t.age}{t.passport ? ` — ${t.passport}` : ""}</li>)}
                </ul>
              </div>
              <Divider />
              <div>
                <p className="text-xs uppercase text-gray-400 mb-2">Add-ons</p>
                {Object.keys(addOns).filter((k) => addOns[k]).length === 0 && <p className="text-sm text-gray-400">None selected</p>}
                <ul className="text-sm text-gray-600 space-y-1">
                  {ADD_ONS.filter((a) => addOns[a.key]).map((a) => <li key={a.key}>{a.label}</li>)}
                </ul>
              </div>
            </div>
          )}

          {step === 4 && confirmedBooking && (
            <div className="text-center py-8 space-y-3">
              <CheckCircleOutlineIcon sx={{ fontSize: 56, color: "#0EA65F" }} />
              <h2 className="text-2xl font-bold text-gray-800">Booking placed!</h2>
              <p className="text-gray-500">
                Your booking <span className="font-semibold text-gray-700">{confirmedBooking.id}</span> is pending confirmation from our team.
              </p>
              <div className="flex justify-center gap-3 pt-4">
                <a href="/dashboard/customer/trips" className="button-primary">View my trips</a>
                <a href="/trips" className="rounded-md border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50">Book another trip</a>
              </div>
            </div>
          )}

          {step < 4 && (
            <div className="flex justify-between mt-8 pt-6 border-t">
              <button
                disabled={step === 0}
                onClick={() => setStep((s) => s - 1)}
                className="text-sm font-semibold text-gray-500 disabled:opacity-30 px-4 py-2"
              >
                Back
              </button>
              {step < 3 ? (
                <button
                  disabled={!canProceed()}
                  onClick={() => setStep((s) => s + 1)}
                  className="button-primary disabled:opacity-40"
                >
                  Continue
                </button>
              ) : (
                <button disabled={submitting} onClick={handleConfirm} className="button-primary disabled:opacity-60">
                  {submitting ? "Confirming…" : "Confirm booking"}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Price summary sidebar */}
        <aside className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 h-fit sticky top-24">
          <div className="relative h-32 w-full rounded-lg overflow-hidden mb-4">
            <Image src={trip.image} alt={trip.title} fill className="object-cover" />
          </div>
          <h3 className="font-bold text-gray-800 mb-1">{trip.title}</h3>
          <p className="text-xs text-gray-400 mb-4">{trip.destination}</p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-gray-500"><span>Base ({travelerCount} × {formatCurrency(trip.pricePerHead)})</span><span>{formatCurrency(pricing.base)}</span></div>
            <div className="flex justify-between text-gray-500"><span>Add-ons</span><span>{formatCurrency(pricing.addOnsTotal)}</span></div>
            <div className="flex justify-between text-gray-500"><span>Tax (5%)</span><span>{formatCurrency(pricing.tax)}</span></div>
            <Divider />
            <div className="flex justify-between font-bold text-gray-800 text-base"><span>Total</span><span>{formatCurrency(pricing.total)}</span></div>
          </div>
        </aside>
      </div>
    </div>
  );
}
