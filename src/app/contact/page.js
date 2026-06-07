"use client";

import { useState, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/data/navigation";
import { createClient } from "@/utils/supabase/client";

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "",
    roomType: "premium", tourDate: "", timeSlot: "10-12", message: "",
  });
  const [status, setStatus] = useState("idle");
  const [bookingId, setBookingId] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");

    const supabase = createClient();
    
    const { error } = await supabase.from('leads').insert([{
      full_name: formData.name,
      email: formData.email,
      phone_number: formData.phone,
      message: formData.message + (formData.roomType ? `\n\nRoom Pref: ${formData.roomType}` : '') + (formData.timeSlot ? `\nTime Slot: ${formData.timeSlot}` : ''),
      move_in_date: formData.tourDate || null,
      source: 'Website',
      status: 'New'
    }]);

    if (error) {
      console.error("Error submitting lead:", error);
      setStatus("error"); // We can just revert to idle or show error, but we'll set success for now if we don't have an error state UI.
      setStatus("idle");
      alert("There was an error submitting your request. Please try again.");
      return;
    }

    const id = "STH-" + Math.floor(1000 + Math.random() * 9000);
    setBookingId(id);
    setStatus("success");
  };

  const inputClass = "w-full rounded-xl bg-surface border border-slate-200 px-4 py-3 text-sm text-charcoal-darkest placeholder-charcoal-light focus:outline-none focus:border-royal-blue focus:ring-2 focus:ring-royal-blue-lightest transition-all duration-200";
  const labelClass = "block text-xs font-bold uppercase tracking-wider text-charcoal-muted mb-1.5";

  if (status === "success") {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center text-center p-10 bg-royal-blue-faint border border-royal-blue-lightest rounded-2xl"
        >
          <div className="w-16 h-16 rounded-full bg-royal-blue flex items-center justify-center mb-5 shadow-lg shadow-royal-blue/30">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-charcoal-darkest mb-2">Tour Reserved!</h3>
          <p className="text-xs font-bold text-royal-blue uppercase tracking-widest mb-3">
            Booking ID: {bookingId}
          </p>
          <p className="text-sm text-charcoal-muted leading-relaxed max-w-sm">
            A confirmation has been sent to your email. Our team will call you within 2 hours to confirm the timings.
          </p>
          <button
            onClick={() => { setStatus("idle"); setFormData({ name: "", email: "", phone: "", roomType: "premium", tourDate: "", timeSlot: "10-12", message: "" }); }}
            className="mt-6 text-sm font-bold text-royal-blue hover:text-royal-blue-dark transition-colors"
          >
            Schedule another visit →
          </button>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className={labelClass}>Full Name</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required placeholder="e.g. Rahul Verma" className={inputClass} />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>Email Address</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required placeholder="e.g. rahul@company.com" className={inputClass} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="phone" className={labelClass}>Phone Number</label>
          <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required placeholder="+91 98765 43210" className={inputClass} />
        </div>
        <div>
          <label htmlFor="roomType" className={labelClass}>Room Preference</label>
          <select id="roomType" name="roomType" value={formData.roomType} onChange={handleChange} className={inputClass + " cursor-pointer"}>
            <option value="starter">Starter (Triple Sharing)</option>
            <option value="premium">Premium (Double Sharing)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="tourDate" className={labelClass}>Preferred Date</label>
          <input type="date" id="tourDate" name="tourDate" value={formData.tourDate} onChange={handleChange} required className={inputClass + " cursor-pointer"} />
        </div>
        <div>
          <label htmlFor="timeSlot" className={labelClass}>Time Slot</label>
          <select id="timeSlot" name="timeSlot" value={formData.timeSlot} onChange={handleChange} className={inputClass + " cursor-pointer"}>
            <option value="10-12">Morning (10 AM – 12 PM)</option>
            <option value="12-2">Afternoon (12 PM – 2 PM)</option>
            <option value="2-4">Early Evening (2 PM – 4 PM)</option>
            <option value="4-6">Late Evening (4 PM – 6 PM)</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>Additional Notes (Optional)</label>
        <textarea id="message" name="message" rows="3" value={formData.message} onChange={handleChange} placeholder="Any specific requirements, dietary preferences, or questions..." className={inputClass + " resize-none"} />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full inline-flex items-center justify-center rounded-full bg-charcoal-darkest px-6 py-4 text-sm font-bold text-white shadow-sm hover:bg-royal-blue hover:-translate-y-0.5 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer"
      >
        {status === "submitting" ? (
          <span className="flex items-center gap-3">
            <svg className="animate-spin w-5 h-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Processing...
          </span>
        ) : "Confirm Schedule"}
      </button>
    </form>
  );
}

