"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { stats, foodMenu } from "@/data/content";
import { amenities } from "@/data/amenities";
import { pricingPlans } from "@/data/pricing";
import { testimonials } from "@/data/testimonials";
import { faqItems } from "@/data/faq";
import { siteConfig } from "@/data/navigation";
import { LocalBusinessSchema, FAQSchema } from "@/components/seo/SchemaMarkup";

/* ── Animation Variants ─────────────────────────── */
const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};
const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5 } },
};

/* ── Stat Counter ────────────────────────────────── */
function StatCard({ stat }) {
  return (
    <div className="flex flex-col items-center gap-1 px-6">
      <span className="text-4xl md:text-5xl font-black text-royal-blue tabular-nums">
        {stat.value}{stat.suffix}
      </span>
      <span className="text-sm text-charcoal-light font-medium tracking-wide">{stat.label}</span>
    </div>
  );
}

/* ── Testimonial Card ────────────────────────────── */
function TestimonialCard({ t }) {
  return (
    <div className="flex flex-col gap-4 bg-white rounded-3xl p-8 border border-slate-100 shadow-premium h-full">
      <div className="flex gap-0.5">
        {Array.from({ length: t.rating }).map((_, i) => (
          <svg key={i} className="w-4 h-4 fill-accent-gold" viewBox="0 0 24 24">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        ))}
      </div>
      <p className="text-charcoal-dark leading-relaxed italic flex-grow">"{t.quote}"</p>
      <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
        <div className="w-11 h-11 rounded-full bg-royal-blue text-white flex items-center justify-center font-bold text-sm shrink-0">
          {t.avatar}
        </div>
        <div>
          <p className="font-bold text-charcoal-darkest text-sm">{t.name}</p>
          <p className="text-xs text-charcoal-light">{t.role}</p>
        </div>
      </div>
    </div>
  );
}

