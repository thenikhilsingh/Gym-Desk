import React, { useState } from "react";
import {
  Dumbbell,
  CalendarCheck,
  CreditCard,
  Clock,
  Flame,
  CheckCircle2,
  Circle,
  Award,
  ChevronRight,
} from "lucide-react";

const WEEK_PLAN = [
  { day: "Mon", focus: "Push — Chest & Triceps", done: true },
  { day: "Tue", focus: "Pull — Back & Biceps", done: true },
  { day: "Wed", focus: "Legs & Core", done: true },
  { day: "Thu", focus: "Rest / Mobility", done: false },
  { day: "Fri", focus: "Push — Shoulders & Triceps", done: false },
  { day: "Sat", focus: "Pull — Back & Biceps", done: false },
  { day: "Sun", focus: "Rest", done: false },
];

const CHECKINS = [62, 40, 78, 55, 90, 70, 20]; // % height, Mon..Sun

const PAYMENTS = [
  {
    date: "01 Jul 2026",
    desc: "Gold Plan — Monthly",
    amount: "₹2,500",
    status: "Paid",
  },
  {
    date: "01 Jun 2026",
    desc: "Gold Plan — Monthly",
    amount: "₹2,500",
    status: "Paid",
  },
  {
    date: "01 Aug 2026",
    desc: "Gold Plan — Monthly",
    amount: "₹2,500",
    status: "Due",
  },
];

const NOTICES = [
  { title: "New Zumba batch starts Monday", tag: "Schedule" },
  { title: "Gym closed on 15th Aug — holiday", tag: "Notice" },
  { title: "Diwali offer: refer a friend, get 1 month free", tag: "Offer" },
];

function StatusBadge({ status }) {
  const isPaid = status === "Paid";
  return (
    <span
      className={`text-xs font-medium px-2.5 py-1 rounded-full ${
        isPaid ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
      }`}
    >
      {status}
    </span>
  );
}

function CheckInPattern() {
  const cells = Array.from({ length: 49 }, (_, i) => i);
  const filled = new Set([
    0, 1, 2, 3, 4, 5, 6, 7, 13, 14, 20, 21, 27, 28, 34, 35, 42, 43, 44, 45, 46,
    47, 48, 2, 4, 16, 18, 24, 30, 32, 38, 10, 12, 22, 26, 36, 40,
  ]);
  return (
    <div className="grid grid-cols-7 gap-0.75 w-21 h-21 shrink-0">
      {cells.map((c) => (
        <div
          key={c}
          className={`rounded-[1px] ${filled.has(c) ? "bg-white" : "bg-white/20"}`}
        />
      ))}
    </div>
  );
}

function Section({ children, className = "" }) {
  return (
    <section className={`max-w-6xl mx-auto px-4 md:px-6 ${className}`}>
      {children}
    </section>
  );
}

