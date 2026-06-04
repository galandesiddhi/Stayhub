"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { amenities, amenityCategories } from "@/data/amenities";

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

export default function AmenitiesPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredAmenities =
    activeCategory === "all"
      ? amenities
      : amenities.filter((a) => a.category === activeCategory);

  const getCount = (id) =>
    id === "all" ? amenities.length : amenities.filter((a) => a.category === id).length;

  return (
    <div className="bg-background min-h-screen">

      {/* ── Hero ─────────────────────────────────────── */}
      <section className="relative bg-charcoal-darkest py-28 overflow-hidden">
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-royal-blue/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 dot-grid opacity-10" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center z-10">
          <motion.div
            variants={stagger} initial="hidden" animate="show"
            className="flex flex-col items-center gap-5"
          >
            <motion.span variants={fadeUp} className="inline-flex items-center gap-2 rounded-full border border-royal-blue-light/30 bg-royal-blue/10 px-4 py-1.5 text-xs font-bold tracking-widest uppercase text-royal-blue-lighter">
              🛠️ World-Class Infrastructure
            </motion.span>
            <motion.h1 variants={fadeUp} className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
              Everything You Need<br />
              <span className="gradient-text">Under One Roof</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-slate-300 font-light leading-relaxed max-w-2xl">
              StayHub spaces are built with commercial-grade networks, ergonomic furniture, and premium amenities — so you can focus on what matters.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Category Filter ───────────────────────────── */}
      <section className="bg-white border-b border-slate-100 sticky top-20 z-30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center gap-2 py-4"
          >
            {amenityCategories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 rounded-full px-5 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-200 cursor-pointer border ${
                    isActive
                      ? "bg-royal-blue text-white border-royal-blue shadow-lg shadow-royal-blue/20"
                      : "bg-white text-charcoal-muted border-slate-200 hover:border-royal-blue hover:text-royal-blue"
                  }`}
                >
                  {cat.label}
                  <span className={`text-[10px] rounded-full px-2 py-0.5 font-bold ${isActive ? "bg-white/20 text-white" : "bg-slate-100 text-charcoal-light"}`}>
                    {getCount(cat.id)}
                  </span>
                </button>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Amenities Grid ────────────────────────────── */}
      <section className="py-16 bg-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            layout
            variants={stagger}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredAmenities.map((amenity) => (
                <motion.div
                  layout
                  key={amenity.id}
                  variants={fadeUp}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.25 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="group flex flex-col p-7 bg-white rounded-2xl border border-slate-100 shadow-premium hover:border-royal-blue-lighter hover:shadow-lg transition-all duration-300 cursor-default"
                >
                  <div className="w-14 h-14 rounded-xl bg-royal-blue-faint flex items-center justify-center text-3xl mb-5 group-hover:-translate-y-1 transition-transform duration-300">
                    {amenity.icon}
                  </div>
                  <h3 className="text-base font-bold text-charcoal-darkest mb-2">{amenity.title}</h3>
                  <p className="text-sm text-charcoal-light leading-relaxed flex-grow">{amenity.description}</p>
                  <span className={`mt-4 self-start text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
                    amenity.category === "essential"
                      ? "bg-royal-blue-faint text-royal-blue"
                      : amenity.category === "lifestyle"
                      ? "bg-green-50 text-green-700"
                      : "bg-amber-50 text-amber-700"
                  }`}>
                    {amenity.category}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────── */}
      <section className="py-16 px-4 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl bg-charcoal-darkest rounded-3xl p-10 md:p-14 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-72 h-72 bg-royal-blue/10 rounded-full blur-[80px] pointer-events-none" />
          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-royal-blue-light/30 bg-royal-blue/10 px-4 py-1.5 text-xs font-bold tracking-widest uppercase text-royal-blue-lighter mb-6">
              Premium Membership
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Experience These Amenities First-Hand
            </h2>
            <p className="text-slate-300 mb-8 font-light max-w-xl mx-auto">
              Schedule a free tour and see the spaces, try the gym, review bedroom options, and meet current residents.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center h-13 rounded-xl bg-royal-blue px-8 py-3.5 text-sm font-bold text-white hover:bg-royal-blue-dark transition-all shadow-lg shadow-royal-blue/30"
              >
                Book a Free Tour
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center h-13 rounded-xl border border-white/20 px-8 py-3.5 text-sm font-bold text-white hover:bg-white/10 transition-all"
              >
                View Pricing →
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
