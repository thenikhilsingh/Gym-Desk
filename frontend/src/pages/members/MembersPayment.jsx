import React, { useState, useEffect } from "react";
import {
  CreditCard,
  Download,
  CheckCircle2,
  AlertCircle,
  Clock3,
  Wallet,
  Receipt,
  X,
  Loader2,
  ShieldCheck,
} from "lucide-react";

const PAYMENTS = [
  {
    date: "01 Aug 2026",
    desc: "Gold Plan — Monthly",
    amount: "₹2,500",
    method: "UPI",
    status: "Due",
  },
  {
    date: "01 Jul 2026",
    desc: "Gold Plan — Monthly",
    amount: "₹2,500",
    method: "UPI",
    status: "Paid",
  },
  {
    date: "01 Jun 2026",
    desc: "Gold Plan — Monthly",
    amount: "₹2,500",
    method: "Card",
    status: "Paid",
  },
  {
    date: "01 May 2026",
    desc: "Gold Plan — Monthly",
    amount: "₹2,500",
    method: "UPI",
    status: "Paid",
  },
  {
    date: "01 Apr 2026",
    desc: "Personal Training — 4 sessions",
    amount: "₹1,800",
    method: "Cash",
    status: "Paid",
  },
  {
    date: "01 Apr 2026",
    desc: "Gold Plan — Monthly",
    amount: "₹2,500",
    method: "UPI",
    status: "Overdue",
  },
  {
    date: "01 Mar 2026",
    desc: "Gold Plan — Monthly",
    amount: "₹2,500",
    method: "Card",
    status: "Paid",
  },
];

const STATUS_STYLES = {
  Paid: {
    pill: "bg-emerald-50 text-emerald-600",
    icon: CheckCircle2,
    iconColor: "text-emerald-500",
  },
  Due: {
    pill: "bg-amber-50 text-amber-600",
    icon: Clock3,
    iconColor: "text-amber-500",
  },
  Overdue: {
    pill: "bg-red-50 text-red-600",
    icon: AlertCircle,
    iconColor: "text-red-500",
  },
};