export default function Home() {
  const [plan, setPlan] = useState(WEEK_PLAN);
  const toggleDay = (day) =>
    setPlan((prev) =>
      prev.map((d) => (d.day === day ? { ...d, done: !d.done } : d)),
    );
  const completedCount = plan.filter((d) => d.done).length;

  return (
    <div
      className="w-full bg-neutral-50 text-neutral-900"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <main>
        {/* Hero: membership card */}
        <Section className="pt-8 md:pt-12">
          <p className="text-xs uppercase tracking-widest text-fuchsia-500 font-medium mb-2">
            Welcome back
          </p>
          <h1
            className="text-2xl md:text-3xl font-semibold mb-6"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Aditya, here's where your membership stands today.
          </h1>

          <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-violet-600 via-fuchsia-600 to-pink-500 text-white p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="absolute -right-10 -top-10 w-56 h-56 rounded-full bg-white/10" />
            <div className="absolute -right-2 -bottom-15 w-40 h-40 rounded-full bg-white/10" />

            <div className="relative z-10">
              <p className="text-xs uppercase tracking-widest text-white/70 mb-1">
                Gold Membership
              </p>
              <p
                className="text-2xl font-semibold mb-4"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Aditya Verma
              </p>
              <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-white/90">
                <div>
                  <p className="text-[11px] text-white/60">Member ID</p>
                  <p style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    GD-2049
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-white/60">Valid Till</p>
                  <p style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    28 Feb 2027
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-white/60">Status</p>
                  <p className="font-medium">Active</p>
                </div>
              </div>
            </div>

            <div className="relative z-10 flex flex-col items-center gap-2">
              <div className="bg-white/10 border border-white/20 rounded-xl p-3">
                <CheckInPattern />
              </div>
              <p className="text-[11px] text-white/70">
                Show at front desk to check in
              </p>
            </div>
          </div>
        </Section>

        {/* Stat row */}
        <Section className="mt-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                label: "Days Remaining",
                value: "214",
                icon: Clock,
                note: "on Gold Plan",
              },
              {
                label: "This Month",
                value: "18",
                icon: CalendarCheck,
                note: "check-ins",
              },
              {
                label: "Current Streak",
                value: "5 days",
                icon: Flame,
                note: "keep it up",
              },
              {
                label: "Next Payment",
                value: "₹2,500",
                icon: CreditCard,
                note: "due 1 Aug",
              },
            ].map(({ label, value, icon: Icon, note }) => (
              <div
                key={label}
                className="bg-white rounded-2xl border border-neutral-100 p-4 shadow-sm"
              >
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs text-neutral-500">{label}</p>
                  <Icon size={16} className="text-fuchsia-500" />
                </div>
                <p
                  className="text-xl font-semibold text-neutral-900"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {value}
                </p>
                <p className="text-[11px] text-neutral-400 mt-0.5">{note}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Weekly plan */}
        <Section className="mt-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2
                className="text-lg font-semibold"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                This Week's Plan
              </h2>
              <p className="text-sm text-neutral-500">Set by your trainer</p>
            </div>
            <span className="text-xs text-neutral-500">
              {completedCount}/7 done
            </span>
          </div>
          <div className="bg-white rounded-2xl border border-neutral-100 p-3 shadow-sm">
            {plan.map(({ day, focus, done }) => (
              <button
                key={day}
                onClick={() => toggleDay(day)}
                className="w-full flex items-center gap-3 py-2.5 px-3 rounded-lg hover:bg-neutral-50 transition-colors text-left"
              >
                {done ? (
                  <CheckCircle2
                    size={18}
                    className="text-emerald-500 shrink-0"
                  />
                ) : (
                  <Circle size={18} className="text-neutral-300 shrink-0" />
                )}
                <span className="text-xs font-medium text-neutral-400 w-8 shrink-0">
                  {day}
                </span>
                <span
                  className={`text-sm ${done ? "text-neutral-400 line-through" : "text-neutral-800"}`}
                >
                  {focus}
                </span>
              </button>
            ))}
          </div>
        </Section>

        {/* Attendance chart */}
        <Section className="mt-10">
          <h2
            className="text-lg font-semibold mb-1"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Check-ins This Week
          </h2>
          <p className="text-sm text-neutral-500 mb-4">Mon – Sun</p>
          <div className="bg-white rounded-2xl border border-neutral-100 p-5 shadow-sm">
            <div className="flex items-end justify-between gap-3 h-28">
              {CHECKINS.map((h, i) => (
                <div
                  key={i}
                  className="flex-1 flex flex-col items-center gap-2"
                >
                  <div className="w-full rounded-md bg-neutral-100 flex items-end h-20 overflow-hidden">
                    <div
                      className="w-full rounded-md bg-linear-to-t from-violet-500 to-fuchsia-400"
                      style={{ height: `${h}%` }}
                    />
                  </div>
                  <span className="text-[11px] text-neutral-400">
                    {["M", "T", "W", "T", "F", "S", "S"][i]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Payments + notices */}
        <Section className="mt-10 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-neutral-100 p-5 shadow-sm">
              <h2
                className="text-lg font-semibold mb-4"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Payment History
              </h2>
              <div className="flex flex-col gap-3">
                {PAYMENTS.map((p, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-neutral-800">{p.desc}</p>
                      <p className="text-[11px] text-neutral-400">{p.date}</p>
                    </div>
                    <div className="text-right">
                      <p
                        className="text-sm font-medium text-neutral-900"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        {p.amount}
                      </p>
                      <StatusBadge status={p.status} />
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 text-xs font-medium text-fuchsia-600 flex items-center justify-center gap-1 py-2 rounded-lg hover:bg-fuchsia-50 transition-colors">
                View all payments <ChevronRight size={14} />
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-neutral-100 p-5 shadow-sm">
              <h2
                className="text-lg font-semibold mb-4"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Gym Notices
              </h2>
              <div className="flex flex-col gap-3">
                {NOTICES.map((n, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-0.5 w-6 h-6 rounded-md bg-fuchsia-50 flex items-center justify-center shrink-0">
                      <Award size={13} className="text-fuchsia-500" />
                    </div>
                    <div>
                      <p className="text-sm text-neutral-800 leading-snug">
                        {n.title}
                      </p>
                      <p className="text-[11px] text-neutral-400">{n.tag}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>
      </main>
    </div>
  );
}