/* ── FAQ Item ────────────────────────────────────── */
function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <div className="border-b border-slate-100 last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between text-left py-5 gap-4 focus:outline-none group"
      >
        <span className="font-semibold text-charcoal-darkest group-hover:text-royal-blue transition-colors text-base">
          {faq.question}
        </span>
        <span
          className={`shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${isOpen
            ? "border-royal-blue bg-royal-blue text-white rotate-45"
            : "border-slate-200 text-charcoal-light"
            }`}
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-charcoal-muted leading-relaxed text-sm pr-10">{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ══════════════════════════════════════════════════ */
export default function Home() {
  const [openFaq, setOpenFaq] = useState(null);
  const [activeMealTab, setActiveMealTab] = useState(1);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const featuredAmenities = amenities.slice(0, 8);

  return (
    <div className="flex flex-col min-h-screen bg-background overflow-x-hidden">
      <LocalBusinessSchema />
      <FAQSchema faqs={faqItems} />

      {/* ── 1. HERO ─────────────────────────────────── */}
      <section className="relative min-h-[96vh] flex items-center justify-center bg-charcoal-darkest overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-10" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full z-10 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left: Text */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="show"
              className="flex flex-col gap-6"
            >
              <motion.div variants={fadeUp}>
                <span className="inline-flex items-center gap-2 rounded-full border border-royal-blue-light/30 bg-royal-blue/10 px-4 py-1.5 text-xs font-bold tracking-widest uppercase text-royal-blue-lighter backdrop-blur-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-royal-blue-light animate-pulse" />
                  Premium Co-Living Spaces
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="font-display text-5xl sm:text-6xl lg:text-7xl font-normal text-white leading-[1.05] tracking-tight"
              >
                Premium Co-Living<br />
                <span className="text-royal-blue">& PG in Pune.</span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="text-lg text-charcoal-muted leading-relaxed max-w-xl font-light"
              >
                Fully furnished rooms, chef-prepared meals, world-class amenities, and a thriving community — all wrapped in one simple monthly rent.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link
                  href="/contact"
                  className="inline-flex h-14 items-center justify-center rounded-xl bg-royal-blue px-8 text-sm font-bold tracking-wide text-white hover:bg-royal-blue-dark transition-all duration-300 shadow-lg shadow-royal-blue/30 hover:-translate-y-0.5"
                >
                  Book a Free Tour
                </Link>
                <Link
                  href="/gallery"
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-8 text-sm font-bold text-white hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                >
                  View Gallery
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </motion.div>

              <motion.div variants={fadeUp} className="flex items-center gap-4 pt-2">
                <div className="flex -space-x-2">
                  {["PS", "AM", "SC"].map((init) => (
                    <div key={init} className="w-8 h-8 rounded-full bg-royal-blue-dark border-2 border-charcoal-darkest flex items-center justify-center text-[10px] font-bold text-white">
                      {init}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-white">
                  <span className="text-white font-semibold">500+</span> happy residents across 12 properties
                </p>
              </motion.div>
            </motion.div>

            {/* Right: Floating Card */}
            <motion.div
              initial={{ opacity: 0, x: 40, y: 0 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="hidden lg:flex justify-center"
            >
              <div className="relative">
                {/* Main image card */}
                <div className="relative w-[420px] h-[500px] rounded-3xl overflow-hidden shadow-2xl animate-float border border-white/10">
                  <Image
                    src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=900&q=80"
                    alt="Premium co-living room at SOL Stay"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-darkest/70 via-transparent to-transparent" />

                  {/* Price badge */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-slate-100">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-charcoal-muted font-medium">Starting from</p>
                          <p className="text-2xl font-black text-charcoal-darkest">₹12,999<span className="text-sm font-normal text-charcoal-light">/mo</span></p>
                        </div>
                        <span className="bg-royal-blue/10 text-royal-blue text-xs font-bold px-3 py-1.5 rounded-full border border-royal-blue/20">
                          All Inclusive
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/10">
                        <svg className="w-3.5 h-3.5 text-accent-green" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-xs text-charcoal-muted">Meals · WiFi · Housekeeping · Washing Machine</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating badge: rating */}
                <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-3 flex items-center gap-2">
                  <span className="text-xl">⭐</span>
                  <div>
                    <p className="text-xs font-black text-charcoal-darkest">4.9 / 5</p>
                    <p className="text-[9px] text-charcoal-light font-medium">500+ Reviews</p>
                  </div>
                </div>

                {/* Floating badge: community */}
                <div className="absolute -bottom-4 -left-6 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-2">
                  <span className="text-xl">🏠</span>
                  <div>
                    <p className="text-xs font-black text-charcoal-darkest">12 Properties</p>
                    <p className="text-[9px] text-charcoal-light font-medium">Across Pune</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500">
          <span className="text-[10px] tracking-widest uppercase font-medium">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </div>
      </section>

      {/* ── 2. STATS BAR ─────────────────────────────── */}
      <section className="bg-white border-b border-slate-100">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-100"
          >
            {stats.map((stat) => (
              <motion.div key={stat.id} variants={fadeUp} className="py-10">
                <StatCard stat={stat} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 3. ROOM SHOWCASE ─────────────────────────── */}
      <section className="py-24 bg-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-3"
          >
            <motion.span variants={fadeUp} className="text-xs font-bold uppercase tracking-widest text-royal-blue">
              Our Spaces
            </motion.span>
            <motion.h2 variants={fadeUp} className="font-display text-4xl sm:text-5xl font-bold text-charcoal-darkest tracking-tight">
              Designed for Comfort & Productivity
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-charcoal-light font-light leading-relaxed">
              Every room is thoughtfully designed with premium furniture, fast internet, and everything you need from day one.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-auto md:h-[620px]">
            <motion.div
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7 }}
              className="md:col-span-8 relative rounded-3xl overflow-hidden shadow-xl group h-80 md:h-full"
            >
              <Image
                src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80"
                alt="Premium bedroom suite at SOL Stay"
                fill className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-darkest/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
              <div className="absolute bottom-8 left-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-400 delay-75">
                <p className="font-display text-2xl font-bold">The Premium Suite</p>
                <p className="text-sm text-slate-300 mt-1">Custom beds with hotel-grade linens & ergonomic desk</p>
              </div>
              <div className="absolute top-4 left-4">
                <span className="bg-royal-blue text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                  Most Popular
                </span>
              </div>
            </motion.div>

            <div className="md:col-span-4 grid grid-rows-2 gap-4 h-80 md:h-full">
              <motion.div
                initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }}
                className="relative rounded-3xl overflow-hidden shadow-xl group h-full"
              >
                <Image
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80"
                  alt="Co-working space"
                  fill className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-darkest/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                <div className="absolute bottom-5 left-5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-400 delay-75">
                  <p className="font-display text-lg font-bold">Deep Work Zones</p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.3 }}
                className="relative rounded-3xl overflow-hidden shadow-xl group h-full"
              >
                <Image
                  src="https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=800&q=80"
                  alt="Community rooftop events"
                  fill className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-darkest/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                <div className="absolute bottom-5 left-5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-400 delay-75">
                  <p className="font-display text-lg font-bold">Vibrant Community</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. VALUE PROPS ───────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-3"
          >
            <motion.span variants={fadeUp} className="text-xs font-bold uppercase tracking-widest text-royal-blue">
              The SOL Stay Difference
            </motion.span>
            <motion.h2 variants={fadeUp} className="font-display text-4xl sm:text-5xl font-bold text-charcoal-darkest tracking-tight">
              Everything You Need. Nothing You Don&apos;t.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-charcoal-light font-light leading-relaxed">
              We handle every detail of your daily life so you can focus on what matters most.
            </motion.p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: "🤝",
                title: "Vibrant Community",
                desc: "Connect with 500+ vetted professionals, students, and creators. Weekly events, networking sessions, and a built-in social life.",
                color: "bg-white border-slate-100",
                iconBg: "bg-surface",
              },
              {
                icon: "🏠",
                title: "Truly All-Inclusive",
                desc: "One monthly payment covers your room, meals, WiFi, laundry, housekeeping, and all amenities. Zero surprise bills.",
                color: "bg-white border-slate-100",
                iconBg: "bg-surface",
              },
              {
                icon: "⚡",
                title: "Zero Hassle",
                desc: "No broker fees, no utility management, no maintenance headaches. Move in with just your bags and we handle the rest.",
                color: "bg-white border-slate-100",
                iconBg: "bg-surface",
              },
            ].map((prop, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`flex flex-col p-8 rounded-3xl border shadow-premium cursor-default ${prop.color}`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-6 ${prop.iconBg}`}>
                  {prop.icon}
                </div>
                <h3 className="text-xl font-bold text-charcoal-darkest mb-3">{prop.title}</h3>
                <p className="text-charcoal-light leading-relaxed text-sm">{prop.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 5. AMENITIES TEASER ──────────────────────── */}
      <section className="py-24 bg-charcoal-darkest text-white relative overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-3"
          >
            <motion.span variants={fadeUp} className="text-xs font-bold uppercase tracking-widest text-royal-blue-lighter">
              World-Class Amenities
            </motion.span>
            <motion.h2 variants={fadeUp} className="font-display text-4xl sm:text-5xl font-normal tracking-tight">
              More Than Just a Room
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-slate-300 font-light leading-relaxed">
              Enterprise-grade infrastructure gives you the focus to build and the space to breathe.
            </motion.p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {featuredAmenities.map((amenity) => (
              <motion.div
                key={amenity.id}
                variants={fadeUp}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group flex flex-col p-6 rounded-2xl bg-white/5 border border-white/8 hover:bg-royal-blue/15 hover:border-royal-blue-lighter/30 transition-all duration-300"
              >
                <div className="text-3xl mb-4 group-hover:-translate-y-1 transition-transform duration-300">
                  {amenity.icon}
                </div>
                <h3 className="text-base font-normal text-white mb-2 font-display">{amenity.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{amenity.description}</p>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-12">
            <Link
              href="/amenities"
              className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-8 py-4 text-sm font-bold text-white hover:bg-royal-blue hover:border-royal-blue transition-all duration-300"
            >
              View All Amenities
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 6. FOOD INCLUDED ─────────────────────────── */}
      <section className="py-24 bg-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-3"
          >
            <motion.span variants={fadeUp} className="text-xs font-bold uppercase tracking-widest text-royal-blue">
              Meals Included
            </motion.span>
            <motion.h2 variants={fadeUp} className="font-display text-4xl sm:text-5xl font-bold text-charcoal-darkest tracking-tight">
              Chef-Prepared Meals, Every Day
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-charcoal-light font-light leading-relaxed">
              Never worry about cooking or groceries again. Our professional chefs prepare fresh, nutritious meals twice a day.
            </motion.p>
          </motion.div>

          {/* Meal Tab Selector */}
          <div className="flex border-b border-slate-200 mb-10 max-w-2xl mx-auto">
            {foodMenu.map((meal) => (
              <button
                key={meal.id}
                onClick={() => setActiveMealTab(meal.id)}
                className={`flex-1 pb-4 text-sm font-semibold transition-all border-b-2 cursor-pointer ${activeMealTab === meal.id
                  ? "border-royal-blue text-royal-blue"
                  : "border-transparent text-charcoal-light hover:text-charcoal-dark"
                  }`}
              >
                <span className="text-lg mr-1.5">{meal.icon}</span>
                {meal.meal}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {foodMenu
              .filter((m) => m.id === activeMealTab)
              .map((meal) => (
                <motion.div
                  key={meal.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.3 }}
                  className="max-w-4xl mx-auto"
                >
                  <div className="bg-white rounded-3xl p-8 md:p-10 border border-slate-100 shadow-premium">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-4xl">{meal.icon}</span>
                          <div>
                            <h3 className="text-2xl font-bold text-charcoal-darkest font-display">{meal.meal}</h3>
                            <span className="inline-flex mt-1 items-center text-xs font-bold text-royal-blue bg-royal-blue-faint px-3 py-1 rounded-full">
                              🕐 {meal.time}
                            </span>
                          </div>
                        </div>
                        <p className="text-charcoal-muted leading-relaxed">{meal.description}</p>
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {["Vegan Options", "Jain Friendly", "Chef Prepared", "FSSAI Certified"].map(tag => (
                            <span key={tag} className="text-xs bg-surface text-charcoal-muted px-3 py-1 rounded-full border border-slate-200 font-medium">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-charcoal-light mb-4">Sample Menu</p>
                        <div className="flex flex-col gap-2">
                          {meal.items.map((item) => (
                            <div key={item} className="flex items-center gap-3 py-2.5 border-b border-slate-50 last:border-0">
                              <svg className="w-4 h-4 text-royal-blue shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="text-sm text-charcoal-dark font-medium">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
      </section>

      {/* ── 7. PRICING ───────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-3"
          >
            <motion.span variants={fadeUp} className="text-xs font-bold uppercase tracking-widest text-royal-blue">
              Membership Plans
            </motion.span>
            <motion.h2 variants={fadeUp} className="font-display text-4xl sm:text-5xl font-bold text-charcoal-darkest tracking-tight">
              Transparent Pricing
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-charcoal-light font-light leading-relaxed">
              No hidden fees. No broker. Choose the plan that fits your lifestyle.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {pricingPlans.map((plan, idx) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className={`relative flex flex-col p-8 rounded-3xl border transition-all duration-300 ${plan.popular
                  ? "border-charcoal-darkest bg-charcoal-darkest text-white shadow-xl shadow-royal-blue/25 md:scale-105 md:z-10"
                  : "border-slate-100 bg-white shadow-premium hover:shadow-xl hover:-translate-y-1"
                  }`}
              >
                {plan.popular && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-accent-gold px-5 py-1.5 text-[10px] font-bold text-charcoal-darkest tracking-widest uppercase shadow-lg">
                    Most Popular
                  </span>
                )}

                <div className={`text-sm font-bold mb-1 ${plan.popular ? "text-royal-blue-lighter" : "text-royal-blue"}`}>
                  {plan.name}
                </div>
                <p className={`text-xs leading-relaxed mb-6 ${plan.popular ? "text-blue-100" : "text-charcoal-light"}`}>
                  {plan.description}
                </p>

                <div className="flex items-end gap-1 mb-8">
                  <span className={`text-lg font-medium mb-1 ${plan.popular ? "text-blue-100" : "text-charcoal-muted"}`}>₹</span>
                  <span className={`text-5xl font-black tracking-tight ${plan.popular ? "text-white" : "text-charcoal-darkest"}`}>
                    {plan.monthlyPrice.toLocaleString("en-IN")}
                  </span>
                  <span className={`text-sm mb-2 ${plan.popular ? "text-blue-200" : "text-charcoal-light"}`}>/mo</span>
                </div>

                <div className={`h-px w-full mb-6 ${plan.popular ? "bg-white/20" : "bg-slate-100"}`} />

                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <svg className={`w-4 h-4 shrink-0 mt-0.5 ${plan.popular ? "text-blue-200" : "text-royal-blue"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className={plan.popular ? "text-blue-100" : "text-charcoal-medium"}>{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className={`w-full inline-flex items-center justify-center rounded-xl py-3.5 text-sm font-bold tracking-wide transition-all duration-300 ${plan.popular
                    ? "bg-white text-charcoal-darkest hover:bg-royal-blue-faint"
                    : "bg-charcoal-darkest text-white hover:bg-royal-blue shadow-lg shadow-royal-blue/20"
                    }`}
                >
                  {plan.cta}
                </Link>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-sm text-charcoal-light mt-8">
            💡 Save up to 10% with a 12-month plan.{" "}
            <Link href="/pricing" className="text-royal-blue font-semibold hover:underline">
              View full pricing details →
            </Link>
          </p>
        </div>
      </section>

      {/* ── 8. TESTIMONIALS ──────────────────────────── */}
      <section className="py-24 bg-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-3"
          >
            <motion.span variants={fadeUp} className="text-xs font-bold uppercase tracking-widest text-royal-blue">
              Testimonials
            </motion.span>
            <motion.h2 variants={fadeUp} className="font-display text-4xl sm:text-5xl font-bold text-charcoal-darkest tracking-tight">
              Trusted by Ambitious Minds
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.slice(0, 3).map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
              >
                <TestimonialCard t={t} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. FAQ ───────────────────────────────────── */}
      <section className="py-24 bg-white" id="faq">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-14 flex flex-col gap-3"
          >
            <motion.span variants={fadeUp} className="text-xs font-bold uppercase tracking-widest text-royal-blue">
              FAQs
            </motion.span>
            <motion.h2 variants={fadeUp} className="font-display text-4xl sm:text-5xl font-bold text-charcoal-darkest tracking-tight">
              Frequently Asked Questions
            </motion.h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl border border-slate-100 shadow-premium divide-y divide-slate-100 px-6 md:px-10 py-2"
          >
            {faqItems.map((faq) => (
              <FAQItem
                key={faq.id}
                faq={faq}
                isOpen={openFaq === faq.id}
                onToggle={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 10. CTA BANNER ───────────────────────────── */}
      <section className="py-20 px-4 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-5xl bg-charcoal-darkest border border-slate-100 rounded-[2rem] overflow-hidden relative shadow-sm"
        >

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 p-10 md:p-14">
            <div className="text-center md:text-left">
              <h2 className="font-display text-3xl md:text-4xl font-normal text-white mb-3 leading-tight">
                Ready to Find Your New Home?
              </h2>
              <p className="text-charcoal-muted text-base">
                Schedule a free tour and experience SOL Stay living first-hand.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                href="/contact"
                className="inline-flex h-13 items-center justify-center rounded-xl border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-bold text-white hover:bg-white/10 transition-all duration-300 shadow-lg"
              >
                Book a Tour
              </Link>
              <a
                href={siteConfig.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-13 items-center justify-center gap-2 rounded-xl border-2 border-white/30 px-7 py-3.5 text-sm font-bold text-white hover:bg-white/10 transition-all duration-300"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp Us
              </a>
            </div>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