function StatusPill({ status }) {
  const s = STATUS_STYLES[status];
  const Icon = s.icon;
  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${s.pill}`}
    >
      <Icon size={12} />
      {status}
    </span>
  );
}

function Section({ children, className = "" }) {
  return (
    <section className={`w-full px-6 md:px-10 ${className}`}>
      {children}
    </section>
  );
}

function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

function PayNowModal({ open, onClose, amount, amountPaise, dueLabel }) {
  const [stage, setStage] = useState("confirm"); // confirm | processing | success | failed

  useEffect(() => {
    if (open) loadRazorpayScript();
  }, [open]);

  if (!open) return null;

  const handleClose = () => {
    onClose();
    setTimeout(() => setStage("confirm"), 300);
  };

  const handlePay = async () => {
    setStage("processing");
    const ok = await loadRazorpayScript();
    if (!ok) {
      setStage("failed");
      return;
    }

    // In production: create an order server-side first (POST /orders),
    // then pass the returned order_id below. Never compute/trust amount
    // on the client — the server-created order is the source of truth.
    const options = {
      key: "RAZORPAY_KEY_ID", // your public key, from env
      amount: amountPaise, // paise, must match the server-created order
      currency: "INR",
      name: "Gym Desk",
      description: dueLabel,
      // order_id: "order_xxx", // from your backend
      handler: function () {
        // Ideally verify the signature server-side before trusting this
        setStage("success");
      },
      modal: {
        ondismiss: function () {
          setStage("confirm");
        },
      },
      theme: { color: "#a21caf" },
    };

    const rzp = new window.Razorpay(options);
    rzp.on("payment.failed", function () {
      setStage("failed");
    });
    rzp.open();
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-neutral-900/40 backdrop-blur-sm"
        onClick={stage === "processing" ? undefined : handleClose}
      />

      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        {stage !== "processing" && (
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-neutral-50 hover:bg-neutral-100 flex items-center justify-center transition-colors"
          >
            <X size={16} className="text-neutral-500" />
          </button>
        )}

        {stage === "success" && (
          <div className="p-8 flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center mb-4">
              <CheckCircle2 size={28} className="text-emerald-500" />
            </div>
            <h3
              className="text-lg font-semibold mb-1"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Payment Successful
            </h3>
            <p className="text-sm text-neutral-500 mb-6">
              {amount} received. A receipt has been sent to your email.
            </p>
            <button
              onClick={handleClose}
              className="w-full bg-neutral-900 text-white text-sm font-medium py-2.5 rounded-xl hover:bg-neutral-800 transition-colors"
            >
              Done
            </button>
          </div>
        )}

        {stage === "failed" && (
          <div className="p-8 flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mb-4">
              <AlertCircle size={28} className="text-red-500" />
            </div>
            <h3
              className="text-lg font-semibold mb-1"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Payment Failed
            </h3>
            <p className="text-sm text-neutral-500 mb-6">
              Something went wrong, or the payment was cancelled. No amount was
              deducted.
            </p>
            <button
              onClick={() => setStage("confirm")}
              className="w-full bg-linear-to-br from-violet-600 to-fuchsia-500 text-white text-sm font-medium py-2.5 rounded-xl hover:opacity-95 transition-opacity"
            >
              Try Again
            </button>
          </div>
        )}

        {(stage === "confirm" || stage === "processing") && (
          <>
            <div className="bg-linear-to-br from-violet-600 via-fuchsia-600 to-pink-500 text-white p-6">
              <p className="text-xs uppercase tracking-widest text-white/70 mb-1">
                Confirm Payment
              </p>
              <p
                className="text-3xl font-semibold"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {amount}
              </p>
              <p className="text-sm text-white/80 mt-1">{dueLabel}</p>
            </div>

            <div className="p-6">
              <div className="flex items-start gap-2.5 text-xs text-neutral-500 mb-6">
                <ShieldCheck
                  size={16}
                  className="text-neutral-400 shrink-0 mt-0.5"
                />
                <p>
                  You'll choose UPI, card, or net banking on the next screen —
                  handled securely by Razorpay. Gym Desk never sees your card or
                  bank details.
                </p>
              </div>

              <button
                onClick={handlePay}
                disabled={stage === "processing"}
                className="w-full bg-linear-to-br from-violet-600 to-fuchsia-500 text-white text-sm font-medium py-2.5 rounded-xl hover:opacity-95 transition-opacity flex items-center justify-center gap-2 disabled:opacity-80"
              >
                {stage === "processing" ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Opening secure checkout…
                  </>
                ) : (
                  `Proceed to Pay ${amount}`
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function MembersPayment() {
  const [payOpen, setPayOpen] = useState(false);

  return (
    <div
      className="w-full bg-neutral-50 text-neutral-900"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <PayNowModal
        open={payOpen}
        onClose={() => setPayOpen(false)}
        amount="₹2,500"
        amountPaise={250000}
        dueLabel="Gold Plan — Monthly · due 01 Aug 2026"
      />
      <main>
        {/* Page header */}
        <Section className="pt-8 md:pt-12">
          <p className="text-xs uppercase tracking-widest text-fuchsia-500 font-medium mb-2">
            Billing
          </p>
          <h1
            className="text-2xl md:text-3xl font-semibold mb-1"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Payments
          </h1>
          <p className="text-sm text-neutral-500">
            Track dues, download invoices, and see how you've paid.
          </p>
        </Section>

        {/* Due-now banner */}
        <Section className="mt-6">
          <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-violet-600 via-fuchsia-600 to-pink-500 text-white p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="absolute -right-10 -top-10 w-56 h-56 rounded-full bg-white/10" />
            <div className="relative z-10">
              <p className="text-xs uppercase tracking-widest text-white/70 mb-1">
                Payment Due
              </p>
              <p
                className="text-3xl font-semibold mb-2"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                ₹2,500
              </p>
              <p className="text-sm text-white/80">
                Gold Plan — Monthly · due 01 Aug 2026
              </p>
            </div>
            <button
              onClick={() => setPayOpen(true)}
              className="relative z-10 bg-white text-fuchsia-600 text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-white/90 transition-colors self-start md:self-auto"
            >
              Pay Now
            </button>
          </div>
        </Section>

        {/* Quick stats */}
        <Section className="mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl border border-neutral-100 p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs text-neutral-500">Total Paid</p>
                <Wallet size={16} className="text-fuchsia-500" />
              </div>
              <p
                className="text-xl font-semibold"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                ₹28,600
              </p>
              <p className="text-[11px] text-neutral-400 mt-0.5">
                since Jan 2026
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-neutral-100 p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs text-neutral-500">Next Due</p>
                <Clock3 size={16} className="text-fuchsia-500" />
              </div>
              <p
                className="text-xl font-semibold"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                01 Aug
              </p>
              <p className="text-[11px] text-neutral-400 mt-0.5">₹2,500 due</p>
            </div>

            <div className="bg-white rounded-2xl border border-neutral-100 p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs text-neutral-500">Payment Method</p>
                <CreditCard size={16} className="text-fuchsia-500" />
              </div>
              <p
                className="text-xl font-semibold"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                UPI
              </p>
              <p className="text-[11px] text-neutral-400 mt-0.5">
                default method
              </p>
            </div>
          </div>
        </Section>

        {/* Payment history */}
        <Section className="mt-10 mb-16">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2
                className="text-lg font-semibold"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Payment History
              </h2>
              <p className="text-sm text-neutral-500">
                All transactions on your account
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden">
            {/* Table header — desktop only */}
            <div className="hidden md:grid grid-cols-[1fr_1.4fr_0.8fr_0.7fr_0.8fr_0.6fr] gap-4 px-5 py-3 border-b border-neutral-100 text-xs font-medium text-neutral-400 uppercase tracking-wide">
              <span>Date</span>
              <span>Description</span>
              <span>Amount</span>
              <span>Method</span>
              <span>Status</span>
              <span className="text-right">Invoice</span>
            </div>

            {PAYMENTS.map((p, i) => (
              <div
                key={i}
                className="grid grid-cols-2 md:grid-cols-[1fr_1.4fr_0.8fr_0.7fr_0.8fr_0.6fr] gap-2 md:gap-4 px-5 py-4 border-b border-neutral-50 last:border-b-0 items-center"
              >
                <span
                  className="text-sm text-neutral-500"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {p.date}
                </span>
                <span className="text-sm text-neutral-800 col-span-2 md:col-span-1 order-3 md:order-0">
                  {p.desc}
                </span>
                <span
                  className="text-sm font-medium text-neutral-900"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {p.amount}
                </span>
                <span className="text-sm text-neutral-500">{p.method}</span>
                <span>
                  <StatusPill status={p.status} />
                </span>
                <div className="flex justify-end">
                  {p.status === "Paid" ? (
                    <button className="w-8 h-8 rounded-lg bg-neutral-50 hover:bg-fuchsia-50 flex items-center justify-center transition-colors">
                      <Download size={14} className="text-neutral-500" />
                    </button>
                  ) : (
                    <Receipt size={14} className="text-neutral-300" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </Section>
      </main>
    </div>
  );
}