export default function ContactPage() {
  const infoCards = [
    {
      icon: "📍",
      label: "Our Address",
      value: siteConfig.address,
      sub: "Visit our flagship property",
      href: null,
    },
    {
      icon: "📞",
      label: "Direct Hotline",
      value: siteConfig.phone,
      sub: "Mon–Sat, 9 AM – 8 PM",
      href: `tel:${siteConfig.phone.replace(/\s+/g, "")}`,
    },
    {
      icon: "✉️",
      label: "Email Us",
      value: siteConfig.email,
      sub: "We reply within 24 hours",
      href: `mailto:${siteConfig.email}`,
    },
    {
      icon: "💬",
      label: "WhatsApp",
      value: "Chat with us instantly",
      sub: "Available 24/7",
      href: siteConfig.whatsapp,
    },
  ];

  return (
    <div className="bg-surface min-h-screen">

      {/* ── Hero ─────────────────────────────────────── */}
      <section className="relative bg-white py-28 overflow-hidden">
        <div className="relative mx-auto max-w-4xl px-4 text-center z-10">
          <motion.div variants={stagger} initial="hidden" animate="show" className="flex flex-col items-center gap-5">
            <motion.span variants={fadeUp} className="inline-flex items-center gap-2 rounded-full border border-royal-blue-light/30 bg-royal-blue/10 px-4 py-1.5 text-xs font-bold tracking-widest uppercase text-royal-blue-lighter">
              📞 Tour Registration
            </motion.span>
            <motion.h1 variants={fadeUp} className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal text-charcoal-darkest tracking-tight">
              Schedule a Visit at <span className="text-royal-blue">SOL Stay</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-charcoal-muted font-light leading-relaxed max-w-xl">
              See the workspaces, try the high-speed fiber, review bedroom options, and meet current residents before signing anything.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Main Content ──────────────────────────────── */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

            {/* Left: Form */}
            <motion.div
              initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-7"
            >
              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 md:p-10">
                <h2 className="text-xl font-bold text-charcoal-darkest mb-6">
                  Schedule an In-Person Tour
                </h2>
                <Suspense fallback={<div className="h-64 rounded-xl bg-surface animate-pulse" />}>
                  <ContactForm />
                </Suspense>
              </div>
            </motion.div>

            {/* Right: Info + Map */}
            <motion.div
              initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="lg:col-span-5 flex flex-col gap-6"
            >
              {/* Info cards */}
              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
                <h2 className="text-base font-bold text-charcoal-darkest mb-5">Contact Directory</h2>
                <div className="flex flex-col gap-3">
                  {infoCards.map((card) => (
                    <div key={card.label} className="flex items-start gap-3 p-3 rounded-xl hover:bg-royal-blue-faint transition-colors group">
                      <div className="w-10 h-10 rounded-xl bg-royal-blue-faint group-hover:bg-royal-blue-lightest flex items-center justify-center text-lg shrink-0 transition-colors">
                        {card.icon}
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-charcoal-light mb-0.5">{card.label}</p>
                        {card.href ? (
                          <a href={card.href} target={card.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="text-sm font-semibold text-charcoal-darkest hover:text-royal-blue transition-colors break-all">
                            {card.value}
                          </a>
                        ) : (
                          <p className="text-sm font-semibold text-charcoal-darkest">{card.value}</p>
                        )}
                        <p className="text-xs text-charcoal-light">{card.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map placeholder */}
              <div className="relative rounded-3xl overflow-hidden bg-surface border border-slate-200 h-64 shadow-sm">
                {/* Hub pins */}
                {[
                  { top: "35%", left: "28%", label: "SOL Stay K-Mngla" },
                  { top: "58%", left: "68%", label: "SOL Stay Indranagr" },
                  { top: "22%", left: "52%", label: "SOL Stay HSR" },
                ].map((pin) => (
                  <div key={pin.label} className="absolute flex flex-col items-center" style={{ top: pin.top, left: pin.left }}>
                    <div className="w-4 h-4 rounded-full bg-royal-blue shadow-sm flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                      <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    </div>
                    <span className="mt-1.5 text-[9px] font-medium tracking-widest text-charcoal-muted uppercase px-2 py-0.5 rounded whitespace-nowrap">
                      {pin.label}
                    </span>
                  </div>
                ))}
                {/* Center label */}
                <div className="absolute bottom-4 left-0 right-0 text-center">
                  <span className="text-[10px] text-charcoal-light uppercase tracking-widest font-bold">📍 Multiple Locations · Bangalore</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
}
